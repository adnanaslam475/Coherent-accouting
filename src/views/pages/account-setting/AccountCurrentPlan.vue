<template>
  <b-card>
    <b-card-title>Current Plan</b-card-title>
    <b-row>
      <b-col cols="6">
        <h4>Your Current Plan is <span style=" text-transform: capitalize; margin-right: 12px;">{{ currentPlan.planName }}</span>
          <span v-if="currentPlan.active === true"
              class="
                v-chip v-chip--label
                v-theme--light
                text-primary
                v-chip--density-default v-chip--size-small v-chip--variant-tonal
              "
              draggable="false"
              style="background-color:aliceblue; padding: 5px 10px; border-radius: 20px"
              ><span class="v-chip__underlay"></span
              >
              Active
              </span
            >
            <span v-else
              class="
                v-chip v-chip--label
                v-theme--light
                text-primary
                v-chip--density-default v-chip--size-small v-chip--variant-tonal
              "
              draggable="false"
              style="background-color:aliceblue; padding: 5px 10px; border-radius: 20px"
              ><span class="v-chip__underlay"></span
              >
              Inactive
              </span
            >
          </h4>
        <p>A simple start for everyone</p>
      </b-col>
      <b-col cols="6" class="p-0">
        <b-alert show variant="danger" class="p-75">
          <h4>
            Your Current Plan is {{ currentPlan.planName }}
          </h4>
          <p>A simple start for everyone</p>
        </b-alert>
      </b-col>
      <b-col cols="6">
        <h4>Active until {{ currentPlan.validTo }}</h4>
        <p>We will send you a notification upon Subscription expiration</p>
      </b-col>
      <b-col cols="6">
        <div class="progress-wrapper">
          <div class="d-flex align-items-center justify-content-between">
            <b-card-title>Days</b-card-title>
            <h5>{{ daysUtilized }} of {{ planDays }} Days</h5>
          </div>
          <!--          <h4 class="mb-0">-->
          <!--            {{ value1+'%' }}-->
          <!--          </h4>-->
          <b-progress v-model="daysUtilized" :max="planDays" />
          <p>{{ daysLeft }} days remaining until your plan requires update</p>
        </div>
      </b-col>
      <b-col cols="6">
        <h4>{{ currentPlan.planMonthPrice }} € per Month popular</h4>
        <p style="margin-bottom: 5px">
          Standard plan for small to medium businesses
        </p>
        <p style="margin-bottom: 5px">{{ currentPlan.companyLimit }} companies</p>
        <p v-if="currentPlan.var === true">Vat is active </p>
        <p v-else>Vat is not active </p>
      </b-col>
      </b-col>
      <!-- buttons -->
      <b-col cols="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="mt-1 mr-1"
          type="submit"
        >
          Update Plan
        </b-button>
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="reset"
          variant="outline-secondary"
          class="mt-1"
        >
          Cancel Subscription
        </b-button>
      </b-col>
      <!--/ buttons -->
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardTitle,
  BRow,
  BCol,
  BProgress,
  BAlert,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import useJwt from "@/auth/jwt/useJwt";

export default {
  name: "AccountCurrentPlan",
  components: {
    BCard,
    BCardTitle,
    BRow,
    BCol,
    BProgress,
    BAlert,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      value1: 50,
      currentPlan: [],
      startDate: "",
      endDate: "",
      daysLeft: "",
      planDays: "",
      daysUtilized: "",
    };
  },
  methods: {
    getMyCurrentPlan() {
      let token = useJwt.getToken();
      useJwt
        .getUserCurrentPlan(token)
        .then((response) => {
          this.currentPlan = response.data;

          this.startDate = new Date(this.currentPlan.validFrom);
          this.endDate = new Date(this.currentPlan.validTo);
          var now = new Date();

          let difference = this.endDate.getTime() - now.getTime();
          this.daysLeft = Math.ceil(difference / (1000 * 3600 * 24));

          let planDaysDifference =
            this.endDate.getTime() - this.startDate.getTime();
          this.planDays = Math.ceil(planDaysDifference / (1000 * 3600 * 24));

          this.daysUtilized = this.planDays - this.daysLeft;
        })
        .catch(() => {});
    },
  },

  created() {
    this.getMyCurrentPlan();
  },
};
</script>

<style scoped>
</style>