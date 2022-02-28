/**
 * @file Declares Message data type representing relationship between
 * users and users, as in user messages a user
 */

import User from "./users/User";

/**
 * @typedef Message Represents messaging relationship between a user and another user,
 * as in a user messages a user
 * @property {String} message Message content
 * @property {User} userFollowed User being following
 * @property {User} userFollowing User following the other user
 * @property {Date} sentAt Time message is sent
 */
export default interface Message {
  message: string,
  sender: User,
  receiver: User,
  sentAt: Date
};
