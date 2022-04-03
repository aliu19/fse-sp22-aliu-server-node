/**
 * @file Implements mongoose model to CRUD
 * documents in the unlikes collection
 */
import mongoose from "mongoose";
import UnlikeSchema from "./UnlikeSchema";
const UnlikeModel = mongoose.model("UnlikeModel", UnlikeSchema);
export default UnlikeModel;
