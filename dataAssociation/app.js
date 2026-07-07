const express = require('express');
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");


app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.get('/create', async (req, res) => {
   let user =  await userModel.create({
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30
    });
    res.send('User created successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})