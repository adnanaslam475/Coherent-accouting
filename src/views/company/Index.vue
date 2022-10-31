<template>
    <div></div>
</template>
<script>
import { BCard, BCardText } from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCard,
    BCardText,
  },
  created() {
    useJwt.companies().then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
<style lang="">
    /*  */
</style>