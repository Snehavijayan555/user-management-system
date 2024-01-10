const mongoose = require("mongoose");
const path = require("path");
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");

const express = require("express");
const app = express();
const nocache= require('nocache')
app.use(express.static("public"));
app.use("/", express.static(path.join(__dirname, "./public")));

app.use(nocache());
//for user routes
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

//for admin routes
const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

app.listen(3000, function () {
  console.log("server is on port http://localhost:3000");
});
