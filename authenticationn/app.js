const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user");

const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });


      let token = jwt.sign({ email: email}, "secretkey")
      res.cookie("token", token)

      // res.redirect('/');
      res.send(createdUser);
    });
  });
});


app.get("/login", async (req, res) => {
  res.render("login")

})
app.post("/login", async (req, res) => {
//   res.render("login")
    userModel.findOne({ email: req.body.email})
    if(!user) {
        res.send("User not found")
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result) {
            let token = jwt.sign({ email: req.body.email}, "secretkey")
            res.cookie("token", token)
            // res.redirect("/");
            res.send("Login successful")
        }
        else{
            res.send("Login failed")
        }

})
})

app.post("/logout", (req, res) => {
  res.cookie("token", "")
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})