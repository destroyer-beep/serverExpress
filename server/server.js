const express = require('express');
const fs = require('fs');
const Validator = require('./validation')

const validator = new Validator ();
const app = express();
app.use(express.json());

app.post('/reg', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    validator.dataValidation(userName, email, password);
    res.send('User saved!');
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: error.message
    })
  }
})

app.listen(5000, () => console.log('Server started!'))