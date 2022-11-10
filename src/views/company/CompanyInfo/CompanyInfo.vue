<template>
  <div>
    <div class="row">
      <div class="col-md-7 col-lg-8 col-xl-9 col-12">
        <div class="card">
          <!----><!---->
          <div class="card-body">
            <!----><!---->
            <div class="row">
              <div
                class="
                  d-flex
                  justify-content-between
                  flex-column
                  col-xl-6 col-21
                "
              >
                <div class="d-flex justify-content-start">
                  <span
                    class="b-avatar badge-light-danger rounded"
                    style="width: 104px; height: 104px"
                    ><span class="b-avatar-img">
                      <!-- <span style="font-size: 4rem">{{ this.companyRecord.companyName.substr(0,1)}}{{ this.companyRecord.companyName.substr(this.companyRecord.companyName.indexOf(" ")+1,1)}}</span> -->

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="104px"
                        height="104px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg> 
                    </span>
                     

                      <!-- <img
                        src="/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/1.9cba4a79.png"
                        alt="avatar" /> --> </span>
                  
                  <div class="d-flex flex-column ml-1">
                    <div class="mb-1">
                      <h4 class="mb-0">{{ this.companyRecord.companyName }}</h4>
                      <span class="card-text">{{
                        this.companyRecord.companyMail
                      }}</span>
                    </div>
                    <div class="d-flex flex-wrap">
                      <!-- <a
                        href="/demo/vuexy-vuejs-admin-dashboard-template/demo-1/apps/users/edit/21"
                        class="btn btn-primary"
                        target="_self"
                      > --> <b-link :to="{ name: 'EditCompany', params: { id: this.companyRecord.id } }"  class="btn btn-primary">Edit </b-link>
                        
                      <button
                        type="button"
                        class="btn ml-1 btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center mt-2">
                  <!-- <div class="d-flex align-items-center mr-2">
                    <span class="b-avatar badge-light-primary rounded"
                      ><span class="b-avatar-custom"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-dollar-sign"
                        >
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path
                            d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                          ></path></svg></span
                      ></span
                    >
                    <div class="ml-1">
                      <h5 class="mb-0">23.3k</h5>
                      <small>Monthly Sales</small>
                    </div>
                  </div> -->
                  <!-- <div class="d-flex align-items-center">
                    <span class="b-avatar badge-light-success rounded"
                      ><span class="b-avatar-custom"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-trending-up"
                        >
                          <polyline
                            points="23 6 13.5 15.5 8.5 10.5 1 18"
                          ></polyline>
                          <polyline
                            points="17 6 23 6 23 12"
                          ></polyline></svg></span
                      ></span
                    >
                    <div class="ml-1">
                      <h5 class="mb-0">$99.87k</h5>
                      <small>Annual Profit</small>
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="col-xl-6 col-12">
                <table class="mt-2 mt-xl-0 w-100">
                  <tr>
                    <th class="pb-50">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        height="14px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-75 feather feather-user"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span class="font-weight-bold">Owner Name</span>
                    </th>
                    <td class="pb-50">
                      {{ this.companyRecord.companyOwnerApi.companyOwnerName }}
                    </td>
                  </tr>
                  <tr>
                    <th class="pb-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        height="14px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-75 feather feather-star"
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        ></polygon>
                      </svg>
                      <span class="font-weight-bold">Role</span>
                    </th>
                    <td class="pb-50 text-capitalize">admin</td>
                  </tr>
                  <tr>
                    <th class="pb-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        height="14px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-75 feather feather-flag"
                      >
                        <path
                          d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                        ></path>
                        <line x1="4" y1="22" x2="4" y2="15"></line>
                      </svg>
                      <span class="font-weight-bold">Country</span>
                    </th>
                    <td class="pb-50">
                      {{ this.companyRecord.companyCountry }}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        height="14px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-75 feather feather-phone"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        ></path>
                      </svg>
                      <span class="font-weight-bold">Contact</span>
                    </th>
                    <td>{{ this.companyRecord.companyPhone }}</td>
                  </tr>
                  <tr>
                    <th>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        height="14px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-75 feather feather-globe"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path
                          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                        ></path>
                      </svg>
                      <span class="font-weight-bold">Address</span>
                    </th>
                    <td>{{ this.companyRecord.companyAddress }}</td>
                  </tr>
                  <tr></tr>
                </table>
              </div>
            </div>
          </div>
          <!----><!---->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/libs/axios";
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BProgress,
} from "bootstrap-vue";

export default {
  components: {
    
    BTable,
    BProgress,
    BBadge,
    BButton,
    BLink,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
  },
  data() {
    return {
      companyID: "",
      companyRecord: [],
    };
  },

  //
  methods: {
    async getCompanyInfo() {
      const data = await axios.get(`/account/api/company/` + this.companyID, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      });

      if (data.data != "") {
        this.companyRecord = data.data;
      }
    },
  },

  created: function () {
    this.companyID = this.$route.params.id;
    // console.log(this.companyID);
    this.getCompanyInfo();
  },
};
</script>

<style scoped>
.rounded {
    border-radius: 0.6rem !important;
}
</style>