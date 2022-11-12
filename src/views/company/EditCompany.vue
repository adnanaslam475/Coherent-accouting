<template>
  <div>
    <div class="media mb-2">
      <div class="media-aside align-self-start">
        <span
          class="b-avatar badge-light-danger rounded"
          style="width: 90px; height: 90px"
          ><span class="b-avatar-img">
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg> </span
          ><!----></span
        >
      </div>
      <div class="media-body">
        <h4 class="mb-1" style="margin-top: 5px">
          {{ this.companyRecord.companyName }}
        </h4>
        <div class="d-flex flex-wrap">
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCompanyInfo"
          >
            <input type="file" class="d-none" /><span class="d-none d-sm-inline"
              >Update </span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              height="14px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="d-inline d-sm-none feather feather-edit"
            >
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              ></path>
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              ></path>
            </svg></button
          ><b-link @click="goBack()">
            <button type="button" class="btn ml-1 btn-outline-secondary">
              <span class="d-none d-sm-inline">Remove</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="14px"
                height="14px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="d-inline d-sm-none feather feather-trash"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </button>
          </b-link>
        </div>
      </div>
    </div>

    <b-card-body>
      <!-- <b-form @submit="saveCompany()"> -->
      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Company Name"
            label-for="company_name"
          >
            <b-form-input
              id="company_name"
              type="text"
              placeholder="Company Name"
              autocomplete="off"
              v-model="getCompanyName"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Company Email"
            label-for="company_email"
          >
            <b-form-input
              id="company_email"
              v-model="getCompanyEmail"
              type="email"
              placeholder="Company Email"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Company Address"
            label-for="company_address"
          >
            <b-form-input
              id="company_address"
              v-model="getCompanyAddress"
              type="text"
              placeholder="Company Address"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-1" label="Country" label-for="country">
            <b-form-input
              id="country"
              v-model="getCompanyCountry"
              type="text"
              placeholder="Country"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Owner Name"
            label-for="owner_name"
          >
            <b-form-input
              id="owner_name"
              v-model="getCompOwnerName"
              type="text"
              placeholder="Owner Name"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Company Identification Number"
            label-for="company_identification_number"
          >
            <b-form-input
              id="company_identification_number"
              v-model="getCompanyID"
              type="text"
              placeholder="Company Identification Number"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <!-- <b-button type="submit" variant="relief-primary" class="float-right">Save</b-button> -->
        </b-col>
      </b-form-row>
      <!-- </b-form> -->
    </b-card-body>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BcardText,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRow,
  BCol,
  BLink,
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import axios from "@/libs/axios";
import Swal from "sweetalert2";

export default {
  name: "EditCompany",
  components: {
    BCard,
    BcardText,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormRow,
    BCol,
    BCardBody,
    BLink,
  },
  data() {
    return {
      companyRecord: [],
      getCompanyName: "",
      getCompanyEmail: "",
      getCompanyAddress: "",
      getCompanyCountry: "",
      getCompOwnerName: "",
      getCompanyID: "",
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },

    //update companyInfo
    async updateCompanyInfo() {
      var data = JSON.stringify({
        companyAddress: this.getCompanyAddress,
        companyCountry: this.getCompanyCountry,
        companyIdentificationNumber: this.getCompanyID,
        companyMail: this.getCompanyEmail,
        companyName: this.getCompanyName,

        companyBankAccount: this.companyRecord.companyBankAccount,
        companyCurrency: this.companyRecord.companyCurrency,
        companyFinancialStartOfYear:
          this.companyRecord.companyFinancialStartOfYear,
        companyIsoAlpha2Country: this.companyRecord.companyIsoAlpha2Country,

        companyOwnerApi: {
          companName: this.companyRecord.companyOwnerApi.companName,
          companyAddress: this.companyRecord.companyOwnerApi.companyAddress,
          companyEic: this.companyRecord.companyOwnerApi.companyEic,

          companyOwnerName: this.getCompOwnerName,
          companyVatEic: this.companyRecord.companyOwnerApi.companyVatEic,
          ownerEGN: this.companyRecord.companyOwnerApi.ownerEGN,
        },
        companyPhone: this.companyRecord.companyPhone,
        companyVatAccepted: this.companyRecord.companyVatAccepted,
        companyVatNumber: this.companyRecord.companyVatNumber,
        id: this.companyID,
      });

      var config = {
        method: "put",
        url: "/account/api/company/update/" + this.companyID,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
        data: data,
      };

      await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Record Updated!",
            showConfirmButton: false,
            timer: 1700,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      setTimeout(() => {
        this.$router.go(-1);
      }, 1720);

      // const data = await axios.put(`/account/api/company/update/` + this.companyID, {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
      //     "Access-Control-Allow-Credentials": true,
      //     'Content-Type': 'application/json',
      //     "Access-Control-Allow-Origin": "http://localhost:8080",
      //   },
      //   data:({
      //       "companyAddress": this.getCompanyAddress,
      //       "companyCountry": this.getCompanyCountry,
      //       "companyIdentificationNumber": this.getCompanyID,
      //       "companyMail": this.getCompanyEmail,
      //       "companyName": this.getCompanyName,

      //       "companyBankAccount": this.companyRecord.companyBankAccount,
      //       "companyCurrency": this.companyRecord.companyCurrency,
      //       "companyFinancialStartOfYear":
      //         this.companyRecord.companyFinancialStartOfYear,
      //       "companyIsoAlpha2Country": this.companyRecord.companyIsoAlpha2Country,

      //       "companyOwnerApi": {
      //         "companName": this.companyRecord.companyOwnerApi.companName,
      //         "companyAddress": this.companyRecord.companyOwnerApi.companyAddress,
      //         "companyEic": this.companyRecord.companyOwnerApi.companyEic,

      //         "companyOwnerName": this.getCompOwnerName,
      //         "companyVatEic": this.companyRecord.companyOwnerApi.companyVatEic,
      //         "ownerEGN": this.companyRecord.companyOwnerApi.ownerEGN,
      //       },
      //       "companyPhone": this.companyRecord.companyPhone,
      //       "companyVatAccepted": this.companyRecord.companyVatAccepted,
      //       "companyVatNumber": this.companyRecord.companyVatNumber,
      //       "id": this.companyID,

      //   }),
      // });
    },

    //getting company info
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
        this.getCompanyName = this.companyRecord.companyName;
        this.getCompanyEmail = this.companyRecord.companyMail;
        this.getCompanyAddress = this.companyRecord.companyAddress;
        this.getCompanyCountry = this.companyRecord.companyCountry;
        this.getCompOwnerName =
          this.companyRecord.companyOwnerApi.companyOwnerName;
        this.getCompanyID = this.companyRecord.companyIdentificationNumber;
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

<style lang="scoped">
/*  */
</style>