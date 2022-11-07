import axios from 'axios'
import useJwt from "@/auth/jwt/useJwt";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchInvoices(ctx, queryParams, pageNumber, perPageValue) {
        let token = useJwt.getToken()
        let axiosInvoice = axios.create({
          baseURL: 'http://167.86.93.80:8765',
        })

        let config = {
          headers: {'Authorization': "Bearer "+token},
          params: {
            direction: queryParams.direction ? 'desc' : 'asc',
            sortField: queryParams.sortField,
            verified: queryParams.verified
          },
        }
        return new Promise((resolve, reject) => {
          axiosInvoice
            .get(`/account/api/user-invoice/list/${pageNumber?pageNumber:1}/${perPageValue?perPageValue:10}`, config)
            .then((response) =>{
              resolve(response)
            })
            .catch((error) =>{
              reject(error)
            })
        })
    },
    fetchInvoice(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/invoice/invoices/${id}`)
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
