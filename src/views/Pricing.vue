<template>

  <section
      id="pricing-plan"
  >
    <b-row class="auth-inner m-0">
      <navbarAds/>
    </b-row>
    <!-- title text and switch button -->
    <div class="text-center">
      <h1>
        {{  $t('pricing.title') }}
      </h1>
      <p class="mb-1 pb-75">
        {{  $t('pricing.description') }} 
      </p>
      <div class="d-flex align-items-center justify-content-center mb-1 pb-50">
        <h6 class="mr-1 mb-0">
          {{  $t('pricing.monthly') }}
        </h6>
        <b-form-checkbox
            id="priceSwitch"
            v-model="status"
            name="price-switch"
            value="annually"
            unchecked-value="monthly"
            switch
            @input="tooglePlan"
        />
        <h6 class="ml-50 mb-0">
          {{  $t('pricing.annually') }}
        </h6>
      </div>
    </div>
    <!--/ title text and switch button -->

   <!-- pricing plan cards -->
   <b-row class="pricing-card">
      <b-col
        offset-sm-2
        sm="10"
        md="12"
        offset-lg="2"
        lg="10"
        class="mx-auto d-flex align-items-center justify-content-center"
      >
        <b-col cols="10">
          <b-row class="mx-auto d-flex align-items-center justify-content-center">

            <!-- Basic Plan -->
            <b-col md="4">
              <b-card 
                align="center"
                class="pb-1"
              >
                <!-- img -->
                <b-img
                  v-if="hotAirBallon"
                  :src="hotAirBallon"
                  class="mb-2 mt-1 w-25"
                  alt="basic svg img"
                />
                <!--/ img -->
                <h3>{{ pricing.basicPlan.title }}</h3>
                <b-card-text>
                  {{  $t('pricing.simple_start_for_everyone') }}
                </b-card-text>

                <!-- Plan fee -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <sup class="font-medium-1 font-weight-bold text-primary">€</sup>
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >
                    <!-- {{
                      monthlyPlanShow ? pricing.basicPlan.monthlyPrice : pricing.basicPlan.yearlyPlan.perMonth
                    }} -->
                    {{
                      monthlyPlanShow ? monthlyBasic : annualBasicMonth
                    }}

                    </span>
                    <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/{{  $t('pricing.month') }}</sub>
                  </div>
                  <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                  >€ {{  annualBasic}} / {{  $t('pricing.year') }}</small>
                </div>

                <!-- plan benefit -->
                <b-list-group class="list-group-circle text-left">
                  <b-list-group-item
                    v-for="(data,index) in pricing.basicPlan.planBenefits"
                    :key="index"
                  >
                  <div v-if="index === 0">40 {{  $t('companiess') }}</div>
                   <div v-else>{{ $t('pricing.'+data) }}</div>
                  </b-list-group-item>
                </b-list-group>
                <!--/ plan benefit -->

                <!-- buttons -->
                <b-button
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  block
                  class="mt-2"
                  variant="outline-success"
                >
                {{  $t('pricing.plan') }}
                </b-button>
              </b-card>
            </b-col>

            <!-- Beginner Plan -->
            <b-col md="4">
              <b-card
                class="pb-1 popular"
                align="center"
              >
                <div
                  v-show="pricing.beginnerPlan.popular"
                  class="pricing-badge text-right"
                >
                  <b-badge
                    variant="light-primary"
                    pill
                  >
                  {{  $t('pricing.popular') }}
                  </b-badge>
                </div>
                <!-- img -->
                <b-img
                  v-if="helicolptorImage"
                  :src="helicolptorImage"
                  class="mb-1 w-25"
                  alt="svg img"
                />
                <!--/ img -->
                <h3>{{ pricing.beginnerPlan.title }}</h3>
                <b-card-text>{{  $t('pricing.small_to_medium_businesses') }}</b-card-text>

                <!-- plan price -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <sup class="font-medium-1 font-weight-bold text-primary">€</sup>
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >
                    <!-- {{
                      monthlyPlanShow ? pricing.beginnerPlan.monthlyPrice : pricing.beginnerPlan.yearlyPlan.perMonth
                    }} -->
                    {{
                      monthlyPlanShow ? monthlyBeginner : annualBeginnerMonth
                    }}
                    </span>
                    <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/{{  $t('pricing.month') }}</sub>
                  </div>
                  <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                  >€ {{ annualBeginner  }} / {{  $t('pricing.year') }}</small>
                </div>

                <!-- plan benefit -->
                <b-list-group class="list-group-circle text-left">
                  <b-list-group-item
                    v-for="(data,index) in pricing.beginnerPlan.planBenefits"
                    :key="index"
                  >
                  <div v-if="index === 0">60 {{  $t('companiess') }}</div>
                   <div v-else>{{ $t('pricing.'+data) }}</div>
                  </b-list-group-item>
                </b-list-group>
                <!--/ plan benefit -->

                <!-- buttons -->
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  block
                  class="mt-2"
                  variant="primary"
                >
                {{  $t('pricing.upgrade') }}
                </b-button>
              </b-card>
            </b-col>

            <!-- Starter Plan -->
            <b-col md="4">
              <b-card
                align="center"
                class="pb-1"
              >
                <!-- img -->
                <b-img
                  v-if="aeroplanImage"
                  :src="aeroplanImage"
                  class="mb-2 w-25"
                  alt="enterprise svg img"
                />
                <!--/ img -->
                <h3>{{ pricing.starterPlan.title }}</h3>
                <b-card-text>{{  $t('pricing.big_organisations') }}</b-card-text>

                <!-- annual plan -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <sup class="font-medium-1 font-weight-bold text-primary">€</sup>
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >
                    <!-- {{
                      monthlyPlanShow ? pricing.starterPlan.monthlyPrice : pricing.starterPlan.yearlyPlan.perMonth
                    }} -->
                    {{
                      monthlyPlanShow ? monthlyStarter : annualStarterMonth
                    }}
                    </span>
                    <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/{{  $t('pricing.month') }}</sub>
                  </div>
                  <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                  >€ {{ annualStarter }} / {{  $t('pricing.year') }}</small>
                </div>
                <!--/ annual plan -->

                <!-- plan benefit -->
                <b-list-group
                  v-for="(data,index) in pricing.starterPlan.planBenefits"
                  :key="index"
                  class="list-group-circle text-left"
                >
                  <b-list-group-item>
                    <div v-if="index === 0">100 {{  $t('companiess') }}</div>
                   <div v-else>{{ $t('pricing.'+data) }}</div>
                  </b-list-group-item>
                </b-list-group>
                <!--/ plan benefit -->

                <!-- buttons -->
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  class="mt-2"
                  variant="outline-primary"
                >
                {{  $t('pricing.upgrade') }}
                </b-button>
              </b-card>
            </b-col>

            <!-- Enterprise Plan -->
            <b-col md="4">
              <b-card
                align="center"
                class="pb-1"
              >
                <!-- img -->
                <b-img
                  v-if="aeroplanJetImage"
                  :src="aeroplanJetImage"
                  class="mb-2 w-25"
                  alt="enterprise svg img"
                />
                <!--/ img -->
                <h3>{{ pricing.primaryPlan.title }}</h3>
                <b-card-text>{{  $t('pricing.big_organisations') }}</b-card-text>

                <!-- annual plan -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <sup class="font-medium-1 font-weight-bold text-primary">€</sup>
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >
                    <!-- {{
                      monthlyPlanShow ? pricing.primaryPlan.monthlyPrice : pricing.primaryPlan.yearlyPlan.perMonth
                    }} -->
                    {{
                      monthlyPlanShow ? monthlyEnterprise : annualEnterpriseMonth
                    }}
                    </span>
                    <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/{{  $t('pricing.month') }}</sub>
                  </div>
                  <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                  >€ {{ annualEnterprise  }} / {{  $t('pricing.year') }}</small>
                </div>
                <!--/ annual plan -->

                <!-- plan benefit -->
                <b-list-group
                  v-for="(data,index) in pricing.primaryPlan.planBenefits"
                  :key="index"
                  class="list-group-circle text-left"
                >
                  <b-list-group-item>
                    <div v-if="index === 0">150 {{  $t('companiess') }}</div>
                   <div v-else>{{ $t('pricing.'+data) }}</div>
                  </b-list-group-item>
                </b-list-group>
                <!--/ plan benefit -->

                <!-- buttons -->
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  class="mt-2"
                  variant="outline-primary"
                >
                {{  $t('pricing.upgrade') }}
                </b-button>
              </b-card>
            </b-col>

            <!-- Platinum Plan -->
            <b-col md="4">
              <b-card
                align="center"
                class="pb-1"
              >
                <!-- img -->
                <b-img
                  v-if="roketImage"
                  :src="roketImage"
                  class="mb-2 w-25"
                  alt="enterprise svg img"
                />
                <!--/ img -->
                <h3>{{ pricing.platinumPlan.title }}</h3>
                <b-card-text>{{  $t('pricing.big_organisations') }}</b-card-text>

                <!-- annual plan -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <sup class="font-medium-1 font-weight-bold text-primary">€</sup>
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >
                    <!-- {{
                      monthlyPlanShow ? pricing.platinumPlan.monthlyPrice : pricing.platinumPlan.yearlyPlan.perMonth
                    }} -->
                    {{
                      monthlyPlanShow ? monthlyPlatinum : annualPlatinumMonth
                    }}
                    </span>
                    <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/{{  $t('pricing.month') }}</sub>
                  </div>
                  <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                  >€ {{ annualPlatinum }} / {{  $t('pricing.year') }}</small>
                </div>
                <!--/ annual plan -->

                <!-- plan benefit -->
                <b-list-group
                  v-for="(data,index) in pricing.platinumPlan.planBenefits"
                  :key="index"
                  class="list-group-circle text-left"
                >
                  <b-list-group-item>
                    <div v-if="index === 0">250 {{  $t('companiess') }}</div>
                   <div v-else>{{ $t('pricing.'+data) }}</div>
                  </b-list-group-item>
                </b-list-group>
                <!--/ plan benefit -->

                <!-- buttons -->
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  class="mt-2"
                  variant="outline-primary"
                >
                {{  $t('pricing.upgrade') }}
                </b-button>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-col>
    </b-row>
    <!--/ pricing plan cards -->

     <!--Footnote  -->
    <b-row >
      <b-col sm="10"
        md="12"
        offset-lg="2"
        lg="10"
        class="mx-auto"><b>Note:</b>  All prices are without VAT</b-col>
    </b-row>

    <!-- pricing free trial -->
    <div class="pricing-free-trial mt-5">
      <b-row>
        <b-col
            lg="10"
            offset-lg="3"
            class="mx-auto"
        >
          <div class="pricing-trial-content d-flex justify-content-between">
            <div class="text-center text-md-left mt-3">
              <h3 class="text-primary">
                {{  $t('pricing.still_not_convinced') }}  {{  $t('pricing.trial') }}
              </h3>
              <h5> {{  $t('pricing.full_access') }}</h5>
              <b-link
                  to="/my-plans"
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="btn btn-primary mt-2 mt-lg-3"
              >
              {{  $t('pricing.free_trial') }}
              </b-link>
            </div>

            <!-- images -->
            <b-img
                fluid
                :src="require('../assets/images/illustration/pricing-Illustration.svg')"
                class="pricing-trial-img"
                alt="svg img"
            />
            <!--/ images -->
          </div>
        </b-col>
      </b-row>
    </div>
    <!--/ pricing free trial -->

    <!-- pricing faq -->
    <!-- <div class="pricing-faq">
      <h3 class="text-center">
        FAQ's
      </h3>
      <p class="text-center">
        Let us help answer the most common questions.
      </p>
      <b-row class="py-2">
        <b-col
            lg="10"
            offset-lg="2"
            class="mx-auto"
        >
          <app-collapse
              accordion
              type="margin"
          >

            <app-collapse-item title="Lorem Ipsum?">
              Lorem Ipsum is simply a dummy text
            </app-collapse-item>
          </app-collapse>
        </b-col>
      </b-row>
    </div> -->
    <!--/ pricing faq -->
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'

