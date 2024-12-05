const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;
const model = mongoose.model;

const listSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
   url:String,
   filename:String,
   
   },
  price: {
    type: Number,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

listSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = model("Listing", listSchema);
module.exports = Listing;
