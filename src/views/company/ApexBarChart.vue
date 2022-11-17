<template>
  <b-card v-if="barChart.chartOptions.xaxis.categories.length > 0" no-body>
    <b-card-header>
      <div>
        <b-card-title>
          {{title}}
          <!--          Balance-->
        </b-card-title>
<!--        <b-card-title class="font-weight-bolder">-->
<!--          $74,382.72-->
<!--        </b-card-title>-->
      </div>

      <div class="d-flex align-items-center">
        <feather-icon
            class="mr-2"
            @click="getData()"
            icon="RefreshCcwIcon"
            size="16"
        />
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
    <b-card-body>
      <vue-apex-charts
        v-if="barChart.chartOptions.xaxis.categories.length > 0"
        type="bar"
        height="350"
        :options="barChart.chartOptions"
        :series="barChart.series"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardHeader,
  BCardSubTitle,
  BCardTitle,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import flatPickr from 'vue-flatpickr-component'
import { $themeColors } from '@themeConfig'
import axios from '@/libs/axios'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    flatPickr,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['chartType', 'title'],
  data() {
    return {
      barChart: {
        series: [
          {
            data: [700, 350, 480, 600, 210, 550, 150],
          },
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: $themeColors.info,
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '30%',
              endingShape: 'rounded',
            },
          },
          grid: {
            xaxis: {
              lines: {
                show: false,
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            // opposite: isRtl,
          },
        },
      },
      rangePicker: ['2019-05-01', '2019-05-10'],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.chartType === 'monthly') {
        this.getInvoicesMonth()
      }
      if (this.chartType === 'daily') {
        this.getInvoicesDay()
      }
    },
    getInvoicesMonth() {
      axios.get(`/account/api/company/invoices-month-graph/${this.$route.params.id}`)
        .then(response => {
          this.barChart.series[0].data = response.data.map(invoice => invoice.count)
          this.barChart.chartOptions.xaxis.categories = response.data.map(invoice => invoice.date)
          this.rangePicker = [this.barChart.chartOptions.xaxis.categories[this.barChart.chartOptions.xaxis.categories.length - 1], this.barChart.chartOptions.xaxis.categories[0]]
        })
    },
    getInvoicesDay() {
      axios.get(`/account/api/company/invoices-day-graph/${this.$route.params.id}`)
        .then(response => {
          this.barChart.series[0].data = response.data.map(invoice => invoice.count)
          this.barChart.chartOptions.xaxis.categories = response.data.map(invoice => invoice.date)
          this.rangePicker = [this.barChart.chartOptions.xaxis.categories[this.barChart.chartOptions.xaxis.categories.length - 1], this.barChart.chartOptions.xaxis.categories[0]]
        })
    },
  },
}
</script>
