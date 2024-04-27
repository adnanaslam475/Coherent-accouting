<template>
  <div style="height: calc(100%)">
    <b-card class="card-transaction" no-body style="height: calc(50% - 2rem)">
      <b-card-header>
        <b-card-title>{{ $t("companies.unverified_invoice") }}</b-card-title>
      </b-card-header>

      <b-card-body style="overflow: auto">
        <div v-if="!activeProjectUnverified">
          <div class="alert-body">No record found</div>
        </div>

        <div
          v-if="activeProjectUnverified"
          v-for="(transaction, index) in activeProjectUnverified"
          :key="index"
          class="transaction-item"
        >
          <b-media no-body>
            <b-media-aside>
              <b-avatar
                rounded
                size="42"
                :variant="
                  transactionData[`${index > 4 ? index - 5 : index}`]
                    .avatarVariant
                "
              >
                <feather-icon
                  size="18"
                  :icon="
                    transactionData[`${index > 4 ? index - 5 : index}`].avatar
                  "
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <b-link
                :to="{
                  name: 'CompanyView',
                  params: { id: transaction.companyApi.id },
                }"
                class="font-weight-bold"
                @click="showMultipleUploads"
              >
                <h6 class="transaction-title">
                  {{ transaction.companyApi.companyName }}
                </h6>
                <small>{{
                  transaction.companyApi.companyOwnerApi.companyOwnerName
                }}</small>
              </b-link>
            </b-media-body>
          </b-media>
          <div
            class="font-weight-bolder"
            :class="
              transactionData[`${index > 4 ? index - 5 : index}`].deduction
                ? 'text-success'
                : 'text-success'
            "
          >
            {{ transaction.unVerifiedInvoicesCount }}
          </div>
        </div>
      </b-card-body>
    </b-card>
    <!-- <b-card
      class="card-transaction"
      no-body
      style="height: calc(50% - 2rem); border: 2px solid red"
    >
      <b-card-header>
        <b-card-title>{{
          $t("companies.unfinished_vat_reports")
        }}</b-card-title>
      </b-card-header>

      <b-card-body>
        <div v-if="!activeProject">
          <div class="alert-body">No record found</div>
        </div>
        <div
          v-if="activeProject"
          v-for="(transaction, index) in activeProject"
          :key="index"
          class="transaction-item"
        >
          <b-media no-body>
            <b-media-aside>
              <b-avatar
                rounded
                size="42"
                :variant="
                  transactionData[`${index > 4 ? index - 5 : index}`]
                    .avatarVariant
                "
              >
                <feather-icon
                  size="18"
                  :icon="
                    transactionData[`${index > 4 ? index - 5 : index}`].avatar
                  "
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <b-link
                :to="{
                  name: 'CompanyView',
                  params: { id: transaction.companyApi.id },
                }"
                class="font-weight-bold"
              >
                <h6 class="transaction-title">
                  {{ transaction.companyApi.companyName }}
                </h6>
                <small>{{
                  transaction.companyApi.companyOwnerApi.companyOwnerName
                }}</small>
              </b-link>
            </b-media-body>
          </b-media>
          <div
            class="font-weight-bolder"
            :class="
              transactionData[`${index > 4 ? index - 5 : index}`].deduction
                ? 'text-success'
                : 'text-success'
            "
          >
            {{ formatDate(transaction.period) }}
          </div>
        </div>
      </b-card-body>
    </b-card> -->
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import axios from "@/libs/axios";
import store from "@/store";
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BDropdown,
  BDropdownItem,
  BAlert,
  BLink,
} from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BAlert,
    BLink,
  },
  setup() {
    const activeProject = ref(null);
    const activeProjectUnverified = ref(null);
    axios
      .get("/account/api/dashboard/companies-with-unfinished-month-vat-reports")
      .then((response) => {
        const projectsData = response.data;
        if (projectsData?.length !== 0 && projectsData !== undefined) {
          activeProject.value = projectsData;
        }
      });
    axios.get("/account/api/dashboard/unverified-invoices").then((response) => {
      const projectsData = response.data;
      if (projectsData?.length !== 0 && projectsData !== undefined) {
        activeProjectUnverified.value = projectsData;
      }
    });

    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month].join("/");
    };
    return {
      activeProject,
      activeProjectUnverified,
      formatDate,
    };
  },
  data() {
    return {
      transactionData: [
        {
          mode: "Wallet",
          types: "Starbucks",
          avatar: "PocketIcon",
          avatarVariant: "light-primary",
          payment: "-$74",
          deduction: true,
        },
        {
          mode: "Bank Transfer",
          types: "Add Money",
          avatar: "CheckIcon",
          avatarVariant: "light-success",
          payment: "+$480",
          deduction: false,
        },
        {
          mode: "Paypal",
          types: "Add Money",
          avatar: "DollarSignIcon",
          avatarVariant: "light-danger",
          payment: "+$480",
          deduction: false,
        },
        {
          mode: "Mastercard",
          types: "Ordered Food",
          avatar: "CreditCardIcon",
          avatarVariant: "light-warning",
          payment: "-$23",
          deduction: true,
        },
        {
          mode: "Transfer",
          types: "Refund",
          avatar: "TrendingUpIcon",
          avatarVariant: "light-info",
          payment: "+$98",
          deduction: false,
        },
      ],
    };
  },
  methods: {
    showMultipleUploads() {
      store.commit("app/MULTIPLE_UPLOADS", 3);
    },
  },
};
</script>
