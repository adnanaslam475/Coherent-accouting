<template>
  <b-card-code no-body>
    <b-card-header>
      <div>
        <b-card-title>{{ $t('dashboard_lbl.reports') }}</b-card-title>
      </div>
    </b-card-header>
    <b-card-body>
      <b-tabs class="report-tabs" v-model="reportTab">
        <b-tab active>
          <template #title>
            <b-media no-body>
              <b-avatar
                size="38"
                class="text-primary bg-transparent position-relative"
              >
                <svg-icon class="mx-auto" type="mdi" :path="path"> </svg-icon>
                <span class="v-avatar__underlay"></span>
              </b-avatar>
            </b-media>
            <span>{{ $t("invoices") }}</span>
          </template>
          <vue-apex-charts
            type="bar"
            height="400"
            :options="columnChart.chartOptions"
            :series="columnChart.series"
          />
        </b-tab>
        <b-tab :style="`display: block !important; position: ${reportTab !=1 ? 'absolute' : 'relative' }; visibility: ${reportTab !=1 ? 'hidden' : 'visible' }; `">
          <template #title>
            <b-media no-body>
              <b-avatar
                size="38"
                class="text-success bg-transparent position-relative"
              >
                <svg-icon class="mx-auto" type="mdi" :path="path1"> </svg-icon>
                <span class="v-avatar__underlay"></span>
              </b-avatar>
            </b-media>
            <span class="text-center">{{$t('company_tabs.vat_reports')}}</span>
          </template>
        
          <vue-apex-charts
            type="bar"
            height="400"
            :options="columnChart1.chartOptions"
            :series="columnChart1.series"
          />
        </b-tab>
      </b-tabs>
    </b-card-body>
  </b-card-code>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiReceiptTextOutline } from "@mdi/js";
import { mdiBallot } from "@mdi/js";
import { ref } from "@vue/composition-api";
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMedia,
  BMediaAside,
  BMediaBody,
  BImg,
  BDropdown,
  BDropdownItem,
  BProgress,
  BTabs,
  BTab,
  BCardText,
  BAvatar,
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import axios from "@/libs/axios";
export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMedia,
    BMediaAside,
    BMediaBody,
    BImg,
    BDropdown,
    BDropdownItem,
    BProgress,
    BCardCode,
    BTabs,
    BCardText,
    BTab,
    SvgIcon,
    BAvatar,
    VueApexCharts,
  },
  setup() {
    const chartColors = {
      column: {
        series1: "#826af9",
        series2: "#d2b0ff",
        bg: "transparent",
      },
      success: {
        shade_100: "#7eefc7",
        shade_200: "#06774f",
      },
      donut: {
        series1: "#ffe700",
        series2: "#00d4bd",
        series3: "#826bf8",
        series4: "#2b9bf4",
        series5: "#FFA1A1",
      },
      area: {
        series3: "#a4f8cd",
        series2: "#60f2ca",
        series1: "#2bdac7",
      },
    };
    var columnChart = ref({
      series: [],
      chartOptions: {},
    });
    var columnChart1 = ref({
      series: [],
      chartOptions: {},
    });

    function formatDate(date, type) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      if(type == "vat Reports"){
        return [year, month].join("/");
      } else{
        return [month, day].join("/");
      }
      
    }

    let invoices = [];
    let xaxisCategories = [];
    axios
      .get("/account/api/dashboard/invoices-count-aggregation")
      .then((response) => {
        response.data.map((item) => {
          invoices.push(item.count);
          let date = formatDate(item.date, "invoices");
           xaxisCategories.push(date);
        });
        let chartData = {
          series: [
            {
              name: "Invoices",
              data: invoices,
            }
          ],
          chartOptions: {
            chart: {
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            colors: [chartColors.column.series1, chartColors.column.series2],
            plotOptions: {
              bar: {
                columnWidth: "15%",
                colors: {
                  backgroundBarColors: [],
                  backgroundBarRadius: 10,
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: true,
              position: "top",
              fontSize: "14px",
              fontFamily: "Montserrat",
              horizontalAlign: "left",
            },
            stroke: {
              show: true,
              colors: ["transparent"],
            },
            grid: {
              xaxis: {
                lines: {
                  show: true,
                },
              },
            },
            xaxis: {
              categories: xaxisCategories,
            },
            yaxis: {
              // opposite: isRtl,
            },
            fill: {
              opacity: 1,
            },
          },
        };
        columnChart.value = chartData;
      });

    let VatReports = [];
    let xaxisCategories1 = [];

    axios
      .get("/account/api/dashboard/reports-count-aggregation")
      .then((response) => {
        response.data.map((item) => {
          VatReports.push(item.count);
          let date = formatDate(item.date, "vat Reports");
          xaxisCategories1.push(date);
        });

        let chartData = {
          series: [
            {
              name: "Vat Reports",
              data: VatReports,
            },
          ],
          chartOptions: {
            chart: {
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            colors: [chartColors.column.series1, chartColors.column.series2],
            plotOptions: {
              bar: {
                columnWidth: "15%",
                colors: {
                  backgroundBarColors: [],
                  backgroundBarRadius: 10,
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: true,
              position: "top",
              fontSize: "14px",
              fontFamily: "Montserrat",
              horizontalAlign: "left",
            },
            stroke: {
              show: true,
              colors: ["transparent"],
            },
            grid: {
              xaxis: {
                lines: {
                  show: true,
                },
              },
            },
            xaxis: {
              categories: xaxisCategories1,
            },
            yaxis: {
              // opposite: isRtl,
            },
            fill: {
              opacity: 1,
            },
          },
        };
        columnChart1.value = chartData;
      });
    return {
      columnChart,
      columnChart1
    };
  },
  data() {
    return {
      path: mdiReceiptTextOutline,
      path1: mdiBallot,
      reportTab: 0
    };
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
.report-tabs .nav-tabs .nav-link {
  width: 130px;
  height: 100px;
}
.report-tabs .nav-tabs .nav-link.active {
  border-width: thin !important;
  border-style: solid !important;
  border-color: rgb(var(--v-theme-primary)) !important;
}
.report-tabs .nav-tabs .nav-link.active::after {
  display: none;
}
.report-tabs .nav-tabs .nav-link {
  display: flex;
  flex-direction: column;
}
.v-avatar__underlay {
  background: currentColor;
  opacity: 0.12;
  border-radius: inherit;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
</style>
