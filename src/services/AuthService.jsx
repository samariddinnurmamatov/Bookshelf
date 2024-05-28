import axios from "axios";
import CryptoJS from "crypto-js";
import appConfig from "../configs/app.config";

const { apiPrefix } = appConfig;
const localStorageKey = "key";
const localStorageSecret = "secret";

const generateSignature = ({ method, url, data, secret }) =>
  CryptoJS.MD5(method + url + (data?.secret ? "" : data || "") + secret).toString();

const updateHeaders = (config) => {
  const { method, url, data, headers } = config;
  const key = localStorage.getItem(localStorageKey) || headers.key || "";
  const secret = localStorage.getItem(localStorageSecret) || data.secret || "";

  if (method && url && url !== "/signup") {
    config.headers = {
      ...config.headers,
      key,
      sign: generateSignature({ method: method.toUpperCase(), url, data, secret }),
    };
  } else {
    localStorage.setItem(localStorageSecret, data?.secret || "");
    localStorage.setItem(localStorageKey, data?.key || "");
  }

  return config;
};

axios.interceptors.request.use(
  (config) => {
    config.baseURL = apiPrefix;
    return updateHeaders(config);
  },
  (error) => Promise.reject(error)
);

export default axios;
