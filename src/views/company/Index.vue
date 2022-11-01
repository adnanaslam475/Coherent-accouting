<template>
    <div>
      <b-button to="/company/create" variant="relief-primary" class="float-right mb-1">Add Company</b-button>
      <b-table
      :fields="fields"
      :items="items"
      responsive
      class="mb-0"
    >
      <template #cell(company_name)="data">
        <b-link :to="{name: 'CompanyView', params: {id: data.item.id}}">{{ data.value }}</b-link>
      </template>
      <template #cell(action)>
        <b-button variant="outline-primary" class="btn-icon">
          <feather-icon icon="MoreVerticalIcon" />
        </b-button>
      </template>
    </b-table>
    </div>
</template>
<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable, BProgress, BBadge, BButton, BLink } from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BCardCode,
    BTable,
    BProgress,
    BBadge,
    BButton,
    BLink
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
          id: '1234567',
          Country: 'BG',
          company_name: 'Accounting Software',
          Email: 'accounting@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1234567NHY',
          action: 'Edit/Delete'
        },
        {
          id: '1234568',
          Country: 'EN',
          company_name: 'NodeJs Software',
          Email: 'accounting@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1234567NHY',
          action: 'Edit/Delete'
        },
        {
          id: '1234569',
          Country: 'EN',
          company_name: 'Accounting Software',
          Email: 'accounting@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1234JH7NHY',
          action: 'Edit/Delete'
        },
        {
          id: '1234570',
          Country: 'BG',
          company_name: 'Laravel Software',
          Email: 'laravel@software.com',
          owner_name: 'Ivan Ivonov',
          company_identification_number: 'CVS1254567NHY',
          action: 'Edit/Delete'
        },
        {
          id: '1234571',
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
  methods: {
    // 
  },
  created() {
    // useJwt.clientToken().then(res => {
    //   let token = res.data.access_token
    //   useJwt.companies(token).then(response => {
    //     console.log(response);
    //   }).catch(error => {
    //     // 
    //   })
    // })
  }
}
</script>
<style lang="">
    /*  */
</style>