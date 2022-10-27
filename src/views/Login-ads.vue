<template>
    <div class="auth-wrapper auth-v2">
      <b-row class="auth-inner m-0">

        <!-- Brand logo-->
        <!-- <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2>
        </b-link> -->
        <!-- /Brand logo-->

        <b-col
          lg="12"
          sm="12"
          md="12"
          class="p-0"
        >
            <b-navbar toggleable="lg" type="light" variant="light">
                <b-navbar-brand href="#">
                    <div class="d-flex align-item-center">
                        <vuexy-logo />

                        <h2 class="brand-text text-primary ml-1 mb-0">
                            {{ $t("app_logo_title") }}
                        </h2>
                    </div>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="navbar-desktop" type="dark">
                        <b-nav-item href="/login/advertisements">{{$t('lbl.login')}}</b-nav-item>
                        <b-nav-item href="/register/advertisements">{{ $t('lbl.sign_up') }}</b-nav-item>
                        <b-nav-item href="/about">{{ $t("lbl.about") }}</b-nav-item>
                        <b-nav-item href="#">{{ $t("lbl.questions") }}</b-nav-item>
                        <b-nav-item href="#">{{ $t("lbl.videos") }}</b-nav-item>
                        <b-nav-item href="/pricing">{{ $t("lbl.prices") }}</b-nav-item>
                        <b-nav-item href="#">{{ $t("lbl.free_digital_invoices") }}</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </b-col>

        <!-- Left Text-->
        <b-col
          lg="8"
          class="d-none d-lg-flex align-items-center p-5"
        >
          <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <b-img
              fluid
              :src="imgUrl"
              alt="Login V2"
            />
          </div>
        </b-col>
        <!-- /Left Text-->

        <!-- Login-->
        <b-col
          lg="4"
          class="d-flex align-items-center auth-bg px-2 p-lg-5"
        >
          <b-col
            sm="8"
            md="6"
            lg="12"
            class="px-xl-2 mx-auto"
          >
            <b-card-title
              class="mb-1 font-weight-bold"
              title-tag="h2"
            >
                {{ $t("login.title") }}
            </b-card-title>
            <b-card-text class="mb-2">
                {{ $t("login.subtitle") }}
            </b-card-text>



            <!-- form -->
            <validation-observer
              ref="loginForm"
              #default="{invalid}"
            >
              <b-form
                class="auth-login-form mt-2"
                @submit.prevent="login"
              >
                <!-- email -->
                <b-form-group
                  v-bind:label="$t('login.lbl_email')"
                  label-for="login-email"
                >
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('lbl_email')"
                    vid="email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="login-email"
                      v-model="userEmail"
                      :state="errors.length > 0 ? false:null"
                      name="login-email"
                      v-bind:placeholder="$t('login.email_placeholder')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="login-password">{{$t('login.lbl_password')}}</label>
                    <b-link :to="{name:'auth-forgot-password'}">
                      <small>{{ $t("login.lnk_forget_password")}}</small>
                    </b-link>
                  </div>
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('login.lbl_password')"
                    vid="password"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                    >
                      <b-form-input
                        id="login-password"
                        v-model="password"
                        :state="errors.length > 0 ? false:null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="login-password"
                        v-bind:placeholder="$t('login.lbl_password')"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- checkbox -->
                <b-form-group>
                  <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                  >
                      {{ $t('login.remember') }}
                  </b-form-checkbox>
                </b-form-group>

                <!-- submit buttons -->
                <b-button
                  type="submit"
                  variant="primary"
                  block
                  :disabled="invalid"
                >{{ $t('login.sign_in')}}
                </b-button>
              </b-form>
            </validation-observer>

            <b-card-text class="text-center mt-2">
              <span>{{ $t('login.pre_signup_link_txt') }} </span>
              <b-link :to="{name:'register'}">
                <span>&nbsp;{{$t('login.signup_link_txt')}}</span>
              </b-link>
            </b-card-text>

            <!-- divider -->
            <div class="divider my-2">
              <div class="divider-text">
                or
              </div>
            </div>
          </b-col>
        </b-col>
      <!-- /Login-->
      </b-row>
    </div>
  </template>

  <script>
  /* eslint-disable global-require */
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import {
    BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BAlert, VBTooltip, BNavbar, BNavbarBrand, BNavbarToggle, BNavbarNav, BNavForm, BCollapse, BNavItemDropdown, BDropdownDivider, BAvatar, BNavItem
  } from 'bootstrap-vue'
  import useJwt from '@/auth/jwt/useJwt'
  import { required, email } from '@validations'
  import { togglePasswordVisibility } from '@core/mixins/ui/forms'
  import store from '@/store/index'
  import { getHomeRouteForLoggedInUser } from '@/auth/utils'

  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

  export default {
    directives: {
      'b-tooltip': VBTooltip,
    },
    components: {
      BRow,
      BCol,
      BLink,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItemDropdown,BNavForm, BDropdownDivider, BAvatar,BNavItem,
      BInputGroup,
      BFormCheckbox,
      BCardText,
      BCardTitle,
      BImg,
      BForm,
      BButton,
      BAlert,
      VuexyLogo,
      ValidationProvider,
      ValidationObserver,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        status: '',
        password: 'admin',
        userEmail: 'admin@demo.com',
        sideImg: require('@/assets/images/pages/login-v2.svg'),

        // validation rules
        required,
        email,
      }
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
      imgUrl() {
        if (store.state.appConfig.layout.skin === 'dark') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
          return this.sideImg
        }
        return this.sideImg
      },
    },
    methods: {
      login() {
        this.$refs.loginForm.validate().then(success => {
          if (success) {
              useJwt.login({
                grant_type: "password",
                username: this.userEmail,
                password: this.password,
              })
                .then(response => {
                  localStorage.setItem('userData', JSON.stringify(response))
                  this.$toast({
                      component: ToastificationContent,
                      props: {
                      title: `Password Token API hit successfully`,
                      icon: 'EditIcon',
                      variant: 'success',
                      },
                  })
                  return this.$router.push('/')
                })
                .catch(error => {
                  this.$toast({
                      component: ToastificationContent,
                      props: {
                      title: `Incorrect Email or password`,
                      icon: 'EditIcon',
                      variant: 'error',
                      },
                  })
                })
            }
        })
      },
    },
  }
  </script>

  <style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  .navbar-desktop a{
    padding-right: 1rem !important;
    padding-left: 1rem !important;
    color: #6e6b7b !important;
    padding-bottom: 0 !important;
  }
  </style>
