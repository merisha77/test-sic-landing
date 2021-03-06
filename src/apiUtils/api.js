import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    if (typeof window !== "undefined")
      if (response?.data?.access) {
        window.localStorage.setItem("token", response?.data?.access);
      }
    return response;
  },
  (error) => {
    const { response } = error;
    if (typeof window !== "undefined")
      if (response?.status === 401) {
        window.localStorage.removeItem("token");
        window.location.pathname = "/";
      }
    return Promise.reject(error);
  }
);

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined")
    if (!!window.localStorage.getItem("token"))
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

export const del = (url) => http.delete(url);

export const get = ({ url }) => http.get(url);

export const put = ({ url, data }) => http.put(url, data);

export const post = ({ url, data }) => http.post(url, data);

export const patch = ({ url, data }) => http.patch(url, data);
