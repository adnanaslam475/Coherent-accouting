<template>
  <!--  Table Container Card Starts  -->
  <b-card no-body>
    <div class="m-2">
      <!--  Table Top Starts  -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="4"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
            variant="primary"
            class="mr-1 cursor-button"
            :disabled="!isActive"
            v-if="platform == 'FRESH_BOOKS'"
          >
            <b-form-file
              ref="imageUploader"
              class="file-input2"
              multiple
              @change="addExportFile"
              :disabled="!isActive"
            />
            <b-spinner v-if="fileLoadingExport" small variant="light" />
            {{ $t("company_invoices.ocr_import") }}

            <!-- Add From File -->
          </b-button>
          <b-button
            variant="primary"
            style="cursor: pointer"
            class="mr-1"
            @click="
              selectAll && selectAll.length
                ? exportByIds()
                : showDatePickerModal()
            "
            :disabled="!isActive"
            v-else
          >
            {{
              $t(
                selectAll && selectAll.length
                  ? "company_invoices.Export_invoice"
                  : "company_invoices.Export_invoice_month"
              )
            }}
            <!-- Export Invoice -->
          </b-button>

          <!-- Date Picker Modal -->

          <b-modal
            id="modal-prevent-closing-invoice"
            ref="export_model"
            :title="$t('company_info.selectMonth')"
            :ok-title="$t('modal_labels.ok')"
            :cancel-title="$t('modal_labels.close')"
            @show="resetModal"
            @ok="handleOk"
            :ok-disabled="modalDisabledMonth"
          >
            <form ref="form" @submit.stop.prevent="handleMonthSelect">
              <validation-observer ref="selectMonthRules" tag="form">
                <validation-provider
                  #default="{ errors }"
                  name="month_selected"
                  rules="required"
                >
                  <vue-monthly-picker
                    id="month_selected"
                    v-model="selectedMonthData.date"
                    name="month_selected"
                    date-format="Y-MM"
                    :month-labels="monthLabels"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                    :place-holder="$t('company_info.pleaseSelect')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </validation-observer>
            </form>
          </b-modal>
          <!-- NEW EXPORT MODAL -->
          <b-modal
            id="modal-prevent-closing-invoice"
            ref="new_export_model"
            :ok-title="$t('company_invoices.Export_invoice')"
            :cancel-title="$t('company_invoices.cancel')"
            @show="resetModal"
            :no-close-on-backdrop="true"
            @ok="exportRequestApiHandler"
            :ok-disabled="!selectedCompany || exporting"
          >
            <div class="d-block">
              <h3>Export Transactions</h3>
              <feather-icon icon="CloseIcon" />
            </div>
            <div class="d-block">
              <h6>Select a format to download your file.</h6>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <h6>Format</h6>
              <v-select
                style="width: 50%"
                class=""
                v-model="selectedCompany"
                label="Select company"
                placeholder="Select company..."
                aria-placeholder="asaaa"
                :options="options"
                v-on:input="selectCompanyHandler"
              />
            </div>
          </b-modal>

          <b-modal
            id="modal-invoices-export"
            ref="modal_exportValue"
            :title="
              companyinfo &&
              companyinfo.exportProperties &&
              companyinfo.exportProperties.platform === 'AJURE'
                ? companyinfo.exportProperties.platform
                : ''
            "
            title-class="w-100 text-center"
            :ok-title="$t('company_invoices.Export_invoicess')"
            :cancel-title="$t('company_invoices.cancel')"
            scrollable
            @ok="getExportFile()"
            :ok-disabled="modalDisabled"
            class="p-3"
          >
            <form
              ref="form"
              @submit.stop.prevent="handleMonthSelect"
              class="border p-3 bg-light"
            >
              <!-- display exportDto data -->
              <!-- display companyinfo.keyValues data -->

              <div
                v-if="companyinfo && companyinfo.exportProperties"
                class="mb-3"
              >
                <div
                  v-for="(value, key) in companyinfo.exportProperties.keyValues"
                  :key="key"
                  class="mb-2"
                >
                  <label :for="'input-' + key" class="form-label"
                    >{{ key }} :</label
                  >
                  <input
                    :id="'input-' + key"
                    class="form-control"
                    v-model="companyinfo.exportProperties.keyValues[key]"
                    readonly
                  />
                </div>

                <b-form-checkbox
                  id="vat-checkbox"
                  v-model="isGeneric"
                  name="vat-checkbox"
                >
                  Standart
                </b-form-checkbox>
              </div>
              <div v-else>
                <div>No data to display</div>
              </div>
            </form>
          </b-modal>

          <!-- Refresh button -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="refreshList()"
          >
            <feather-icon icon="RefreshCcwIcon" />
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="8" class="px-0 pl-md-2 pl-1">
          <div class="d-flex" style="justify-content: end">
            <!-- <b-form-select class="mr-1" v-model="lastDays" :options="lastDaysItems" /> -->

            <div class="position-relative mr-1" style="min-width: 8vw">
              <flat-pickr
                v-model="startDate"
                class="form-control invoice-edit-input invoice-input-top"
                :placeholder="$t('company_invoices.start_date')"
              />
              <feather-icon
                v-if="startDate === ''"
                size="16"
                icon="CalendarIcon"
                class="cursor-pointer clear-all"
              />
              <feather-icon
                v-else
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                @click="startDate = ''"
              />
              <!-- <feather-icon
                  size="16"
                  icon="CalendarIcon"
                  class="cursor-pointer clear-all"
                  @click="dateFrom = ''"
                /> -->
            </div>

            <div class="position-relative mr-1" style="min-width: 8vw">
              <flat-pickr
                v-model="endDate"
                class="form-control invoice-edit-input invoice-input-top"
                :placeholder="$t('company_invoices.end_date')"
              />
              <feather-icon
                v-if="endDate === ''"
                size="16"
                icon="CalendarIcon"
                class="cursor-pointer clear-all"
              />
              <feather-icon
                v-else
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                @click="endDate = ''"
              />
            </div>
            <div class="position-relative mr-1" style="min-width: 5vw">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block"
                :placeholder="$t('company_invoices.search')"
              />
              <feather-icon
                v-if="searchQuery"
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                style="right: 6px"
                @click="searchQuery = ''"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <!--  Table Top Ends  -->
    </div>

    <!--  Error Message Starts  -->
    <b-row class="text-center text-danger">
      <b-col>
        <p style="font-size: 1.05rem">
          {{ $t("add_invoice.not_recognised_01") }}
          <b>{{ $t("add_invoice.not_recognised_02") }}</b>
          {{ $t("add_invoice.not_recognised_03") }}
        </p>
      </b-col>
    </b-row>
    <!--  Error Message Starts  -->
    <!--  Table Starts  -->
    <!-- isCheck === false ? fetchInvoices : invoices -->
    <b-table
      ref="refInvoiceListTable"
      :items="invoices"
      :fields="tableColumns"
      responsive
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList h-100"
      id="company-invoices"
    >
      <template #empty="scope">
        <col
          v-for="field in tableColumns"
          :key="field.key"
          :style="{
            width: field.key === 'description' ? '12px' : '180px',
          }"
        />
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
      <template #head(description)> Description </template>

      <template #cell(description)="data">
        <b-link
          :to="{
            name: 'bank-statement-edit',
            params: { id: data.item.id, companyId: companyId },
          }"
          class="font-weight-bold"
        >
          <span class="text-nowrap desctag">{{ data.value }}</span>
        </b-link>
      </template>

      <!-- Column: amount non vat -->
      <template #head(image)>
        {{ $t("company_invoices.file") }}
      </template>
      <template #cell(image)="data">
        <span class="text-nowrap">
          <span v-if="false"> {{ data.value }}</span>
          <span v-else
            ><img
              :src="require('@/assets/images/dummyInvoice.jpeg')"
              alt="cursor-pointer"
              @click="
                isFetching
                  ? null
                  : getImage(data.item.binaryId || null, data.item.id, 2)
              "
              class="cursor-pointer"
              style="height: 30px; width: 30px"
          /></span>
        </span>
      </template>

      <!-- Column: exported  -->
      <template #head(exported)>
        {{ $t("company_invoices.Exported_invoice") }}
      </template>

      <template #cell(exported)="data">
        <span
          class="text-nowrap"
          v-if="data.item.exported"
          style="position: relative; left: 27%"
        >
          <img
            src="@/assets/images/svg/check.svg"
            alt=""
            height="20px"
            width="20px"
          />
        </span>
      </template>

      <template #head(export)> Export </template>

      <template #cell(export)="data">
        <b-button
          size="sm"
          variant="primary"
          @click="(e) => togglenewExportModal(data.item)"
          class="btn-tour-finish"
        >
          <span class="mr-25 align-middle">Export</span>
        </b-button>
      </template>
      <!-- Column: CHECKBOXES -->
      <template #head(id)>
        <b-form-checkbox
          :checked="(invoices || []).length == selectAll.length"
          @change="() => selectAllRows(invoices)"
        ></b-form-checkbox>
      </template>
      <template #cell(id)="data">
        <b-form-checkbox
          @change="
            (e) => {
              selectSingle(data.item.id);
            }
          "
          :checked="!!selectAll.includes(data.item.id)"
        ></b-form-checkbox>
      </template>

      <!-- Column: Issued Date -->
      <template #head(fromDate)> From Date </template>

      <template #cell(fromDate)="data">
        <b-link
          :to="{
            name: 'bank-statement-edit',
            params: { id: data.item.id, companyId: companyId },
          }"
          class="font-weight-bold"
        >
          <span class="text-nowrap">{{ data.value }}</span>
        </b-link>
      </template>
      <template #head(toDate)> To Date </template>

      <template #cell(toDate)="data">
        <b-link
          :to="{
            name: 'bank-statement-edit',
            params: { id: data.item.id, companyId: companyId },
          }"
          class="font-weight-bold"
        >
          <span class="text-nowrap">{{ data.value }}</span>
        </b-link>
      </template>

      <template #head(actions)>
        <span style="display: flex; justify-content: center">
          {{ $t("companies.actions") }}
        </span>
      </template>

      <template #cell(actions)="data">
        <div class="text-nowrap" style="display: flex; justify-content: center">
          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mr-1 cursor-pointer"
            @click="
              $router.push({
                name: 'bank-statement-edit',
                params: { id: data.item.id, companyId: companyId },
              })
            "
          />
          <b-tooltip
            :title="$t('company_info.previewInvoice')"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />

          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            dropleft
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>

            <b-dropdown-item
              :to="{
                name: 'bank-statement-edit',
                params: { id: data.item.id, companyId: companyId },
              }"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">{{
                $t("company_info.edit")
              }}</span>
            </b-dropdown-item>
            <b-dropdown-item @click="showMsgBoxTwo(data.item.id, refetchData)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">{{
                $t("company_info.delete")
              }}</span>
            </b-dropdown-item>
          </b-dropdown>

          <!-- Duplicate -->
        </div>
      </template>
    </b-table>
    <!--  Table Ends  -->

    <!--  Loading Spinner Starts  -->
    <b-row class="text-center mb-2">
      <b-col cols="12">
        <b-spinner v-if="loadMore" large variant="primary" />
        <div v-else style="height: 35px"></div>
        <div ref="loadMoreObserver"></div>
      </b-col>
    </b-row>
    <b-modal id="modal-center-media-state" title="Download Image" hide-footer>
      <b-img
        class="w-100"
        :src="
          imageD.type === 'image/bmp' ||
          imageD.type === 'image/jpeg' ||
          imageD.type === 'image/png'
            ? imageD.image
            : getMediaType(clickedImageType)
        "
      />
      <b-link
        class="btn btn-primary download-icon"
        :download="imageD.name"
        :href="imageD.image"
      >
        <feather-icon icon="DownloadIcon" size="30" class="text-danger" />
      </b-link>
    </b-modal>
  </b-card>
  <!--  Table Container Card Ends  -->
