const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

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

// route middleware
app.use("/api/user", authRoutes);

app.listen(3000, () => console.log("server up and runnig"));
