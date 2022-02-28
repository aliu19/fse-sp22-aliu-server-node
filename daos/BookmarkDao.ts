/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns BookmarkDao
   */
  public static getInstance = (): BookmarkDao => {
    if(BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  }

  private constructor() {}

  /**
   * Uses BookmarkModel to retrieve multiple bookmark documents from bookmarks collection
   * of the tuits bookmarked by a user
   * @param {string} uid User's primary key
   * @returns Promise To be notified when bookmarks are retrieved from the database
   */
  findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]>  =>
      BookmarkModel
      .find({user: uid})
      .populate("tuit")
      .exec()

  /**
   * Inserts follow instance into the database
   * @param {string} uid The User's primary key
   * @param {string} tid The Tuit's primary key
   * @returns Promise To be notified when bookmark is inserted into the database
   */
  userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
      BookmarkModel.create({user: uid, tuit: tid})

  /**
   * Removes bookmark from the database.
   * @param {string} uid The User's primary key
   * @param {string} tid The Tuit's primary key
   * @returns Promise To be notified when bookmark is removed from the database
   */
  userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
      BookmarkModel.deleteOne({user: uid, tuit: tid})

}
