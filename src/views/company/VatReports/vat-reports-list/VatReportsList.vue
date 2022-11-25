<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button variant="primary" @click="actionTab"> Add Record </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
          </div>
        </b-col>
      </b-row>
    </div>

    <!-- Vat Reports Table -->
    <b-table
      ref="refVatReportsTable"
      :items="fetchVatReports"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList"
    >
   
    <!-- Column: Id -->
    <template #cell(id)="data">
      <!-- <b-link
          :to="{ name: 'apps-invoice-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        > -->
      #{{ data.value }}
      <!-- </b-link> -->
    </template>

    <!-- Column: cell-01 -->
    <template #cell(cell-01)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-20 -->
    <template #cell(cell-20)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-30 -->
    <template #cell(cell-30)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-31 -->
    <template #cell(cell-31)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-40 -->
    <template #cell(cell-40)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-50 -->
    <template #cell(cell-50)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-60 -->
    <template #cell(cell-60)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-70 -->
    <template #cell(cell-70)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: cell-71 -->
    <template #cell(cell-71)="data">
      <span class="text-nowrap">
        {{ data.value }}
      </span>
    </template>

    <!-- Column: Actions -->
    <template #cell(actions)="data">
      <div class="text-nowrap">
        <feather-icon
          :id="`invoice-row-${data.item.id}-preview-icon`"
          icon="EyeIcon"
          size="16"
          class="mx-1 cursor-pointer"
        />
        <b-tooltip
          title="Preview Invoice"
          class="cursor-pointer"
          :target="`invoice-row-${data.item.id}-preview-icon`"
        />

        <!-- Dropdown -->
        <b-dropdown
          variant="link"
          toggle-class="p-0"
          no-caret
          :right="$store.state.appConfig.isRTL"
        >
          <template #button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="16"
              class="align-middle text-body"
            />
          </template>
          <!-- <b-dropdown-item @click="generatePDF(data.item.id)">
            <feather-icon icon="DownloadIcon" />
            <span class="align-middle ml-50">Download</span>
          </b-dropdown-item> -->
          <b-dropdown-item
          >
            <feather-icon icon="EditIcon" />
            <span class="align-middle ml-50">Edit</span>
          </b-dropdown-item>
          <b-dropdown-item >
            <feather-icon icon="TrashIcon" />
            <span class="align-middle ml-50">Delete</span>
          </b-dropdown-item>
        </b-dropdown>
       
      </div> </template>
    </b-table>
  </b-card>
</template>
  
  <script>
import {
  BCard,
  BRow,
  BCol,
  BCardBody,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
  BTableLite,
  BCardText,
  BAlert,
  VBToggle,
  BCardHeader,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useVatReportsList from "./useVatReportsList";
import VueHtml2pdf from "vue-html2pdf";
import vatReportsStoreModule from "../vatReportsStoreModule";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
//   import InvoiceDownload from '../invoice-download/InvoiceDownload.vue'
export default {
  props: ["vatReportsTab"],
  methods: {
    state() {
      return 1;
    },
    actionTab() {
      this.$emit("state", this.state());
    },
    //   onProgress(event) {
    //     console.log(`Processed: ${event} / 100`);
    //   },
    //   generatePDF(itemID) {
    //     this.$refs['invoicePdf'+itemID].generatePdf();
    //   },
    //   invoiceDelete(id, refetchData) {
    //     let token = useJwt.getToken()
    //     useJwt
    //       .DeleteInvoice(token,id)
    //       .then((response) => {

    //         this.$toast({
    //           component: ToastificationContent,
    //           props: {
    //             title: `Invoice Deleted Successfully`,
    //             icon: "DeleteIcon",
    //             variant: "success",
    //           },
    //         });
    //         refetchData()
    //       })
    //       .catch((error) => {
    //         this.$toast({
    //           component: ToastificationContent,
    //           props: {
    //             title: `${error.response.data.errorMessage}`,
    //             icon: "DeleteIcon",
    //             variant: "error",
    //           },
    //         });
    //       });
    //   }
  },
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    vSelect,
    BCardBody,
    BTableLite,
    BCardText,
    BAlert,
    VBToggle,
    VueHtml2pdf,
    BCardHeader,
    //   InvoiceDownload
    useVatReportsList,
    vatReportsStoreModule,
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "vat-reports";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(
        INVOICE_APP_STORE_MODULE_NAME,
        vatReportsStoreModule
      );

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    //   const statusOptions = [
    //     'Downloaded',
    //     'Draft',
    //     'Paid',
    //     'Partial Payment',
    //     'Past Due',
    //   ]

    const {
      fetchVatReports,
      tableColumns,
      perPage,
      currentPage,
      totalVatReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVatReportsTable,

      refetchData,
    } = useVatReportsList();

    return {
      fetchVatReports,
      tableColumns,
      perPage,
      currentPage,
      totalVatReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVatReportsTable,
      refetchData,
      avatarText,
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>
  
  <style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.invoiceList th {
  position: relative;
  vertical-align: middle !important;
}
.gap-2 {
  grid-gap: 25px;
}
.invoice-add .invoice-total-wrapper {
  max-width: 25rem !important;
}
.invoice-preview-list .invoice-date-wrapper {
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
}
.invoice-preview-list .invoice-date-wrapper p.invoice-date-title {
  width: 12rem !important;
  min-width: max-content;
  font-size: 12px;
}
.invoice-preview-list
  .invoice-date-wrapper.invoice-middle-content
  p.invoice-date-title {
  width: auto !important;
  min-width: max-content;
}

.invoiceStat .invoice-total-item {
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
}
.invoice-preview-list .invoice-date-title,
.invoiceStat .invoice-total-item .invoice-total-title {
  font-weight: 500 !important;
}
.invoice-preview-list .invoice-date {
  font-weight: bold !important;
}
.invoice-preview.date-issued {
  width: max-content;
  margin-right: 0;
  margin-left: auto;
}
.invoiceNumber {
  font-weight: 500;
  font-size: 16px;
}
.card.invoice-card {
  border: 1px solid #ebe9f1;
  border-radius: 20px;
  overflow: hidden;
  height: calc(100% - 2rem);
}
.dark-layout .card.invoice-card {
  border-color: #3b4253 !important;
}
.card-header.invoice-header {
  background-color: #7367f0 !important;
  padding: 0.75rem;
  border: 0;
  border-radius: 0;
}
.card-header.invoice-header h5 {
  color: #fff !important;
}

.card-body.invoice-body .invoice-date-wrapper {
  margin-bottom: 0 !important;
  padding: 0.2rem 0 !important;
  border-bottom: 1px solid #ebe9f1;
}
.dark-layout .card-body.invoice-body .invoice-date-wrapper {
  border-color: #3b4253 !important;
}
.card-body.invoice-body.invoice-body-pdf {
  padding: 1rem;
  padding-top: 0;
}

.flex-1 {
  flex: 1;
}
.invoice-pdf {
  background-color: #f8f8f8;
}

.dark-layout .invoice-pdf {
  background-color: #161d31;
}
.invoice-preview .invoice-date-wrapper .invoice-date-title,
.invoice-preview .invoice-date-wrapper .invoice-date {
  margin-bottom: 0;
}
.invoice-pdf .gap-2 {
  gap: 15px;
}
</style>
  