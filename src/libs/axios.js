import Vue from "vue";

// axios
import axios from "axios";

const axiosIns = axios.create({
  // You can add your headers heres
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  baseURL: "https://coherent-accounting.com",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

axiosIns.interceptors.response.use(
  response => {
    try {
      if (typeof response.data === "string") {
        // eslint-disable-next-line no-param-reassign
        response.data = JSON.parse(response.data);
      }
    } catch {
      /* empty */
    }

    return response;
  },
  error => Promise.reject(error)
);

Vue.prototype.$http = axiosIns;

export default axiosIns;
