import axios from 'axios';

const baseUrl = 'https://api.spotify.com/v1/me';

const spotifyClient = () => {
  const instance = token =>
    axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      json: true,
    });

  return {
    next({ token }) {
      const url = `${baseUrl}/player/next`;
      return instance(token).post(url);
    },
    play({ token, band }) {
      const url = `${baseUrl}/player/play`;
      return instance(token).put(url, { context_uri: band.uri });
    },
    me({ token }) {
      const url = `${baseUrl}`;
      return instance(token).get(url);
    },
    topArtists({ token }) {
      const endpoint = 'top/artists';
      const url = `${baseUrl}/${endpoint}?limit=100&time_range=medium_term`;
      return instance(token).get(url);
    },
  };
};

export default spotifyClient;
