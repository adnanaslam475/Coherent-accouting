<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="4"
        md="6"
      >
        <ecommerce-medal :data="data.congratulations.name" />
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BCard, BCardText, BLink, BRow, BCol } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import EcommerceMedal from './dashboard/ecommerce/EcommerceMedal.vue'
import EcommerceStatistics from './dashboard/ecommerce/EcommerceStatistics.vue'
import axios from '@/libs/axios'
export default {
  components: {
    BCard,
    BCardText,
    BRow, 
    BCol,
    BLink,
    EcommerceMedal,
    EcommerceStatistics
  },
  data() {
    return {
      data: {
        statisticsItems: {},
        congratulations: {}
      },
    }
  },
  created() {
    // data
   
    this.$http.get('/account/api/dashboard/total-entities-count')
      .then(response => {
        this.$http.get('account/api/user/who-am-i')
          .then(res => {
            const userData = res.data
            this.data.statisticsItems = response.data
            this.data.congratulations.name = userData.firstName + " " + userData.lastName
          })        
      })
  }
}
</script>

<style>

</style>
