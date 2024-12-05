const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncwrap");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {
  validateReview,
  isLoggedin,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Reviews
//Post Route
router.post("/", isLoggedin, validateReview, asyncWrap(reviewController.post));


//Delete Route
router.delete("/:reviewId",isLoggedin,
  isReviewAuthor,
  asyncWrap(reviewController.delete)
);

module.exports = router;
