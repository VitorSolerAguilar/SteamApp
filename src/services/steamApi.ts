import axios from 'axios';

export const steamApi = axios.create({
  baseURL: 'https://api.steampowered.com',
});

export const storeApi = axios.create({
  baseURL: 'https://store.steampowered.com/api',
});