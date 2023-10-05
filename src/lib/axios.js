import axios from "axios";
import { VITE_ACCESS_TOKEN, VITE_API_URL } from "../constants/config";

export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    Authorization: `Bearer ${VITE_ACCESS_TOKEN}`,
  },
});