</template>

<script>
import {
  BFormSelect,
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
  BFormCheckbox,
  BModal,
  BImg,
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
import { mapGetters } from "vuex";
import axios from "@/libs/axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VueMonthlyPicker from "vue-monthly-picker";
import { saveAs } from "file-saver";

export default {
  directives: {
    Ripple,
  },

  components: {
    BFormSelect,
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
    BFormCheckbox,
    BCardBody,
    BTableLite,
    BCardText,
    BAlert,
    BModal,
    BImg,
    VBToggle,
    VueHtml2pdf,
    BCardHeader,
    InvoiceDownload,
    BFormFile,
    BSpinner,
    SvgIcon,
    flatPickr,
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
    VueMonthlyPicker,
  },

  props: ["invoiceTab", "companyDetails"],

  data() {
    return {
      options: [],
      selectAll: [],
      selectedCompany: "",
      exportData: {},
      exporting: false,
      isFetching: false,
      EIC: "",
      comp: {},
      imageD: "",
      isGeneric: false,
      exportFiles: null,
      fileLoadingExport: false,
      platform: null,
      isActive: false,
      loadMore: false,
      isExportModalVisible: false,
      isnewExportModalVisible: false,
      transactionType: null,
      lastDays: null,
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
      clickedImageType: "png",
      loadModal: "Next",
      modalDisabledMonth: false,
      searchQuery: "", // assuming it's a string
      isLoading: false, // assuming it's a boolean indicating a loading state
      // other data properties...
      companyinfo: null,
      isSortDirDesc: true, // or any default value
      sortBy: null, // or any default value
      exportDto: {
        companyId: "",
        date: "",
        platformName: "",
      },
      images: [{ image: "", type: "", id: "" }],
      images1: [],
      invoicesForReport: [],
      selectedMonthData: {
        companyId: "85",
        date: " ",
        pageNumber: 1,
        pageSize: 5000,
        invoicesForReport: null,
      },
      companyID: "",

      InvoicesTableColumns: [
        { key: "isChecked", label: "" },
        { key: "invoiceNumber" },
        { key: "recipientCompanyName" },
        { key: "supplierCompanyName" },
        { key: "transactionType" },
        { key: "dateIssued" },
      ],
      documentTypeItems: ["INVOICE", "RECEIPT"],
      lastDaysItems: [
        { value: null, text: "Select days" },
        { value: 5000, text: "All" },
        { value: 0, text: "Today" },
        { value: 1, text: "Yesterday" },
        { value: 7, text: "Last week" },
        { value: 30, text: "Last month" },
        { value: 365, text: "This year" },
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

    searchQuery: function () {
      this.handleSearchSelect();
    },

    companyID(newVal) {
      this.exportDto.companyId = newVal;
    },

    "selectedMonthData.date"(newVal) {
      this.exportDto.date = newVal;
    },

    "companyinfo.exportProperties.platform"(newVal) {
      this.exportDto.platformName = newVal || null;
    },
  },

  mounted() {
    setTimeout(() => {
      this.isCheck = true;
    }, 1500);
    this.refreshList();
    this.observeScroll();

    this.getCompany();
    this.getCompanies();
    this.getMyCurrentPlan();
  },

  computed: {
    ...mapGetters("verticalMenu", ["getXsrfToken"]),

    monthLabels() {
      let arr = [
        this.$t("months.Jan"),
        this.$t("months.Feb"),
        this.$t("months.Mar"),
        this.$t("months.Apr"),

        this.$t("months.May"),
        this.$t("months.Jun"),
        this.$t("months.Jul"),
        this.$t("months.Aug"),
        this.$t("months.Sep"),
        this.$t("months.Oct"),
        this.$t("months.Nov"),
        this.$t("months.Dec"),
      ];
      return arr;
    },
    modalDisabled() {
      // your condition here...
      return !this.exportDto || !this.companyinfo;
    },
  },

  methods: {
    selectCompanyHandler(v) {
      this.selectedCompany = v;
    },
    getMediaType(val) {
      const mediaTypes = {
        png: "jpg",
        jpeg: "jpg",
        jpg: "jpg",
        rar: "zip",
        zip: "zip",
        xls: "xls",
        xlsx: "xls",
        sheet: "xls",
        doc: "doc",
        docx: "doc",
        pdf: "pdf",
        txt: "txt",
      };

      const source = mediaTypes[val?.toLowerCase() || ""] || "";

      if (source !== "") {
        return require(`@/assets/images/icons/${source}.png`);
      }
    },
    async getImage(binaryId, id, temp) {
      const self = this;
      this.isFetching = true;
      await axios
        .get(
          `${axios.defaults.baseURL}/binaries/api/get-binary/${binaryId}/${router.currentRoute.params.id}`,
          { responseType: "blob" }
        )
        .then((response) => {
          if (response.status === 200) {
            const reader = new FileReader();
            reader.readAsDataURL(response.data);

            reader.onload = function () {
              self.images[id] = {
                image: reader.result,
                name: id,
                type: response.data.type,
              };
              self.imageD = self.images[id];
              self.$bvModal.show("modal-center-media-state");
            };
          } else {
            self.images[id] = {
              image: "",
              type: "",
              name: id,
            };
          }
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    UploadFile() {
      this.$refs.add_invoice_modal.show();
    },
    selectAllRows(all) {
      if (this.selectAll.length && this.selectAll.length < all.length) {
        this.selectAll = (all || []).map((v) => v.id);
      } else if (this.selectAll.length) {
        this.selectAll = [];
      } else {
        this.selectAll = (all || []).map((v) => v.id);
      }
    },
    selectSingle(id) {
      this.selectAll = this.selectAll.includes(id)
        ? this.selectAll.filter((v) => v !== id)
        : [...this.selectAll, id];
    },
    async exportByIds() {
      try {
        await axios
          .post(
            `${axios.defaults.baseURL}/account/api/export-multiple-bank-statement`,
            {
              companyId: router.currentRoute.params.id,
              ids: this.selectAll,
              platform: this.platform,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              responseType: "blob",
            }
          )
          .then(function (response) {
            const dateString = new Date();
            const date = new Date(dateString);
            const options = {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            };
            const formattedDate = date.toLocaleDateString("en-US", options);
            const blob = new Blob([response.data], { type: "text/csv" });

            saveAs(blob, `EIC__BANK_STEMENT_DATE_${formattedDate}`);
            // const blobData = response.data;
            // const exportDataBlob = new Blob([blobData], {
            //   type: blobData.type,
            // });
            // const url = window.URL.createObjectURL(exportDataBlob);
            // const link = document.createElement("a");

            // saveAs(
            //   blob,
            //   `EIC_${companyName.companyIdentificationNumber}_DATE_${formattedDate}`
            // );
            // ${companyName.companyIdentificationNumber}
            // let fileName = `EIC_Bank_statement_date_${formattedDate}`;
            // link.href = url;
            // if (blobData.type == "application/zip") {
            //   link.setAttribute("download", fileName + ".zip"); // download as .zip
            // } else {
            //   link.setAttribute("download", fileName + ".txt"); // download as .txt
            // }
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
          });
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `${error.errorMessage}`,
            icon: "DeleteIcon",
            variant: "danger",
          },
        });
      } finally {
      }
    },
    getMyCurrentPlan() {
      let token = useJwt.getToken();
      useJwt
        .getUserCurrentPlan(token)
        .then((response) => {
          this.currentPlan = response.data;

          this.isActive = this.currentPlan.active;
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Error fetching current plan`,
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },

    // async exportModalz() {
    //   // Fetch the invoices first
    //   await this.fetchInvoices();

    //   this.exportDto.companyId = this.companyID;
    //   this.exportDto.date = this.selectedMonthData.date;
    //   this.exportDto.platformName =
    //     this.companyinfo &&
    //     this.companyinfo.exportProperties &&
    //     this.companyinfo.exportProperties.platform
    //       ? this.companyinfo.exportProperties.platform
    //       : "Ajure";
    //   // Validate if the required fields have a value
    //   if (
    //     !this.exportDto.companyId ||
    //     !this.exportDto.date ||
    //     !this.exportDto.platformName
    //   ) {
    //     return;
    //   }
    //   // Show the modal
    //   this.$bvModal.show("export-info-modal");
    //   // Then get the export file
    //   await this.getExportFile();
    //   // Toggle the visibility of the modal
    //   this.isExportModalVisible = !this.isExportModalVisible;
    // },
    toggleExportModal() {
      this.isExportModalVisible = !this.isExportModalVisible;
    },
    togglenewExportModal(d) {
      this.$refs.new_export_model.show();
      this.exportData = d;
    },
    async exportRequestApiHandler() {
      this.exporting = true;
      const { data } = await axios.post(
        `${axios.defaults.baseURL}/account/api/export-single-bank-statement`,
        {
          companyId: this.exportData.companyId,
          id: this.exportData.id,
          platform: this.selectedCompany || "AJURE",
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // assuming accessToken is correct
            "Content-Type": "application/json",
          },
        }
      );
      this.refreshList();
      const dateString = new Date();
      const date = new Date(dateString);
      const blob = new Blob([data], { type: "text/csv" });
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      // Save the Blob as a file using FileSaver.js
      saveAs(blob, `EIC_${this.EIC}_BANK_STATEMENT_DATE_${formattedDate}`);
      try {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Bank Statement Exported Successfully",
            icon: "DeleteIcon",
            variant: "success",
          },
        });
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `${error.response.data.errorMessage}`,
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      } finally {
        this.selectedCompany = "";
        this.$refs.new_export_model.hide();
        this.exporting = false;
      }
    },

    showDatePickerModal() {
      this.$refs.export_model.show();
    },
    async getCompanies() {
      try {
        const response = await axios.get(
          `/account/api/export/get-supported-platforms`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        this.options = response.data;
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: `Error fetching companies`,
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      }
    },
    async getCompany() {
      let companyID = this.$route.params.id;
      try {
        const response = await axios.get(`/account/api/company/${companyID}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Access-Control-Allow-Credentials": true,
          },
        });
        this.platform = response.data.exportProperties?.platform;
        this.EIC = response.data.companyIdentificationNumber;
      } catch (error) {
        console.log(error);
      }
    },

    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleMonthSelect();
    },

    async getExportFile() {
      this.exportDto.companyId = router.currentRoute.params.id; // Set companyId to 85
      this.exportDto.date = this.selectedMonthData.date; // Set date to current date

      let companyName = this.companyDetails;
      const dateString = new Date();
      const date = new Date(dateString);

      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      let fileName = `EIC_${companyName.companyIdentificationNumber}_bank_statements_date_${formattedDate}`;
      const payload = {
        companyId: this.exportDto.companyId,
        date: this.exportDto.date,
        platformName: this.isGeneric ? "GENERIC" : this.exportDto.platformName,
      };

      this.$nextTick(() => {
        this.$bvModal.show("modal-spinner");
      });
      try {
        await axios
          .post(
            `${axios.defaults.baseURL}/account/api/export-bank-statements`,
            payload,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"), // assuming accessToken is correct
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              responseType: "blob",
            }
          )
          .then(function (response) {
            const headers = response.headers;
            const blobData = response.data;
            const exportDataBlob = new Blob([blobData], {
              type: blobData.type,
            });
            const url = window.URL.createObjectURL(exportDataBlob);
            const link = document.createElement("a");
            link.href = url;
            if (blobData.type == "application/zip") {
              link.setAttribute("download", fileName + ".zip"); // download as .zip
            } else {
              link.setAttribute("download", fileName + ".csv"); // download as .txt
            }
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
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
        this.isGeneric = false;
        this.$refs.modal_exportValue.hide();
      } catch (error) {
        if (error.response.status === 409) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Няма фактури за този период!`,
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        } else
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
        this.selectedMonthData.date =
          month.length === 1 ? `${year}-0${month}-01` : `${year}-${month}-01`;
        let companyID = this.$route.params.id;

        try {
          const response = await axios.get(
            `/account/api/company/${companyID}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
                "Access-Control-Allow-Credentials": true,
              },
            }
          );
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
      const totalRecordss = this.invoices?.length;
      let Records = (totalRecordss / 10) * 10 || 10;
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
          sortField: "id",
          verified: "true",
          searchTerm: this.searchQuery,
        },
      };
      const config1 = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          // sortField: this.sortBy,
          sortField: "id",
          verified: "true",
        },
      };
      try {
        if (
          this.startDate === "" &&
          this.endDate === "" &&
          this.searchQuery === ""
        ) {
          this.companyId = router.currentRoute.params.id;
          const data = await axios.get(
            `/account/api/bank-statement/list/${this.companyId}/1/${Records}`,
            config1
          );
          this.invoices = data.data.elements;
        } else {
          this.companyId = router.currentRoute.params.id;
          const data1 = await axios.post(
            `/account/api/bank-statement/search/${this.companyId}/1/${Records}`,
            payLoadDates,
            config
          );
          this.invoices = data1.data.elements;
        }
        tableAreaBusy.style.opacity = "1";
      } catch (error) {
        console.log("errrrrr->", error);
      }
    },

    observeScroll() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(async (entries) => {
        this.loadMore = true;
        if (entries[0].isIntersecting) {
          if (
            this.startDate === "" &&
            this.endDate === "" &&
            this.searchQuery === ""
          ) {
            await this.listInvoices();
          } else {
            await this.searchInvoices();
          }
          if (
            this.invoices !== null &&
            this.invoices?.length === this.totalInvoices
          ) {
            this.loadMore = false;
          } else {
            setTimeout(() => {
              this.loadMore = false;
            }, 300);
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
        documentType: null,
        transactionType: null,
        lastDays: null,
      };
      let config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          sortField: "id",
          verified: "true",
          queryString: this.searchQuery,
        },
      };
      this.companyId = router.currentRoute.params.id;
      await axios
        .post(
          `/account/api/bank-statement/search/${this.companyId}/1/${this.perPageRecords}`,
          data1,
          config
        )
        .then((res) => {
          this.invoices = res.data.elements;
          tableAreaBusy.style.opacity = "1";
          this.loadMore = false;
        });
    },

    async listInvoices() {
      this.pageNum += 1;
      let config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          // sortField: this.sortBy,
          sortField: "id",
          verified: "true",
        },
      };
      this.companyId = router.currentRoute.params.id;
      const data = await axios.get(
        `/account/api/bank-statement/list/${this.companyId}/${this.pageNum}/10`,
        config
      );
      if (data.data.elements.length > 1) {
        this.loadMore = true;
        if (this.pageNum > 1) {
          this.invoices.push(...data.data.elements);
          if (data.data.elements.length === 0) {
            this.pageNum -= 1;
          }
        }
      } else {
        this.loadMore = false;
        return false;
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
          sortField: "id",
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
          if (this.invoices?.length === this.totalInvoices) {
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

    showMsgBoxTwo(id, refetchData) {
      const h = this.$createElement;
      // Using HTML string
      // More complex structure
      const messageVNode = h("div", { class: ["bvModalFont"] }, [
        h("p", { class: ["text-center card-text"] }, [
          i18n.tc("Are you sure you want to delete this Bank Statement?"),
        ]),
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: "Delete Bank Statement",
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

    invoiceDelete(id, refetchData) {
      const token = useJwt.getToken();
      useJwt
        .DeleteBankStatement(token, id)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Bank Statement Deleted Successfully",
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
    addExportFile(event) {
      this.exportFiles = event.target.files;

      this.fileLoadingExport = true;
      const token = useJwt.getToken();
      const formData = new FormData();
      for (let i = 0; i < this.exportFiles?.length; i++) {
        formData.append("files", this.exportFiles[i]);
      }
      let companyID = this.$route.params.id;
      const dateString = new Date();
      const date = new Date(dateString);

      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      useJwt
        .addMultipleExportFiles(token, companyID, formData)
        .then((response) => {
          this.fileLoadingExport = false;
          const blob = new Blob([response.data], { type: "text/csv" });

          // Save the Blob as a file using FileSaver.js
          saveAs(blob, `EIC_${this.EIC}_Bank_Statements_DATE_${formattedDate}`);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.$t("invoice_details.invoice_exported_successfully"),
              icon: "AlertTriangleIcon",
              variant: "success",
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
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      companyId,
      statusFilter,
      refetchData,
      invoices,
      resolveInvoiceStatusVariantAndIcon,
      statusOptions,
      avatarText,
      resolveClientAvatarVariant,
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
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.cursor-button .custom-file label {
  cursor: pointer;
}

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
.desctag {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 190px;
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

.file-input2 {
  position: absolute;
  left: 336px !important;
  top: 0;
  width: 15%;
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
