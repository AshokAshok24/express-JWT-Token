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

  if (email == 'test@gmail.com' && password == 'test') {
    const token = jwt.sign({ name: 'star', email: email }, process.env.SECURITY_KEY, { expiresIn: '5 minute' });

    return res.status(200).json({ status: 1, data: token })
  } else if (email !== 'test@gmail.com' && password !== "test") {
    return res.status(200).json({ status: 0, message: 'Invalid Email/Password' })
  } else if (email == 'test@gmail.com' && password !== "test") {
    return res.status(200).json({ status: 0, message: 'Invalid Password' })

  }
})

app.post('/verify', verifyToken, (req, res) => {

  const msg = ` Hi Token validation Success`
  res.send(msg);

})

const port = process.env.PORT
// For Listining the server

app.listen(port, () => {
  console.log(`Server Running in the port http://localhost:${port}`);
})