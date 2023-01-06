<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-lg-8 col-xl-8 col-12 mb-lg-0 mb-1">
        <!-- Company Details -->
        <div class="card border-primary">
          <!----><!---->
          <div class="card-body" style="padding: 0px">
            <!----><!---->
            <div class="row" style="padding: 15px 0px 10px 15px">
              <div
                class="d-flex justify-content-between flex-column col-5"
                style="padding-left: 0.5rem; padding-right: 0.5rem"
              >
                <div class="card" style="margin-right: 10px">
                  <div class="card-body" style="padding: 0px">
                    <div class="d-flex justify-content-start">
                      <span
                        class="b-avatar rounded"
                        style="width: 6rem; height: 6rem;"
                      >
                        <feather-icon
                          icon="HomeIcon"
                          size="104"
                          color="#7367f0"
                        />
                      </span>

                      <div class="d-flex flex-column ml-1">
                        <div class="mb-1">
                          <!-- <CopyToClipboard v-if="companyNameLength >= 34"
                            :text="compNAME"
                            @copy="copyTextNoInput(8)"
                          >
                          <h4  class="mb-0" style="cursor: pointer"  id="comp-name-copy">
                            {{ companyName.substr(0, 36) }}
                          </h4></CopyToClipboard> -->

                          <CopyToClipboard
                            :text="compNAME"
                            @copy="copyTextNoInput(8)"
                          >
                          <h4
                            id="comp-name-copy"
                            class="mb-0"
                            style="cursor: pointer"
                          >
                            {{ companyRecord.companyName }}
                          </h4></CopyToClipboard>
                          <b-tooltip target="comp-name-copy">{{
                            copyToClipboard
                          }}</b-tooltip>
                          <span class="card-text">{{
                            companyRecord.companyMail
                          }}</span>
                        </div>
                        <div class="d-flex flex-wrap">
                          <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            size="sm"
                            variant="primary"
                            class="text-capitalize"
                            @click="editCompany()"
                            > {{ $t('company_info.edit') }}
                          </b-button>

                          <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="danger"
                            size="sm"
                            class="ml-1 text-capitalize"
                            @click="deleteModalShow = !deleteModalShow"
                          >
                             {{ $t('company_info.delete') }}
                          </b-button>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                      <div class="d-flex align-items-center" style="margin-right: 5px">
                        <feather-icon
                          icon="UserIcon"
                          width="18px"
                          height="18px"
                          style="margin-left: 8px; margin-right: -5px"
                        />
                        <div class="ml-1">
                          <p class="mb-0 font-weight-bold">{{ $t('company_info.owner_name')}} </p>
                          <CopyToClipboard
                            :text="companyOwnerName"
                            @copy="copyTextNoInput(1)"
                          >
                          <small
                            id="comp-owner-copy"
                            style="cursor: pointer"
                            >{{ companyOwnerName }}</small
                          ></CopyToClipboard>
                          <b-tooltip target="comp-owner-copy">{{
                            copyToClipboard
                          }}</b-tooltip>
                        </div> 
                      </div>
                      <div class="d-flex align-items-center">
                        <feather-icon
                          icon="InfoIcon"
                          width="18px"
                          height="18px"
                          style="margin-left: 8px; margin-right: -5px"
                        />
                        <div class="ml-1">
                          <p class="mb-0 text-capitalize font-weight-bold"> {{ $t('company_info.owner_egn') }} </p>
                          <CopyToClipboard
                            :text="companyOwnerEGN"
                            @copy="copyTextNoInput(2)"
                          >
                          <small
                            v-if="companyOwnerEGN != null"
                            id="comp-egn-copy"
                            style="cursor: pointer"
                            >{{ companyOwnerEGN }}</small
                          >
                          <small v-else></small>
                        </CopyToClipboard>

                         
                          <b-tooltip target="comp-egn-copy">{{
                            copyToClipboard
                          }}</b-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-7">
                <b-row style="margin-right: 0rem">
                  <b-col cols="12" style="padding-left: 0.7rem">
                    <table class="mt-2 mt-xl-0 w-100 company-info-table">
                      <!-- Company ID -->
                      <tr>
                        <th class="pb-50">
                          <!-- <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-75 feather feather-star"
                          >
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            />
                          </svg> -->
                          <feather-icon icon="StarIcon" class="mr-75" />

                          <span class="font-weight-bold text-capitalize">{{ $t('company_info.company_id') }}</span>
                        </th>
                        <td class="pb-50 text-capitalize">
                          <CopyToClipboard
                            :text="compID"
                            @copy="copyTextNoInput(3)"
                          >
                          <p
                            id="comp-id-copy"
                            style="
                              width: fit-content;
                              margin: 0px;
                              cursor: pointer;
                            "
                          >
                            {{ companyRecord.companyIdentificationNumber }}
                          </p></CopyToClipboard>
                        </td>
                        <b-tooltip target="comp-id-copy">{{
                          copyToClipboard
                        }}</b-tooltip>
                        <!--  -->
                      </tr>
                       <!-- Company Vat Number -->
                      <tr>
                        <th class="pb-50">
                          <feather-icon icon="FlagIcon" class="mr-75" />
                          <span class="font-weight-bold">{{ $t('company_info.vat_number') }}</span>
                        </th>
                        <td
                          v-if="companyRecord.companyVatNumber != null"
                          class="pb-50 text-capitalize"
                        >
                          <CopyToClipboard
                            :text="compVAT"
                            @copy="copyTextNoInput(4)"
                          >
                            <p
                              id="comp-vat-copy"
                              style="
                                width: fit-content;
                                margin: 0px;
                                cursor: pointer;
                              "
                            >
                              {{ companyRecord.companyVatNumber }}
                            </p></CopyToClipboard>
                            <b-tooltip target="comp-vat-copy">{{
                              copyToClipboard
                            }}</b-tooltip>
                          
                        </td>
                        <td v-else class="pb-50 text-capitalize"></td>
                      </tr>
                       <!-- Company Bank Account -->
                      <tr>
                        <th class="pb-50">
                          <feather-icon icon="CreditCardIcon" class="mr-75" />
                          <span class="font-weight-bold text-capitalize">{{$t('company_info.bank_account') }}</span>
                        </th>
                        <td
                        v-if="companyRecord.companyBankAccount != null"
                          class="pb-50"
                        >
                        <CopyToClipboard 
                            :text="compBANKACCOUNT"
                            @copy="copyTextNoInput(5)"
                            class="abbbc"
                          >
                          <p 
                            id="comp-account-copy"
                            style="
                              width: fit-content;
                              margin: 0px;
                              cursor: pointer;
                            "
                          >
                            {{ companyRecord.companyBankAccount }}
                          </p></CopyToClipboard>
                          <b-tooltip target="comp-account-copy">{{
                            copyToClipboard
                          }}</b-tooltip>
                        </td>
                        <td v-else class="pb-50"></td>
                      </tr>
                       <!-- Company Phone -->
                      <tr>
                        <th class="pb-50">
                          <!-- <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-75 feather feather-phone"
                          >
                            <path
                              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                            />
                          </svg> -->
                          <feather-icon icon="PhoneIcon" class="mr-75" />
                          <span class="font-weight-bold text-capitalize">{{ $t('company_info.contact') }}</span>
                        </th>
                        <td class="pb-50">
                          <CopyToClipboard
                            :text="compCONTACT"
                            @copy="copyTextNoInput(6)"
                          >
                          <p
                            id="comp-contact-copy"
                            style="
                              width: fit-content;
                              margin: 0px;
                              cursor: pointer;
                            "
                          >
                            {{ companyRecord.companyPhone }}
                          </p>
                          </CopyToClipboard>
                        </td>
                        <b-tooltip target="comp-contact-copy">{{
                          copyToClipboard
                        }}</b-tooltip>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <feather-icon icon="MapPinIcon" class="mr-75" />

                          <span class="font-weight-bold text-capitalize">{{ $t('company_info.address') }}</span>
                        </th>
                        <td class="pb-50">
                          <CopyToClipboard
                            :text="companyAddress"
                            @copy="copyTextNoInput(7)"
                          >
                          <p
                            id="comp-address-copy"
                            style="
                              width: fit-content;
                              margin: 0px;
                              cursor: pointer;
                            "
                          >
                          {{ companyAddress.substr(0, 34) }}
                          </p></CopyToClipboard>
                        </td>
                        <b-tooltip target="comp-address-copy">{{
                          copyToClipboard
                        }}</b-tooltip>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="mr-75 feather feather-globe"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path
                              d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                            />
                          </svg>

                          <span class="font-weight-bold text-capitalize">{{ $t('companies.country') }}</span>
                        </th>
                        <td class="pb-50">
                          {{ companyRecord.companyCountry }}
                        </td>
                      </tr>
                    </table>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <!----><!---->
        </div>
      </div>
      <!-- Summary -->
      <div class="col-md-12 col-lg-4 col-xl-4 col-12">
        <b-card id="inner-card-body" class="border-primary ml-0 body-0 pr-3 h-100">
          <table class="mt-2 mt-xl-0 w-100">
            <tr>
              <th class="pb-50">
                <feather-icon icon="AlignJustifyIcon" class="mr-50" />
                <span class="font-weight-bold text-capitalize" style="font-size: 0.85rem">{{$t('company_info.total_assets') }}</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalAssets }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="FileTextIcon" class="mr-50" />
                <span class="font-weight-bold text-capitalize" style="font-size: 0.85rem">{{$t('company_info.total_invoices') }} </span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalInvoices }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="AlertCircleIcon" class="mr-50" />
                <span class="font-weight-bold text-capitalize" style="font-size: 0.85rem">{{$t('company_info.total_not_verified_invoices')}}</span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalNotVerifiedInvoices }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="AlertTriangleIcon" class="mr-50" />
                <span class="font-weight-bold text-capitalize" style="font-size: 0.85rem">{{$t('company_info.total_private_person') }} </span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalPrivatePerson }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="ListIcon" class="mr-50" />
                <span class="font-weight-bold text-capitalize" style="font-size: 0.85rem">{{$t('company_info.total_vat_reports') }} </span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalVatReports }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon icon="FileIcon" class="mr-50" />
                <span class="font-weight-bold text-capitalize" style="font-size: 0.85rem">{{$t('company_info.total_yearly_reports') }} </span>
              </th>
              <td class="pb-50">
                {{ statisticItems.totalYearlyReports }}
              </td>
            </tr>
          </table>
          <div class="button-position-right">
            <b-dropdown
              id="dropdown-4"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              size="sm"
              right
              class="company-info-btn"
              variant="outline-primary"
            >
              <b-dropdown-item
                :to="{
                  name: 'company-invoice-add',
                  params: {
                    companyId: $route.params.companyId
                      ? $route.params.companyId
                      : $route.params.id,
                  },
                }"
              >
               {{ $t('company_info.create_invoice') }} 
              </b-dropdown-item>
              <b-dropdown-item
                :to="{
                  name: 'company-vat-report-add',
                  params: {
                    companyId: $route.params.companyId
                      ? $route.params.companyId
                      : $route.params.id,
                  },
                }"
              >

              {{ $t('company_info.create_vat_report') }} 
              </b-dropdown-item>
              <b-dropdown-item
                @click="actionTab"
              > {{ $t('company_info.create_private_person') }} </b-dropdown-item>
              <b-dropdown-item
              >
              {{ $t('company_info.create_yearly_report') }} 
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </b-card>
      </div>
    </div>

    <!-- modal -->
    <b-modal
      v-model="deleteModalShow"
      :title="$t('companies.delete_company')"
      :ok-title="$t('companies.confirm')"
      :cancel-title="$t('clients_or_recipients.cancel')"
      @ok="deleteCompany()"
    >
      <b-card-text class="text-center" style="font-size: 15px">
        {{ $t('companies.delete_confirmation') }}  
      </b-card-text>
    </b-modal>

    <b-row class="" style="margin-top: 2.5rem">
      <b-col class="mb-1" cols="12">
        <!-- Report time-line card -->
        <b-card
          no-body
          style="padding: 0px"
          class="mb-2"
        >
          <b-card-header style="padding: 1.5rem 1.5rem 1.52rem 1rem">
            <b-card-title> {{$t('company_info.report_timeline')}} </b-card-title>
            <div v-if="monthlyReportGraphDisplay.length > 0" class="d-flex align-items-center">
              <feather-icon
                icon="RefreshCcwIcon"
                size="17"
                style="cursor: pointer"
                @click="refreshMonthReportGraph()"
              />
              <feather-icon
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-toggle.collapse-1
                icon="ChevronDownIcon"
                size="24"
                class="ml-2"
                variant="outline-primary"
                style="margin-right: -10px"
              />
            </div>
          </b-card-header>
          <b-collapse v-if="monthlyReportGraphDisplay.length > 0" id="collapse-1" class="my-1" visible>
            <b-card-body
              style="padding: 0px 15px"
            >
              <app-timeline>
                <app-timeline-item
                  v-for="(graph, index) in monthlyReportGraph"
                  :key="index"
                  :variant="variants[index % variants.length]"
                >
                  <div
                    class="
                      d-flex
                      flex-sm-row flex-column
                      mb-sm-0 mb-1
                    "
                  >
                    <small
                      class="timeline-item-time text-nowrap mr-1 font-weight-bolder text-success"
                      >{{ graph.date.substr(0,7) }}</small
                    >
                    <h6>{{ graph.count }} {{$t('company_info.reports_have_been_created')}}</h6>
                  </div>
                </app-timeline-item>
              </app-timeline>
            </b-card-body>
          </b-collapse>
          <b-card-body 
            v-else    
            class="m-0"
            style="padding: 1rem 15px"
          >
          <div class="d-flex align-items-center justify-content-center">
              <div class="mb-1 start-chat-icon">
                <feather-icon icon="FolderIcon" size="40" />
              </div>
              <h5 class="sidebar-toggle start-chat-text">
                {{$t('company_info.no_record')}}
              </h5>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col class="mb-1" md="12" lg="6" cols="6">
        <ApexBarChart
            class="mb-1"
            chart-type="monthly"
            title="Invoices Per Month"
          />
      </b-col>
      <b-col class="mb-1" md="12" lg="6" cols="6">
        <!-- Invoices Per Day -->
        <ApexBarChart
          class="mb-1"
          chart-type="daily"
          title="Invoices Per Day"
        />
        <!-- Invoices Per Month -->
      </b-col>

    </b-row>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Ripple from "vue-ripple-directive";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem.vue";
