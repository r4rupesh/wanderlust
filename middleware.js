const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {schema,reviewSchema} = require("./joiValidation.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedin =(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be log in first!");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner = async (req,res,next)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are not owner of the listing");
    return res.redirect(`/listing/${id}`);
    }
    next();
}


//Joi Validations for listing
module.exports.listingValidate = (req, res, next) => {
    let { error } = schema.validate(req.body);
    if (error) {
      throw new ExpressError(404, error);
    } else {
      next();
    }
  };
  

//Joi Validation for review
//Joi validations
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      throw new ExpressError(404, error);
    } else {
      next();
    }
  };


 //isAuthorreview
 module.exports.isReviewAuthor = async (req,res,next)=>{
  let {id,reviewId}= req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You didn't create this review");
  return res.redirect(`/listing/${id}`);
  }
  next();
}
