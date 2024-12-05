const User = require("../models/user.js");
//Sign up
//Signup get Form controller
module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
  };

//Signup Form post req controller
module.exports.signupPost = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
     const registeredUser = await User.register(newUser, password);
      req.login(registeredUser,(err)=>{
       if(err){
        return next(err);
       }
      });
      req.flash("success", "Wecome to airbnb");
      res.redirect("/listing");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  };

//Log In
//log in form controller.
module.exports.loginForm=  (req, res) => {
    res.render("users/login.ejs");
  };

//log in post req controller.
module.exports.loginPost =async (req, res) => {
    req.flash("success", "Welcome back to airbnb");
    let redirectUrl = res.locals.redirectUrl ||"/listing";
    res.redirect(redirectUrl);
  };


//Logout Controller

module.exports.logout =(req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out!");
      res.redirect("/listing");
    });
  };