/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */

import Tuit from "./tuits/Tuit";
import User from "./users/User";

/**
 * @typedef Bookmark Represents bookmarking relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} tuit Tuit being bookmarks
 * @property {User} likedBy User bookmarking the tuit
 */
export default interface Bookmark {
  tuit: Tuit,
  user: User,
};
