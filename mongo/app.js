const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", (req, res) => {
  res.render("read");
});

app.post("/create", async (req, res) => {
  try {
    const { name, email, image } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const createdUser = await userModel.create({ name, email, image });
    return res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create user" });
  }
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
