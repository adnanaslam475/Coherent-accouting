<template>
  <b-card class="card-transaction" no-body style="height: calc( 100% - 2rem);">
    <b-card-header>
      <b-card-title>{{ $t('companies.unfinished_vat_reports') }}</b-card-title>
    </b-card-header>

    <b-card-body>
      <div
          v-if="!activeProject"
        >
          <div class="alert-body">
            No record found
          </div>
      </div>
      <div
        v-if="activeProject"
        v-for="(transaction,index) in activeProject"
        :key="index"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar rounded size="42" :variant="transactionData[`${index > 4 ? index-5 : index }`].avatarVariant">
              <feather-icon size="18" :icon="transactionData[`${index > 4 ? index-5 : index }`].avatar" />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <b-link
              :to="{ name: 'CompanyView', params: { id: transaction.companyApi.id }}"
              class="font-weight-bold"
            >
              <h6 class="transaction-title">
                {{ transaction.companyApi.companyName }}
              </h6>
              <small>{{ transaction.companyApi.companyOwnerApi.companyOwnerName }}</small>
            </b-link>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
          :class="transactionData[`${index > 4 ? index-5 : index }`].deduction ? 'text-success' : 'text-success'"
        >
          <!-- {{ transactionData[`${index > 4 ? index-5 : index }`].payment }} -->

          {{ formatDate(transaction.period) }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { ref } from "@vue/composition-api";
import axios from "@/libs/axios";
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
  BLink
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
    BLink
  },
  setup() {
    const activeProject = ref(null)
    axios.get('/account/api/dashboard/companies-with-unfinished-month-vat-reports')
      .then(response => {
        const projectsData = response.data
        if(projectsData?.length !== 0 && projectsData !== undefined){
          activeProject.value = projectsData
        }    
    })

    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month].join("/");
        
    }
    return{
      activeProject,
      formatDate
    }
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
};
</script>
