<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <!--          <b-img-->
          <!--            ref="previewEl"-->
          <!--            rounded-->
          <!--            :src="optionsLocal.avatar"-->
          <!--            height="80"-->
          <!--          />-->
          <feather-icon
            v-if="userDetail.accountType === 'PERSONAL'"
            icon="UserIcon"
            size="80"
          />
          <feather-icon
            v-if="userDetail.accountType === 'COMPANY'"
            icon="HomeIcon"
            size="80"
          />

        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">

      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <validation-observer ref="simpleRules">
      <b-form
        class="mt-2"
        @submit.prevent="validationForm()"
      >
        <b-row>
          <!-- First Name -->
          <b-col sm="6">
            <b-form-group
            :label='$t("general.first_name")'
              label-for="first-name"
            >
              <validation-provider
                #default="{ errors }"
                name="First Name"
                vid="First Name"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.firstName"
                  :state="errors.length > 0 ? false:null"
                  name="firstName"
                  :placeholder='$t("general.first_name")'
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Last Name -->
          <b-col sm="6">
            <b-form-group
            :label='$t("general.last_name")'
              label-for="last-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Last Name"
                vid="Last Name"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.lastName"
                  :state="errors.length > 0 ? false:null"
                  name="lastName"
                  :placeholder='$t("general.last_name")'
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Account Type -->
          <b-col sm="6">
            <b-form-group
            :label='$t("general.account_type")'
              label-for="account-type"
            >
              <validation-provider
                #default="{ errors }"
                name="Account Type"
                vid="Account Type"
                rules="required"
              >
                <b-form-select
                  v-model="userDetail.accountType"
                  :options="$store.state.ProfileSettings.userAccountTypes"
                  name="accountType"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

              <!-- Account Type === Company -->
          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Company Name"
              label-for="account-company"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Name"
                vid="Company Name"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.companyName"
                  :state="errors.length > 0 ? false:null"
                  name="companyName"
                  placeholder="Company name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Company Address"
              label-for="company-address"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Address"
                vid="Company Address"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.companyAddress"
                  :state="errors.length > 0 ? false:null"
                  name="companyAddress"
                  placeholder="Company Address"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Vat Number"
              label-for="vatNumber"
            >
              <validation-provider
                #default="{ errors }"
                name="Vat Number"
                vid="Vat Number"
              >
                <b-form-input
                  v-model="userDetail.vatNumber"
                  :state="errors.length > 0 ? false:null"
                  name="vatNumber"
                  placeholder="Vat Number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Email"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                vid="Email"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.email"
                  :state="errors.length > 0 ? false:null"
                  name="email"
                  placeholder="Email"
                  disabled="disabled"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="userDetail.accountType === 'COMPANY'"
            sm="6"
          >
            <b-form-group
              label="Company Registration Number"
              label-for="company-register-number"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Registration Number"
                vid="Company Registration Number"
                rules="required"
              >
                <b-form-input
                  v-model="userDetail.companyRegistrationNumber"
                  :state="errors.length > 0 ? false:null"
                  name="companyRegistrationNumber"
                  placeholder="Company Registration Number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col sm="6">
            <b-form-group
            :label='$t("companies.country")'
              label-for="country"
            >
              <validation-provider
                #default="{ errors }"
                name="Country"
                vid="Country"
                rules="required"
              >
                <v-select
                  v-model="country"
                  :options="options"
                  :filterBy="(option, label, search)=> {
                    return (option.text || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
                  }"
                  input-id="country"
                  name="country"
                  v-bind:placeholder="$t('register.country_placeholder')"
                  :value="$store.state.selected"
                  :state="errors.length > 0 ? false:null"
                  :clearable="false"
                >
                  <template #selected-option="option">
                    <div style="display: flex; align-items: center; justify-content: left; grid-gap: 8px;">
                      <img :src="getImg(option.src)">
                      {{ option.text }}
                    </div>
                  </template>
                  <template v-slot:option="option">
                      <span style="display: flex; align-items: center; justify-content: left; grid-gap: 8px;">
                        <img :src="getImg(option.src)">  {{ option.text }}
                      </span>
                  </template>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

           <!-- Email Subscription -->
          <b-col sm="6">
            <b-form-group
            :label='$t("general.email_subscription")'
              label-for="marketingConfirmed"
            >
              <validation-provider
                #default="{ errors }"
                name="marketingConfirmed"
                vid="marketingConfirmed"
                rules="required"
              >
              <b-form-checkbox
                  v-model="userDetail.marketingConfirmed"
                  class="custom-control-primary custom-switch-btn-1"
                  name="check-button"
                  switch
                  @change="validationForm()"
                >
                  <span class="switch-icon-left">
                    ON
                  </span>
                  <span class="switch-icon-right">
                    OFF
                  </span>
                </b-form-checkbox>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mt-2 mr-1"
            >
            {{ $t("change_password.save_changes") }}
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              type="reset"
              class="mt-2"
              @click.prevent="resetForm"
            >
             {{ $t("general.reset") }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  BAlert,
  BButton,
  BCard,
  BCardText,
  BCol,
  BForm,
  BFormFile,
  BFormGroup,
  BFormInput,
  BImg,
  BLink,
  BMedia,
  BMediaAside,
  BMediaBody,
  BRow,
  BFormSelect,
  BFormCheckbox
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import axios from '@/libs/axios'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import vSelect from 'vue-select'
// import countries from '@/@fake-db/data/other/countries'
import { confirmed, min, required } from 'vee-validate/dist/rules'

extend('required', required)
extend('min', min)
extend('confirmed', confirmed)

export default {
  components: {
    BButton,
    BForm,
    // eslint-disable-next-line vue/no-unused-components
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BFormSelect,
    BLink,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    vSelect,
    BFormCheckbox
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
      options: [],
      country: null
    }
  },
  created() {
    this.getUserDetail()
    // this.populateCountries()
    // console.log(JSON.parse(localStorage.getItem('userData')).data)
  },
  mounted() {
    this.populateCountries();
  },
  // watch: {
  //   'userDetail.accountType': function (newV, oldV) {
  //     console.log(newV, oldV)
  //   },
  // },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate()
        .then(success => {
          if (success) {
            // eslint-disable-next-line
            this.updateUser()
          }
        })
    },
    getImg(img) {
      // eslint-disable-next-line import/no-unresolved,global-require,no-shadow
      const defaultPath = require('../../../assets/flags/aw.png')
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const path = require(`../../../assets/flags/${img}.png`)
      try {
        return path
      } catch (e) {
        return defaultPath
      }
    },
    resetForm() {
      let resetForm = this.getUserDetail() 
      if(resetForm){
        this.userDetail = this.userDetailLocal 
      }
    },
    async getUserDetail() {
      const data = await axios.get('account/api/user/who-am-i')
      this.userDetail = data.data
      this.userDetailLocal = data.data
      this.country = {
        Country: this.userDetail.isoAlpha2Country,
        value: this.userDetail.isoAlpha2Country,
        text: this.userDetail.country,
        src: this.userDetail.isoAlpha2Country.toLocaleLowerCase(),
      }
      // await this.getUserInfo()
    },
    async getUserInfo() {
      const data = await axios.get(`account/api/user/${this.userDetail.email}`)
    },
    populateCountries() {
      useJwt
        .clientToken()
        .then(res => {
          const token = res.data.access_token
          useJwt
            .countries(token)
            .then(response => {
              // eslint-disable-next-line array-callback-return
              response.data.map((value, key) => {
                this.options.push({
                  Country: value.isoAlpha2Country,
                  value: value.isoAlpha2Country,
                  text: value.country,
                  src: value.isoAlpha2Country.toLocaleLowerCase(),
                })
              })
            })
            .catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error}`,
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                },
              })
            })
        })
        .catch(error => {
          // this.$refs.registerForm.setErrors(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Error fetching profile details`,
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    },
    async updateUser() {
      if (this.userDetail.accountType === 'PERSONAL') {
        this.userDetail.company = ''
        this.userDetail.companyAddress = ''
        this.userDetail.companyRegistrationNumber = ''
        this.userDetail.companyName = ''
        this.userDetail.vatNumber = ''
      }
      this.userDetail.country = this.country?.text
      this.userDetail.isoAlpha2Country = this.country?.value
      const data = await axios.put(`account/api/user/update/${this.userDetail.email}`, this.userDetail)
      if (data.status === 200) {
        this.makeToast('success', 'Success', 'Settings Updated Successfully')
      }
    },
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: false,
      })
    },
  },
  setup() {
    const previewEl = ref(null)
    const userDetailLocal = ref({
      accountType: '',
    })
    const userDetail = ref({
      accountType: '',
    })
    return {
      userDetail,
      previewEl,
      userDetailLocal
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
