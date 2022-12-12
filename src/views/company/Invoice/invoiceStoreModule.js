import axios from '@axios'
import useJwt from "@/auth/jwt/useJwt";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchInvoices(ctx, queryParams) {
        let pageNumber = queryParams.currentPage
        let perPageValue = queryParams.perPage
        let companyId = queryParams.companyId

        if(queryParams.q || queryParams.dateFrom || queryParams.dateTo){
          let data = {}
          if(queryParams.dateFrom || queryParams.dateTo){
            data = {
              dateFrom: queryParams.dateFrom,
              dateTo: queryParams.dateTo
            }
          } 
          let config = {
            params: {
              direction: queryParams.direction ? 'desc' : 'asc',
              sortField: queryParams.sortField,
              verified: queryParams.verified,
              searchTerm: queryParams.q
            },
          }
          return new Promise((resolve, reject) => {
            axios
              .post(`/account/api/invoice/search/${companyId}/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`,data, config)
              .then((response) =>{
                resolve(response)
              })
              .catch((error) =>{
                reject(error)
              })
          })

        } else{

          let config = {
            params: {
              direction: queryParams.direction ? 'desc' : 'asc',
              sortField: queryParams.sortField,
              verified: queryParams.verified
            },
          }
          return new Promise((resolve, reject) => {
            axios
              .get(`/account/api/invoice/list/${companyId}/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
              .then((response) =>{
                resolve(response)
              })
              .catch((error) =>{
                reject(error)
              })
          })

        }
    },
    fetchInvoice(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/account/api/invoice/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchClients() {
      return new Promise((resolve, reject) => {
        axios
          .get('/account/api/user-invoice/list/1/20?sortField=id&direction=desc&verified=true')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // addUser(ctx, userData) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post('/apps/user/users', { user: userData })
    //       .then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },
  },
}
