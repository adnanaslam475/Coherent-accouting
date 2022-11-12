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
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          Upload
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept=".jpg, .png, .gif"
          :hidden="true"
          plain
          @input="inputImageRenderer"
        />
        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75"
          @click="getUserDetail()"
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form @submit.prevent="updateUser()" class="mt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="First Name"
            label-for="first-name"
          >
            <b-form-input
              v-model="userDetail.firstName"
              name="firstName"
              placeholder="First Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Last Name"
            label-for="last-name"
          >
            <b-form-input
              v-model="userDetail.lastName"
              name="lastName"
              placeholder="Last Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
              label="Account Type"
              label-for="account-type"
          >
            <b-form-select
                v-model="userDetail.accountType"
                :options="$store.state.ProfileSettings.userAccountTypes"
                name="accountType"
            />
          </b-form-group>
        </b-col>

        <b-col v-if="userDetail.accountType === 'COMPANY'" sm="6">
          <b-form-group
              label="Company Name"
              label-for="account-company"
          >
            <b-form-input
                v-model="optionsLocal.company"
                name="company"
                placeholder="Company name"
            />
          </b-form-group>
        </b-col>
        <b-col v-if="userDetail.accountType === 'COMPANY'" sm="6">
          <b-form-group
              label="Company Address"
              label-for="company-address"
          >
            <b-form-input
                v-model="userDetail.companyAddress"
                name="companyAddress"
                placeholder="Company Address"
            />
          </b-form-group>
        </b-col>
        <b-col v-if="userDetail.accountType === 'COMPANY'" sm="6">
          <b-form-group
              label="Company Registration Number"
              label-for="company-register-number"
          >
            <b-form-input
                v-model="userDetail.companyRegistrationNumber"
                name="companyRegistrationNumber"
                placeholder="Company Registration Number"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
              label="email"
              label-for="email"
          >
            <b-form-input
                v-model="userDetail.email"
                name="email"
                placeholder="Email"
                disabled="disabled"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
              label="password"
              label-for="password"
          >
            <b-form-input
                type="password"
                v-model="userDetail.password"
                name="password"
                placeholder="Password"
                required
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
              label="Country"
              label-for="country"
          >
            <v-select
                v-model="userDetail.country"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="countries"
                :clearable="false"
                input-id="country"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
              label="Country"
              label-for="register-country"
          >
<!--            <validation-provider-->
<!--                #default="{ errors }"-->
<!--                name="country"-->
<!--                vid="country"-->
<!--            >-->
<!--              <v-select-->
<!--                  id="register-country"-->
<!--                  :options="countries"-->
<!--                  :filter-by="(option, label, search)=> {-->
<!--                  return (option.text || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1-->
<!--                }"-->
<!--                  :label="$t('register.lbl_country')"-->
<!--                  name="country"-->
<!--                  :placeholder="$t('register.country_placeholder')"-->
<!--                  :value="$store.state.selected"-->
<!--                  :state="errors.length > 0 ? false:null"-->
<!--              >-->
<!--                <template #selected-option="option">-->
<!--                  <div style="display: flex; align-items: center; justify-content: left; grid-gap: 8px;">-->
<!--                    <img :src="getImg(option.src)">-->
<!--                    {{ option.text }}-->
<!--                  </div>-->
<!--                </template>-->
<!--                <template v-slot:option="option">-->
<!--                  <span style="display: flex; align-items: center; justify-content: left; grid-gap: 8px;">-->
<!--                    <img :src="getImg(option.src)">  {{ option.text }}-->
<!--                  </span>-->
<!--                </template>-->
<!--              </v-select>-->
<!--              <small class="text-danger">{{ errors[0] }}</small>-->
<!--            </validation-provider>-->
          </b-form-group>
        </b-col>
        <!-- alert -->
<!--        <b-col-->
<!--            cols="12"-->
<!--            class="mt-75"-->
<!--        >-->
<!--          <b-alert-->
<!--              show-->
<!--              variant="warning"-->
<!--              class="mb-50"-->
<!--          >-->
<!--            <h4 class="alert-heading">-->
<!--              Your email is not confirmed. Please check your inbox.-->
<!--            </h4>-->
<!--            <div class="alert-body">-->
<!--              <b-link class="alert-link">-->
<!--                Resend confirmation-->
<!--              </b-link>-->
<!--            </div>-->
<!--          </b-alert>-->
<!--        </b-col>-->
        <!--/ alert -->

        <b-col cols="12">
          <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mt-2 mr-1"
          >
            Save changes
          </b-button>
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              type="reset"
              class="mt-2"
              @click="getUserDetail()"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
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
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import axios from '@/libs/axios'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'

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
    }
  },
  created() {
    this.getUserDetail()
    // this.populateCountries()
    // console.log(JSON.parse(localStorage.getItem('userData')).data)
  },
  // watch: {
  //   'userDetail.accountType': function (newV, oldV) {
  //     console.log(newV, oldV)
  //   },
  // },
  methods: {
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
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
    async getUserDetail() {
      const data = await axios.get('account/api/user/who-am-i')
      this.userDetail = data.data
      // await this.getUserInfo()
    },
    async getUserInfo() {
      const data = await axios.get(`account/api/user/${this.userDetail.email}`)
      console.log('getUserInfo ', data.data)
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
                this.countries.push({
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
                  icon: 'EditIcon',
                  variant: 'error',
                },
              })
            })
        })
        .catch(error => {
          // this.$refs.registerForm.setErrors(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.errorMessage}`,
              icon: 'EditIcon',
              variant: 'error',
            },
          })
        })
    },
    async updateUser() {
      if (this.userDetail.accountType === 'PERSONAL') {
        this.userDetail.company = ''
        this.userDetail.companyAddress = ''
        this.userDetail.companyRegistrationNumber = ''
      }
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
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const userDetail = ref({
      accountType: '',
    })

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      countries,
      userDetail,
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
