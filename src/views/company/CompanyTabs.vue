<template>
  <!-- Company Tabs -->
    <b-col>  
      <b-card style="padding: 0px;" id="main-card-body">
        <b-tabs v-model="companyTab">
          <b-tab>
            <template #title>
              <feather-icon icon="BriefcaseIcon"/>
              <span style="font-size: 13px">Company Info</span>
            </template>
            <div
                style="
              height: 30px;
              background-color: #f6f6f6;
              margin-right: -21px;
              margin-left: -21px;
            "
            />
            <CompanyInfo
                :company-tab="companyTab"
                @state="update($event)"
                style=" background-color: #f6f6f6;"
            />
          </b-tab>
  
          <b-tab>
            <template #title>
              <feather-icon icon="FileTextIcon"/>
              <span style="font-size: 13px">Invoices</span>
            </template>
            <Invoice/>
          </b-tab>
          <b-tab>
            <template #title>
              <feather-icon icon="FlagIcon"/>
              <span style="font-size: 13px">Yearly Reports</span>
            </template>
            <YearlyReport/>
          </b-tab>
  
          <b-tab>
            <template #title>
              <feather-icon icon="FlagIcon"/>
              <span style="font-size: 13px">Vat Reports</span>
            </template>
            <YearlyReport/>
          </b-tab>
  
          <b-tab>
            <template #title>
              <feather-icon icon="FileIcon"/>
              <span style="font-size: 13px">Not Verified Invoices</span>
            </template>
            <NotVerifiedInvoice/>
          </b-tab>
  
          <b-tab>
            <template #title>
              <feather-icon icon="FolderIcon"/>
              <span style="font-size: 13px">Documents</span>
            </template>
            <Document/>
          </b-tab>
  
          <b-tab>
            <template #title>
              <feather-icon icon="UserIcon"/>
              <span style="font-size: 13px">Private Persons</span>
            </template>
            <Document/>
          </b-tab>
        </b-tabs>
  
        <template #code>
          {{ codeIcon }}
        </template>
      </b-card>
    </b-col>
  </template>
  
  <script>
  import BCardCode from '@core/components/b-card-code'
  import { BTabs, BTab, BCardText, BCol, BCard } from 'bootstrap-vue'
  import CompanyInfo from './CompanyInfo/CompanyInfo.vue'
  import Invoice from './Invoice/Invoice.vue'
  import VATMonthReport from './VATMonthReports/VATMonthReport.vue'
  import YearlyReport from './YearlyReports/YearlyReport.vue'
  import NotVerifiedInvoice from './Invoice/NotVerifiedInvoice.vue'
  import Document from './Documents/Document.vue'
  import PrivatePersons from './PrivatePersons/PrivatePerson.vue'
  import { codeIcon } from './code'
  
  export default {
    components: {
      BCol,
      BCardCode,
      CompanyInfo,
      Invoice,
      VATMonthReport,
      YearlyReport,
      NotVerifiedInvoice,
      Document,
      BTabs,
      BTab,
      PrivatePersons,
      BCardText,
      BCard,
    },
    data() {
      return {
        codeIcon,
        companyTab: 0,
      }
    },
    methods: {
      update(value) {
        this.companyTab = value
      },
    },
  }
  </script>
  
  <style lang="scss">
  //
  .nav-tabs .nav-link {
    padding: 0.47rem 0.78rem;
    padding-top: 0.36rem;
  }
  
  .card-body {
    padding-bottom: 0rem;
  }
  #main-card-body .card-body{
    padding: 0px;
  }
  </style>
  