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
          <b-button
            class="mr-1"
            variant="primary"
            :to="{
              name: 'company-vat-report-add',
              params: { companyId: $route.params.id },
            }"
            @click="actionTab"
          >
            {{ $t("vat_reports.add_vat_report") }}
          </b-button>

          <!-- Generate Button -->

          <b-button v-b-modal.modal-prevent-closing variant="primary">
            {{ $t("vat_reports.generate_vat_report") }}
          </b-button>
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

    <!-- Modal pop-up to select month -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      :title="$t('company_info.selectMonth')"
      :ok-title="loadModal"
      cancel-title="Close"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :ok-disabled="modalDisabledMonth"
    >
      <form ref="form" @submit.stop.prevent="handleMonthSelected">
        <validation-observer ref="selectMonthRules" tag="form">
          <validation-provider
            #default="{ errors }"
            :name="$t('month_selected')"
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

    <!-- Modal pop-up containing the list of invoices for vat report -->
    <b-modal
      id="modal-invoices-for-report"
      ref="modal"
      :title="$t('company_info.invoiceForVat')"
      ok-title="Download Zip"
      cancel-title="Close"
      scrollable
      @ok="getZipFile(refetchData)"
      :ok-disabled="modalDisabled"
    >
      <form ref="form" @submit.stop.prevent="handleMonthSelected">
        <!-- invoices-for-vat-reports Table -->
        <b-table
          :items="invoicesForReport"
          responsive
          :fields="InvoicesTableColumns"
          primary-key="id"
          show-empty
          empty-text="No matching records found"
          class="position-relative invoiceList"
        >
          <template #empty="scope">
            <div class="d-flex align-items-center justify-content-center">
              <div class="mb-1 start-chat-icon">
                <feather-icon icon="FolderIcon" size="35" />
              </div>
              <h5 class="sidebar-toggle start-chat-text">No records found</h5>
            </div>
          </template>

          <template #cell(isChecked)="data">
            <b-form-checkbox
              :id="'checkbox' + data.item.id"
              v-model="status[data.index].value"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            />
          </template>

          <!-- Invoice Number -->
          <template #cell(invoiceNumber)="data">
            <span class="text-nowrap">
              {{ data.value }}
            </span>
          </template>

          <!-- recepientCompanyName -->
          <template #cell(recipientCompanyName)="data">
            <span class="text-nowrap">
              {{ data.item.recipientCompany.companName }}
            </span>
          </template>

          <!-- supplierCompanyName -->
          <template #cell(supplierCompanyName)="data">
            <span class="text-nowrap">
              {{ data.item.supplierCompany.companName }}
            </span>
          </template>

          <!-- transactionType -->
          <template #cell(transactionType)="data">
            <span class="text-nowrap">
              {{ data.value }}
            </span>
          </template>

          <!-- dateIssued -->
          <template #cell(dateIssued)="data">
            <span class="text-nowrap">
              {{ data.value }}
            </span>
          </template>
        </b-table>
      </form>
    </b-modal>

    <!-- Spinner Modal -->
    <b-modal id="modal-spinner" ref="modal">
      <b-button variant="primary" disabled style="font-size: 20px">
        <b-spinner style="width: 1.7rem; height: 1.7rem"></b-spinner>
        The file is being downloaded...
      </b-button>
    </b-modal>

    <!-- Add Assets -->
    <b-modal
      id="add-asset-modal"
      ref="modal"
      :title="$t('company_documents.add_asset')"
      :ok-title="$t('clients_or_recipients.add')"
      :cancel-title="$t('update_tickets.close')"
      @ok="createAsset()"
    >
      <b-row>
        <b-col class="pb-2" cols="12">
          <b-input-group class="input-group-merge">
            <b-form-textarea
              v-model="notes"
              :placeholder="$t('vat_reports.binaryFile')"
              rows="5"
            />
          </b-input-group>
        </b-col>
        <b-col cols="12">
          <file-pond
            ref="pond"
            required
            name="file"
            :label-idle="$t('vat_reports.dropFiles')"
            :allow-multiple="false"
            :files="myFiles"
            :server="server"
          />
        </b-col>
      </b-row>
    </b-modal>

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
      <template #empty="scope">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mb-1 start-chat-icon">
            <feather-icon icon="FolderIcon" size="40" />
          </div>
          <h5 class="sidebar-toggle start-chat-text">No records found</h5>
        </div>
      </template>

      <!-- Column: period-->
      <template #head(period)>
        {{ $t("vat_reports.period") }}
      </template>
      <template #cell(period)="data">
        <span class="text-nowrap">
          {{ data.value.substr(0, 7) }}
        </span>
      </template>

      <!-- Column: nameAndAddress -->
      <template #head(nameAndAddress)>
        <span class="text-nowrap">
          {{ $t("vat_reports.company_name_and_address") }}
        </span>
      </template>
      <template #cell(nameAndAddress)="data">
        {{ data.value }}
      </template>

      <!-- Column: cell-01 -->
      <template #head(cell01)>
        {{ $t("vat_reports.total_sum_base_taxes") }}
      </template>
      <template #cell(cell-01)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-20 -->
      <template #head(cell20)>
        {{ $t("vat_reports.total_vat") }}
      </template>
      <template #cell(cell-20)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-30 -->
      <template #head(cell30)>
        {{ $t("vat_reports.base_tax_addition") }}
      </template>
      <template #cell(cell-30)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-31 -->
      <template #head(cell31)>
        {{ $t("vat_reports.with_full_tax_credit") }}
      </template>
      <template #cell(cell-31)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-40 -->
      <template #head(cell40)>
        {{ $t("vat_reports.total_tax_credit") }}
      </template>
      <template #cell(cell-40)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-50 -->
      <template #head(cell50)>
        {{ $t("vat_reports.vat_to_pay") }}
      </template>
      <template #cell(cell-50)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-60 -->
      <template #head(cell60)>
        {{ $t("vat_reports.vat_to_exclude") }}
      </template>
      <template #cell(cell-60)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-70 -->
      <template #head(cell70)>
        {{ $t("vat_reports.tax_to_pay") }}
      </template>
      <template #cell(cell-70)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: cell-71 -->
      <template #head(cell71)>
        {{ $t("vat_reports.tax_to_pay_effective") }}
      </template>
      <template #cell(cell-71)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #head(actions)>
        {{ $t("companies.actions") }}
      </template>
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <feather-icon
            :id="`report-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mr-1 cursor-pointer"
            @click="
              $router.push({
                name: 'company-vat-report-preview',
                params: { id: data.item.id, companyId: companyID },
              })
            "
          />
          <b-tooltip
            :title="$t('company_info.preview')"
            class="cursor-pointer"
            :target="`report-row-${data.item.id}-preview-icon`"
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
              :to="{
                name: 'company-vat-report-edit',
                params: { companyId: companyID, id: data.item.id },
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

          <!-- assets check -->
          <feather-icon
            v-if="data.item.asset === null"
            :id="`report-row-${data.item.id}-no-asset-icon`"
            icon="DatabaseIcon"
            size="16"
            color="red"
            class="mx-1 cursor-pointer"
            v-b-modal.add-asset-modal
            @click="
              () => {
                vatIdtoUpdate = data.item.id;
                vatReport = data.item;
              }
            "
          />
          <!--  @click="gotoAddAsset()"  
                $router.push({
                name: 'CompanyView',
                params: {id: companyID,  InvoiceId: 5 },
                
              }) -->
          <feather-icon
            v-else
            :id="`report-row-${data.item.id}-asset-icon`"
            icon="DatabaseIcon"
            size="16"
            color="green"
            class="mx-1 cursor-pointer"
          />
          <b-tooltip
            :title="$t('company_documents.add_asset')"
            class="cursor-pointer"
            :target="`report-row-${data.item.id}-no-asset-icon`"
          />

          <b-tooltip
            :title="$t('company_info.assets')"
            class="cursor-pointer"
            :target="`report-row-${data.item.id}-asset-icon`"
          />
        </div>
      </template>
    </b-table>

    <!-- Pagination -->
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-if="totalVatReports > 0"
            v-model="currentPage"
            :total-rows="totalVatReports"
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
    </div>
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
  BFormCheckbox,
  BSpinner,
  BInputGroup,
  BFormTextarea,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import VueHtml2pdf from "vue-html2pdf";
