import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers heres
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  baseURL: 'http://167.86.93.80:8765',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
