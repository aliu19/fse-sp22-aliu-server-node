/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve all the users following a user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:fid to record that a user follows a user
 *     </li>
 *     <li>DELETE /api/users/:uid/follows/:fid to record that a user unfollows a user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowController
   */
  public static getInstance = (app: Express): FollowController => {
    if(FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.post("/api/users/:uid/follows/:fid", FollowController.followController.userFollowsUser);
      app.delete("/api/users/:uid/follows/:fid", FollowController.followController.userUnfollowsUser);
      app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
      app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersFollowingUser);
    }
    return FollowController.followController;
  }

  private constructor() {}

  /**
   * Retrieves all users followed by a user (follows) from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user that is following
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersFollowedByUser = (req: Request, res: Response) =>
      FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
      .then(users => res.json(users));

  /**
   * Retrieves all users following a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user following the other user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersFollowingUser = (req: Request, res: Response) =>
      FollowController.followDao.findAllUsersFollowingUser(req.params.uid)
      .then(users => res.json(users));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and fid representing the user that is following the other user
   * and the user being followed
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new follow that was inserted in the
   * database
   */
  userFollowsUser = (req: Request, res: Response) =>
      FollowController.followDao.userFollowsUser(req.params.uid, req.params.fid)
      .then(follow => res.json(follow));

  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and fid representing the user that is unfollowing the other user
   * and the user being unfollowed
   * @param {Response} res Represents response to client, including status
   * on whether deleting the follow was successful or not
   */
  userUnfollowsUser = (req: Request, res: Response) =>
      FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.fid)
      .then(status => res.send(status));
};
