import { DocumentQuery } from "mongoose";

import User, { IUser } from "../models/User";
import { IGetRefreshTokenResponse } from "./spotifyAuthService";
import { ISpotifyBand } from "./spotifyService";

export type IFindById = (id: string) => DocumentQuery<IUser, IUser, {}>;
export type ILike = (id: string, band: ISpotifyBand, flag: string) => void;

export type IFindOrCreate = (
  id: string,
  token: any,
  request_time: number
) => Promise<IUser | DocumentQuery<IUser, IUser, {}>>;

export type IUpdateUser = (
  user: IUser,
  token: IGetRefreshTokenResponse,
  request_time: number
) => IUser;

export type UserService = () => UserServiceReturn;

export type UserServiceReturn = {
  findById: IFindById;
  findOrCreate: IFindOrCreate;
  updateUser: IUpdateUser;
};

const userService: UserService = () => {
  const createUser = (id: string, token: any, request_time: number) => {
    const user = new User({
      name: id,
      spotify: {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_at: 1000 * token.expires_in + request_time
      }
    });

    user.save();

    return user;
  };

  const findById: IFindById = id =>
    User.findOne({ name: id }, (error: any, user) => user);

  const findOrCreate: IFindOrCreate = async (id, token, request_time) => {
    return (await findById(id)) || (await createUser(id, token, request_time));
  };

  const updateUser: IUpdateUser = (user, token, request_time) => {
    user.spotify.access_token = token.access_token;
    user.spotify.expires_at = 1000 * token.expires_in + request_time;
    user.save();

    return user;
  };

  return {
    findById,
    findOrCreate,
    updateUser
  };
};

export default userService;
