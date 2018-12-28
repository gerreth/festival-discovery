import axios from "axios";
// project imports
import { redisService, RedisServiceReturn } from "../clients/redis";
import { merge, removeDuplicates } from "../utils/array";
import { asyncAwaitMap } from "../utils/async";

/*
 * types
 */
export type ISpotifyBand = {
  external_urls: { spotify: string };
  followers: { href?: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { height: number; url: string; width: number };
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type IGetProfileResponse = {
  country: string;
  display_name: string;
  email: string;
  external_urls: { spotify: string };
  followers: { href: null; total: number };
  href: string;
  id: string;
  images: any;
  product: string;
  type: string;
  uri: string;
};

export type SpotifyService = (token: string) => SpotifyServiceReturn;

export type SpotifyServiceReturn = {
  getProfile: () => Promise<IGetProfileResponse>;
  getSimilar: (ids: string[]) => Promise<ISpotifyBand[]>;
  getTopBands: (user: string) => Promise<ISpotifyBand[]>;
  next: () => any;
  play: (uri: string) => any;
};

type getBands = (
  redis: RedisServiceReturn,
  url: string,
  responseKey: string
) => Promise<ISpotifyBand[]>;

type getCacheOrApi = (
  url: string,
  responseKey: string,
  identifier?: string
) => Promise<ISpotifyBand[]>;

type RemoveDuplicateBands = (
  ids: string[],
  bands: ISpotifyBand[]
) => ISpotifyBand[];

/*
 * SpotifyService
 */
const spotifyService: SpotifyService = token => {
  const baseUrl = "https://api.spotify.com/v1";
  const axiosInstance = axios.create({
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "application/json"
    }
  });

  /**
   * Get
   * */
  const getBands: getBands = async (redis, url, responseKey) => {
    let bands;
    console.log("Get from api");
    try {
      const result = await axiosInstance.get(url);
      bands = result.data[responseKey];
    } catch (error) {}
    redis.setExpire(bands, 24 * 60 * 60);
    return bands;
  };

  /**
   * Find request in the cache, else retrieve from spotify.
   * */
  const getCacheOrApi: getCacheOrApi = async (url, responseKey, identifier) => {
    const redis = redisService(url, identifier);

    let cachedBands = await redis.get();

    return cachedBands || getBands(redis, url, responseKey);
  };

  /**
   * Removes duplicate bands and those which are in the top50 for the user.
   * */
  const removeDuplicateBands: RemoveDuplicateBands = (ids, bands) => {
    return removeDuplicates(bands, "id").filter(
      band => ids.indexOf(band.id) === -1
    );
  };

  return {
    async getSimilar(ids) {
      const raw = await asyncAwaitMap(ids, (id: string) => {
        const url = `${baseUrl}/artists/${id}/related-artists`;
        return getCacheOrApi(url, "artists");
      });

      const merged = merge(raw);

      return removeDuplicateBands(ids, merged);
    },

    async getTopBands(user) {
      const url = `${baseUrl}/me/top/artists?limit=50&time_range=long_term`;

      return getCacheOrApi(url, "items", user);
    },

    async getMe(user: string) {
      const url = `${baseUrl}/me`;

      return getCacheOrApi(url, "items", user);
    },

    async getProfile() {
      const response = await axiosInstance.get("https://api.spotify.com/v1/me");

      return response.data;
    },

    async play(uri) {
      const url = `${baseUrl}/me/player/play`;

      return await axiosInstance.put(url, { context_uri: uri });
    },

    async next() {
      const url = `${baseUrl}/me/player/next`;

      return await axiosInstance.post(url);
    }
  };
};

export default spotifyService;
