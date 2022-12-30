<template>
  <div>
    <b-row class="m-0">
      <b-col
        lg="4"
        md="6"
        sm="12"
        cols="12"
        v-for="(item,index) in $t('videos_content')"
        :key="item.index"
      >
        <embed-types :item="item" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BRow, BCol, BCard, BCardBody,
} from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import EmbedTypes from '@/views/EmbedTypes'
// eslint-disable-next-line import/extensions
import navbarAds from '@/views/navbarAds'

export default {
  components: {
    EmbedTypes,
    BRow,
    BCol,
    BCard,
    BCardBody,
    navbarAds,
  }
}
</script>
<style lang="">
/*  */
</style>
