import { Request, Response } from "express";

const me = async (request: Request, response: Response) => {
  const { spotifyService } = request;
  // get profile
  const me = await spotifyService.getProfile();

  return response.send(me);
};

export default {
  me
};
