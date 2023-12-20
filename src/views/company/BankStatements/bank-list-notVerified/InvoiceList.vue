<template>
  <!--  Table Container Card Starts  -->
  <b-card no-body class="h-100">
    <div class="m-2">
      <!--  Table Top Starts  -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="7"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0 pr-0"
        >
          <!-- <label>Entries</label>
          <v-select v-model="perPage" @input="getMoreLoadInv" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" /> -->
          <b-button
            variant="primary"
            class="mr-1 position-relative p-set"
            v-if="isActive"
            :disabled="multiplefileLoading"
          >
            <b-form-file
              ref="imageUploader"
              class="file-input"
              multiple
              @change="addMultiplefile"
            />
            <b-spinner v-if="multiplefileLoading" small variant="light" />
            Add Multiple Bank St.
            <!-- Add Multiple Invoices -->
            <svg-icon
              width="20"
              height="20"
              class="file-upload"
              type="mdi"
              :path="path1"
            />
          </b-button>
          <b-button
            variant="primary"
            class="mr-1 position-relative p-set"
            :disabled="!isActive || multiplefileLoading"
            v-else
          >
            <b-spinner v-if="multiplefileLoading" small variant="light" />
            Add Multiple Bank St.
            <!-- Add Multiple Invoices -->
            <svg-icon
              width="20"
              height="20"
              class="file-upload"
              type="mdi"
              :path="path1"
            />
          </b-button>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="refreshList()"
          >
            <feather-icon icon="RefreshCcwIcon" />
          </b-button>
          <!-- Progressbar -->
          <div class="progress-item d-flex flex-column w-50 ml-2">
            <h5 class="text-center">{{ progressStatus }}</h5>
            <b-progress
              v-if="progressCount == 100"
              :value="progressCount"
              :max="100"
              variant="success"
              show-value
            >
              <b-progress-bar
                :value="progressCount"
                :label="`${((progressCount / 100) * 100).toFixed(2)}%`"
              ></b-progress-bar>
            </b-progress>
            <b-progress
              v-else
              :value="progressCount"
              :max="100"
              variant="primary"
              show-value
            >
              <b-progress-bar
                :value="progressCount"
                :label="`${((progressCount / 100) * 100).toFixed(2)}%`"
              ></b-progress-bar>
            </b-progress>
          </div>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="5">
          <div class="d-flex align-items-center justify-content-end">
            <div class="position-relative mr-1 filter-date">
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
            </div>
            <div class="position-relative mr-1 filter-date">
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
            <div class="position-relative flex-1">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder="$t('company_invoices.search')"
              />
              <feather-icon
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                @click="searchQuery = ''"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <!--  Table Top Ends  -->
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

    <!--  Table Starts  -->
    <b-table
      ref="refInvoiceListTable"
      :items="isCheck === false ? fetchInvoices : invoices"
      :fields="tableColumns"
      responsive
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList"
      id="company-invoices-not-verified"
    >
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
          <span class="text-nowrap">{{ data.value }}</span>
        </b-link>
      </template>

      <!-- Column: SEE IMAGE -->
      <template #head(img)>
        {{ $t("company_invoices.file") }}
      </template>
      <template #cell(img)="data">
        <span class="text-nowrap">
          <span v-if="false"> {{ data.value }}</span>
          <span v-else
            ><img
              :src="require('@/assets/images/dummyInvoice.jpeg')"
              alt="cursor-pointer"
              @click="
                isFetching
                  ? null
                  : getImage(data.item.binaryId, data.item.id, 2)
              "
              class="cursor-pointer"
              style="height: 30px; width: 30px"
          /></span>
        </span>
      </template>
      <template #head(exported)>
        {{ $t("company_invoices.Export_invoice") }}
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

      <!-- Column: Actions -->
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
            class="mx-1 cursor-pointer"
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
            dropleft
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
    <!--  Loading Spinner Ends  -->
    <b-modal id="modal-center-media-ocr" title="Download Image" hide-footer>
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
import { ref } from "@vue/composition-api";
import axios from "@/libs/axios";
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
  BImg,
  BModal,
  BCardHeader,
  BFormFile,
  BSpinner,
  BProgress,
  BProgressBar,
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
import { mdiCloudUploadOutline } from "@mdi/js";
import flatPickr from "vue-flatpickr-component";
import InvoiceDownload from "../invoice-download/InvoiceDownload.vue";
import invoiceStoreModule from "../invoiceStoreModule";
import useInvoicesList from "./useInvoiceList";
import Ripple from "vue-ripple-directive";
// import VProgressLinear from "vuetify/lib/components/VProgressLinear"

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
    BCardText,
    BAlert,
    VBToggle,
    VueHtml2pdf,
    BCardHeader,
    InvoiceDownload,
    BFormFile,
    BImg,
    BModal,
    SvgIcon,
    BSpinner,
    BProgress,
    BProgressBar,
    flatPickr,
    // VProgressLinear,
  },

  props: ["invoiceTab"],

  data() {
    return {
      isActive: false,
      loadMore: false,
      startDate: "",
      endDate: "",
      isFetching: false,
      clickedImageType: "png",
      perPageRecords: 10,
      pageNum: 1,
      isCheck: false,
      comp: {},
      imageD: "",
      file: null,
      fileLoading: false,
      path: mdiTrayArrowUp,
      images: [{ image: "", type: "", id: "" }],
      images1: [],
      observer: null,
      multiplefile: null,
      multiplefileLoading: false,
      path1: mdiCloudUploadOutline,
      companyPlatform: "",
    };
  },

  watch: {
    endDate: function () {
      this.handleSearchSelect(10);
    },
    startDate: function () {
      this.handleSearchSelect(10);
    },
    searchQuery: function () {
      this.handleSearchSelect(10);
    },
  },

  directives: {
    Ripple,
  },
  mounted() {
    setTimeout(() => {
      this.isCheck = true;
    }, 1500);
    this.observeScroll();
    this.refreshList();
    this.getMyCurrentPlan();
    this.getCompany();
  },

  methods: {
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
              self.$bvModal.show("modal-center-media-ocr");
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
    async refreshList() {
      var tableAreaBusy = document.getElementById(
        "company-invoices-not-verified"
      );
      tableAreaBusy.style.opacity = "0.5";
      this.isCheck = true;
      // let totalRecordss = this.invoices.length;
      let Records;
      // this.pageNum = Records / 10;
      // if (totalRecordss < 10) {
      Records = 10;
      this.pageNum = 1;
      // }
      let payLoadDates = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      let config = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          sortField: "id",
          verified: "false",
          searchTerm: this.searchQuery,
        },
      };
      let config1 = {
        params: {
          direction: this.isSortDirDesc ? "desc" : "asc",
          sortField: "id",
          verified: "false",
        },
      };

      if (
        this.startDate === "" &&
        this.startDate === "" &&
        this.searchQuery === ""
      ) {
        const data = await axios.get(
          `/account/api/bank-statement/list/${this.companyId}/1/${Records}`,
          config
        );
        this.invoices = data.data.elements;
      } else {
        const data1 = await axios.post(
          `/account/api/bank-statement/search/${this.companyId}/1/${Records}`,
          payLoadDates,
          config
        );
        this.invoices = data1.data.elements;
      }

      tableAreaBusy.style.opacity = "1";
      this.loadMore = false;
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

          // Check if there are no more invoices to load
          if (this.invoices.length === this.totalInvoices) {
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

    // Hadling DateSelects and Search field
    async handleSearchSelect() {
      var tableAreaBusy = document.getElementById(
        "company-invoices-not-verified"
      );
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
          verified: "false",
          queryString: this.searchQuery,
        },
      };
      this.companyId = router.currentRoute.params.id;
      const data = await axios
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
          verified: "false",
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
          verified: "false",
          searchTerm: this.searchQuery,
        },
      };
      const data = await axios.post(
        `/account/api/bank-statement/search/${this.companyId}/${this.pageNum}/10`,
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
          "Are you sure you want to delete this Bank Statement?",
        ]),
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: "Delete Bank Statement",
          okVariant: "primary",
          okTitle: this.$t("companies.confirm"),
          cancelTitle: this.$t("company_invoices.cancel"),
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

    addMultiplefile(event) {
      const self = this;

      this.multiplefile = event.target.files;
      this.multiplefileLoading = true;
      const companyID = router.currentRoute.params.id
        ? router.currentRoute.params.id
        : router.currentRoute.params.id;
      const token = useJwt.getToken();
      const formData = new FormData();
      for (let i = 0; i < this.multiplefile.length; i++) {
        formData.append("files", this.multiplefile[i]);
      }

      let myInterval = setInterval(function () {
        axios
          .get("/account/api/progress/" + `${companyID}`)
          .then((response) => {
            const progressVal = response.data;
            if (progressVal?.length !== 0 && progressVal !== undefined) {
              self.progressCount = progressVal.progress;
              self.progressStatus = progressVal.progressStatus;
              console.log(self.progressCount, self.progressStatus);
            }
            if (progressVal.progress == "100") {
              clearInterval(myInterval);
            }
          });
      }, 5000);

      useJwt
        .addMultipleBankStatemtents(
          token,
          companyID,
          this.companyPlatform,
          formData
        )
        .then((response) => {
          this.multiplefileLoading = false;
          self.refetchData();
          this.refreshList();
          event.target.value = "";
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Please check tab "Bull OCR Docs" of the company',
              icon: "EditIcon",
              variant: "success",
            },
          });
        })
        .catch((error) => {
          this.multiplefileLoading = false;
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
    getCompany() {
      axios
        .get(`/account/api/company/${router.currentRoute.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "https://coherent-accounting.com",
          },
        })
        .then((response) => {
          this.companyPlatform = response.data.exportProperties.platform;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
  },

  created() {
    // window.addEventListener("scroll", this.handleScroll);
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
      startDate,
      endDate,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      companyId,
      statusFilter,
      invoices,
      refetchData,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList();

    companyId.value = router.currentRoute.params.id;
    const skill = ref(20);
    const progressCount = ref(0);
    const progressStatus = ref(null);
    let myInterval = window.setInterval(function () {
      axios
        .get("/account/api/progress/" + `${companyId.value}`)
        .then((response) => {
          const progressVal = response.data;
          if (progressVal?.length !== 0 && progressVal !== undefined) {
            progressCount.value = progressVal.progress;
            progressStatus.value = progressVal.progressStatus;
          }
          if (progressVal.progress == "100" || progressCount.value == 0) {
            clearInterval(myInterval);
          }
        });
    }, 1000);

    return {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      startDate,
      endDate,
      companyId,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      statusFilter,
      invoices,
      refetchData,
      statusOptions,
      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
      skill,
      progressCount,
      progressStatus,
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

.invoice-preview.date-issued {
  width: max-content;
  margin-right: 0;
  margin-left: auto;
}

.invoiceNumber {
  font-weight: 500;
  font-size: 16px;
}

.dark-layout .card.invoice-card {
  border-color: #3b4253 !important;
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
