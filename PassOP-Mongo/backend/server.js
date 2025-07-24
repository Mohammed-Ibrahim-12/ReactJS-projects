const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config();

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);


// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect()

//Get all the Password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Save a Password
app.post('/', async (req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true,result: findResult})
})

//Deletee a password
app.delete('/', async (req, res) => {
  const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true,result: findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
}) 