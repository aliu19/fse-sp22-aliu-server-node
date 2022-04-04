import DislikeDaoI from "../interfaces/DislikeDaoI";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

export default class DislikeDao implements DislikeDaoI {
  private static dislikeDao: DislikeDao | null = null;
  public static getInstance = (): DislikeDao => {
    if(DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  }
  private constructor() {}

  findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
      DislikeModel
      .find({tuit: tid})
      .populate("dislikedBy")
      .exec();

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

  userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

  userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
      DislikeModel.create({tuit: tid, dislikedBy: uid});
}
