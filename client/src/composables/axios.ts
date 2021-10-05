import axios, { AxiosInstance } from "axios";

export default function useAxios(baseURL ?:string):AxiosInstance {
  const api: AxiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: baseURL || " ",
  });


  return api;
}
