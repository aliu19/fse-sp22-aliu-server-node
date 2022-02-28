/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../models/Message";

export default interface MessageDaoI {
  userMessagesUser (sid: string, rid: string, message: string, sentAt: string): Promise<Message>;
  userDeletesMessage (mid: string): Promise<any>;
  findAllMessagesSentByUser (uid: string): Promise<Message[]>;
  findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
};
