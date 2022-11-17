<template>
  <b-row>
    <b-col class="mb-1" cols="8">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="d-flex justify-content-between flex-column col-5">
              <div class="d-flex justify-content-start">
                <span
                  class="b-avatar badge-light-danger rounded"
                  style="width: 104px; height: 104px"
                >
                  <feather-icon icon="UserIcon" size="80" />

<!--                  <span class="b-avatar-img">-->
<!--                    <svg-->
<!--                      xmlns="http://www.w3.org/2000/svg"-->
<!--                      width="104px"-->
<!--                      height="104px"-->
<!--                      viewBox="0 0 24 24"-->
<!--                      fill="currentColor"-->
<!--                      stroke="currentColor"-->
<!--                      stroke-width="1"-->
<!--                      stroke-linecap="round"-->
<!--                      stroke-linejoin="round"-->
<!--                      class="feather feather-user"-->
<!--                    >-->
<!--                      <path-->
<!--                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"-->
<!--                      ></path>-->
<!--                      <circle cx="12" cy="7" r="4"></circle>-->
<!--                    </svg>-->
<!--                  </span>-->
                </span>

                <div class="d-flex flex-column ml-1">
                  <div class="mb-1">
                    <h4 class="mb-0">{{ companyRecord.companyName }}</h4>
                    <span class="card-text">{{ companyRecord.companyMail }}</span>
                  </div>
                  <div class="d-flex flex-wrap">
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      size="sm"
                      @click="editCompany()"
                      variant="primary"
                    >Edit
                    </b-button>

                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      variant="danger"
                      @click="deleteCompany"
                      size="sm"
                      class="ml-1"
                    >
                      Delete
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-7">
              <b-row>
                <b-col cols="12">
                  <table class="mt-2 mt-xl-0 w-100 company-info-table">
                    <tr v-if="Object.keys(companyRecord).length > 0">
                      <th class="pb-50">
                        <feather-icon icon="UserIcon" class="mr-75"/>
                        <span class="font-weight-bold">Owner Name</span>
                      </th>
                      <td v-if="Object.keys(companyRecord.companyOwnerApi).length > 0" class="pb-50">
                        {{ companyRecord.companyOwnerApi.companyOwnerName }}
                      </td>
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
                          class="mr-75 feather feather-star"
                        >
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          ></polygon>
                        </svg>
                        <span class="font-weight-bold">Role</span>
                      </th>
                      <td class="pb-50 text-capitalize">admin</td>
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
                          class="mr-75 feather feather-flag"
                        >
                          <path
                            d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                          ></path>
                          <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                        <span class="font-weight-bold">Country</span>
                      </th>
                      <td class="pb-50">
                        {{ companyRecord.companyCountry }}
                      </td>
                    </tr>
                    <tr>
                      <th>
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
                          class="mr-75 feather feather-phone"
                        >
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                          ></path>
                        </svg>
                        <span class="font-weight-bold">Contact</span>
                      </th>
                      <td>{{ companyRecord.companyPhone }}</td>
                    </tr>
                    <tr>
                      <th>
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path
                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                          ></path>
                        </svg>
                        <span class="font-weight-bold">Address</span>
                      </th>
                      <td>{{ companyRecord.companyAddress }}</td>
                    </tr>
                    <tr></tr>
                  </table>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col class="mb-1 ml-0" cols="4">
      <b-card class="border-primary ml-0 body-0">
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon icon="AlignJustifyIcon" class="mr-50"/>
              <span class="font-weight-bold">Total Assets</span>
            </th>
            <td class="pb-50">
              {{ statisticItems.totalAssets }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="FileTextIcon" class="mr-50"/>
              <span class="font-weight-bold">Total Invoices</span>
            </th>
            <td class="pb-50">
              {{ statisticItems.totalInvoices }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="AlertCircleIcon" class="mr-50"/>
              <span class="font-weight-bold">Total NotVerified Invoices</span>
            </th>
            <td class="pb-50">
              {{ statisticItems.totalNotVerifiedInvoices }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="AlertTriangleIcon" class="mr-50"/>
              <span class="font-weight-bold">Total Private Person</span>
            </th>
            <td class="pb-50">
              {{ statisticItems.totalPrivatePerson }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="ListIcon" class="mr-50"/>
              <span class="font-weight-bold">Total Vat Reports</span>
            </th>
            <td class="pb-50">
              {{ statisticItems.totalVatReports }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon icon="FileIcon" class="mr-50"/>
              <span class="font-weight-bold">Total Yearly Reports</span>
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
            <b-dropdown-item>Create Invoice</b-dropdown-item>
            <b-dropdown-item>Create Vat Report</b-dropdown-item>
            <b-dropdown-item>Create Private Person</b-dropdown-item>
            <b-dropdown-item>Create Vat Report</b-dropdown-item>
            <b-dropdown-item>Create Yearly Report</b-dropdown-item>
          </b-dropdown>

        </div>
      </b-card>
    </b-col>
    <b-col v-if="monthlyReportGraph.length > 0" class="mb-1" cols="6">
      <b-card no-body>
        <b-card-header>
          <b-card-title>
            Report Timeline
          </b-card-title>
          <div class="d-flex align-items-center">
            <feather-icon
              @click="getMonthReportGraph()"
              icon="RefreshCcwIcon"
              size="16"
            />
          </div>

        </b-card-header>
        <b-card-body>
          <app-timeline>
            <app-timeline-item
              v-for="(graph, index) in monthlyReportGraph"
              :key="index"
              :variant="variants[index % variants.length]"
            >
              <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                <h6>{{ graph.count }} Reports have been created</h6>
                <small class="timeline-item-time text-nowrap text-muted ml-1">{{ graph.date }}</small>
              </div>
            </app-timeline-item>
          </app-timeline>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col class="mb-1" cols="6">
      <ApexBarChart
        class="mb-1"
        chart-type="daily"
        title="Invoices Per Day"
      />
      <ApexBarChart
        class="mb-1"
        chart-type="monthly"
        title="Invoices Per Month"
      />
    </b-col>
  </b-row>
</template>

<script>
import axios from '@/libs/axios'
import Swal from 'sweetalert2'
import Ripple from 'vue-ripple-directive'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
// eslint-disable-next-line import/extensions
import ApexBarChart from '@/views/company/ApexBarChart'

const chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)',
}

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
} from 'bootstrap-vue'

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
  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      companyID: '',
      companyRecord: {},
      statisticItems: {
        totalAssets: 0,
        totalInvoices: 0,
        totalNotVerifiedInvoices: 0,
        totalPrivatePerson: 0,
        totalVatReports: 0,
        totalYearlyReports: 0,
      },
      variants: ['primary', 'danger', 'info', 'warning'],
      monthlyReportGraph: [],
      dailyInvoices: [],
      rangePicker: [],
    }
  },
  created() {
    this.companyID = this.$route.params.id
    this.getCompanyInfo()
    this.getStatistics()
    this.getMonthReportGraph()
  },
  methods: {
    getMonthReportGraph() {
      axios.get(`/account/api/company/reports-month-graph/${this.$route.params.id}`)
          .then(response => {
            this.monthlyReportGraph = response.data
          })
    },
    async deleteCompany() {
      const config = {
        method: 'delete',
        url: `/account/api/company/${this.companyID}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      }
      await axios(config)
        .then(response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Company Deleted!',
            showConfirmButton: false,
            timer: 1400,
          })
        })
        .catch(error => {
          console.log(error)
        })
      setTimeout(() => {
        this.$router.go(-1)
      }, 1410)
    },
    async editCompany() {
      await this.$router.push({
        name: 'EditCompany',
        params: { id: this.companyRecord.id },
      })
    },
    //
    async getCompanyInfo() {
      const data = await axios.get(`/account/api/company/${this.companyID}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': 'http://localhost:8080',
        },
      })
      if (data.status === 200) {
        this.companyRecord = data.data
      }
    },
    async getStatistics() {
      axios(`/account/api/company/statistics-items-count/${this.$route.params.id}`)
          .then(response => {
            this.statisticItems = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
}
</script>

<style scoped>
.rounded {
  border-radius: 0.6rem !important;
}

.card {
  margin-bottom: 0rem;
}

.card-body {
  padding-top: 1.1rem;
  padding-bottom: 0.8rem;
}
</style>
