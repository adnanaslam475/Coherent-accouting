<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <navbarAds />

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1">
            {{ $t("register.title") }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t("register.subtitle") }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm" #default="{ invalid }">
            <b-form class="auth-register-form mt-2" @submit.prevent="register">
              <!-- username -->
              <b-form-group
                v-bind:label="$t('register.lbl_f_name')"
                label-for="register-firstname"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_f_name')"
                  vid="firstname"
                  rules="required"
                >
                  <b-form-input
                    id="register-firstname"
                    v-model="firstname"
                    name="register-firstname"
                    :state="errors.length > 0 ? false : null"
                    v-bind:placeholder="$t('register.lbl_f_name')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group
                v-bind:label="$t('register.lbl_l_name')"
                label-for="register-lastname"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_f_name')"
                  vid="lastname"
                  rules="required"
                >
                  <b-form-input
                    id="register-lastname"
                    v-model="lastname"
                    name="register-lastname"
                    :state="errors.length > 0 ? false : null"
                    v-bind:placeholder="$t('register.lbl_f_name')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- Company -->
              <b-form-group
                :label="$t('register.lbl_c_accountType')"
                label-for="register-accountType"
              >
                <validation-provider
                  #default="{ errors }"
                  name="accountType"
                  vid="accountType"
                  rules="required"
                >
                  <b-form-select
                    v-model="account"
                    id="register-accountType"
                    name="register-accountType"
                    :state="errors.length > 0 ? false : null"
                  >
                    <b-form-select-option value="" disabled selected>{{
                      $t("register.select_account")
                    }}</b-form-select-option>
                    <b-form-select-option value="COMPANY">{{
                      $t("register.company")
                    }}</b-form-select-option>
                    <b-form-select-option value="PERSONAL">{{
                      $t("register.personal")
                    }}</b-form-select-option>
                  </b-form-select>

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <div v-if="account === 'COMPANY'">
                <b-form-group
                  v-bind:label="$t('register.lbl_c_name')"
                  label-for="register-companyName"
                >
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('register.lbl_f_name')"
                    vid="companyName"
                    rules="required"
                  >
                    <b-form-input
                      id="register-companyName"
                      v-model="companyName"
                      name="register-companyName"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('register.lbl_c_name')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group
                  v-bind:label="$t('register.lbl_c_address')"
                  label-for="register-companyAddress"
                >
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('register.lbl_c_address')"
                    vid="companyAddress"
                    rules="required"
                  >
                    <b-form-input
                      id="register-companyAddress"
                      v-model="companyAddress"
                      name="register-companyAddress"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('register.lbl_c_address')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group
                  v-bind:label="$t('register.lbl_c_registrationNumber')"
                  label-for="register-registrationNumber"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="registrationNumber"
                    vid="registrationNumber"
                    rules="required"
                  >
                    <b-form-input
                      id="register-registrationNumber"
                      v-model="registrationNumber"
                      name="register-registrationNumber"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="
                        $t('register.lbl_c_registrationNumber')
                      "
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group
                  v-bind:label="$t('register.lbl_c_vatNumber')"
                  label-for="register-vatNumber"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="vatNumber"
                    vid="vatNumber"
                    rules="required"
                  >
                    <b-form-input
                      id="register-vatNumber"
                      v-model="vatNumber"
                      name="register-vatNumber"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('register.lbl_c_vatNumber')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </div>

              <!-- email -->
              <b-form-group
                v-bind:label="$t('register.lbl_email')"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_email')"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false : null"
                    v-bind:placeholder="$t('register.email_placeholder')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                v-bind:label="$t('register.lbl_password')"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_password')"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      @change="
                        () => {
                          passErr = '';
                        }
                      "
                      @blur="passErrHandler()"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ passErr || errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group label="Country" label-for="register-country">
                <validation-provider
                  #default="{ errors }"
                  name="country"
                  vid="country"
                  rules="required"
                >
                  <v-select
                    v-model="country"
                    :options="countries"
                    :filterBy="
                      (option, label, search) => {
                        return (
                          (option.text || '')
                            .toLocaleLowerCase()
                            .indexOf(search.toLocaleLowerCase()) > -1
                        );
                      }
                    "
                    v-bind:label="$t('register.lbl_country')"
                    id="register-country"
                    name="country"
                    v-bind:placeholder="$t('register.country_placeholder')"
                    :value="$store.state.selected"
                    :state="errors.length > 0 ? false : null"
                  >
                    <template #selected-option="option">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: left;
                          grid-gap: 8px;
                        "
                      >
                        <img :src="getImg(option.src)" />
                        {{ option.text }}
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <span
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: left;
                          grid-gap: 8px;
                        "
                      >
                        <img :src="getImg(option.src)" /> {{ option.text }}
                      </span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="gdpr"
                  name="checkbox-1"
                  >{{ $t("register.i_agree_to") }}
                  <b-link v-b-modal.modal-scrollable>
                    {{ $t("register.lbl_privacy_term_link") }}
                  </b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid || loading || !gdpr"
              >
                <b-spinner v-if="loading" small variant="light" />
                {{ $t("register.lbl_submit") }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>{{ $t("register.have_account") }}</span>
            <b-link :to="{ name: 'login' }">
              <span>&nbsp;{{ $t("register.lbl_login_link") }}</span>
            </b-link>
          </p>

          <!-- divider -->
        </b-col>
      </b-col>
    </b-row>
    <b-modal
      id="modal-scrollable"
      scrollable
      :title="$t('lbl.termofuse')"
      cancel-title="Close"
      ok-title="Accept"
      cancel-variant="outline-secondary"
      centered
      size="lg"
      @ok="gdpr = true"
    >
      <b-card-text style="height: 400px">
        <span style="white-space: break-spaces">
          <p>
            {{ $t("lbl.termofuseone") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            {{ $t("lbl.termofusetwo") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.termofusethree") }}</li>
          </ul>
          <p>
            {{ $t("lbl.text_one") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            {{ $t("lbl.text_two") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            {{ $t("lbl.text_three") }}
          </p>

          <ul>
            <li class="p-list">{{ $t("lbl.gt") }}</li>
          </ul>
          <p>
            <b> {{ $t("lbl.ar1") }}</b
            >{{ $t("lbl.means") }}
          </p>
          <p>
            {{ $t("lbl.textdev") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >{{ $t("lbl.textdev1") }}<br />
            {{ $t("lbl.textdev2") }} <br />

            {{ $t("lbl.textdev3") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >{{ $t("lbl.throughtext") }}
            <a href="https://accounting.controlisy.bg">
              https://accounting.controlisy.bg</a
            >{{ $t("lbl.onwhich") }} <br />

            {{ $t("lbl.webbased") }}
            <a href="https://coherent-accounting.com/about">
              https://coherent-accounting.com/about</a
            >.
          </p>

          <p>
            <b> {{ $t("lbl.ar1") }} 2</b>{{ $t("lbl.devrights") }}<br />
            {{ $t("lbl.asits") }}
            <br />
            {{ $t("lbl.in_case") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 3</b> {{ $t("lbl.the_dev") }}
          </p>

          <p>
            <b> {{ $t("lbl.ar1") }} 4</b> {{ $t("lbl.devp") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 5</b>{{ $t("lbl.devpp") }}
          </p>

          <p>
            <b> {{ $t("lbl.ar1") }} 6</b>{{ $t("lbl.hasright") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 7</b>{{ $t("lbl.terminate") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 9</b>
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 10</b>{{ $t("lbl.natural") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 11</b> {{ $t("lbl.obliged") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 12</b>{{ $t("lbl.event") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 13</b> {{ $t("lbl.copyright") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 14</b>{{ $t("lbl.registering") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.regss") }}</li>
          </ul>
          <p>
            {{ $t("lbl.reset") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 15</b>{{ $t("lbl.objto") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 16</b>{{ $t("lbl.usercan") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 17</b> {{ $t("lbl.upon") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 18</b> {{ $t("lbl.tick") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 19</b>{{ $t("lbl.agrees") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 20</b> {{ $t("lbl.makes") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 21</b> {{ $t("lbl.declares") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 22</b> {{ $t("lbl.active") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.limits") }}</li>
          </ul>
          <p>
            <b> {{ $t("lbl.ar1") }} 23</b>{{ $t("lbl.responsible") }}
            <a href="https://coherent-accounting.com/about"
              >https://coherent-accounting.com/about</a
            >
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 24</b>{{ $t("lbl.not") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 25</b>{{ $t("lbl.not") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.othert") }} </li>
          </ul>
          <p>
            <b> {{ $t("lbl.ar1") }} 26</b>{{ $t("lbl.dispute") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 27</b>{{ $t("lbl.publish") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 28</b>{{ $t("lbl.tries") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 29</b>{{ $t("lbl.guarantee") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 30</b>{{ $t("lbl.relation") }}
          </p>
        </span>
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import vSelect from "vue-select";

import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BDropdown,
  BDropdownItem,
  BFormSelect,
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BNavForm,
  BCollapse,
  BNavItemDropdown,
  BDropdownDivider,
  BAvatar,
  BNavItem,
  BSpinner,
  BModal,
  BFormSelectOption,
} from "bootstrap-vue";
import { required, email, password } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";

import navbarAds from "./navbarAds.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    VuexyLogo,
    BRow,

    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BDropdown,
    BFormSelect,
    BDropdownItem,
    BFormInput,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItemDropdown,
    BNavForm,
    BDropdownDivider,
    BAvatar,
    BNavItem,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    vSelect,
    navbarAds,
    BSpinner,
    BModal,
    BFormSelectOption,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      firstname: "",
      lastname: "",
      userEmail: "",
      password: "",
      gdpr: false,
      companyName: "",
      country: "",
      ipAddress: "",
      isoAlpha2Country: "",
      companyAddress: "",
      vatNumber: "",
      registrationNumber: "",
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      required,
      email,
      selected: null,
      passErr: "",
      country: null,
      account: null,
      countries: [],
      accountType: [
        { value: null, text: "Please select account type", disabled: true },
        { value: "COMPANY", text: "COMPANY" },
        { value: "PERSONAL", text: "PERSONAL" },
      ],
      loading: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    passErrHandler() {
      console.log("sssssssss");
      if (this.password.length && this.password.length < 8) {
        this.passErr = "Password length must be greater than or equal to 8";
      }
    },
    register() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.loading = true;
          if (this.password.length && this.password.length < 8) {
            this.passErr = "Password length must be greater than or equal to 8";
          }
          useJwt
            .clientToken()
            .then((res) => {
              let token = res.data.access_token;
              useJwt
                .getIpAddress()
                .then((res) => {
                  let IpAddress = res?.data?.ip;
                  useJwt
                    .register(token, {
                      firstName: this.firstname,
                      lastName: this.lastname,
                      email: this.userEmail,
                      password: this.password,
                      accountType: this.account,
                      companyAddress:
                        this.account == "COMPANY" ? this.companyAddress : "",
                      companyName:
                        this.account == "COMPANY" ? this.companyName : "",
                      companyRegistrationNumber:
                        this.account == "COMPANY"
                          ? this.registrationNumber
                          : "",
                      vatNumber:
                        this.account == "COMPANY" ? this.vatNumber : "",
                      country: this.country?.text,
                      gdpr: this.gdpr,
                      identifier: "",
                      ipAddress: IpAddress,
                      isoAlpha2Country: this.country?.value,
                    })
                    .then((response) => {
                      this.loading = false;
                      return this.$router.push({ name: "verify-email" });
                    })
                    .catch((error) => {
                      this.loading = false;
                      this.$toast({
                        component: ToastificationContent,
                        props: {
                          title: `${error.response.data.errorMessage}`,
                          icon: "EditIcon",
                          variant: "error",
                        },
                      });
                    });
                })
                .catch((error) => {
                  this.loading = false;
                });
            })
            .catch((error) => {
              this.loading = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error.errorMessage}`,
                  icon: "EditIcon",
                  variant: "error",
                },
              });
            });
        }
      });
    },
    getImg(img) {
      let defaultPath = require("../assets/flags/aw.png");
      let path = require("../assets/flags/" + img + ".png");
      try {
        return path;
      } catch (e) {
        return defaultPath;
      }
    },
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
                optionsArr.countries.push({
                  Country: value.isoAlpha2Country,
                  value: value.isoAlpha2Country,
                  text: value.country,
                  src: value.isoAlpha2Country.toLocaleLowerCase(),
                });
              });
            })
            .catch((error) => {
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
  mounted() {
    this.populateCountries();
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.p-list {
  font-size: 1vw;
  color: #0a64bc;
  font-weight: bold;
}

.navbar-desktop a {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  color: #6e6b7b !important;
  padding-bottom: 0 !important;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.v-select {
  margin-top: 3px !important;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
    color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}
</style>