// eslint-disable-next-line import/extensions
import ApexBarChart from "@/views/company/ApexBarChart";
import VueHtml2pdf from "vue-html2pdf";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import useJwt from "@/auth/jwt/useJwt";
import axios from "@/libs/axios";
import {
  BCard,
  BRow,
  BCol,
  BLink,
  BDropdown,
  BDropdownItem,
  BCardTitle,
  BCardBody,
  BCardHeader,
  VBTooltip,
  BButton,
  BTable,
  BBadge,
  BTooltip,
  BCollapse,
  VBToggle,
  BModal,
  BCardText,
} from "bootstrap-vue";
import InvoiceDownload from "../../invoice/invoice-download/InvoiceDownload.vue";
import CopyToClipboard from "vue-copy-to-clipboard";

const chartColors = {
  primaryColorShade: "#836AF9",
  yellowColor: "#ffe800",
  successColorShade: "#28dac6",
  warningColorShade: "#ffe802",
  warningLightColor: "#FDAC34",
  infoColorShade: "#299AFF",
  greyColor: "#4F5D70",
  blueColor: "#2c9aff",
  blueLightColor: "#84D0FF",
  greyLightColor: "#EDF1F4",
  tooltipShadow: "rgba(0, 0, 0, 0.25)",
  lineChartPrimary: "#666ee8",
  lineChartDanger: "#ff4961",
  labelColor: "#6e6b7b",
  grid_line_color: "rgba(200, 200, 200, 0.2)",
};

