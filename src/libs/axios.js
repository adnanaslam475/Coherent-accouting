import Vue from "vue";

// axios
import axios from "axios";
import { getCookieValue } from "@/auth/utils";

const axiosIns = axios.create({
  // You can add your headers heres
  // ================================
  // baseURL: 'https://coherent-accounting.com',
  baseURL: "https://167.86.93.80",
  // headers: {'X-Custom-Header': 'foobar'}
  withCredentials: true,
  headers: {
    "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
  },
});

Vue.prototype.$http = axiosIns;

export default axiosIns;
