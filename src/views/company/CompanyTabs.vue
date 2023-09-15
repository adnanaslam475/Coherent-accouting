<template>
  <b-col>

    <b-tabs v-model="companyTab">
      <!-- Company-Info tab -->

      <b-tab>
        <template #title>
          <feather-icon icon="BriefcaseIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('lbl.company_info') }}</span>
        </template>
        <CompanyInfo v-if="companyTab == 0 || infoActive" :company-tab="companyTab" @state="update($event)"
          :companyDetails="companyDetails" />
      </b-tab>

      <!-- invoices tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FileTextIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('invoices') }}</span>
        </template>
        <Invoice v-if="companyTab == 1 || invoicesActive" :invoice-tab="invoiceTab" @state="updateInvoiceTab($event)"
          :companyDetails="companyDetails" />
      </b-tab>

      <!-- Multiple Uploads tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FileIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.multiple_upload') }}</span>
        </template>
        <NotVerifiedInvoice v-if="companyTab == 2 || multipleUploadActive" />
      </b-tab>

      <!-- Vat Reports tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FlagIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.vat_reports') }} </span>
        </template>
        <VatReports v-if="companyTab == 3 || vatReportsActive" :vat-reports-tab="vatReportsTab"
          @state="updateVatReportsTab($event)" />
      </b-tab>

      <!-- credit notifications 
      <b-tab>
        <template #title>
          <feather-icon icon="CreditCardIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{
            $t('company_tabs.CreditNotifications') }}</span>
        </template>
        <YearlyReport v-if="companyTab == 4 || creditNotifications" />
      </b-tab>


      <b-tab>
        <template #title>
          <feather-icon icon="CreditCardIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{
            $t('company_tabs.DebitNotifications') }}</span>
        </template>
        <YearlyReport v-if="companyTab == 5 || debitNotifications" />
      </b-tab>
      Tab -->

      <!-- Documents tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="FolderIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.company_documents') }}</span>
        </template>
        <Document v-if="companyTab == 4 || companyDocumentsActive" />
      </b-tab>

      <!--Private Person tab -->
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span style="font-size: 0.8vw" class="text-capitalize">{{ $t('company_tabs.clients_or_recipients') }}</span>
        </template>
        <PrivatePersons v-if="companyTab == 5 || privatePersonActive" :add-record="addRecord"
          @state="updateAddRecord($event)" />
      </b-tab>

      <!-- Name of company -->
      <b-tab title-item-class="ml-auto" :title-link-class="'pb-0'" disabled>
        <template #title>
          <span style="width: 150px !important">
            <h4 style="color: #0a64bc; font-size: 1vw;">
              <b>{{ companyName }}</b>
            </h4>
          </span>
        </template>
      </b-tab>
    </b-tabs>

    <template #code>
      {{ codeIcon }}
    </template>
  </b-col>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
import store from '@/store'
import { mapGetters } from 'vuex'

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
      companyDetails: [],
      companyNameLength: "",
      companyName: "",
      companyID: "",
      codeIcon,
      companyTab: this.$route.params.InvoiceId
        ? this.$route.params.InvoiceId
        : 2,
      invoiceTab: 0,
      addRecord: false,
      vatReportsTab: 0,
      infoActive: this.$route.params.InvoiceId && this.$route.params.InvoiceId !== 0 ? false : true,
      invoicesActive: this.$route.params.InvoiceId == 1 ? true : false,
      multipleUploadActive: this.$route.params.InvoiceId == 2 ? true : false,
      vatReportsActive: this.$route.params.InvoiceId == 3 ? true : false,
      creditNotifications: this.$route.params.InvoiceId == 4 ? true : false,
      debitNotifications: this.$route.params.InvoiceId == 5 ? true : false,

      companyDocumentsActive: this.$route.params.InvoiceId == 6 ? true : false,
      privatePersonActive: this.$route.params.InvoiceId == 7 ? true : false,
    };
  },
  computed: {
    ...mapGetters('app', ['getCurrentTab']),

  },
  mounted() {
    this.companyID = this.$route.params.id;


    this.getCompanyInfo();
  },
  created() {
    if (this.getCurrentTab == 3) {
      this.companyTab = 2
      store.commit('app/MULTIPLE_UPLOADS', 0)
    } else {
      this.companyTab = 0
    }
  },
  watch: {
    companyTab: function (newValue, oldValue) {
      switch (newValue) {
        case 0:
          this.infoActive = true
          break;
        case 1:
          this.invoicesActive = true
          break;
        case 2:
          this.multipleUploadActive = true
          break;
        case 3:
          this.vatReportsActive = true
          break;
        case 4:
          this.creditNotifications = true
          break;
        case 5:
          this.debitNotifications = true
          break;
        case 6:
          this.companyDocumentsActive = true
          break;
        case 7:
          this.privatePersonActive = true
          break;
        default:

      }
    }
  },
  methods: {
    async getCompanyInfo() {
      axios.get(`/account/api/company/${this.companyID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      })
        .then((response) => {
          let companyRecord = response.data;
          this.companyDetails = companyRecord;
          this.companyName = companyRecord.companyName;
          this.companyNameLength = this.companyName.length;
        })
        .catch((error) => {
          // console.log(error);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Error fetching company info",
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          });
        });
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
