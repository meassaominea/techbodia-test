import Axios from "axios";
import { ROUTE_API } from "constants/routes";

const RequestUtil = Axios.create({
  baseURL: ROUTE_API.root,
});

// // Add a request interceptor
RequestUtil.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = '"*/*"';

  return config;
});

// Add a response interceptor
RequestUtil.interceptors.response.use(
  async function (res) {
    return res;
  },
  function (err) {
    const res = err.response?.data;
    if (!res) {
      return Promise.reject(err);
    }
    return Promise.reject(res);
  }
);

export default RequestUtil;
