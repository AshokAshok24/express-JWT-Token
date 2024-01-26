const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./jwtmiddleware/verifyToken');
const app = express();
require('dotenv').config()

app.use(express.json());


app.get('/', (req, res) => {

  const msg =
    `
  <h2>Now You are Connected With the Server...</h2>
  <p>Find the Below API [POST]</p>
  <ul>
      <li>generatetoken</li>
      <li>verify</li>
  </ul>    
  `

  res.send(msg)
})

app.post('/generatetoken', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (email == 'star@gmail.com' && password == 'pass') {
    const token = jwt.sign({ name: 'star', email: email }, process.env.SECURITY_KEY, { expiresIn: '5minute' });

    return res.status(200).json({ status: 1, message: token })
  } else {
    return res.status(200).json({ status: 1, message: 'Email/Password Invalid' })
  }
})

app.post('/verify', verifyToken, (req, res) => {

  const msg = ` Hi..${req.name} Token validation Success`
  res.send(msg);

})


const port = process.env.PORT
// For Listining the server

app.listen(port, () => {
  console.log(`Server Running in the port http://localhost:${port}`);
})