const Listing = require("../models/listing");
const Review = require("../models/review.js");

//Post controller
module.exports.post = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
   req.flash("success","New review created");
    res.redirect(`/listing/${req.params.id}`);
  };


//Delete Controller

module.exports.delete =  async (req,res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listing/${id}`);
  };