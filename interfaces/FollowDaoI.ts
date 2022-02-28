/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../models/Follow";

export default interface FollowDaoI {
  userFollowsUser (uid: string, fid: string): Promise<Follow>;
  userUnfollowsUser (uid: string, fid: string): Promise<any>;
  findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
  findAllUsersFollowingUser (uid: string): Promise<Follow[]>;
};
