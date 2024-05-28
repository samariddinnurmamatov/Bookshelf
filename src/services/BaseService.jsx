import axios from "axios";
import appConfig from "../configs/app.config";
import { TOKEN } from "../constants/app.constant";

const sign = localStorage.getItem(TOKEN);

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
  headers: { Authorization: sign ? `Bearer ${sign}` : "" },
});

export default BaseService;
