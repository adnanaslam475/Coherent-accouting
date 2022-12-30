<template>

  <b-col
    lg="12"
    sm="12"
    md="12"
    class="p-0"
  >
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      style="padding: 1.5rem;"
      class="dark-bg-color"
    >
      <b-navbar-brand href="#">
        <div class="d-flex align-items-center">
          <b-link
              class="navbar-brand d-flex align-items-center"
              :to="{name : 'why-choose-us'}"
          >
            <span class="brand-logo nav-logo">
              <b-img
                :src="appLogoImage"
                alt="logo"
              />
            </span>
            <h2 class="brand-text mb-0">
              {{ appName }}
            </h2>
          </b-link>
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav
          class="navbar-desktop"
          type="dark"
        >
          <b-nav-item href="/login">
            {{ $t("navbar.login") }}
          </b-nav-item>
          <b-nav-item href="/register">
            {{ $t("navbar.signup") }}
          </b-nav-item>
          <b-nav-item href="/about">
            {{ $t("navbar.about") }}
          </b-nav-item>
          <b-nav-item href="/questions">
            {{ $t("navbar.questions") }}
          </b-nav-item>
          <b-nav-item href="/videos/advertisement">
            {{ $t("navbar.videos") }}
          </b-nav-item>
          <b-nav-item href="/pricing">
            {{ $t("navbar.prices") }}
          </b-nav-item>
          <b-nav-item href="/free-digital-invoices">
            {{ $t("navbar.free_digital_invoices") }}
          </b-nav-item>
          <b-nav-item href="/why-choose-us">
            {{ $t("navbar.why_choose_use") }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-col>
</template>
<script>
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { $themeConfig } from '@themeConfig'
import {
  BRow,
  BCol,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BCollapse,
  BNavItem,
  BNavbarToggle,
  BImg,
  BLink
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BCollapse,
    BNavItem,
    BNavbarToggle,
    VuexyLogo,
    BImg,
    BLink
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
.navbar-desktop a{
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  color: #6e6b7b !important;
  padding-bottom: 0 !important;
}
.brand-text {
    color: #0A64BC !important;
    font-weight: 600;
    letter-spacing: 0.01rem;
    font-size: 1.45rem;
    animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
}
.brand-logo.nav-logo{
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
}
.navbar-brand .brand-logo img {
    max-width: 36px;
}
.dark-layout .dark-bg-color {
    background-color: #283046 !important;
}
.dark-layout .navbar-collapse ul li a{
color: #d0d2d6 !important;
}
</style>
