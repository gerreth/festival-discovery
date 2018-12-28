import axios from 'axios';

const baseUrl = 'http://localhost:1000';

const backendClient = () => {
  const instance = axios.create();

  const fetchTopBands = ({ token, userId }) => {
    const url = `${baseUrl}/bands/top/${userId}?token=${token}`;
    return instance.get(url);
  };

  const fetchSimilarBands = ({ token, topBandIds, userId }) => {
    const url = `${baseUrl}/bands/similar/${userId}?token=${token}`;
    return instance.post(url, { topBandIds });
  };

  const getAuth = ({ code }) => {
    const url = `${baseUrl}/auth/spotify/?code=${code}&redirect_uri=http://localhost:3000/callback`;
    return instance.get(url);
  };

  const play = ({ band, userId }) => {
    const url = `${baseUrl}/bands/play/${userId}/${band.uri}`;
    return instance.post(url, { band });
  };

  const next = ({ userId }) => {
    const url = `${baseUrl}/bands/next/${userId}`;
    return instance.post(url);
  };

  return {
    fetchTopBands,
    fetchSimilarBands,
    getAuth,
    next,
    play,
  };
};

export default backendClient;
