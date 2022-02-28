/**
 * @file Implements schema for messages using mongoose
 */

import mongoose, {Schema} from "mongoose";
import Message from "../../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
  message: String,
  sender: {type: Schema.Types.ObjectId, ref: "UserModel"},
  receiver: {type: Schema.Types.ObjectId, ref: "UserModel"},
  sentAt: Date
}, {collection: "messages"});

export default MessageSchema;
