<template>
  <b-card-code>
    <b-tabs v-model="companyTab">
      <b-tab>
        <template #title>
          <feather-icon icon="BriefcaseIcon" />
          <span style="font-size: 13px">Company Info</span>
        </template>
        <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div>
        <CompanyInfo :companyTab="companyTab" @state="update($event)" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FileTextIcon" />
          <span style="font-size: 13px">Invoices</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <Invoice />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="DollarSignIcon" />
          <span style="font-size: 13px">Create Invoice</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <VATMonthReport />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 13px">Yearly Reports</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <YearlyReport />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 13px">Vat Reports</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <YearlyReport />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FileIcon" />
          <span style="font-size: 13px">Not Verified Invoices</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <NotVerifiedInvoice />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span style="font-size: 13px">Documents</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <Document />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span style="font-size: 13px">Private Persons</span>
        </template>
        <!-- <div
          style="
            height: 30px;
            background-color: #f6f6f6;
            margin-right: -21px;
            margin-left: -21px;
          "
        ></div> -->
        <Document />
      </b-tab>
    </b-tabs>

    <template #code>
      {{ codeIcon }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import CompanyInfo from "./CompanyInfo/CompanyInfo.vue";
import Invoice from "./Invoice/Invoice.vue";
import VATMonthReport from "./VATMonthReports/VATMonthReport.vue";
import YearlyReport from "./YearlyReports/YearlyReport.vue";
import NotVerifiedInvoice from "./Invoice/NotVerifiedInvoice.vue";
import Document from "./Documents/Document.vue";
import PrivatePersons from "./PrivatePersons/PrivatePerson.vue";
import { codeIcon } from "./code";
import { BTabs, BTab, BCardText } from "bootstrap-vue";

export default {
  components: {
    BCardCode,
    CompanyInfo,
    Invoice,
    VATMonthReport,
    YearlyReport,
    NotVerifiedInvoice,
    Document,
    PrivatePersons,
    BTabs,
    BTab,
    BCardText,
  },
  data() {
    return {
      codeIcon,
      companyTab: 0,
    };
  },
  methods: {
    update(value) {
      this.companyTab = value;
    },
  },
};
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
</style>