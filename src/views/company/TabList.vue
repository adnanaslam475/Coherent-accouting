<template>

    <div class="tabs tabs-hide-print">
      <b-nav tabs align="left">
        <b-nav-item :to="{ name: 'CompanyView', params: { InvoiceId: 0, id: $route.params.companyId }}" :active="invoiceTab !== 0">
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
  