import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BDropdown,
  BDropdownItem,
  BFormSelect,
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BNavForm,
  BCollapse,
  BNavItemDropdown,
  BDropdownDivider,
  BAvatar,
  BNavItem,

} from 'bootstrap-vue'
import {
  BFormCheckbox, BCard, BListGroup, BListGroupItem, BBadge,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import Ripple from 'vue-ripple-directive'
import navbarAds from './navbarAds.vue'
import useJwt from "@/auth/jwt/useJwt";
/* eslint-disable global-require */
export default {
  components: {

    BButton,
    BCardText,
    BListGroup,
    BListGroupItem,
    BCard,
    BBadge,
    AppCollapseItem,
    AppCollapse,
    BRow,
    VuexyLogo,
    BImg,
    BCol,
    BLink,
    BForm,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BDropdown,
    BFormSelect,
    BDropdownItem,
    BFormInput,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItemDropdown,
    BNavForm,
    BDropdownDivider,
    BAvatar,
    BNavItem,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    vSelect,
    navbarAds,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      annualPlatinumMonth: '',
      annualEnterpriseMonth:'',
      annualStarterMonth:'',
      annualBeginnerMonth:'',
      annualBasicMonth: '',
      annualPlatinum: '',
      annualEnterprise:'',
      annualStarter:'',
      annualBeginner:'',
      annualBasic: '',
      monthlyPlatinum: '',
      monthlyEnterprise:'',
      monthlyStarter:'',
      monthlyBeginner:'',
      monthlyBasic:'',
      title: 'test',
      hotAirBallon: '',
      roketImage: '',
      aeroplanImage: '',
      helicolptorImage: '',
      aeroplanJetImage: '',
      status: 'annually',
      monthlyPlanShow: false,
      pricing: {
        basicPlan: {
          title: 'Basic',
          img: require('@/assets/images/illustration/Pot1.svg'),
          subtitle: 'A simple start for everyone',
          monthlyPrice: 45,
          yearlyPlan: {
            perMonth: 39,
            totalAnual: 39 * 12,
          },
          planBenefits: [
            'companiess',
            'unlimited_ocr_invoices',
            'unlimited_space',
            'unlimited_digital_invoices',
            'click_monthly_vat_report',
            'yearly_reports',
          ],
          popular: false,
        },
        beginnerPlan: {
          title: 'Beginner',
          img: require('@/assets/images/illustration/Pot2.svg'),
          subtitle: 'For small to medium businesses',
          monthlyPrice: 59,
          yearlyPlan: {
            perMonth: 49,
            totalAnual: 49 * 12,
          },
          planBenefits: [
          'companiess',
            'unlimited_ocr_invoices',
            'unlimited_space',
            'unlimited_digital_invoices',
            'click_monthly_vat_report',
            'yearly_reports',
          ],
          popular: true,
        },
        starterPlan: {
          title: 'Starter',
          img: require('@/assets/images/illustration/Pot3.svg'),
          subtitle: 'Solution for big organizations',
          monthlyPrice: 84,
          yearlyPlan: {
            perMonth: 69,
            totalAnual: 69 * 12,
          },
          planBenefits: [
          'companiess',
            'unlimited_ocr_invoices',
            'unlimited_space',
            'unlimited_digital_invoices',
            'click_monthly_vat_report',
            'yearly_reports',
          ],
          popular: false,
        },
        primaryPlan: {
          title: 'Enterprise',
          img: require('@/assets/images/illustration/Pot3.svg'),
          subtitle: 'Solution for big organizations',
          monthlyPrice: 116,
          yearlyPlan: {
            perMonth: 95,
            totalAnual: 95 * 12,
          },
          planBenefits: [
          'companiess',
            'unlimited_ocr_invoices',
            'unlimited_space',
            'unlimited_digital_invoices',
            'click_monthly_vat_report',
            'yearly_reports',
          ],
          popular: false,
        },
        platinumPlan: {
          title: 'Platinum',
          img: require('@/assets/images/illustration/Pot3.svg'),
          subtitle: 'Solution for big organizations',
          monthlyPrice: 129,
          yearlyPlan: {
            perMonth: 149,
            totalAnual: 149 * 12,
          },
          planBenefits: [
          'companiess',
            'unlimited_ocr_invoices',
            'unlimited_space',
            'unlimited_digital_invoices',
            'click_monthly_vat_report',
            'yearly_reports',
          ],
          popular: false,
        },
        qandA: [
          {
            question: 'Does my subscription automatically renew?',
            ans:
                'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.',
          },
          {
            question: 'Can I store the item on an intranet so everyone has access?',
            ans:
                'Tiramisu marshmallow dessert halvah bonbon cake gingerbread. Jelly beans chocolate pie powder. Dessert pudding chocolate cake bonbon bear claw cotton candy cheesecake. Biscuit fruitcake macaroon carrot cake. Chocolate cake bear claw muffin chupa chups pudding.',
          },
          {
            question: 'Am I allowed to modify the item that I purchased?',
            ans:
                'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan. Carrot cake marshmallow pastry. Bonbon biscuit pastry topping toffee dessert gummies. Topping apple pie pie croissant cotton candy dessert tiramisu.',
          },
        ],
      },
    }
  },
  created() {
    this.hotAirBallon = require('@/assets/images/illustration/hot-air-balloon.svg')
    this.helicolptorImage = require('@/assets/images/illustration/helicoptor.svg')
    this.aeroplanImage = require('@/assets/images/illustration/aeroplane-transport-svgrepo-com.svg')
    this.aeroplanJetImage = require('@/assets/images/illustration/aeroplane-plane-svgrepo-com.svg')
    this.roketImage = require('@/assets/images/illustration/rocket-svgrepo-com.svg')
    this.getPlansValues();
  },
  methods: {
    tooglePlan() {
      this.monthlyPlanShow = this.status === 'monthly'
    },

    //get plans
    getPlansValues(){
      useJwt.getPlansPrices().then((response) => {
        this.plansPrice = response.data;
        for(let i=0; i<this.plansPrice.length; i++){
          if((this.plansPrice[i].name === "BASIC") && (this.plansPrice[i].planType === "MONTHLY") ){
            this.monthlyBasic = this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "BASIC") && (this.plansPrice[i].planType === "YEARLY") ){
            this.annualBasic = this.plansPrice[i].yearPrice;
            this.annualBasicMonth = this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "BEGINNER") && (this.plansPrice[i].planType === "MONTHLY") ){
            this.monthlyBeginner = this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "BEGINNER") && (this.plansPrice[i].planType === "YEARLY") ){
            this.annualBeginner = this.plansPrice[i].yearPrice;
            this.annualBeginnerMonth = this.plansPrice[i].fee
          }
          if((this.plansPrice[i].name === "STARTER") && (this.plansPrice[i].planType === "MONTHLY") ){
            this.monthlyStarter = this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "STARTER") && (this.plansPrice[i].planType === "YEARLY") ){
            this.annualStarter = this.plansPrice[i].yearPrice;
            this.annualStarterMonth = this.plansPrice[i].fee;

          }
          if((this.plansPrice[i].name === "ENTERPRISE") && (this.plansPrice[i].planType === "MONTHLY") ){
            this.monthlyEnterprise= this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "ENTERPRISE") && (this.plansPrice[i].planType === "YEARLY") ){
            this.annualEnterprise = this.plansPrice[i].yearPrice;
            this.annualEnterpriseMonth = this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "PLATINIUM") && (this.plansPrice[i].planType === "MONTHLY") ){
            this.monthlyPlatinum = this.plansPrice[i].fee;
          }
          if((this.plansPrice[i].name === "PLATINIUM") && (this.plansPrice[i].planType === "YEARLY") ){
            this.annualPlatinum = this.plansPrice[i].yearPrice;
            this.annualPlatinumMonth = this.plansPrice[i].fee;

          }
          
        }
      });
    }
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-pricing.scss';

.navbar-desktop a {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  color: #6e6b7b !important;
  padding-bottom: 0 !important;
}

@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
