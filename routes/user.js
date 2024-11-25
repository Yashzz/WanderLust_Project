const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

//Sign-up route
router.get("/signup", userController.renderSignup);

router.post("/signup", wrapAsync(userController.signup));

//Login route
router.get("/login", userController.renderLogin);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}),
    userController.login
    );

//Logout route
router.get("/logout", userController.logout);

module.exports = router;