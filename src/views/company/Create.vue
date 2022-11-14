<template>
  <div>
    <b-card title="Add New Company" class="mb-2 w-100">
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
                v-model="form.company_name"
                type="text"
                placeholder="Company Name"
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
                v-model="form.company_identification_number"
                type="text"
                placeholder="Company Identification Number"
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
              label="Company Email"
              label-for="company_email"
            >
              <b-form-input
                id="company_email"
                v-model="form.company_email"
                type="email"
                placeholder="Company Email"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-1"
              label="Company Address"
              label-for="company_address"
            >
              <b-form-input
                id="company_address"
                v-model="form.company_address"
                type="text"
                placeholder="Company Address"
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
              label="Country"
              label-for="country"
            >
              <b-form-input
                id="country"
                v-model="form.country"
                type="text"
                placeholder="Country"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-1"
              label="Company Iso Alpha2 Country"
              label-for="companyIsoAlpha2Country"
            >
              <b-form-input
                id="companyIsoAlpha2Country"
                v-model="form.company_iso_country"
                type="text"
                placeholder="Company Iso Alpha2 Country"
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
                v-model="form.owner_name"
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
              label="Owner EGN"
              label-for="owner_egn"
            >
              <b-form-input
                id="owner_egn"
                v-model="form.owner_egn"
                type="text"
                placeholder="Owner EGN"
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
              label="Company Bank Account"
              label-for="company_bank_account"
            >
              <b-form-input
                id="company_bank_account"
                v-model="form.company_bank_account"
                type="text"
                placeholder="Company Bank Account"
                autocomplete="off"
                required
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col>
            <b-form-group
              id="input-group-1"
              label="Company Currency"
              label-for="company_currency"
            >
              <b-form-input
                id="company_currency"
                v-model="form.company_currency"
                type="text"
                placeholder="Company Currency"
                autocomplete="off"
                required
              ></b-form-input> </b-form-group
          ></b-col>
        </b-form-row>
        <b-form-row>
          <b-col
            ><b-form-group
              id="input-group-1"
              label="Company Phone Number"
              label-for="company_phone"
            >
              <b-form-input
                id="company_phone"
                v-model="form.phone_no"
                type="text"
                placeholder="Company Phone #"
                autocomplete="off"
                required
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col
            ><b-form-group
              id="input-group-1"
              label="Company Vat Number"
              label-for="company_vat_no"
            >
              <b-form-input
                id="company_vat_no"
                v-model="form.vat_no"
                type="text"
                placeholder="Company Vat Number"
                autocomplete="off"
                required
              ></b-form-input> </b-form-group
          ></b-col>
        </b-form-row>
        <b-form-row>
          <b-col
            ><b-form-group
              id="input-group-1"
              label="Company Financial Star of Year"
              label-for="company_fin_year"
            >
              <b-form-input
                id="company_fin_year"
                v-model="form.fin_year"
                type="text"
                placeholder="2022-05-19"
                autocomplete="off"
                required
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col></b-col>
        </b-form-row>
        <b-form-row>
          <b-col></b-col>
          <b-col
            ><b-button
              @click="saveCompany()"
              variant="relief-primary"
              class="float-right mb-2"
              >Save</b-button
            ></b-col
          >
        </b-form-row>

        <!-- </b-form> -->
      </b-card-body>
    </b-card>
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
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import axios from "@/libs/axios";
import Swal from "sweetalert2";

export default {
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
  },
  data() {
    return {
      form: {
        company_name: null,
        company_identification_number: null,
        company_email: null,
        company_address: null,
        country: null,
        owner_name: null,
        company_iso_country: null,
        owner_egn: null,
        company_bank_account: null,
        company_currency: null,
        phone_no: null,
        vat_no: null,
        fin_year: null,
      },
      options: [],
    };
  },
  methods: {
    async saveCompany() {
      var data = JSON.stringify({
        //   companyName: "My Company",
        //   companyCountry: "Bulgaria",
        //   companyIsoAlpha2Country: "BG",
        //   companyOwnerApi: {
        //     companyOwnerName: "Ivan",
        //     ownerEGN: "8523155",
        //   },

        //   companyAddress: "Sofia Petar Stanev N5",
        //   companyIdentificationNumber: "12q34775dd6",
        //   companyPhone: "0556412459",
        //   companyMail: "office@abv.bg",
        //   companyBankAccount: "BG123456789",
        //   companyCurrency: "LEV",
        //   companyVatNumber: "123456",
        //   digitalSignature: "",
        //   companyFinancialStartOfYear: "2022-05-19",
        //   vat: true,
        // });

        companyName: this.form.company_name,
        companyCountry: this.form.country,
        companyIsoAlpha2Country: this.form.company_iso_country,
        companyOwnerApi: {
          companyOwnerName: this.form.owner_name,
          ownerEGN: this.form.owner_egn,
        },

        companyAddress: this.form.company_address,
        companyIdentificationNumber: this.form.company_identification_number,
        companyPhone: this.form.phone_no,
        companyMail: this.form.company_email,
        companyBankAccount: this.form.company_bank_account,
        companyCurrency: this.form.company_currency,
        companyVatNumber: this.form.vat_no,
        digitalSignature: "",
        companyFinancialStartOfYear: this.form.fin_year,
        vat: true,
      });

      var config = {
        method: "post",
        url: "/account/api/company/create",
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
            title: "Company Created!",
            showConfirmButton: false,
            timer: 1700,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      setTimeout(() => {
        this.$router.go(-1);
      }, 1740);
    },
    //
    populateCountries() {
      var optionsArr = this;
      useJwt
        .clientToken()
        .then((res) => {
          let token = res.data.access_token;
          useJwt
            .countries(token)
            .then((response) => {
              response.data.map(function (value, key) {
                optionsArr.options.push({
                  value: value.isoAlpha2Country,
                  text: value.country,
                  src: value.isoAlpha2Country.toLocaleLowerCase(),
                });
              });
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `Countries APIs hit successfully`,
                  icon: "EditIcon",
                  variant: "success",
                },
              });
            })
            .catch((error) => {
              //   this.$refs.registerForm.setErrors(error)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error}`,
                  icon: "EditIcon",
                  variant: "error",
                },
              });
            });
        })
        .catch((error) => {
          // this.$refs.registerForm.setErrors(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.errorMessage}`,
              icon: "EditIcon",
              variant: "error",
            },
          });
        });
    },
  },
  created() {
    //
  },
};
</script>

<style lang="scoped">
/*  */
</style>