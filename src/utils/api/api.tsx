import axios, { AxiosError, AxiosRequestConfig } from "axios";

console.log(process.env.NEXT_PUBLIC_API_URL);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.setItem(
        "toast_message",
        JSON.stringify({
          title: "Session ended",
          description: "Please sign in again.",
          variant: "destructive",
        })
      );
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
