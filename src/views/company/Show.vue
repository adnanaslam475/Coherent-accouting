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

          <!-- timeline -->
          <b-card-body>
            <app-timeline>
              <app-timeline-item v-for="(graph, index) in monthlyReportGraph" :variant="variants[(variants % index)]">
                <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
                  <h6>{{ graph.count }} Reports have been created</h6>
                  <small class="timeline-item-time text-nowrap text-muted ml-1">{{ graph.date }}</small>
                </div>
<!--                <p>{{ data.timeline.step1.subtitle }}</p>-->
<!--                <b-media no-body>-->
<!--                  <b-media-aside class="mr-1">-->
<!--                    <b-img-->
<!--                      :src="data.timeline.step1.img"-->
<!--                      height="23"-->
<!--                      :alt="data.timeline.step1.fileName "-->
<!--                    />-->
<!--                  </b-media-aside>-->
<!--                  <b-media-body class="my-auto">-->
<!--                    <h6 class="media-body mb-0">-->
<!--                      {{ data.timeline.step1.fileName }}-->
<!--                    </h6>-->
<!--                  </b-media-body>-->
<!--                </b-media>-->
              </app-timeline-item>

<!--              <app-timeline-item variant="warning">-->
<!--                <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">-->
<!--                  <h6>{{ data.timeline.step2.title }}</h6>-->
<!--                  <small class="timeline-item-time text-nowrap text-muted ml-1">{{ data.timeline.step2.duration }}</small>-->
<!--                </div>-->
<!--                <p>{{ data.timeline.step2.subtitle }}</p>-->
<!--                <b-media no-body>-->
<!--                  <b-media-aside class="mr-50">-->
<!--                    <b-avatar-->
<!--                      :src="data.timeline.step2.avatar"-->
<!--                      size="38"-->
<!--                    />-->
<!--                  </b-media-aside>-->
<!--                  <b-media-body class="my-auto">-->
<!--                    <h6 class="mb-0">-->
<!--                      {{ data.timeline.step2.avatarName }}-->
<!--                    </h6>-->
<!--                    <p class="mb-0">-->
<!--                      {{ data.timeline.step2.occupation }}-->
<!--                    </p>-->
<!--                  </b-media-body>-->
<!--                </b-media>-->
<!--              </app-timeline-item>-->

<!--              <app-timeline-item variant="info">-->
<!--                <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">-->
<!--                  <h6>{{ data.timeline.step3.title }}</h6>-->
<!--                  <small class="timeline-item-time text-nowrap text-muted ml-1">{{ data.timeline.step3.duration }}</small>-->
<!--                </div>-->
<!--                <p>{{ data.timeline.step3.subtitle }}</p>-->
<!--                <b-avatar-group size="35px">-->
<!--                  <b-avatar-->
<!--                    v-for="avatar in data.timeline.step3.avatars"-->
<!--                    :key="avatar.userImg"-->
<!--                    v-b-tooltip.hover.top="'Tooltip!'"-->
<!--                    :src="avatar.userImg"-->
<!--                    class="pull-up"-->
<!--                  />-->
<!--                </b-avatar-group>-->
<!--              </app-timeline-item>-->

<!--              <app-timeline-item-->
<!--                :title="data.timeline.step4.title"-->
<!--                :subtitle="data.timeline.step4.subtitle"-->
<!--                :time="data.timeline.step4.duration"-->
<!--                variant="danger"-->
<!--              />-->
            </app-timeline>
            <!--/ timeline -->
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

import CompanyTabs from './CompanyTabs.vue'
import axios from '@/libs/axios'

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
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
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