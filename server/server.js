const express = require('express');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const Validator = require('./validation');

const url = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(url);
const validator = new Validator ();
const app = express();
app.use(express.json());

const dataValidation = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    await validator.dataValidation(userName, email, password);
    next();
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: error.message
    })
  }
}

app.post('/reg', dataValidation, async (req, res) => {
  try {
    console.log(req.body);
    await mongoClient.connect( async (err, client) => {
      const db = await client.db('admin');
      db.command({ping: 1}, function (err, res) {
        if (!err) {
          console.log("Подключение с сервером успешно установлено");
        }
      });
      });
    res.send('User saved!');
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: error.message
    });
  }
  finally {
    await mongoClient.close();
      console.log("Подключение закрыто");
  }
});

app.listen(5000, () => console.log('Server started!'))