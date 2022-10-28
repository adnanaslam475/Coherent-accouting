<template>
    <div>
    
    <b-row class="auth-inner m-0">
        <navbarAds />
    </b-row>
              <!-- search input -->
    <section id="videos">
    <b-card
        no-body
        class="knowledge-base-bg text-center"
        :style="{backgroundImage: `url(${require('@/assets/images/banner/banner.png')})`}"
    >
        <b-card-body class="card-body">
        <h2 class="text-primary">
            {{ $t('videos')}}
        </h2>
        </b-card-body>
    </b-card>
    </section>
    <!--/ search input -->
   
    <b-row class="m-0">
      <b-col md="6" sm="12">
        <embed-types />
      </b-col>
      <b-col md="6" sm="12">
        <embed-types />
      </b-col>
    </b-row>
    </div>
  </template>
  
  <script>
  import { BRow, BCol, BCard, BCardBody } from 'bootstrap-vue'
  import EmbedTypes from './EmbedTypes.vue'
  import navbarAds from "./navbarAds.vue"
  export default {
    components: {
      EmbedTypes,
      BRow,
      BCol,
      BCard,
      BCardBody,
      navbarAds
    },
  }
  </script>
<style lang="scss">
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>
  