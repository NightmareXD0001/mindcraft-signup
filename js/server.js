const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const dbURI =
  "mongodb+srv://harikarthik:matrixcrypticeventnononono@matrixcryptic.zptpily.mongodb.net/?retryWrites=true&w=majority&appName=MatrixCryptic";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      res.status(500).send("Error occurred: database error");
    } else if (!user) {
      res.status(401).send("Incorrect username or password");
    } else {
      res.redirect("/dashboard.html");
    }
  });
});

// Serve the dashboard
app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
