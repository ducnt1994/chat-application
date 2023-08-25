import axios from "axios";
import Auth from "../auth/auth";
import Cookies from "js-cookie";

function getAuthToken() {
  return window.localStorage.getItem("accessToken") ?? "";
}

const API = axios.create({
  baseURL: process.env.REACT_APP_URL_API + "api/v1",
});

API.interceptors.request.use((config: any) => {
  config.headers = {
    ...(config.headers ?? {}),
    Authorization: `Bearer ${getAuthToken()}`,
  };
  return { ...config };
});

API.interceptors.response.use(response => response, async error => {
  const status = error.response ? error.response.status : null
  // Access Token was expired
  if (status === 401) {
    return Auth.refreshToken().then(res => {
      error.config.headers['Authorization'] = 'Bearer ' + getAuthToken();
      return API(error.config);
    });
  }
  if (status === 400) {
    return error.response;
  }
  return Promise.reject(error);
}
);

export { API };
