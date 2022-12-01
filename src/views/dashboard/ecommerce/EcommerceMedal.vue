<template>
  <b-card
    v-if="data"
    class="card-congratulation-medal"
  >
    <h5 class="text-lg text-no-wrap font-weight-semibold">Hello {{ data }}! 🎉</h5>

    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="mt-1"
      :to="{ name: 'CreateCompany'}"
    >
      Create Company
    </b-button>
    <b-img
      :src="require('@/assets/images/congo-illustration.png')"
      class="congratulation-medal"
      alt="User Pic"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardText, BLink, BButton, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BImg,
    BButton,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: String,
      default: "",
    },
  },
  methods: {
    kFormatter,
  },
}
</script>
