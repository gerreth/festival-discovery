import axios from "axios";

import { asyncAwaitMap } from "../utils/async";
import formatDate from "../utils/formatDate";
import { errorLogger } from "../utils/logger";
import { merge } from "../utils/array";
import redisService from "./redis";

const min_date = "2019-01-01";
const max_date = "2019-12-31";
const type = "festival";
const api_key = process.env.SONGKICK_API_KEY;
const baseUrl = `https://api.songkick.com/api/3.0/events.json?apikey=${api_key}&min_date=${min_date}&max_date=${max_date}&type=${type}`;

const cities: any = {
  Amsterdam: "31366",
  Barcelona: "28714",
  Berlin: "28443",
  Budapest: "29047",
  Eindhoven: "31380",
  Hamburg: "28498",
  Lissabon: "31802",
  London: "24426",
  Madrid: "28755",
  Manchester: "24475",
  Matlock: "24517",
  Nantes: "28901",
  SaintMalo: "28922",
  Scheessel: "55800",
  Paris: "28909"
};

type SongkickResponse = {
  page: number;
  perPage: number;
  results: { event: any };
  totalEntries: number;
};

type GetPaginated = (city: string) => Promise<any[]>;
type GetCacheOrApi = (city: string, page: number) => Promise<SongkickResponse>;
type MakeRequest = (url: string) => Promise<SongkickResponse>;

export type SongkickService = () => {
  getFestivals: () => Promise<any>;
};

const songkickService = () => {
  const axiosInstance = axios.create({
    headers: {
      "content-type": "application/json"
    }
  });

  /**
   *
   * Get festivals for a given city, paginated if necessary
   *
   * @param city City to search in (area around XXkm)
   */
  const getPaginated: GetPaginated = async city => {
    let events = [];
    let resultsPage;
    let page = 1;

    resultsPage = await getCacheOrApi(city, 1);

    const {
      perPage,
      results: { event },
      totalEntries
    } = resultsPage;

    const numPages = Math.ceil(totalEntries / perPage);

    events.push(event);

    while (page < numPages) {
      const {
        results: { event }
      } = await getCacheOrApi(city, page + 1);

      events.push(event);

      page++;
    }

    return merge(events);
  };

  /**
   *
   * Get festivals from cache if possible, else retrieve from api
   *
   * @param city City to search in (area around XXkm)
   * @param page Page number
   */
  const getCacheOrApi: GetCacheOrApi = async (city, page) => {
    let redis;

    const url = `${baseUrl}&location=sk:${city}&page=${page}`;

    try {
      redis = redisService(url);
    } catch (error) {
      errorLogger("Redis error (get)");
    }

    let cache = await redis.get();

    if (cache) return cache;

    return await makeRequest(url);
  };

  /**
   * @param url Songkick endpoint for festivals
   */
  const makeRequest: MakeRequest = async url => {
    let resultsPage: SongkickResponse;

    try {
      resultsPage = (await axiosInstance.get(url)).data.resultsPage;
    } catch (error) {
      errorLogger("Error with response");
      return {
        page: 1,
        perPage: 50,
        results: { event: [] },
        totalEntries: 0
      };
    }

    try {
      redisService(url).setExpire(resultsPage, 24 * 60 * 60);
    } catch (error) {
      errorLogger("Redis error (set)");
    }

    return resultsPage;
  };

  return {
    async getFestivals() {
      const raw = await asyncAwaitMap(Object.keys(cities), (city: string) => {
        return getPaginated(cities[city]);
      });

      const merged = merge(raw);

      const reduced = merged.map(festival => {
        return {
          date: {
            formatted: formatDate(festival.start.date, festival.end.date),
            end: festival.end,
            start: festival.start
          },
          location: {
            ...festival.location,
            venue: festival.venue.displayName
          },
          name: festival.displayName,
          bands: festival.performance.map((band: any) => band.displayName)
        };
      });

      // const foo = reduced.reduce((carry: any, item: any) => {
      //   const foundName = carry.findIndex((_: any) => _.name === item.name);

      //   if (foundName > -1) {
      //     const foundCity =
      //       carry[foundName].location.city === item.location.city;

      //     if (foundCity) {
      //       carry[foundName].bands.push(...item.bands);
      //       return carry;
      //     }
      //   }

      //   return [...carry, item];
      // }, []);

      return reduced;
    }
  };
};

export default songkickService;
