<template>
    <div></div>
</template>
<script>
import { BCard, BCardText } from 'bootstrap-vue'
import axios from 'axios'

export default {
  components: {
    BCard,
    BCardText,
  },
  created() {
    let uri = "http://167.86.93.80:8881/api/company/list/1/10";
    axios.get(uri, {
        			headers: {
        				"Accept": "application/json",
        			 	"Authorization": `Bearer ${localStorage.getItem('user_token')}`
        			}
    }).then(response => {
      console.log(response);
    }).catch(error => {
      // 
    })
  }
}
</script>
<style lang="">
    /*  */
</style>