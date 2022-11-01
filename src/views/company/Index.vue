<template>
    <div>
      <b-row>
        <b-button to="/company/create" variant="relief-primary" class="float-right mb-1">Add Company</b-button>
      </b-row>
      <b-table
      :fields="fields"
      :items="items"
      responsive
      class="mb-0"
    >
      <!-- A virtual composite column -->
      <template #cell(action)>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="default" class="btn-icon">
          <feather-icon icon="MoreVerticalIcon" />
        </b-button>
      </template>
    </b-table>
    </div>
</template>
<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable, BProgress, BBadge, BButton } from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCardCode,
    BTable,
    BProgress,
    BBadge,
    BButton,
  },
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        'Country',
        // A column that needs custom formatting
        { key: 'company_name', label: 'Company Name' },
        'Email',
        // A regular column
        { key: 'owner_name', label: 'Owner Name' },
        // A regular column
        { key: 'company_identification_number', label: 'Company Identification Number' },
        // A virtual column made up from two fields
        { key: 'action', label: 'Action' },
      ],
      items: [
        {
          Country: 'BG',
          company_name: 'Accounting Software',
          Email: 'accounting@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1234567NHY',
          action: 'Edit/Delete'
        },
        {
          Country: 'EN',
          company_name: 'NodeJs Software',
          Email: 'accounting@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1234567NHY',
          action: 'Edit/Delete'
        },
        {
          Country: 'EN',
          company_name: 'Accounting Software',
          Email: 'accounting@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1234JH7NHY',
          action: 'Edit/Delete'
        },
        {
          Country: 'BG',
          company_name: 'Laravel Software',
          Email: 'laravel@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1254567NHY',
          action: 'Edit/Delete'
        },
        {
          Country: 'EN',
          company_name: 'VueJs Software',
          Email: 'vue@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS12877NHY',
          action: 'Edit/Delete'
        }
      ],
    }
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