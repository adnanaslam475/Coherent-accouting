import axios from 'axios'
import useJwt from "@/auth/jwt/useJwt";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams, pageNumber, perPageValue) {
      let token = useJwt.getToken()
      let axiosUser = axios.create({
        baseURL: 'http://167.86.93.80:8765',
      })
      let config = {
        headers: {'Authorization': "Bearer "+token},
        params: {
          direction: queryParams.direction,
          sortField: queryParams.sortField,
        },
      }
      return new Promise((resolve, reject) => {
        axiosUser
          .get(`/account/api/user-person/list/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/user/users/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/user/users', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