import useJwt from "@/auth/jwt/useJwt";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "@validations";

import VueMonthlyPicker from "vue-monthly-picker";

import axios from "@/libs/axios";
import vatReportsStoreModule from "../vatReportsStoreModule";
import useVatReportsList from "./useVatReportsList";
import { i18n } from "@/main.js";
import vueFilePond from "vue-filepond";
// eslint-disable-next-line import/no-extraneous-dependencies
import "filepond/dist/filepond.min.css";
// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

extend("required", {
  ...required,
  message: "This field is mandatory",
});

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
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
    BFormCheckbox,
    BCardText,
    BAlert,
    VBToggle,
    VueHtml2pdf,
    BCardHeader,
    BSpinner,
    //   InvoiceDownload
    useVatReportsList,
    vatReportsStoreModule,
    ValidationProvider,
    ValidationObserver,
    VueMonthlyPicker,
    BInputGroup,
    BFormTextarea,
  },
  props: ["vatReportsTab"],
  data() {
    const self = this;
    return {
      dataToSend: {},
      vatIdtoUpdate: "",
      vatReport: "",
      binary: {},
      // binary: {
      //   binaryId: '',
      //   companyId:''
      // },
      notes: "",
      myFiles: [],
      loadModal: "Submit",
      modalDisabled: true,
      modalDisabledMonth: false,
      checkedAll: true,
      idsToSend: [],
      totalInvoicesForReport: "",
      status: [
        {
          id: "",
          value: "",
        },
      ],
      invoicesForReport: [],
      selectedMonthData: {
        companyId: "",
        date: "",
        pageNumber: 1,
        pageSize: 5000,
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
      server: {
        process: (
          fieldName,
          file,
          metadata,
          load,
          error,
          progress,
          abort,
          transfer,
          options
        ) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("companyId", router.currentRoute.params.id);

          const request = new XMLHttpRequest();
          const token = localStorage.getItem("accessToken");
          request.open(
            "POST",
            `${axios.defaults.baseURL}/binaries/api/store-binary/${this.$route.params.id}`
          );

          request.setRequestHeader("Authorization", `Bearer ${token}`);
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          };
          // eslint-disable-next-line func-names
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              console.log(request.response);
              // this.onResponse(request.response);
              self.binary = JSON.parse(request.response);
              // console.log(self.binary);
              load(request.responseText);
              // self.createAsset();
            } else {
              error("oh no");
            }
          };
          request.send(formData);
          return {
            abort: () => {
              request.abort();
              abort();
            },
          };
        },
      },
    };
  },
  computed: {
    InvoicesTableColumns() {
      return [
        { key: "isChecked", label: this.$t("invoiceTable.isChecked") },
        { key: "invoiceNumber", label: this.$t("invoiceTable.invoiceNumber") },
        {
          key: "recipientCompanyName",
          label: this.$t("invoiceTable.recipientCompanyName"),
        },
        {
          key: "supplierCompanyName",
          label: this.$t("invoiceTable.supplierCompanyName"),
        },
        {
          key: "transactionType",
          label: this.$t("invoiceTable.transactionType"),
        },
        { key: "dateIssued", label: this.$t("invoiceTable.dateIssued") },
      ];
    },
  },
  created() {
    this.companyID = this.$route.params.id;
    this.selectedMonthData.companyId = this.companyID;
  },
  methods: {
    state() {
      return 1;
    },

    // Updaing Vat-Reports Asset
    async updateVatReport() {
      var config = this.vatReport;

      // config.asset = {
      //   binaryId: this.binary.binaryId,
      //   notes: this.notes,
      //   type: "ASSET",
      //   id:0
      // };

      config.asset = this.dataToSend;
      // console.log(config);

      await axios
        .put("/account/api/report/update/" + this.vatIdtoUpdate, config)
        .then(async (response) => {
          if (response.status === 201 || response.status === 200) {
            this.notes = "";
            // console.log("success");
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Vat updated successfully!",
                icon: "DeleteIcon",
                variant: "success",
              },
            });
            this.refetchData();
          }
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Something went wrong`,
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },

    onResponse(r) {
      this.binary = JSON.parse(r);
      console.log("binary file " + this.binary);
    },

    async createAsset() {
      const postData = {};
      postData.binaryId = this.binary.binaryId;
      postData.notes = this.notes;
      postData.type = "ASSET";
      postData.id = 0;
      // console.log(postData);

      await axios
        .post("/account/api/asset/create", postData)
        .then(async (response) => {
          if (response.status === 201 || response.status === 200) {
            this.notes = "";
            let val = JSON.parse(response.data.binaryId);
            this.dataToSend.binaryId = val.binaryId;
            this.dataToSend.notes = response.data.notes;
            this.dataToSend.type = response.data.type;
            this.dataToSend.id = response.data.id;
            // console.log(this.dataToSend);

            this.updateVatReport();
          }
        })
        .catch((error) => {});
    },

    // getting zip file from backend
    getZipFile(refetchData) {
      this.$nextTick(() => {
        this.$bvModal.show("modal-spinner");
      });
      let j = 0;
      for (let i = 0; i < this.totalInvoicesForReport; i++) {
        if (this.status[i].value == "accepted") {
          this.idsToSend[j] = this.invoicesForReport[i].id;
          j++;
        }
      }

      const token = useJwt.getToken();
      useJwt.GetVatReportsZip(token, this.idsToSend).then((response) => {
        if (response.data.fileId != null) {
          const data = JSON.parse(response.data.fileId);
          axios
            .get(
              `${axios.defaults.baseURL}/binaries/api/get-binary/${data.binaryId}/${data.companyId}`,
              { responseType: "blob" }
            )
            .then((response) => {
              // console.log(response);
              if (response.status === 200) {
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {
                  const filePath = reader.result;
                  const a = document.createElement("a");
                  a.href = filePath;
                  a.download = `${data.binaryId}`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                };

                //
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
                refetchData();
              }
            })
            .catch((error) => {
              // console.log(error);
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `Something went wrong`,
                  icon: "AlertTriangleIcon",
                  variant: "danger",
                },
              });
            });
        }
        this.invoicesForReport = [];
      });
    },

    //
    resetModal() {
      this.selectedMonthData.date = "";
      this.modalDisabledMonth = false;
      this.loadModal = "Submit";
    },

    //
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      this.loadModal = "Loading...";
      this.modalDisabledMonth = true;
      // Trigger submit handler
      this.handleMonthSelected();
    },

    //
    handleMonthSelected() {
      this.modalDisabled = true;
      this.invoicesForReport = [];
      this.$refs.selectMonthRules.validate().then((success) => {
        if (success) {
          let monthVal;
          const tPeriod = this.selectedMonthData.date._i;

          const year = tPeriod.substring(0, 4);
          const month = tPeriod.substring(5, tPeriod.length);

          if (month.length === 1) {
            monthVal = `${year}-0${month}-01`;
          } else {
            monthVal = `${year}-${month}-01`;
          }

          this.selectedMonthData.date = monthVal;
          const token = useJwt.getToken();
          useJwt
            .InvoicesForVatReport(token, this.selectedMonthData)
            .then((response) => {
              let val = response.data;
              this.invoicesForReport = val.elements;
              this.totalInvoicesForReport = this.invoicesForReport.length;
              for (let i = 0; i < this.totalInvoicesForReport; i++) {
                // this.status[this.invoicesForReport[i].id] = "accepted";
                this.status[i] = {
                  id: this.invoicesForReport[i].id,
                  value: "accepted",
                };
              }

              //
              if (this.totalInvoicesForReport === 0) {
                this.modalDisabled = true;
              } else {
                this.modalDisabled = false;
              }
              // console.log(this.invoicesForReport);

              this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-closing");
              });

              this.$nextTick(() => {
                this.$bvModal.show("modal-invoices-for-report");
              });
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

              this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-closing");
              });
            });
        }
      });
    },

    //
    actionTab() {
      this.$emit("state", this.state());
    },
    showMsgBoxTwo(id, refetchData) {
      const h = this.$createElement;
      // Using HTML string
      // More complex structure
      const messageVNode = h("div", { class: ["bvModalFont"] }, [
        h("p", { class: ["text-center card-text"] }, [
          i18n.tc("vat_reports.delete_vat_confirm"),
        ]),
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: i18n.tc("vat_reports.delete_vat"),
          okVariant: "primary",
          okTitle: i18n.tc("companies.confirm"),
          cancelTitle: i18n.tc("clients_or_recipients.cancel"),
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.vatReportDelete(id, refetchData);
          }
        });
    },
    // Delete vat report
    vatReportDelete(id, refetchData) {
      const token = useJwt.getToken();
      useJwt
        .DeleteVatReport(token, id)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Vat Deleted Successfully",
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          refetchData();
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
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "vat-reports";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) {
      store.registerModule(
        INVOICE_APP_STORE_MODULE_NAME,
        vatReportsStoreModule
      );
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const {
      fetchVatReports,
      tableColumns,
      perPage,
      currentPage,
      companyId,
      totalVatReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVatReportsTable,

      refetchData,
    } = useVatReportsList();

    companyId.value = router.currentRoute.params.id;

    return {
      fetchVatReports,
      tableColumns,
      perPage,
      currentPage,
      companyId,
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
.filepond--root .filepond--credits {
  display: none !important;
}

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

.vue-monthly-picker .input {
  width: 76% !important;
}

.vue-monthly-picker .selected {
  background-color: #7367f0 !important;
}

@media (min-width: 576px) {
  .modal-dialog {
    margin: 1rem auto auto auto;
  }

  #modal-invoices-for-report .modal-dialog {
    max-width: 900px !important;
  }

  #modal-invoices-for-report .modal-dialog {
    margin: 8rem auto auto auto;
    height: auto;
    max-height: 42rem !important;
  }

  #modal-spinner .modal-header {
    display: none !important;
  }

  #modal-spinner .modal-header {
    display: none !important;
  }

  #modal-spinner .modal-footer {
    display: none !important;
  }

  #modal-spinner .modal-content {
    width: fit-content !important;
    margin-left: 60px !important;
  }

  #modal-spinner .modal-body {
    padding: 0px !important;
  }

  #modal-spinner .modal-dialog {
    margin: 20rem auto auto auto;
  }
}
</style>
