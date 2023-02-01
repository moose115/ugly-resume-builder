import { MongoClient, Document, ServerApiVersion } from 'mongodb';
import { Resume } from '../../front/src/types/Resume';
import { User } from '../../front/src/types/User';


const url = process.env.MONGO_URL;
const client = new MongoClient(url, { serverApi: ServerApiVersion.v1, keepAlive: false });
const dbName = 'builder';
const collectionName = 'users';

export const getUserByEmail = async (email: string): Promise<User> => {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection<User>(collectionName);

    const user = collection.findOne({ email });
    return user;
};

export const insertResume = async (email: string, resume: Resume) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const user = await getUserByEmail(email);
    if (user) {
        user.resume = resume;
        collection.updateOne({ email }, { $set: { resume: user.resume } });
    }
    return user;
};

export const insertUser = async (email: string) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const user = {
        email,
    }

    const result = await collection.insertOne(user);
    return {_id: result.insertedId, ...user} as User;
};