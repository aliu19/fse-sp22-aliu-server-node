/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/follows/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
  private static followDao: FollowDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns FollowDao
   */
  public static getInstance = (): FollowDao => {
    if(FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  }

  private constructor() {}

  /**
   * Uses FollowModel to retrieve multiple follow documents from follows collection
   * of the users followed by a user (follows)
   * @param {string} uid User's primary key
   * @returns Promise To be notified when follows are retrieved from the database
   */
  findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]>  =>
    FollowModel
    .find({userFollowing: uid})
    .populate("userFollowed")
    .exec()


  /**
   * Uses FollowModel to retrieve multiple follow documents from follows collection
   * of the users following a user
   * @param {string} uid User's primary key
   * @returns Promise To be notified when follows are retrieved from the database
   */
  findAllUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
      FollowModel
      .find({userFollowed: uid})
      .populate("userFollowing")
      .exec()

  /**
   * Inserts follow instance into the database
   * @param {string} uid The following User's primary key
   * @param {string} fid The followed User's primary key
   * @returns Promise To be notified when follow is inserted into the database
   */
  userFollowsUser = async (uid: string, fid: string): Promise<Follow> =>
      FollowModel.create({userFollowing: uid, userFollowed: fid})

  /**
   * Removes follow from the database.
   * @param {string} uid The following User's primary key
   * @param {string} fid The followed User's primary key
   * @returns Promise To be notified when follow is removed from the database
   */
  userUnfollowsUser = async (uid: string, fid: string): Promise<any> =>
      FollowModel.deleteOne({userFollowing: uid, userFollowed: fid})

}
