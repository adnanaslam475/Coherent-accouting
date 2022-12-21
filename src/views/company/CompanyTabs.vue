<template>
  <b-col>
    <b-tabs v-model="companyTab">
      <!-- Company-Info tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="BriefcaseIcon" />
          <span style="font-size: 13px">Company Info</span>
        </template>
        <CompanyInfo :company-tab="companyTab" @state="update($event)" />
      </b-tab>

      <!-- invoices tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FileTextIcon" />
          <span style="font-size: 13px">Invoices</span>
        </template>
        <Invoice :invoice-tab="invoiceTab" @state="updateInvoiceTab($event)" />
      </b-tab>

      <!-- Multiple Uploads tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FileIcon" />
          <span style="font-size: 13px">Multiple Upload</span>
        </template>
        <NotVerifiedInvoice />
      </b-tab>

      <!-- Vat Reports tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 13px">Vat Reports</span>
        </template>
        <VatReports
          :vat-reports-tab="vatReportsTab"
          @state="updateVatReportsTab($event)"
        />
      </b-tab>

      <!-- Yearly Reports Tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 13px">Yearly Reports</span>
        </template>
        <YearlyReport />
      </b-tab>

      <!-- Documents tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span style="font-size: 13px">Company Documents</span>
        </template>
        <Document />
      </b-tab>

      <!--Private Person tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span style="font-size: 13px">Clients or Recipients</span>
        </template>
        <PrivatePersons
          :add-record="addRecord"
          @state="updateAddRecord($event)"
        />
      </b-tab>

      <!-- Name of company -->
      <b-tab title-item-class="ml-auto " disabled>
        <template #title>
          <span v-if="companyNameLength < 25">
            <h4 style="color: #0a64bc">
              <b>{{ companyName }}</b>
            </h4></span
          >
          <span v-else>
            <h4 style="color: #0a64bc">
              <b>{{ companyName.substr(0, 24) }}</b>
            </h4></span
          >
        </template>
      </b-tab>
    </b-tabs>

    <template #code>
      {{ codeIcon }}
    </template>
  </b-col>
</template>

<script>
import { BTabs, BTab, BCardText, BCol, BCard } from "bootstrap-vue";
import CompanyInfo from "./CompanyInfo/CompanyInfo.vue";
import Invoice from "./Invoice/invoice-list/InvoiceList.vue";
import VatReports from "./VatReports/vat-reports-list/VatReportsList.vue";
import VATMonthReport from "./VATMonthReports/VATMonthReport.vue";
import YearlyReport from "./YearlyReports/YearlyReport.vue";
import NotVerifiedInvoice from "./Invoice/invoice-list-notVerified/InvoiceList.vue";
import Document from "./Documents/Document.vue";
import PrivatePersons from "./user/users-list/UsersList.vue";
import { codeIcon } from "./code";
import axios from "@/libs/axios";

export default {
  components: {
    BCol,
    CompanyInfo,
    Invoice,
    VatReports,
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
      companyNameLength: "",
      companyName: "",
      companyID: "",
      codeIcon,
      companyTab: this.$route.params.InvoiceId
        ? this.$route.params.InvoiceId
        : 0,
      invoiceTab: 0,
      addRecord: false,
      vatReportsTab: 0,
    };
  },
  created() {
    this.companyID = this.$route.params.id;
    this.getCompanyInfo();
  },
  methods: {
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
    update(value) {
      if (value.state) {
        this.companyTab = value.state;
      }
      if (value.addRecord) {
        this.addRecord = value.addRecord;
      }
    },
    updateAddRecord(value) {
      this.addRecord = value;
    },
    updateInvoiceTab(value) {
      this.invoiceTab = value;
    },
    updateVatReportsTab(value) {
      this.vatReportsTab = value;
    },
  },
};
</script>

<style lang="scss">
//
.nav-tabs .nav-link {
  padding: 0.36rem 0.78rem 0.47rem;
}

// .card-body {
//   padding-bottom: 0rem;
// }
#main-card-body .card-body {
  padding: 0px;
}
</style>
