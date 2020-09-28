const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

// import routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

// mongoDb connect
mongoose.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  // checking if database is connected
  console.log("connected");
});

// Middleware
app.use(express.json());
app.use(bodyParser.json());
// route middleware
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => console.log("server up and runnig"));
