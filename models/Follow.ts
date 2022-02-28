/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows a user
 */

import User from "./users/User";

/**
 * @typedef Follow Represents following relationship between a user and another user,
 * as in a user follows a user
 * @property {User} userFollowed User being following
 * @property {User} userFollowing User following the other user
 */
export default interface Follow {
  userFollowed: User,
  userFollowing: User,
};
