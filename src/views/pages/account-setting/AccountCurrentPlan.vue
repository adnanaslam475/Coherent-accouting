<template>
  <b-card>
    <b-card-title class="ml-3">My Plan</b-card-title>
    <b-row>
      <!-- Plan image -->
      <b-col cols="6">
        <b-img
          :src="
            currentPlan.planName === 'BASIC'
              ? basicImage
              : currentPlan.planName === 'BEGINNER'
              ? beginnerImage
              : currentPlan.planName === 'STARTER'
              ? starterImage
              : currentPlan.planName === 'ENTERPRISE'
              ? enterpriseImage
              : currentPlan.planName === 'PLATINIUM'
              ? platinumImage
              : ''
          "
          class="mb-2 ml-2 w-25"
          alt="basic svg img"
        />
      </b-col>

      <!-- Alert  -->
      <b-col cols="6" class="p-0">
        <b-alert
          show
          variant="warning"
          class="p-75"
          style="width: 95%; margin-left: 13px"
          v-if="daysLeft <= 5"
        >
          <p style="font-size: 1.125rem">
            <b>We need your attention!</b>
          </p>
          <p style="font-size: 1rem">Your plan expires soon</p>
        </b-alert>
        <b-alert
          show
          variant="success"
          class="p-75"
          style="width: 95%; margin-left: 13px"
          v-else
        >
          <h4 style="font-size: 1.125rem">Enjoy your plan!</h4>
        </b-alert>
      </b-col>
      <!-- Plan Details -->
      <b-col cols="6">
        <h4 style="margin-bottom: 1rem">
          Your Current Plan is
          <span style="text-transform: capitalize; margin-right: 12px">{{
            currentPlan.planName
          }}</span>
        </h4>
        <!-- Status -->
        <p>
          <b>Status: </b>
          <span
            v-if="currentPlan.active === true"
            class="
              v-chip v-chip--label
              v-theme--light
              text-primary
              v-chip--density-default v-chip--size-small v-chip--variant-tonal
            "
            draggable="false"
            style="
              background-color: aliceblue;
              padding: 5px 10px;
              border-radius: 20px;
            "
            ><span class="v-chip__underlay"></span>
            <b>Active</b>
          </span>
          <span
            v-else
            class="
              v-chip v-chip--label
              v-theme--light
              text-danger
              v-chip--density-default v-chip--size-small v-chip--variant-tonal
            "
            draggable="false"
            style="
              background-color: rgba(234, 84, 85, 0.12) !important;
              padding: 5px 10px;
              border-radius: 20px;
            "
            ><span class="v-chip__underlay"></span>
            <b> Inactive</b>
          </span>
        </p>
      </b-col>
      <!-- Progress Bar -->
      <b-col cols="6">
        <div class="progress-wrapper">
          <div class="d-flex align-items-center justify-content-between">
            <b-card-title>Days</b-card-title>
            <h5 v-if="daysUtilized <= planDays">
              {{ daysUtilized }} of {{ planDays }} Days
            </h5>
            <h5 v-else>{{ planDays }} of {{ planDays }} Days</h5>
          </div>
          <!--          <h4 class="mb-0">-->
          <!--            {{ value1+'%' }}-->
          <!--          </h4>-->
          <b-progress v-model="daysUtilized" :max="planDays" />

          <p v-if="daysLeft < 0">
            0 days remaining until your plan requires update
          </p>
          <p v-else>
            {{ daysLeft }} days remaining until your plan requires update
          </p>
        </div>
      </b-col>
      <b-col cols="6" style="margin-top: -25px">
        <!-- Price -->
        <p style="margin-bottom: 0.7rem">
          <b>Price:</b> {{ currentPlan.planMonthPrice }} € per Month
        </p>
        <!-- limits -->
        <p><b>Limit: </b>{{ currentPlan.companyLimit }} companies</p>
      </b-col>

      <b-col cols="6" v-if="daysLeft > 0">
        <h4>Active until {{ currentPlan.validTo }}</h4>
        <p>We will send you a notification upon Subscription expiration</p>
      </b-col>
      <b-col cols="6" v-else>
        <h4 class="text-danger">
          Your plan expired on {{ currentPlan.validTo }}
        </h4>
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
        <!-- <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="reset"
          variant="outline-secondary"
          class="mt-1"
        >
          Cancel Subscription
        </b-button> -->
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
  BImg,
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
    BImg,
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
      basicImage: require("@/assets/images/illustration/hot-air-balloon.svg"),
      starterImage: require("@/assets/images/illustration/aeroplane-transport-svgrepo-com.svg"),
      platinumImage: require("@/assets/images/illustration/rocket-svgrepo-com.svg"),
      enterpriseImage: require("@/assets/images/illustration/aeroplane-plane-svgrepo-com.svg"),
      beginnerImage: require("@/assets/images/illustration/helicoptor.svg"),
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