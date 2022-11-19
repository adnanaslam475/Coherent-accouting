<template>
  <section
      v-if="Object.keys(pricing).length"
      id="pricing-plan"
  >
    <!-- title text and switch button -->
    <div class="text-center">
      <h1 class="mt-5">
        Pricing Plans
      </h1>
      <p class="mb-2 pb-75">
        All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your needs.
      </p>
      <div class="d-flex align-items-center justify-content-center mb-5 pb-50">
        <h6 class="mr-1 mb-0">
          Monthly
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
          Annually
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
          class="mx-auto"
      >
        <b-row>
          <b-col md="4">
            <b-card
                align="center"
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
                {{ pricing.basicPlan.subtitle }}
              </b-card-text>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <sup class="font-medium-1 font-weight-bold text-primary">$</sup>
                  <span class="pricing-basic-value font-weight-bolder text-primary">{{ monthlyPlanShow ? pricing.basicPlan.monthlyPrice:pricing.basicPlan.yearlyPlan.perMonth }}</span>
                  <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/month</sub>
                </div>
                <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                >USD {{ pricing.basicPlan.yearlyPlan.totalAnual }} / year</small>
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group class="list-group-circle text-left">
                <b-list-group-item
                    v-for="(data,index) in pricing.basicPlan.planBenefits"
                    :key="index"
                >
                  {{ data }}
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
                Your current plan
              </b-button>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-card
                class="popular"
                align="center"
            >
              <div
                  v-show="pricing.standardPlan.popular"
                  class="pricing-badge text-right"
              >
                <b-badge
                    variant="light-primary"
                    pill
                >
                  Popular
                </b-badge>
              </div>
              <!-- img -->
              <b-img
                  v-if="aeroplanImage"
                  :src="aeroplanImage"
                  class="mb-1 w-25"
                  alt="svg img"
              />
              <!--/ img -->
              <h3>{{ pricing.standardPlan.title }}</h3>
              <b-card-text>{{ pricing.standardPlan.subtitle }}</b-card-text>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <sup class="font-medium-1 font-weight-bold text-primary">$</sup>
                  <span class="pricing-basic-value font-weight-bolder text-primary">{{ monthlyPlanShow ? pricing.standardPlan.monthlyPrice:pricing.standardPlan.yearlyPlan.perMonth }}</span>
                  <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/month</sub>
                </div>
                <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                >USD {{ pricing.standardPlan.yearlyPlan.totalAnual }} / year</small>
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group class="list-group-circle text-left">
                <b-list-group-item
                    v-for="(data,index) in pricing.standardPlan.planBenefits"
                    :key="index"
                >
                  {{ data }}
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
                Upgrade
              </b-button>
            </b-card>
          </b-col>
          <b-col md="4">
            <b-card
                align="center"
            >
              <!-- img -->
              <b-img
                  v-if="roketImage"
                  :src="roketImage"
                  class="mb-2 w-25"
                  alt="enterprise svg img"
              />
              <!--/ img -->
              <h3>{{ pricing.enterprisePlan.title }}</h3>
              <b-card-text>{{ pricing.enterprisePlan.subtitle }}</b-card-text>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <sup class="font-medium-1 font-weight-bold text-primary">$</sup>
                  <span class="pricing-basic-value font-weight-bolder text-primary">{{ monthlyPlanShow ? pricing.enterprisePlan.monthlyPrice:pricing.enterprisePlan.yearlyPlan.perMonth }}</span>
                  <sub class="pricing-duration text-body font-medium-1 font-weight-bold">/month</sub>
                </div>
                <small
                    v-show="!monthlyPlanShow"
                    class="annual-pricing text-muted"
                >USD {{ pricing.enterprisePlan.yearlyPlan.totalAnual }} / year</small>
              </div>
              <!--/ annual plan -->

              <!-- plan benefit -->
              <b-list-group
                  v-for="(data,index) in pricing.enterprisePlan.planBenefits"
                  :key="index"
                  class="list-group-circle text-left"
              >
                <b-list-group-item>
                  {{ data }}
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
                Upgrade
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!--/ pricing plan cards -->

    <!-- pricing free trial -->
    <div class="pricing-free-trial">
      <b-row>
        <b-col
            lg="10"
            offset-lg="3"
            class="mx-auto"
        >
          <div class="pricing-trial-content d-flex justify-content-between">
            <div class="text-center text-md-left mt-3">
              <h3 class="text-primary">
                Still not convinced? Start with a 14-day FREE trial!
              </h3>
              <h5>You will get full access to with all the features for 14 days.</h5>
              <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="mt-2 mt-lg-3"
              >
                Start 14-day FREE trial
              </b-button>
            </div>

            <!-- images -->
            <b-img
                fluid
                :src="require('@/assets/images/illustration/pricing-Illustration.svg')"
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
    <div class="pricing-faq">
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

            <app-collapse-item
                v-for="(data,index) in pricing.qandA"
                :key="index"
                :title="data.question"
            >
              {{ data.ans }}
            </app-collapse-item>
          </app-collapse>
        </b-col>
      </b-row>
    </div>
    <!--/ pricing faq -->
  </section>
</template>

<script>
import {
  BFormCheckbox, BRow, BCol, BCard, BImg, BCardText, BListGroup, BListGroupItem, BButton, BBadge,
} from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import Ripple from 'vue-ripple-directive'
/* eslint-disable global-require */
export default {
  components: {
    BFormCheckbox,
    BButton,
    BCardText,
    BListGroup,
    BListGroupItem,
    BRow,
    BCol,
    BCard,
    BBadge,
    BImg,
    AppCollapseItem,
    AppCollapse,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      hotAirBallon: '',
      roketImage: '',
      aeroplanImage: '',
      status: 'monthly',
      monthlyPlanShow: true,
      pricing: {
        basicPlan: {
          title: 'Basic',
          img: require('@/assets/images/illustration/Pot1.svg'),
          subtitle: 'A simple start for everyone',
          monthlyPrice: 0,
          yearlyPlan: {
            perMonth: 0,
            totalAnual: 0,
          },
          planBenefits: [
            '100 responses a month',
            'Unlimited forms and surveys',
            'Unlimited fields',
            'Basic form creation tools',
            'Up to 2 subdomains',
          ],
          popular: false,
        },
        standardPlan: {
          title: 'Standard',
          img: require('@/assets/images/illustration/Pot2.svg'),
          subtitle: 'For small to medium businesses',
          monthlyPrice: 49,
          yearlyPlan: {
            perMonth: 40,
            totalAnual: 480,
          },
          planBenefits: [
            'Unlimited responses',
            'Unlimited forms and surveys',
            'Instagram profile page',
            'Google Docs integration',
            'Custom “Thank you” page',
          ],
          popular: true,
        },
        enterprisePlan: {
          title: 'Enterprise',
          img: require('@/assets/images/illustration/Pot3.svg'),
          subtitle: 'Solution for big organizations',
          monthlyPrice: 99,
          yearlyPlan: {
            perMonth: 80,
            totalAnual: 960,
          },
          planBenefits: [
            'PayPal payments',
            'Logic Jumps',
            'File upload with 5GB storage',
            'Custom domain support',
            'Stripe integration',
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
    this.aeroplanImage = require('@/assets/images/illustration/aeroplane-transport-svgrepo-com.svg')
    this.roketImage = require('@/assets/images/illustration/rocket-svgrepo-com.svg')
  },
  methods: {
    tooglePlan() {
      this.monthlyPlanShow = this.status === 'monthly';
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-pricing.scss';
</style>
