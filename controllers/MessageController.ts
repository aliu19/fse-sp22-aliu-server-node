/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:sid/messages/:rid to create a new message instance</li>
 *     <li>GET /api/users/:uid/messagessent to retrieve all the messages a user has sent</li>
 *     <li>GET /api/users/:uid/messagesreceived to retrieve all the messages a user has received</li>
 *     <li>DELETE /api/messages/:mid to remove a particular message instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing user CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @returns MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if(MessageController.messageController === null) {
      MessageController.messageController = new MessageController();

      app.post("/api/users/:sid/messages/:rid", MessageController.messageController.userMessagesUser);
      app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
      app.get("/api/users/:uid/messagessent", MessageController.messageController.findAllMessagesSentByUser);
      app.get("/api/users/:uid/messagesreceived", MessageController.messageController.findAllMessagesReceivedByUser);
    }
    return MessageController.messageController;
  }

  private constructor() {}

  /**
   * Retrieves all messages sent by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the primary key of the User
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findAllMessagesSentByUser = (req: Request, res: Response) =>
      MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
      .then(messages => res.json(messages));

  /**
   * Retrieves all messages received by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the primary key of the User
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findAllMessagesReceivedByUser = (req: Request, res: Response) =>
      MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
      .then(messages => res.json(messages));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters sid and rid representing the user that is sending the message
   * and the user receiving the message
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted in the
   * database
   */
  userMessagesUser = (req: Request, res: Response) =>
      MessageController.messageDao.userMessagesUser(req.params.sid, req.params.rid, req.body.message, Date())
      .then(message => res.json(message));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters mid representing the message to delete
   * @param {Response} res Represents response to client, including status
   * on whether deleting the message was successful or not
   */
  userDeletesMessage = (req: Request, res: Response) =>
      MessageController.messageDao.userDeletesMessage(req.params.mid)
      .then(status => res.send(status));
};
