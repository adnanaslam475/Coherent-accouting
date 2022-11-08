<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            :src="optionsLocal.avatar"
            height="80"
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
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
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
            <b-form-input
              v-model="userDetail.accountType"
              placeholder="Account Type"
              name="accountType"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="company Address"
            label-for="company-address"
          >
            <b-form-input
              v-model="userDetail.companyAddress"
              name="companyAddress"
              placeholder="Company Address"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="company Name"
            label-for="company-name"
          >
            <b-form-input
              v-model="userDetail.companyName"
              name="companyName"
              placeholder="Company Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
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
            label="Country"
            label-for="country"
          >
            <b-form-input
              v-model="userDetail.country"
              name="country"
              placeholder="Country"
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
            />
          </b-form-group>
        </b-col>
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
            label="GDPR"
            label-for="gdpr"
          >
            <b-form-input
              v-model="userDetail.gdpr"
              name="gdpr"
              placeholder="gdpr"
            />

          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Identifier"
            label-for="identifier"
          >
            <b-form-input
              v-model="userDetail.identifier"
              name="identifier"
              placeholder="Identifier"
            />

          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Ip Address"
            label-for="ip-address"
          >
            <b-form-input
              v-model="userDetail.ipAddress"
              name="ipAddress"
              placeholder="Ip Address"
            />

          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="ISO Country"
            label-for="iso-alpha-2-country"
          >
            <b-form-input
              v-model="userDetail.isoAlpha2Country"
              name="text"
              placeholder="ISO Country"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Identifier"
            label-for="identifier"
          >
            <b-form-input
              v-model="userDetail.identifier"
              name="identifier"
              placeholder="Identifier"
            />

          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="Company"
            label-for="account-company"
          >
            <b-form-input
              v-model="optionsLocal.company"
              name="company"
              placeholder="Company name"
            />
          </b-form-group>
        </b-col>

        <!-- alert -->
        <b-col
          cols="12"
          class="mt-75"
        >
          <b-alert
            show
            variant="warning"
            class="mb-50"
          >
            <h4 class="alert-heading">
              Your email is not confirmed. Please check your inbox.
            </h4>
            <div class="alert-body">
              <b-link class="alert-link">
                Resend confirmation
              </b-link>
            </div>
          </b-alert>
        </b-col>
        <!--/ alert -->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
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
            @click.prevent="resetForm"
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
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import axios from '@/libs/axios'

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
    }
  },
  methods: {
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
    async getUserDetail() {
      const data = await axios.get('account/api/user/who-am-i')
      this.userDetail = data.data
      console.log(data.data)
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const userDetail = ref({})

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      userDetail,
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
  created() {
    this.getUserDetail()
  },
}
</script>
