<template>
        <!--  -->
        <div class="misc-inner p-sm-2"> 
      <div class="w-100 text-center">
        <h2 class="mb-0">
          Coming soon 🚀
        </h2>
        <p class="mb-0">
          We're creating something awesome. 
        </p>

        <b-img
          fluid
          :src="imgUrl"
          alt="Coming soon page"
        />
      </div>
    </div>
</template>

<script>
import {
  BLink, BForm, BFormInput, BButton, BImg,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
    components: {
    VuexyLogo,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/coming-soon.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/coming-soon-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>