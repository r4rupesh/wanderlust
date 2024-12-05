const { config } = require("dotenv");
const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client");
const { query } = require("express");
const mapTilerApi = process.env.MAP_TILER_API_KEY;

  


//index controller
module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listing.ejs", { allListing });
};

//new controller
module.exports.newForm = (req, res) => {
  res.render("new.ejs");
};


//Create Listing
module.exports.newPost = async (req, res, next) => {
  let countryLocation = `${req.body.listing.location},${req.body.listing.country}`;
  let result = await maptilerClient.geocoding.forward(countryLocation,{ apiKey: mapTilerApi ,limit:1});
  console.log(result.features[0].geometry);
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url,filename};
  newListing.geometry=result.features[0].geometry;
 let savedListing = await newListing.save();
 console.log(savedListing);
  req.flash("success", "New Listing Created");
  res.redirect("/listing");
};

//show controller
module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exitsts");
    res.redirect("/listing");
  }
  res.render("show.ejs", { listing });
};

//edit controller
module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exitsts");
    res.redirect("/listing");
  }
   let originalImage=listing.image.url;
  originalImage = originalImage.replace("/upload","/upload/w_250");
  res.render("edit.ejs", { listing,originalImage});
};

//Update controller
module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
}
  req.flash("success", "Listing Updated");
  res.redirect(`/listing/${id}`);
};

//Delte Controller
module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listing");
};
