import axios from "axios";
import useJwt from "@/auth/jwt/useJwt";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCompanyInvoice(ctx, { id }) {
      let token = useJwt.getToken();
      let axiosInvoice = axios.create({
        baseURL: "https://coherent-accounting.com",
      });
      let config = {
        headers: { Authorization: "Bearer " + token },
      };
      return new Promise((resolve, reject) => {
        axiosInvoice
          .get(`/account/api/invoice/${id}`, config)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
};
