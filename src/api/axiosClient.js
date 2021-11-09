import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  header: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { status, config, data } = error.response;
    const urls = ['/auth/local', '/auth/local/register'];
    if (status === 400 && urls.includes(config.url)) {
      const lstData = data.data || [];
      const dataItem = lstData.length > 0 ? lstData[0] : {};
      const messages = dataItem.messages || [];
      const messageItem = messages.length > 0 ? messages[0] : {};
      throw new Error(messageItem.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
