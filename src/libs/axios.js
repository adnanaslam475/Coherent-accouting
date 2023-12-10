import Vue from "vue";

// axios
import axios from "axios";

const axiosIns = axios.create({
  // You can add your headers heres
  // ================================
  // baseURL: 'https://coherent-accounting.com',
  baseURL: "https://167.86.93.80",
  // headers: {'X-Custom-Header': 'foobar'}
});

Vue.prototype.$http = axiosIns;

export default axiosIns;
