<template>
    <div>
        <b-row class="auth-inner m-0">
            <navbarAds />
        </b-row>
              <!-- search input -->
      <section id="free-digital-invoices">
        <b-card
          no-body
          class="knowledge-base-bg text-center"
          :style="{backgroundImage: `url(${require('@/assets/images/banner/banner.png')})`}"
        >
          <b-card-body class="card-body">
            <h2 class="text-primary">
              {{ $t('free_digital_invoices.title')}}
            </h2>
          </b-card-body>
        </b-card>
      </section>
      <!--/ search input -->
      <section id="freeDigitalInvoices-content">
  
      <!-- collapse -->
      <b-row class="kb-search-content-info match-height m-0">
        <b-col
            md="12"
            sm="12"
          >
      <b-list-group class=" mt-2 px-2 ">      
        <b-list-group-item             
            v-for="item in freeDigitalInvoices"
            :key="item.list"
            class="d-flex"
        >
            <span class="mr-1">
            <feather-icon
                icon="CheckIcon"
                size="16"
            />
            </span>
            <span>{{ $t(`${item.list}`)}}</span>
        </b-list-group-item>
      </b-list-group>
      </b-col>
      </b-row>
    </section>
      <!--/ collapse -->
    </div>
  </template>
  
  <script>
  import { BAvatar } from 'bootstrap-vue'
  import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
  import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
  import VuexyLogo from "@core/layouts/components/Logo.vue";
  import navbarAds from "./navbarAds.vue"
  import {
    BRow, BCol, BCard, BCardBody, BForm, BInputGroup, BFormInput, BCardText, BInputGroupPrepend,BListGroup,BListGroupItem
  } from 'bootstrap-vue'
  export default {
    components: {
      BAvatar,
      AppCollapseItem,
      AppCollapse,
      navbarAds,
      BRow,
      BCol,
      BCard,
      BCardBody,
      BCardText,
      BForm,
      BInputGroup,
      BInputGroupPrepend,
      BFormInput,
      navbarAds,
      BListGroup,
      BListGroupItem
    },
    props: {
      options: {
        type: Object,
        default: () => {},
      },
    },
    data() {
        return{
            freeDigitalInvoices: [
                { list: `free_digital_invoices.label_fdi_1` },
                { list: `free_digital_invoices.label_fdi_2` },
                { list: `free_digital_invoices.label_fdi_3` },
                { list: `free_digital_invoices.label_fdi_4` },
                { list: `free_digital_invoices.label_fdi_5` },
                { list: `free_digital_invoices.label_fdi_6` }
            ]
        }
    }
  }
</script>
  <style lang="scss">
  @import "@core/scss/vue/pages/page-auth.scss";
  @import '@core/scss/vue/pages/page-knowledge-base.scss';
 </style>
  