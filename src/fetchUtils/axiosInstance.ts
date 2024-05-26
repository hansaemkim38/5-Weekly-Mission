import axios from "axios";
import { getAccessToken } from "../utils/constants";

const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr",
});

instance.interceptors.request.use((configOrigin) => {
  const config = configOrigin;
  const token = getAccessToken();

  if (config.headers && token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("400 에러");
          break;
        case 401:
          console.error("401 에러");
          break;
        case 402:
          console.error("402 에러");
          break;
        case 403:
          console.error("403 에러");
          break;
        case 404:
          console.error("404 에러");
          break;
        case 409:
          console.error("409 에러");
          break;
        case 500:
          console.error("500 에러");
          break;
        default:
          console.error(`에러 - ${error.response.status}`);
      }
    } else if (error.request) {
      console.error("서버로부터 응답이 없습니다.");
    } else {
      console.error("요청중에 에러가 발생 했습니다.");
    }

    return Promise.reject(error);
  }
);

export default instance;
