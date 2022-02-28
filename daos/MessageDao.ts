/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of FollowDao
 */
export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns MessageDao
   */
  public static getInstance = (): MessageDao => {
    if(MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  }

  private constructor() {}

  /**
   * Uses MessageModel to retrieve multiple message documents from messages collection
   * of the messages sent by a user
   * @param {string} uid User's primary key
   * @returns Promise To be notified when messages are retrieved from the database
   */
  findAllMessagesSentByUser = async (uid: string): Promise<Message[]>  =>
      MessageModel.find({sender: uid})


  /**
   * Uses MessageModel to retrieve multiple message documents from messages collection
   * of the messages received by a user
   * @param {string} uid User's primary key
   * @returns Promise To be notified when messages are retrieved from the database
   */
  findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
      MessageModel.find({receiver: uid})

  /**
   * Inserts message instance into the database
   * @param {string} uid The sender User's primary key
   * @param {string} fid The receiver User's primary key
   * @param {string} message The message
   * @param {Date} sentAt The time the message is sent at
   * @returns Promise To be notified when message is inserted into the database
   */
  userMessagesUser = async (uid: string, fid: string, message: string, sentAt: string): Promise<Message> =>
      MessageModel.create({sender: uid, receiver: fid, message: message, sentAt: sentAt})

  /**
   * Removes message from the database.
   * @param {string} mid The Message's primary key
   * @returns Promise To be notified when message is removed from the database
   */
  userDeletesMessage = async (mid: string): Promise<any> =>
      MessageModel.deleteOne({_id: mid})

}
