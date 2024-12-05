const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");






const MONGODB_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res) => console.log("data base succefully connected"))
  .catch((err) => console.log(err));


async function main() {
  await mongoose.connect(MONGODB_URL);
}


async function initDoc(){
     await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"67409eae6fdbd36a77eb7d99"}));
     await Listing.insertMany(initData.data);

}
initDoc();