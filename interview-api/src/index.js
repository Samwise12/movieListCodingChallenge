import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import data from './routes/data'; 
import lists from './routes/lists'; 

dotenv.config();
const app = express();
app.use(bodyParser.json());
// mongoose.Promise = global.Promise *fix mpromise issue without bluebird
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,//mongodb://localhost:27017/interview
 { useMongoClient: true }).then(
 () => {console.log('mongodb running local mongodb')},
 err => {console.log('error!')}
 );


app.use('/api/data', data);
app.use('/api/lists', lists);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () => console.log('Running on localhost:8080'));
