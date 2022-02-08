import TuitDaoI from "../interfaces/TuitDao";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if(TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  }

  async createTuit(tuit: Tuit): Promise<Tuit> {
    return await TuitModel.create(tuit);
  }

  async deleteTuit(tid: string): Promise<any> {
    return await TuitModel.deleteOne({_id: tid});
  }

  async findAllTuits(): Promise<Tuit[]> {
    return await TuitModel.find();
  }

  async findTuitById(tid: string): Promise<Tuit> {
    return await TuitModel.findById(tid)
      .populate("postedBy")
      .exec();
  }

  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return await TuitModel.find({postedBy: uid});
  }

  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return await TuitModel.updateOne({_id: tid}, {$set: tuit});
  }
}
