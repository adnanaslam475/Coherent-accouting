<template>
  <b-col>
    <b-tabs v-model="companyTab">
      <!-- Company-Info tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="BriefcaseIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('lbl.company_info') }}</span> 
        </template>
        <CompanyInfo v-if="companyTab == 0" :company-tab="companyTab" @state="update($event)" />
      </b-tab>

      <!-- invoices tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FileTextIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('invoices') }}</span>
        </template>
        <Invoice v-if="companyTab == 1" :invoice-tab="invoiceTab" @state="updateInvoiceTab($event)" />
      </b-tab>

      <!-- Multiple Uploads tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FileIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize" >{{ $t('company_tabs.multiple_upload') }}</span>
        </template>
        <NotVerifiedInvoice v-if="companyTab == 2" />
      </b-tab>

      <!-- Vat Reports tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.vat_reports') }} </span>
        </template>
        <VatReports
          v-if="companyTab == 3"
          :vat-reports-tab="vatReportsTab"
          @state="updateVatReportsTab($event)"
        />
      </b-tab>

      <!-- Yearly Reports Tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.yearly_reports') }}</span>
        </template>
        <YearlyReport v-if="companyTab == 4" />
      </b-tab>

      <!-- Documents tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.company_documents') }}</span>
        </template>
        <Document v-if="companyTab == 5" />
      </b-tab>

      <!--Private Person tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.clients_or_recipients') }}</span>
        </template>
        <PrivatePersons
          v-if="companyTab == 6"
          :add-record="addRecord"
          @state="updateAddRecord($event)"
        />
      </b-tab>

      <!-- Name of company -->
      <b-tab title-item-class="ml-auto" :title-link-class="'pb-0'" disabled>
        <template #title>
          <span>
            <h4 style="color: #0a64bc; font-size: 1vw;">
              <b>{{ companyName }}</b>
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
  padding: 0.36rem 0.65rem 0.47rem;
}

// .card-body {
//   padding-bottom: 0rem;
// }
#main-card-body .card-body {
  padding: 0px;
}

.nav-tabs .nav-link svg {
    margin-right: 0.3rem;
}
</style>
