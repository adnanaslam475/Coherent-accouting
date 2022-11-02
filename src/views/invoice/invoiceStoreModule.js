import axios from '@axios'
import useJwt from "@/auth/jwt/useJwt";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchInvoices(ctx, page, perPageValue, queryParams) {
      useJwt
      .clientToken()
      .then((res) => {
        let token = res.data.access_token;
        return new Promise((resolve, reject) => {
          axios
            .get(`/account/api/user-invoice/list/${page}/${perPageValue?perPageValue:10}`, {
              headers: {
                'Authorization': token
              }
            }, { params: queryParams })
            .then((response) =>{
              resolve(response)
            })
            .catch((error) =>{
              reject(error)
            })
        })
      })
      .catch((error) => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `${error.response.data.errorMessage}`,
            icon: "EditIcon",
            variant: "error",
          },
        });
      });
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