export default {
  components: {
    BLink,
    BRow,
    BCol,
    BCard,
    BDropdown,
    BDropdownItem,
    BCardTitle,
    BCardBody,
    BCardHeader,
    AppTimeline,
    AppTimelineItem,
    ApexBarChart,
    BButton,
    BTable,
    BBadge,
    BTooltip,
    BCollapse,
    VBToggle,
    VueHtml2pdf,
    InvoiceDownload,
    BModal,
    BCardText,
    CopyToClipboard,
  },
  directives: {
    Ripple,
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  data() {
    return {
      textt: "copyyyyyy",
      copiedText: "",
      copyToClipboard: "Copy to clipboard",
      compNAME: "",
      compADDRESS: "",
      compCONTACT: "",
      compBANKACCOUNT: "",
      compVAT: "",
      compID: "",
      compOWNER: "",
      compEGN: "",
      message: "",
      deleteModalShow: false,
      companyAddress: "",
      companyName: "",
      companyNameLength: "",
      sortBy: "id",
      sortDesc: false,
      tableColumns: [
        { key: "id", label: "#", sortable: true },
        { key: "invoiceNumber", sortable: true },
        { key: "invoiceDate", label: "date Issued", sortable: true },
        { key: "documentType", sortable: true },
        {
          key: "recipientCompanyName",
          label: "recipient Company",
          sortable: true,
        },
        {
          key: "supplierCompanyName",
          label: "supplier Company",
          sortable: true,
        },
        { key: "amountNonVat", label: "Amount Non Vat", sortable: true },
        { key: "totalAmount", sortable: true },
        { key: "vatAmount", sortable: true },
        { key: "actions" },
      ],
      pageNumber: 1,
      perPageInvoices: 30,
      invoiceDirection: "asc",
      invoiceSortField: "id",
      companyID: "",
      companyRecord: {},
      companyOwnerName: "",
      companyOwnerEGN: "",
      statisticItems: {
        totalAssets: 0,
        totalInvoices: 0,
        totalNotVerifiedInvoices: 0,
        totalPrivatePerson: 0,
        totalVatReports: 0,
        totalYearlyReports: 0,
      },
      variants: ["primary", "danger", "info", "warning"],
      monthlyReportGraph: [],
      monthlyReportGraphDisplay: [],
      dailyInvoices: [],
      rangePicker: [],
    };
  },
  created() {
    this.companyID = this.$route.params.id;
    this.getCompanyInfo();
    this.getStatistics();
    this.getMonthReportGraph();
  },
  methods: {
    //Copy to Clipboard
    copyTextNoInput(val) {
      this.$root.$emit("bv::hide::tooltip");
      switch (val) {
        case 1:
          this.copiedText = "Owner name ";
          break;
        case 2:
          this.copiedText = "Owner EGN ";
          break;
        case 3:
          this.copiedText = "Company ID ";
          break;
        case 4:
          this.copiedText = "Vat number ";
          break;
        case 5:
          this.copiedText = "Bank Account ";
          break;
        case 6:
          this.copiedText = "Contact ";
          break;
        case 7:
          this.copiedText = "Address ";
          break;
        default:
          this.copiedText = "Company name ";
      }
      this.$toast({
        component: ToastificationContent,
        props: {
          title: this.copiedText + "copied",
          icon: "DeleteIcon",
          variant: "success",
        },
      });

    },

    //
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    //
    generatePDF(itemID) {
      this.$refs[`invoicePdf${itemID}`].generatePdf();
    },
    //
 
    //
    refreshMonthReportGraph() {
      this.monthlyReportGraph = [];
      this.getMonthReportGraph();
    },
    // company invoices data
    getMonthReportGraph() {
      axios
        .get(
          `/account/api/company/reports-month-graph/${this.$route.params.id}`
        )
        .then((response) => {
          this.monthlyReportGraph = response.data;
          this.monthlyReportGraphDisplay = response.data;
        });
    },
    // delete the company
    async deleteCompany() {
      const token = useJwt.getToken();
      useJwt
        .DeleteCompany(token, this.companyID)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Company Deleted Successfully",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
          return this.$router.push({
            name: "companies",
          });
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Something Went Wrong`,
              icon: "EditIcon",
              variant: "error",
            },
          });
        });
    },
    // function to edit the record of company
    async editCompany() {
      await this.$router.push({
        name: "EditCompany",
        params: { id: this.companyRecord.id },
      });
    },
    //
    async getCompanyInfo() {
      axios.get(`/account/api/company/${this.companyID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      })
      .then((response) => {
        this.companyRecord = response.data;
        this.companyNameLength = this.companyRecord.companyName.length;
        this.companyOwnerName =
        this.companyRecord.companyOwnerApi.companyOwnerName;
        this.companyOwnerEGN = this.companyRecord.companyOwnerApi.ownerEGN;
        this.companyName = this.companyRecord.companyName;
        this.companyAddress = this.companyRecord.companyAddress;
        this.compID = this.companyRecord.companyIdentificationNumber;
        this.compVAT = this.companyRecord.companyVatNumber;
        this.compBANKACCOUNT = this.companyRecord.companyBankAccount;
        this.compCONTACT = this.companyRecord.companyPhone;
        this.compNAME = this.companyRecord.companyName;
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
    async getStatistics() {
      axios(
        `/account/api/company/statistics-items-count/${this.$route.params.id}`
      )
        .then((response) => {
          this.statisticItems = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    state() {
      return 6
    },
    actionTab() {
      this.$emit('state', 
        {
          "state": this.state(),
          "addRecord": true,
        }
      )
    }
  },
};
</script>

  <style scoped>
.rounded {
  border-radius: 0.6rem !important;
}

.card {
  margin-bottom: 0rem;
}

#inner-card-body .card-body {
  padding: 20px 15px 15px 15px;
}

</style>
