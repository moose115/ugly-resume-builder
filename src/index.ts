import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { getUserByEmail, insertResume, insertUser } from './db/users';
import bodyParser from 'body-parser';
import path from 'path';

const app: Express = express();

app.use(bodyParser.json())
app.use(express.static('front/build'));

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

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});