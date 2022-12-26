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
      let companyId = queryParams.companyId

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
            .get(`/account/api/person/search/${companyId}/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
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
            .get(`/account/api/person/list/${companyId}/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      }

    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/account/api/person/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/account/api/person/create/${queryParams.id}`, queryParams.userData )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
