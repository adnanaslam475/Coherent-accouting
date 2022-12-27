<template>

  <div class="tabs tabs-hide-print">
    <b-nav tabs align="center">
      <b-nav-item :to="{ name: 'invoices', params: { id: 0 }}" :active="invoiceTab !== 0">
        <feather-icon icon="BookOpenIcon" />
        {{ $t('lbl.list_invoices') }}
      </b-nav-item>
      <!-- <b-nav-item :to="{ name: 'invoices', params: { id: 1 }}" :active="invoiceTab !== 0">
        <feather-icon icon="PenToolIcon" />
        Create Invoice
      </b-nav-item> -->
      <b-nav-item :to="{ name: 'invoices', params: { id: 2 }}" :active="invoiceTab !== 0">
        <feather-icon icon="UsersIcon" />
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
