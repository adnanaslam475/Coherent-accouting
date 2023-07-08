<template>
  <div>
      <b-col cols="12">
        <InvoicesTab />
      </b-col>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import InvoicesTab from './InvoicesTab.vue'

export default {
  components: {
    BRow,
    BCol,
    InvoicesTab,
  },
}
</script>
