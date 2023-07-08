import axios from '@axios'
import useJwt from "@/auth/jwt/useJwt";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {

      let pageNumber = queryParams.currentPage
      let perPageValue = queryParams.perPage
      
      if(queryParams.q){
        let config = {
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
            searchTerm: queryParams.q
          },
        }
        return new Promise((resolve, reject) => {
          axios
            .get(`/account/api/user-person/search/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      } else{
        let config = {
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
          },
        }
        return new Promise((resolve, reject) => {
          axios
            .get(`/account/api/user-person/list/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      }

    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/account/api/user-person/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/account/api/user-person/create`, userData )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
