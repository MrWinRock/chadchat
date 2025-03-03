import axios from "axios";
import { API_URL } from "../config/apiUrl";

const url = API_URL;

const api = axios.create({
  baseURL: url,
});

export const socketUrl = url;

export default api;
