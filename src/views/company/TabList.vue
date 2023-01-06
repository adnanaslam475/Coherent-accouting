<template>

    <div class="tabs tabs-hide-print">
      <b-nav tabs align="left" style="font-size: 0.8vw !important">
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 0, id: $route.params.companyId }}" :active="invoiceTab !== 0" >
          <feather-icon icon="BriefcaseIcon" />
          {{ $t('lbl.company_info') }}
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 1, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FileTextIcon" />
          {{ $t('invoices') }}
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 2, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FileIcon" />
          {{ $t('company_tabs.multiple_upload') }}
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 3, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FlagIcon" />
          {{ $t('company_tabs.vat_reports') }}
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 4, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FlagIcon" />
          {{ $t('company_tabs.yearly_reports') }}
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 5, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FolderIcon" />
          {{ $t('company_tabs.company_documents') }}
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 6, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="UserIcon" />
          {{ $t('company_tabs.clients_or_recipients') }}
        </b-nav-item>
        <b-nav-item class="ml-auto">
          <span>
            <h4 style="color: #0a64bc; font-size: 1vw;">
              <b>{{ companyName }}</b>
            </h4></span
          >         
        </b-nav-item>

      </b-nav>
    </div>
  </template>
  
  <script>
  import BCardCode from "@core/components/b-card-code";
  import { BTabs, BTab, BCardText, BNav,BNavItem  } from "bootstrap-vue";
  import axios from "@/libs/axios";


  export default {
    components: {
      BCardCode,
      BCardText,
      BTabs,
      BTab,
      BNav,
      BNavItem
    },
    data() {
      return {
        invoiceTab: 0,
        companyNameLength: "",
        companyName: "",
        companyID: "",
      };
    },
    created() {
    this.companyID = this.$route.params.companyId;
    this.getCompanyInfo();
    },
    methods:{
      async getCompanyInfo() {
      const data = await axios.get(`/account/api/company/${this.companyID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      });
      if (data.status === 200) {
        let companyRecord = data.data;
        this.companyName = companyRecord.companyName;
        this.companyNameLength = this.companyName.length;
       
      }
    },
    }
  };
  </script>
  <style>
  .invoice-tabs-view ul.nav-tabs {
    justify-content: center;
  }

  /* .nav-tabs .nav-link{
    padding: 0.61rem 0.8rem !important;
  } */

  .nav-tabs .nav-link {
  padding: 0.36rem 0.65rem 0.47rem;
}

  .nav-tabs .nav-link svg {
    margin-right: 0.3rem;
}
  </style>
  