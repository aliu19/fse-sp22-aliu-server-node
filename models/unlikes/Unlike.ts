/**
 * @file Declares Unlike data type representing relationship between
 * users and tuits, as in user unlikes a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Like Represents unlikes relationship between a user and a tuit,
 * as in a user unlikes a tuit
 * @property {Tuit} tuit Tuit being liked
 * @property {User} unlikedBy User unliking the tuit
 */

export default interface Unlike {
  tuit: Tuit,
  unlikedBy: User
};
