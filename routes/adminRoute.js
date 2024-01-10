const express = require("express");
const admin_route = express();

const session = require("express-session");
const config = require("../config/config");
admin_route.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

const bodyParser = require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));

admin_route.set("view engine", "ejs");
admin_route.set("views", "./views/admin");

const auth = require("../middleware/adminAuth");

const adminController = require("../controllers/adminController");

admin_route.get("/", auth.isLogout, adminController.loadLogin);

admin_route.post("/", adminController.verifyLogin);

admin_route.get("/home", auth.isLogin, adminController.loadDashboard);

admin_route.get("/new-user",auth.isLogin,adminController.newUserLoad);

admin_route.post("/new-user", auth.isLogin, adminController.addUser);

admin_route.get('/edit-user',auth.isLogin,adminController.editUserLoad); 

admin_route.post('/edit-user', auth.isLogin, adminController.updateUsers);

admin_route.get("/logout", auth.isLogin, adminController.logout);

admin_route.get("/delete-user", auth.isLogin, adminController.deleteUser)

admin_route.get("*", function (req, res) {
  res.redirect("/admin");
});

module.exports = admin_route;
