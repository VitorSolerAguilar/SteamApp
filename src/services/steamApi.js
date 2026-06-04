import axios from 'axios';

const BASE_URL = 'https://api.steampowered.com';
const STORE_URL = 'https://store.steampowered.com/api';

export const steamApi = axios.create({
  baseURL: BASE_URL,
});

export const storeApi = axios.create({
  baseURL: STORE_URL,
});