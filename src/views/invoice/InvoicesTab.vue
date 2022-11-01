<template>
    <b-card-code>
      <b-tabs v-model="invoiceTab">
        <b-tab>
          <template #title>
            <feather-icon icon="BookOpenIcon" />
            <span>List Invoices</span>
          </template>
          <ListInvoices :invoiceTab="invoiceTab" @state="update($event)"  />

        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="PenToolIcon" />
            <span>Create Invoice</span>
          </template>
          <AddInvoice />
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="UsersIcon" />
            <span>Private Persons</span>
          </template>
  
        </b-tab>
      </b-tabs>
  
      <template #code>
        {{ codeIcon }}
      </template>
    </b-card-code>
  </template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import { BTabs, BTab, BCardText } from 'bootstrap-vue'
  import { codeIcon } from './code'
  import ListInvoices from './invoice-list/InvoiceList.vue'
  import AddInvoice from './invoice-add/InvoiceAdd.vue'
  export default {
    components: {
      BCardCode,
      BCardText,
      BTabs,
      BTab,
      ListInvoices,
      AddInvoice
    },
    data() {
      return {
        codeIcon,
        invoiceTab: 0,
      }
    },
    methods: {
        update(value) {
            console.log("value",value)
            this.invoiceTab = value;
        }
    }
  }
  </script>
  