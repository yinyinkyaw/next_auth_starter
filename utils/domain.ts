import axios from "axios";
import { api_url } from "./constants";

export const apiInstnace = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const endpoints = {
  auth: {
    authorize: "/oauth/authorize",
    getToken: "/oauth/token",
  },
  notes: {
    list: "/notes",
    create: "/notes/create",
  },
};
