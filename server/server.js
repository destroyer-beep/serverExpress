const express = require('express');
const fs = require('fs');
const Validator = require('./validation');
const Database = require('./database/Database');

const app = express();
app.use(express.json());
const validator = new Validator ();
const database = new Database()

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
    //console.log(req.body);
    const {userName, email, password} = req.body;
    database.userRegistration(userName, email, password);
    res.send('User saved!');
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: error.message
    });
  }
});

app.listen(5000, () => console.log('Server started!'))