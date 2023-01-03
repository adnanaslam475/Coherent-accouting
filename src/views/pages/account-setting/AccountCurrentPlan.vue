<template>
  <b-card>
    <b-card-title class="ml-3">{{  $t('current_plan.my_plan') }}</b-card-title>
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
            <b>{{  $t('current_plan.we_need_your_attention') }}</b>
          </p>
          <p style="font-size: 1rem">{{  $t('current_plan.your_plan_expires_soon') }}</p>
        </b-alert>
        <b-alert
          show
          variant="success"
          class="p-75"
          style="width: 95%; margin-left: 13px"
          v-else
        >
          <h4 style="font-size: 1.125rem">{{  $t('current_plan.enjoy_your_plan') }}</h4>
        </b-alert>
      </b-col>
      <!-- Plan Details -->
      <b-col cols="6">
        <h4 style="margin-bottom: 1rem">
          {{  $t('current_plan.your_current_plan_is') }}
          <span style=" margin-right: 12px">
          {{
            currentPlan.planName
          }} 
        </span>
        </h4>
        <!-- Status -->
        <p>
          <b>{{  $t('current_plan.status') }} :</b>
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
              margin-left: 10px
            "
            ><span class="v-chip__underlay"></span>
            <b>{{  $t('current_plan.active') }}</b>
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
              margin-left: 10px
            "
            ><span class="v-chip__underlay"></span>
            <b> {{  $t('current_plan.in_active') }}</b>
          </span>
        </p>
      </b-col>
      <!-- Progress Bar -->
      <b-col cols="6">
        <div class="progress-wrapper">
          <div class="d-flex align-items-center justify-content-between">
            <b-card-title>{{  $t('current_plan.days') }}</b-card-title>
            <h5 v-if="daysUtilized <= planDays">
              {{ daysUtilized }} of {{ planDays }} {{  $t('current_plan.days') }}
            </h5>
            <h5 v-else>{{ planDays }} of {{ planDays }} {{  $t('current_plan.days') }}</h5>
          </div>
          <!--          <h4 class="mb-0">-->
          <!--            {{ value1+'%' }}-->
          <!--          </h4>-->
          <b-progress v-model="daysUtilized" :max="planDays" />

          <p v-if="daysLeft < 0">
            0 {{  $t('current_plan.days_remaining') }}
          </p>
          <p v-else>
            {{ daysLeft }} {{  $t('current_plan.days_remaining') }}
          </p>
        </div>
      </b-col>
      <b-col cols="6" style="margin-top: -25px">
        <!-- Price -->
        <p style="margin-bottom: 0.7rem">
          <b>{{  $t('current_plan.price') }} : </b> {{ currentPlan.planMonthPrice }} € {{  $t('current_plan.per_month') }}
        </p>
        <!-- limits -->
        <p><b>{{  $t('current_plan.limit') }} : </b>{{ currentPlan.companyLimit }} {{ $t('companiess') }} </p>
      </b-col>

      <b-col cols="6" v-if="daysLeft > 0">
        <h4>{{  $t('current_plan.active_until') }} {{ currentPlan.validTo }}</h4>
        <p>   {{  $t('current_plan.we_will_send_you_a_notification') }}</p>
      </b-col>
      <b-col cols="6" v-else>
        <h4 class="text-danger">
          {{  $t('current_plan.your_plan_expired_on') }} {{ currentPlan.validTo }}
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
        {{  $t('current_plan.update_plan') }}
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


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
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Error fetching current plan`,
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        });
    },
  },

  created() {
    this.getMyCurrentPlan();
  },
};
</script>

<style scoped>
</style>