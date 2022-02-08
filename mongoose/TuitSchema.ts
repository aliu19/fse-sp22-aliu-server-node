import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
  tuit: {type: String, required: true},
  postedOn: {type: Date, default: Date.now},
  postedBy: {type: String, required: true}

}, {collection: 'tuits'})

export default TuitSchema
