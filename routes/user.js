const express = require("express");
const router = express.Router();

const asyncWrap = require("../utils/asyncwrap");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// signup page
router.route("/signup").get(userController.signupForm);
router.route("/signup").post(asyncWrap(userController.signupPost));

// login page
router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginPost
  );

//logout

router.get("/logout", userController.logout);

module.exports = router;
