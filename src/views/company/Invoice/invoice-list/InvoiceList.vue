<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
          <!-- <label>Entries</label>
            <v-select
              v-model="perPage" 
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1"
            /> -->
          <b-button variant="primary" class="mr-1" :to="{
            name: 'company-invoice-add',
            params: {
              companyId: $route.params.companyId
                ? $route.params.companyId
                : $route.params.id,
            },
          }" @click="actionTab">
            {{ $t("company_invoices.add_invoice") }}
            <!-- Add Invoice -->
          </b-button>
          <b-button variant="primary" class="mr-1 position-relative p-set">
            <b-form-file v-model="file" class="file-input" @input="addfile(companyId)" />

            <b-spinner v-if="fileLoading" small variant="light" />
            {{ $t("company_invoices.add_from_file") }}
            <!-- Add From File -->
            <svg-icon width="20" height="20" class="file-upload" type="mdi" :path="path" />
          </b-button>
          <!--Add the third button name export-->
          <!-- Export Invoice Button -->
          <b-button variant="primary" class="mr-1" @click="showDatePickerModal">
            {{ $t("company_invoices.Export_invoice") }}
            <!-- Export Invoice -->
          </b-button>

          <!-- Date Picker Modal -->

          <b-modal id="modal-prevent-closing-invoice" ref="export_model" title="Select Month" :ok-title="$t('modal_labels.ok')" :cancel-title="$t('modal_labels.close')" @show="resetModal" @hidden="resetModal" @ok="handleOk" :ok-disabled="modalDisabledMonth">

            <form ref="form" @submit.stop.prevent="handleMonthSelect">
              <validation-observer ref="selectMonthRules" tag="form">
                <validation-provider #default="{ errors }" :name="$t('month_selected')" rules="required">
                  <vue-monthly-picker id="month_selected" v-model="selectedMonthData.date" name="month_selected" date-format="Y-MM" :month-labels="monthLabels" :class="errors.length > 0 ? 'is-invalid' : null" place-holder="Please Select: " />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </validation-observer>
            </form>
          </b-modal>


          <b-modal id="modal-invoices-export" ref="modal_exportValue" :title="companyinfo && companyinfo.exportProperties && companyinfo.exportProperties.platform === 'AJURE' ? companyinfo.exportProperties.platform : ''" title-class="w-100 text-center" :ok-title="$t('company_invoices.Export_invoicess')" :cancel-title="$t('company_invoices.Cancel')" scrollable @ok="getExportFile()" :ok-disabled="modalDisabled" class="p-3">
            <form ref="form" @submit.stop.prevent="handleMonthSelect" class="border p-3 bg-light">
              <!-- display exportDto data -->
              <!-- display companyinfo.keyValues data -->
              <div v-if="companyinfo && companyinfo.exportProperties" class="mb-3">
                <div v-for="(value, key) in companyinfo.exportProperties.keyValues" :key="key" class="mb-2">
                  <label :for="'input-' + key" class="form-label">{{ key }} :</label>
                  <input :id="'input-' + key" class="form-control" v-model="companyinfo.exportProperties.keyValues[key]" readonly>
                </div>
              </div>
              <div v-else>
                <div>No data to display</div>
              </div>
            </form>
          </b-modal>





          <!-- Refresh button -->
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" @click="refreshList()">
            <feather-icon icon="RefreshCcwIcon" />
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <div class="position-relative mr-1 filter-date">
              <flat-pickr v-model="startDate" class="form-control invoice-edit-input invoice-input-top" :placeholder="$t('company_invoices.start_date')" />
              <feather-icon v-if="startDate === ''" size="16" icon="CalendarIcon" class="cursor-pointer clear-all" />
              <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer clear-all" @click="startDate = ''" />

              <!-- <feather-icon
                  size="16"
                  icon="CalendarIcon"
                  class="cursor-pointer clear-all"
                  @click="dateFrom = ''"
                /> -->
            </div>
            <div class="position-relative mr-1 filter-date">
              <flat-pickr v-model="endDate" class="form-control invoice-edit-input invoice-input-top" :placeholder="$t('company_invoices.end_date')" />

              <feather-icon v-if="endDate === ''" size="16" icon="CalendarIcon" class="cursor-pointer clear-all" />
              <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer clear-all" @click="endDate = ''" />

              <!-- <feather-icon
                  size="16"
                  icon="CalendarIcon"
                  class="cursor-pointer clear-all"
                  @click="dateTo = ''"
                /> -->
            </div>
            <div class="position-relative flex-1">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1" :placeholder="$t('company_invoices.search')" @input="handleSearchSelect()" />
              <feather-icon size="16" icon="XIcon" class="cursor-pointer clear-all" @click="searchQuery = ''" />

            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-row class="text-center text-danger">
      <b-col>
        <p style="font-size: 1.05rem">
          {{ $t("add_invoice.not_recognised_01") }}
          <b>{{ $t("add_invoice.not_recognised_02") }}</b>
          {{ $t("add_invoice.not_recognised_03") }}
        </p>
      </b-col>
    </b-row>
    <!-- {{ JSON.stringify(fetchInvoices) }}
    {{ (JSON.stringify(invoices)) }} -->
    <!-- {{ tableColumns }} -->
    <b-table ref="refInvoiceListTable" :items="isCheck === false ? fetchInvoices : invoices" :fields="tableColumns" responsive primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found" :sort-desc.sync="isSortDirDesc" class="position-relative invoiceList" id="company-invoices">

      <template #empty="scope">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mb-1 start-chat-icon">
            <feather-icon icon="FolderIcon" size="20" />
          </div>
          <h5 class="sidebar-toggle start-chat-text">No records found</h5>
        </div>
      </template>

      <template #head(invoiceStatus)>
        <feather-icon icon="TrendingUpIcon" class="mx-auto" />
        <!-- {{ $t('company_invoices.invoice_number') }} -->
      </template>

      <!-- Column: invoiceNumber -->
      <template #head(invoiceNumber)>
        {{ $t("company_invoices.invoice_no") }}
      </template>

      <template #cell(invoiceNumber)="data">
        <b-link :to="{ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId }, }" class="font-weight-bold">
          <span class="text-nowrap">{{ data.value }}</span>
        </b-link>
      </template>

      <!-- Column: Issued Date -->
      <template #head(invoiceDate)>
        {{ $t("company_invoices.date_issued") }}
      </template>

      <template #cell(invoiceDate)="data">
        <span class="text-nowrap">
          {{ data.item.dateIssued }}
        </span>
      </template>

      <!-- Column: Transaction type -->
      <template #head(transactionType)>
        {{ $t("company_invoices.transaction_type") }}
      </template>

      <template #cell(transactionType)="data">
        <b-link :to="{ name: 'company-invoice-preview', params: { id: data.item.id, companyId: companyId }, }" class="font-weight-bold">
          <span :id="`transactionType-row-${data.item.id}`" class="text-nowrap">
            <b-badge pill :variant="`${data.value === 'EXPENSE' ? 'light-danger' : 'light-success'}`" class="text-capitalize">
              {{ $t("company_invoices." + data.value) }}
            </b-badge>
          </span>
        </b-link>
      </template>

      <!-- Column: recipientCompany -->
      <template #head(recipientCompanyName)>
        {{ $t("company_invoices.recipient_company") }}
      </template>

      <template #cell(recipientCompanyName)="data">
        <span :id="`recipientCompany-row-${data.item.id}`" class="text-nowrap">
          <b-badge pill :variant="`light-success`" class="text-capitalize">
            <!-- {{ data.item.recipientCompany }} -->
            {{ data.item.recipientCompany.companName }}
          </b-badge>
        </span>
        <b-tooltip :target="`recipientCompany-row-${data.item.id}`" placement="top">
          <p class="mb-0">
            {{ data.item.recipientCompany.companName }}
          </p>
          <p class="mb-0">Eic: {{ data.item.recipientCompany.companyEic }}</p>
          <p class="mb-0">
            {{ data.item.recipientCompany.companyOwnerName }}
          </p>

          <!-- <p class="mb-0">
            Company Vat Eic: {{ data.item.recipientCompany.companyVatEic }}
          </p>
          <p class="mb-0">
            Company Address: {{ data.item.recipientCompany.companyAddress }}
          </p>
          <p class="mb-0">
            Owner EGN: {{ data.item.recipientCompany.ownerEGN }}
          </p> -->
        </b-tooltip>
      </template>

      <!-- Column: supplierCompany -->

      <template #head(supplierCompanyName)>
        {{ $t("company_invoices.supplier_company") }}
      </template>
      <template #cell(supplierCompanyName)="data">
        <span :id="`supplierCompany-row-${data.item.id}`" class="text-nowrap">
          <b-badge pill :variant="`light-success`" class="text-capitalize">
            {{ data.item.supplierCompany.companName }}
          </b-badge>
        </span>
        <b-tooltip :target="`supplierCompany-row-${data.item.id}`" placement="top">
          <p class="mb-0">
            {{ data.item.supplierCompany.companName }}
          </p>
          <p class="mb-0">Eic: {{ data.item.supplierCompany.companyEic }}</p>
          <p class="mb-0">
            {{ data.item.supplierCompany.companyOwnerName }}
          </p>

          <!-- <p class="mb-0">
            Company Vat Eic: {{ data.item.supplierCompany.companyVatEic }}
          </p>
          <p class="mb-0">
            Company Address: {{ data.item.supplierCompany.companyAddress }}
          </p>
          <p class="mb-0">
            Owner EGN: {{ data.item.supplierCompany.ownerEGN }}
          </p> -->
        </b-tooltip>
      </template>

      <!-- Column: amount non vat -->
      <template #head(amountNonVat)>
        {{ $t("company_invoices.amount_non_vat") }}
      </template>
      <template #cell(amountNonVat)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency === 'lv' ||
            data.item.currency === 'лв' ||
            data.item.currency === 'лв.'
            ">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: totalAmount -->
      <template #head(totalAmount)>
        {{ $t("company_invoices.total_amount") }}
      </template>
      <template #cell(totalAmount)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency === 'lv' ||
            data.item.currency === 'лв' ||
            data.item.currency === 'лв.'
            ">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: vatAmount -->
      <template #head(vatAmount)>
        {{ $t("company_invoices.vat_amount") }}
      </template>
      <template #cell(vatAmount)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency === 'lv' ||
            data.item.currency === 'лв' ||
            data.item.currency === 'лв.'
            ">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: currency -->
      <!-- <template #cell(currency)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template> -->

      <!-- Column: Actions -->
      <template #head(actions)>
        {{ $t("companies.actions") }}
      </template>

      <template #cell(actions)="data">

        <div class="text-nowrap">
          <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="EyeIcon" size="16" class="mr-1 cursor-pointer" @click="
            $router.push({
              name: 'company-invoice-preview',
              params: { id: data.item.id, companyId: companyId },
            })
            " />
          <b-tooltip title="Preview Invoice" class="cursor-pointer" :target="`invoice-row-${data.item.id}-preview-icon`" />

          <!-- Dropdown -->
          <b-dropdown variant="link" toggle-class="p-0" no-caret dropleft :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <b-dropdown-item @click="generatePDF(data.item.id)">
              <feather-icon icon="DownloadIcon" />
              <span class="align-middle ml-50">Download</span>
            </b-dropdown-item>
            <b-dropdown-item :to="{
              name: 'company-invoice-edit',
              params: { id: data.item.id, companyId: companyId },
            }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="showMsgBoxTwo(data.item.id, refetchData)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>

          <!-- Duplicate -->
          <feather-icon :id="`invoice-row-${data.item.id}-duplicate-icon`" icon="LayersIcon" size="16" class="mx-1 cursor-pointer" @click="duplicateInvoice(data.item)" />
          <b-tooltip title="Duplicate Invoice" class="cursor-pointer" :target="`invoice-row-${data.item.id}-duplicate-icon`" />
          <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :ref="`invoicePdf${data.item.id}`" :preview-modal="false" :paginate-elements-by-height="1100" filename="invoice" :pdf-quality="2" :manual-pagination="false" pdf-format="a3" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="1125px" @progress="onProgress($event)">
            <section slot="pdf-content" class="invoice-pdf invoice-preview-list">
              <invoice-download :invoice-data="data.item" />
            </section>
          </vue-html2pdf>
        </div>
      </template>
    </b-table>

    <!-- loading spinner -->
    <b-row class="text-center mb-2">
      <b-col cols="12">
        <b-spinner v-if="loadMore" large variant="primary" />
        <div v-else style="height: 35px"></div>
        <div ref="loadMoreObserver"></div>
      </b-col>
    </b-row>

    <!--   <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col> -->
    <!-- Pagination -->
    <!-- <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
            v-if="totalInvoices > 0"
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
       </b-row>
     </div> -->
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
  BFormFile,
  BSpinner,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import VueHtml2pdf from "vue-html2pdf";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrayArrowUp } from "@mdi/js";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";
