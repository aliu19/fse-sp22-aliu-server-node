/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
  private static dislikeDao: DislikeDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns DislikeDao
   */
  public static getInstance = (): DislikeDao => {
    if(DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  }
  private constructor() {}

  /**
   * Uses DislikeModel to retrieve all user documents that dislike a tuit from users collection
   * @param tid Tuit's primary key
   * @returns Promise to be notified when the users are retrieved from database
   */
  findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({tuit: tid})
      .populate("dislikedBy")
      .exec();

  /**
   * Uses DislikeModel to retrieve all tuit documents that a user disliked from tuits collection
   * @param uid User's primary key
   * @returns Promise to be notified when the tuits are retrieved from database
   */
  findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({dislikedBy: uid})
      .populate({
        path: "tuit",
        populate: {
          path: "postedBy"
        }
      })
      .exec();

  /**
   * Uses DislikeModel to delete a dislike document
   * @param uid User's primary key
   * @param tid Tuit's primary key
   * @returns Promise to be notified when dislike is removed from the database
   */
  userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

  /**
   * Inserts a new dislike document
   * @param uid User's primary key
   * @param tid Tuit's primary key
   * @returns Promise to be notified when dislike is inserted into the database
   */
  userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.create({tuit: tid, dislikedBy: uid});

  /**
   * Uses DislikeModel to retrieve a single dislike document
   * @param uid User's primary key
   * @param tid Tuit's primary key
   * @returns Promise to be notified when dislike is retrieved from the database
   */
  findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.findOne({tuit: tid, likedBy: uid});

  /**
   * Uses DislikeModel to count the number of dislikes a tuit has
   * @param tid Tuit's primary key
   * @returns Promise to be notified when dislikes are counted from the database
   */
  countHowManyDislikedTuit = async (tid: string): Promise<any> =>
      DislikeModel.count({tuit: tid});
}
