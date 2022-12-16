<template>

    <div class="tabs tabs-hide-print">
      <b-nav tabs align="left">
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 0, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="BriefcaseIcon" />
          Company Info
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 1, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FileTextIcon" />
          Invoices
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 2, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FileIcon" />
          Multiple Upload
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 3, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FlagIcon" />
          Vat Reports
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 4, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FlagIcon" />
          Yearly Reports
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 5, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="FolderIcon" />
          Documents
        </b-nav-item>
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 6, id: $route.params.companyId }}" :active="invoiceTab !== 0">
          <feather-icon icon="UserIcon" />
          Private Persons
        </b-nav-item>
      </b-nav>
    </div>
  </template>
  
  <script>
  import BCardCode from "@core/components/b-card-code";
  import { BTabs, BTab, BCardText, BNav,BNavItem  } from "bootstrap-vue";
  
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
      };
    },
  };
  </script>
  <style>
  .invoice-tabs-view ul.nav-tabs {
    justify-content: center;
  }
  </style>
  