import InvoiceDownload from "../invoice-download/InvoiceDownload.vue";
import invoiceStoreModule from "../invoiceStoreModule";
import useInvoicesList from "./useInvoiceList";
import { i18n } from "@/main.js";
import { watch, ref } from "vue";
import axios from "@/libs/axios";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import VueMonthlyPicker from "vue-monthly-picker";


export default {
  directives: {
    Ripple,
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
    InvoiceDownload,
    BFormFile,
    BSpinner,
    SvgIcon,
    flatPickr,
    'ValidationProvider': ValidationProvider,
    'ValidationObserver': ValidationObserver,
    VueMonthlyPicker,
  },
  props: ["invoiceTab"],
  data() {
    return {
      loadMore: false,
      isExportModalVisible: false,
      startDate: "",
      endDate: "",
      perPageRecords: 10,
      pageNum: 1,
      isCheck: false,
      exportModalFlag: false,
      file: null,
      fileLoading: false,
      path: mdiTrayArrowUp,
      observer: null,
      loadModal: "Next",

      modalDisabledMonth: false,
      searchQuery: '', // assuming it's a string
      isLoading: false, // assuming it's a boolean indicating a loading state
      // other data properties...
      companyinfo: null,
      isSortDirDesc: null, // or any default value
      sortBy: null, // or any default value
      // tableColumns: null, // or any default value
      // invoices: null,
      exportDto: {
        companyId: '',
        date: '',
        platformName: '',
      },
      invoicesForReport: [],
      selectedMonthData: {
        companyId: "85",
        date: " ",
        pageNumber: 1,
        pageSize: 5000,
        invoicesForReport: null,
      },
      companyID: "",
      monthLabels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      InvoicesTableColumns: [
        { key: "isChecked", label: "" },
        { key: "invoiceNumber" },
        { key: "recipientCompanyName" },
        { key: "supplierCompanyName" },
        { key: "transactionType" },
        { key: "dateIssued" },
      ],
    };
  },

  watch: {
    startDate: function () {
      this.handleSearchSelect();
    },
    endDate: function () {
      this.handleSearchSelect();
    },
    companyID(newVal) {
      console.log('companyID watcher triggered', newVal);
      this.exportDto.companyId = newVal;
    },
    'selectedMonthData.date'(newVal) {
      console.log('selectedMonthData.date watcher triggered', newVal);
      this.exportDto.date = newVal;
    },
    'companyinfo.exportProperties.platform'(newVal) {
      console.log('companyinfo.exportProperties.platform watcher triggered', newVal);
      this.exportDto.platformName = newVal || null;
    },
  },

  mounted() {
    setTimeout(() => {
      this.isCheck = true;
    }, 1500);
    this.observeScroll();
    this.fetchInvoices();
  },
  computed: {
    modalDisabled() {
      // your condition here...
      return !this.exportDto || !this.companyinfo;
    },
  },


  methods: {
    /* async fetchInvoices() {
       // try {
       //   const response = await axios.get("/api/export", {
       //     headers: {
       //       'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
       //       'Content-Type': 'application/json'
       //  },
       //});
       // this.selectedMonthData.invoicesForReport = response.data;
       //} catch (error) {
       //   console.error(error);
       // }
       let token = useJwt.getToken();
       let exportDto = {
         companyId: '',
         date: '',
         platformName: '',
       };
       //       exportDto.companyId = router.currentRoute.params.id;
       useJwt
         .export(token, exportDto)
         .then(async (response) => {
         }
         )
         .catch()
     },*/
    async exportModal() {
      // Fetch the invoices first
      console.log(this.fetchInvoices());
      await this.fetchInvoices();

      // Populate the exportDto object
      console.log('exportModal method called', this.companyID, this.selectedMonthData.date, this.companyinfo);
      this.exportDto.companyId = this.companyID;
      this.exportDto.date = this.selectedMonthData.date;
      this.exportDto.platformName = this.companyinfo && this.companyinfo.exportProperties && this.companyinfo.exportProperties.platform ? this.companyinfo.exportProperties.platform : 'Ajure';
      // Validate if the required fields have a value
      if (!this.exportDto.companyId || !this.exportDto.date || !this.exportDto.platformName) {
        console.error('exportDto data is not complete!');
        return;
      }

      // Show the modal
      this.$bvModal.show('export-info-modal');
      // Then get the export file
      await this.getExportFile();
      // Toggle the visibility of the modal
      this.isExportModalVisible = !this.isExportModalVisible;
    },

    toggleExportModal() {
      this.isExportModalVisible = !this.isExportModalVisible;
    },

    showDatePickerModal() {
      this.$refs.export_model.show();
    },

    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleMonthSelect();
    },

    async getExportFile() {
      this.$nextTick(() => {
        this.$bvModal.show("modal-spinner");
      });

      this.exportDto.companyId = 85; // Set companyId to 85
      this.exportDto.date = new Date().toISOString().split('T')[0]; // Set date to current date
      this.exportDto.platformName = "AJURE"; // Set platformName to "AJURE"

      try {
        const response = await axios.post("https://coherent-accounting.com/account/api/export", this.exportDto, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"), // assuming accessToken is correct
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          responseType: 'blob',
        });

        // Prepare the data string to be written to the file
        const exportDataString = `companyId: ${this.exportDto.companyId}, date: "${this.exportDto.date}", platformName: "${this.exportDto.platformName}"`;

        // Create a new blob with the content of the exportDto
        const exportDataBlob = new Blob([exportDataString], { type: 'text/plain' });

        const url = window.URL.createObjectURL(exportDataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.txt'); // download as .txt
        document.body.appendChild(link);
        link.click();
        link.remove();

        this.$nextTick(() => {
          this.$bvModal.hide("modal-spinner");
        });

        this.$toast({
          component: ToastificationContent,
          props: {
            title: "The file has been downloaded",
            icon: "DeleteIcon",
            variant: "success",
          },
        });

        this.$refs.modal_exportValue.hide();
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          console.log('Error status:', error.response.status);
          console.log('Error data:', error.response.data);
        }

        this.$toast({
          component: ToastificationContent,
          props: {
            title: `Something went wrong`,
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });

        this.$nextTick(() => {
          this.$bvModal.hide("modal-spinner");
        });
      }
    },

    resetModal() {
      this.selectedMonthData.date = "";
      this.modalDisabledMonth = false;
      this.loadModal = "Next";
    },

    async handleMonthSelect() {
      const success = await this.$refs.selectMonthRules.validate();
      if (success) {
        this.loadModal = "Loading...";
        this.modalDisabledMonth = true;
        this.invoicesForReport = [];
        const tPeriod = this.selectedMonthData.date._i;
        const year = tPeriod.substring(0, 4);
        const month = tPeriod.substring(5, tPeriod.length);
        this.selectedMonthData.date = month.length === 1 ? `${year}-0${month}-01` : `${year}-${month}-01`;

        let companyID = this.$route.params.id;
        try {
          const response = await axios.get(`/account/api/company/${companyID}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Access-Control-Allow-Credentials": true,
            },
          });
          this.companyinfo = response.data;
          this.$refs.export_model.hide();
          this.$refs.modal_exportValue.show();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async refreshList() {
      var tableAreaBusy = document.getElementById("company-invoices");
      tableAreaBusy.style.opacity = "0.5";
      this.isCheck = true;

      const totalRecordss = this.invoices.length;
      let Records = (totalRecordss / 10) * 10;
      this.pageNum = Records / 10;
      if (totalRecordss < 10) {
        Records = 10;
        this.pageNum = 1;
      }

      const payLoadDates = {
        dateFrom: this.startDate,
        dateTo: this.endDate,
      };

      const config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          // sortField: this.sortBy,
          sortField: 'id',
          verified: "true",
          searchTerm: this.searchQuery,
        },
      };

      const config1 = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          // sortField: this.sortBy,
          sortField: 'id',
          verified: "true",
        },
      };

      try {
        if (this.startDate === "" && this.endDate === "" && this.searchQuery === "") {
          this.companyId = router.currentRoute.params.id;
          const data = await axios.get(`/account/api/invoice/list/${this.companyId}/1/${Records}`, config1);
          this.invoices = data.data.elements;
        } else {
          this.companyId = router.currentRoute.params.id;
          const data1 = await axios.post(`/account/api/invoice/search/${this.companyId}/1/${Records}`, payLoadDates, config);
          this.invoices = data1.data.elements;
        }
        tableAreaBusy.style.opacity = "1";
      } catch (error) {
        console.log(error);
      }
    },

    observeScroll() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          if (this.startDate === "" && this.endDate === "" && this.searchQuery === "") {
            await this.listInvoices();
          } else {
            await this.searchInvoices();
          }
          if (this.invoices) {
            if (this.invoices.length === this.totalInvoices) {
              this.loadMore = false;
            } else {
              setTimeout(() => {
                this.loadMore = false;
              }, 300);
            }
          }
        }
      }, options);

      observer.observe(this.$refs.loadMoreObserver);
    },

    async handleSearchSelect() {
      var tableAreaBusy = document.getElementById("company-invoices");
      tableAreaBusy.style.opacity = "0.5";
      this.isCheck = true;
      this.pageNum = 1;
      this.perPageRecords = 10;

      let data1 = {
        dateFrom: this.startDate,
        dateTo: this.endDate,
      };
      let config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          sortField: this.sortBy,
          verified: "true",
          searchTerm: this.searchQuery,
        },
      };
      this.companyId = router.currentRoute.params.id;
      const data = await axios.post(
        `/account/api/invoice/search/${this.companyId}/1/${this.perPageRecords}`,
        data1,
        config
      );

      this.invoices = data.data.elements;
      tableAreaBusy.style.opacity = "1";
    },

    async listInvoices() {
      this.pageNum += 1;
      let config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          // sortField: this.sortBy,
          sortField: 'id',
          verified: "true",
        },
      };
      this.companyId = router.currentRoute.params.id;
      this.invoices = [];
      const data = await axios.get(
        `/account/api/invoice/list/${this.companyId}/${this.pageNum}/10`,
        config
      );
      // this.invoices = data.data.elements;
      // console.log(data, this.invoices);
      if (this.pageNum > 1) {
        console.log(data, this.invoices);
        this.invoices.push(...data.data.elements);
        this.loadMore = false;
        if (data.data.elements.length === 0) {
          this.pageNum -= 1;
        }
      }
    },

    async searchInvoices() {
      this.pageNum += 1;
      let data1 = {
        dateFrom: this.startDate,
        dateTo: this.endDate,
      };
      let config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          sortField: this.sortBy,
          verified: "true",
          searchTerm: this.searchQuery,
        },
      };
      this.companyId = router.currentRoute.params.id;
      const data = await axios.post(
        `/account/api/invoice/search/${this.companyId}/${this.pageNum}/10`,
        data1,
        config
      );

      this.invoices.push(...data.data.elements);
      this.loadMore = false;

      let val = data.data.elements.length;
      if (val === 0) {
        this.pageNum -= 1;
      }
    },

    async handleScroll() {
      // Check if the user has scrolled to the bottom
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const scrollTop = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      );
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - (scrollTop + clientHeight) <= 1) {
        this.loadMore = true;
        setTimeout(async () => {
          if (
            this.startDate === "" &&
            this.endDate === "" &&
            this.searchQuery === ""
          ) {
            await this.listInvoices();
          } else {
            await this.searchInvoices();
          }

          // Check if there are no more invoices to load
          if (this.invoices.length === this.totalInvoices) {
            this.loadMore = false;
          } else {
            setTimeout(() => {
              this.loadMore = false;
            }, 300);
          }
        }, 300);
      }
    },

    state() {
      return 1;
    },

    actionTab() {
      this.$emit("state", this.state());
    },

    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },

    generatePDF(itemID) {
      this.$refs[`invoicePdf${itemID}`].generatePdf();
    },

    showMsgBoxTwo(id, refetchData) {
      const h = this.$createElement;
      // Using HTML string
      // More complex structure
      const messageVNode = h("div", { class: ["bvModalFont"] }, [
        h("p", { class: ["text-center card-text"] }, [
          i18n.tc("company_invoices.delete_invoice_confirm"),
        ]),
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: i18n.tc("company_invoices.delete_invoice"),
          okVariant: "primary",
          okTitle: i18n.tc("companies.confirm"),
          cancelTitle: i18n.tc("clients_or_recipients.cancel"),
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.invoiceDelete(id, refetchData);
          }
        });
    },

    // duplicating an invoice
    duplicateInvoice(item) {
      let config = item;
      config.invoiceNumber = Date.now();
      config.id = "";
      let companyID = this.$route.params.id;
      let token = useJwt.getToken();
      useJwt
        .addCompanyInvoice(token, companyID, config)
        .then(async (response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Invoice Duplicated Successfully`,
              icon: "EditIcon",
              variant: "success",
            },
          });
          // refetchData();
          var tableAreaBusy = document.getElementById("company-invoices");
          tableAreaBusy.style.opacity = "0.5";
          this.refreshList();
        });
    },

    invoiceDelete(id, refetchData) {
      const token = useJwt.getToken();
      useJwt
        .DeleteCompanyInvoice(token, id)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Invoice Deleted Successfully",
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          // refetchData();
          var tableAreaBusy = document.getElementById("company-invoices");
          tableAreaBusy.style.opacity = "0.5";
          this.refreshList();
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },

    addfile(companyId) {
      this.fileLoading = true;
      const token = useJwt.getToken();
      const formData = new FormData();
      formData.append("file", this.file);
      this.file = null;
      useJwt
        .addFileInvoice(token, companyId, formData)
        .then((response) => {
          this.fileLoading = false;
          return this.$router.push({
            name: "company-invoice-add",
            params: {
              companyId,
              invoiceData: response.data,
            },
          });
        })
        .catch((error) => {
          this.fileLoading = false;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },
  },
  created() {
    this.handleOk = this.handleOk.bind(this);
  },

  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const statusOptions = [
      "Downloaded",
      "Draft",
      "Paid",
      "Partial Payment",
      "Past Due",
    ];

    const {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      dateFrom,
      dateTo,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      companyId,
      statusFilter,

      refetchData,
      invoices,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList();

    companyId.value = router.currentRoute.params.companyId
      ? router.currentRoute.params.companyId
      : router.currentRoute.params.id;
    console.log(companyId, tableColumns);
    return {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      dateFrom,
      dateTo,
      companyId,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,
      invoices,

      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    };

  },

}
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
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.invoiceList th {
  position: relative;
  vertical-align: middle !important;
}

.gap-2 {
  grid-gap: 25px;
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

.invoice-preview-list .invoice-date-wrapper.invoice-middle-content p.invoice-date-title {
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

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
}

.p-set {
  padding-right: calc(1.5rem + 20px);
}

.file-input label {
  cursor: pointer;
}

.file-upload {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%) !important;
}
</style>
