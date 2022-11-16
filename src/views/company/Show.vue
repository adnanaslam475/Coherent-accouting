<template>
  <div>
    <b-row>
      <b-col cols="12">
        <CompanyTabs />
      </b-col>
      <b-col cols="6">
        <b-card
          v-if="data"
          no-body
        >
          <b-card-header>
            <b-card-title class="ml-25">
              Report Timeline
            </b-card-title>
          </b-card-header>
          <b-card-body>
            <app-timeline>
              <app-timeline-item v-for="(graph, index) in monthlyReportGraph" :key="index" :variant="variants[(variants.length % index)]">
                <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                  <h6>{{ graph.count }} Reports have been created</h6>
                  <small class="timeline-item-time text-nowrap text-muted ml-1">{{ graph.date }}</small>
                </div>
              </app-timeline-item>
            </app-timeline>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card no-body>
          <b-card-header>
            <div>
              <b-card-sub-title class="mb-25">
                Balance
              </b-card-sub-title>
              <b-card-title>$74,123</b-card-title>
            </div>
            <!-- datepicker -->
            <div class="d-flex align-items-center">
              <feather-icon
                icon="CalendarIcon"
                size="16"
              />
              <flat-pickr
                v-model="rangePicker"
                :config="{ mode: 'range'}"
                class="form-control flat-picker bg-transparent border-0 shadow-none"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </b-card-header>

          <!-- chart -->
          <b-card-body>
            <chartjs-component-horizontal-bar-chart
              :height="400"
              :data="chartjsData.horizontalBarChart.data"
              :options="chartjsData.horizontalBarChart.options"
            />
          </b-card-body>
        </b-card>
      </b-col>

    </b-row>
  </div>
</template>

<script>

import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMedia,
  BMediaAside,
  BImg,
  BMediaBody,
  BAvatar,
  BAvatarGroup, VBTooltip,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

import axios from '@/libs/axios'
import ChartjsComponentHorizontalBarChart from '@/views/charts-and-maps/charts/chartjs/charts-components/ChartjsComponentHorizontalBarChart'
import CompanyTabs from './CompanyTabs.vue'
import chartjs from '@/views/charts-and-maps/charts/chartjs/Chartjs'
import chartjsData from '@/views/charts-and-maps/charts/chartjs/chartjsData'

export default {
  name: 'CompanyView',
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    BAvatarGroup,
    BAvatar,
    BMediaBody,
    BMedia,
    BCardTitle,
    BMediaAside,
    BCardBody,
    BCardHeader,
    CompanyTabs,
    AppTimeline,
    AppTimelineItem,
    ChartjsComponentHorizontalBarChart,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      chartjsData,
      rangePicker: ['2019-05-01', '2019-05-10'],
      variants: ['primary', 'danger', 'info', 'warning'],
      monthlyReportGraph: [],
      data: {
        congratulations: {
          name: 'John',
          saleToday: '57.6',
        },
        subscribersGained: {
          series: [
            {
              name: 'Subscribers',
              data: [28, 40, 36, 52, 38, 60, 55],
            },
          ],
          analyticsData: {
            subscribers: 92600,
          },
        },
        ordersRecevied: {
          series: [
            {
              name: 'Orders',
              data: [10, 15, 8, 15, 7, 12, 8],
            },
          ],
          analyticsData: {
            orders: 38400,
          },
        },
        avgSessions: {
          sessions: 2700,
          lastDays: ['Last 28 Days', 'Last Month', 'Last Year'],
          growth: '+5.2%',
          goal: 100000,
          users: 100000,
          retention: 90,
          duration: 1,
          salesBar: {
            series: [
              {
                name: 'Sessions',
                data: [75, 125, 225, 175, 125, 75, 25],
              },
            ],
          },
        },
        supportTracker: {
          title: 'Support Tracker',
          lastDays: ['Last 28 Days', 'Last Month', 'Last Year'],
          totalTicket: 163,
          newTicket: 29,
          openTicket: 63,
          responseTime: 1,
          supportTrackerRadialBar: {
            series: [83],
          },
        },
        timeline: {
          step1: {
            title: '12 Invoices have been paid',
            subtitle: 'Invoices have been paid to the company.',
            img: require('@/assets/images/icons/json.png'),
            fileName: 'data.json',
            duration: '12 min ago',
          },
          step2: {
            title: 'Client Meeting',
            subtitle: 'Project meeting with john @10:15am',
            avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),
            avatarName: 'John Doe (Client)',
            occupation: 'CEO of Infibeam',
            duration: '45 min ago',
          },
          step3: {
            title: 'Create a new project for client',
            subtitle: 'Add files to new design folder',
            duration: '2 day ago',
            avatars: [
              { userImg: require('@/assets/images/portrait/small/avatar-s-9.jpg'), name: 'Billy Hopkins' },
              { userImg: require('@/assets/images/portrait/small/avatar-s-6.jpg'), name: 'Amy Carson' },
              { userImg: require('@/assets/images/portrait/small/avatar-s-8.jpg'), name: 'Brandon Miles' },
              { userImg: require('@/assets/images/portrait/small/avatar-s-7.jpg'), name: 'Daisy Weber' },
              { userImg: require('@/assets/images/portrait/small/avatar-s-20.jpg'), name: 'Jenny Looper' },
            ],
          },
          step4: {
            title: 'Create a new project for client',
            duration: '5 day ago',
            subtitle: 'Add files to new design folder',
          },
        },
        salesChart: {
          series: [
            {
              name: 'Sales',
              data: [90, 50, 86, 40, 100, 20],
            },
            {
              name: 'Visit',
              data: [70, 75, 70, 76, 20, 85],
            },
          ],
        },
        appDesign: {
          date: '03 Sep, 20',
          title: 'App design',
          subtitle: 'You can Find Only Post and Quotes Related to IOS like ipad app design, iphone app design',
          teams: [
            { name: 'Figma', color: 'light-warning' },
            { name: 'Wireframe', color: 'light-primary' },
          ],
          members: [
            { img: require('@/assets/images/portrait/small/avatar-s-9.jpg'), color: 'primary' },
            { text: 'PI', color: 'light-danger' },
            { img: require('@/assets/images/portrait/small/avatar-s-14.jpg'), color: 'primary' },
            { img: require('@/assets/images/portrait/small/avatar-s-7.jpg'), color: 'primary' },
            { text: 'AL', color: 'light-secondary' },
          ],
          planing: [
            { title: 'Due Date', subtitle: '12 Apr, 21' },
            { title: 'Budget', subtitle: '$49251.91' },
            { title: 'Cost', subtitle: '$840.99' },
          ],
        },
      },
    }
  },
  created() {
    this.getMonthReportGraph()
  },
  methods: {
    getMonthReportGraph() {
      axios.get(`/account/api/company/reports-month-graph/${this.$route.params.id}`)
        .then(response => {
          this.monthlyReportGraph = response.data
        })
    },
  },
}
</script>

<style>
/*  */
</style>