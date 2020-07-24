import {Request, Response} from 'express';

import songkickService from '../services/songkick';

const festivals = async (request: Request, response: Response) => {
  const festivals = await songkickService().getFestivals();

  return response.send(festivals);
};

const filteredFestivals = async (request: Request, response: Response) => {
  const {
    body: {similar, top},
  } = request;

  let festivals = await songkickService().getFestivals();

  festivals = festivals.filter(festival => {
    const bands = festival.bands;

    const numTop = bands.filter((bandName: string) => top.indexOf(bandName) > -1).length;

    const numSimilar = bands.filter((bandName: string) => similar.indexOf(bandName) > -1).length;

    return numTop * 2 + numSimilar > 0;
  });

  return response.send(festivals);
};

export default {
  festivals,
  filteredFestivals,
};
