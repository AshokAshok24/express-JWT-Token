const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config()

app.use(express.json());


app.post('/token', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (email == 'star@gmail.com' && password == 'pass') {
    const token = jwt.sign({ name: 'star', email: email }, process.env.SECURITY_KEY, { expiresIn: '1minute' });

    return res.status(200).json({ status: 1, message: token })
  } else {
    return res.status(200).json({ status: 1, message: 'Email/Password Invalid' })
  }
})

app.post('/validatetoken', (req, res) => {

  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader.split(" ")[1];

  if (!token) {

    return res.json({ Message: "Not Authendicated" });

  } else {

    jwt.verify(token, process.env.SECURITY_KEY, (err, decoded) => {
      if (err) {

        res.json({ Token: "Token Invalid" });
      }
      return res.status(200).json({ status: 1, TokenValues: decoded })
    });
  }
})


const port = process.env.PORT
// For Listining the server

app.listen(port, () => {
  console.log(`Server Running in the port http://localhost:${port}`);
})