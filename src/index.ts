import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { getUserByEmail, insertResume, insertUser } from './db/users';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.post('/api/login', async (req, res) => {
    let user = await getUserByEmail(req.body.email);
    if(!user) user = await insertUser(req.body.email);
    res.send(user);
});

app.put('/api/user', async (req, res) => {
    let user = await getUserByEmail(req.body.email);
    if(user) {
        user = await insertResume(req.body.email, req.body.resume);
        res.send(user);
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});