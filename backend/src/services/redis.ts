import redis from "redis";

const host = process.env.REDIS_HOST || "redis";
const auth = process.env.REDIS_AUTH || "";
const port = process.env.REDIS_PORT || "6379";

const client = redis.createClient(port, { host });

if (auth !== "") {
  client.auth(auth);
}

client.on("connect", () => {
  console.log(":: Redis client connected with " + host);
});

client.on("error", (error: any) => {
  console.log(":: Something went wrong " + error);
});

type SongkickResponse = {
  page: number;
  perPage: number;
  results: { event: any };
  totalEntries: number;
};

export type RedisService = (key: string) => RedisServiceReturn;

export type RedisServiceReturn = {
  get: () => Promise<SongkickResponse>;
  setExpire: (data: any, time: number) => void;
  del: () => void;
  incr: () => void;
  client: any;
};

export const redisService: RedisService = key => {
  return {
    get() {
      return new Promise((resolve, reject) => {
        client.get(key, (error: any, result: any) => {
          resolve(JSON.parse(result));
        });
      });
    },
    setExpire(data, time) {
      client.set(key, JSON.stringify(data));
      client.expire(key, time);
    },
    del() {
      client.del(key);
    },
    incr() {
      client.incr("api");
    },
    client
  };
};

export default redisService;
