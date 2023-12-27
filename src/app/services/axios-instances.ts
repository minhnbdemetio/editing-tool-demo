import axios from 'axios';

export const onpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ONP_API_ENDPOINT,
});

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
