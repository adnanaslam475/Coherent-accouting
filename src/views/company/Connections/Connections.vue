<template>
  <div class="row">
    <div class="col-md-3 mb-4">
      <b-card
        title=""
        style=""
        class="h-100 d-flex align-items-center justify-content-center"
      >
        <img
          src="@/assets/images/Quick-Books@2x.png"
          width="50px"
          class=""
          height="50px"
          alt=""
        />
        <p>Connect to Quickbooks online</p>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="outline-primary"
          class="mt-2 mr-1 custom-button"
        >
          Connect
        </b-button>
      </b-card>
    </div>
  </div>
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
        process: (file, load, error, progress, abort) => {
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
  mounted() {
    console.log("onmounteddddddddddddddd");
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

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    return {};
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
