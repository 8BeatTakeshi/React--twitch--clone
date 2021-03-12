import axios from 'axios';

let api = axios.create({
  headers: {
    'Client-ID': process.env.REACT_APP_TWITCH_API_KEY,
    Authorization: process.env.REACT_APP_TWITCH_API_TOKEN,
  },
});

export default api;
