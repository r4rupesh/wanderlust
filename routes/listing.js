const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncwrap");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, listingValidate } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudCofig.js");

const upload = multer({ storage });

router
  .route("/")
  .get(asyncWrap(listingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    listingValidate,
    asyncWrap(listingController.newPost)
  );
//new route
router.get("/new", isLoggedin, listingController.newForm);

router
  .route("/:id")
  .get(asyncWrap(listingController.show))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    listingValidate,
    asyncWrap(listingController.update)
  )
  .delete(isLoggedin, isOwner, listingController.delete);

//edit route
router.get("/:id/edit", isLoggedin, isOwner, asyncWrap(listingController.edit));

module.exports = router;
