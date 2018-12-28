import axios from 'axios';

const baseUrl = 'http://localhost:2000';

const songkickBackendClient = () => {
  const instance = axios.create();

  const fetchFestivals = (top, similar) => {
    const url = `${baseUrl}/songkick`;
    return instance.post(url, { top, similar });
  };

  return {
    fetchFestivals,
  };
};

export default songkickBackendClient;
