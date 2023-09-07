<template>
  <div>
    <b-row class="auth-inner m-0">
      <navbarAds />
    </b-row>

    <section id="features">
      <div class="text-center">

      </div>
    </section>
    <section id="features-content">
      <b-row class="kb-search-content-info match-height m-0">
        <b-col v-for="item in features" :key="item.question" md="12" sm="12">
          <app-collapse id="faq-payment-qna" accordion type="margin" class="mt-2 px-2">
            <app-collapse-item :title="$t(`${item.question}`)">
              {{ $t(`${item.answer}`) }}
            </app-collapse-item>
          </app-collapse>
        </b-col>
      </b-row>
    </section>
    <section class="mt-50">
      <div class="text-center">
        <h1>
          {{ $t('features.title') }}
        </h1>
        <!-- <p class="mb-1 pb-75">
          {{  $t('features.description') }} 
        </p> -->
      </div>
      <b-table class="my-settings" striped hover :items="items"></b-table>

    </section>
    <section class="mt-50">
      <div class="text-center">
        <h1>
          {{ $t('partners.title') }}
        </h1>
        <p class="mb-1 pb-75">

        </p>
      </div>
      <b-row class="pricing-card">
        <b-col offset-sm-2 sm="10" md="12" offset-lg="2" lg="10"
          class="mx-auto d-flex align-items-center justify-content-center">
          <b-col cols="10">
            <b-row class="mx-auto d-flex align-items-center justify-content-center">

              <!-- Basic Plan -->
              <b-col md="4" class="text-center">
                <b-card img-src="../assets/images/partners/one.jpg" img-alt="Image" img-top>
                  <a target="_blank" href="https://sites.google.com/" class="card-link">ЛОГО Д И З</a>
                  <!-- <b-card-text>
                      This is a wider card with supporting text below as a natural lead-in to additional content.
                      This content is a little bit longer.
                    </b-card-text> -->
                  <!-- <template #footer>
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </template> -->
                </b-card>
              </b-col>
              <b-col md="4" class="text-center">
                <b-card img-src="../assets/images/partners/two.jpg" img-alt="Image" img-top>
                  <a target="_blank" href="https://sites.google.com/" class="card-link">ЛОГО ЗОДИ</a>
                  <!-- <b-card-text>
                      This is a wider card with supporting text below as a natural lead-in to additional content.
                      This content is a little bit longer.
                    </b-card-text> -->
                  <!-- <template #footer>
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </template> -->
                </b-card>
              </b-col>
              <b-col md="4">
                <!-- <b-card img-src="../assets/images/why-choose-us/1.png" img-alt="Image" img-top>
                    <b-card-text>
                      This is a wider card with supporting text below as a natural lead-in to additional content.
                      This content is a little bit longer.
                    </b-card-text>
                    <template #footer>
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </template>
                  </b-card> -->
              </b-col>

            </b-row>
          </b-col>
        </b-col>
      </b-row>


    </section>
  </div>
</template>
  
<script>
import { BAvatar, BTable } from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import navbarAds from "./navbarAds.vue"
import {
  BRow, BCol, BCard, BCardBody, BForm, BInputGroup, BFormInput, BCardText, BInputGroupPrepend, BImg,
} from 'bootstrap-vue'
import { i18n } from '@/main.js'

export default {
  components: {
    BAvatar,
    AppCollapseItem,
    AppCollapse,
    navbarAds,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BTable,
    BImg
  },
  props: {
    options: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      items: [
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable1"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable2"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable3"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable4"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable5"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable6"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable7"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable8"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable9"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable10"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable11"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable12"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable13"), [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: i18n.tc("featureLable14"), [i18n.tc("companies.status")]: "✅" }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import '@core/scss/vue/pages/page-knowledge-base.scss';

.my-settings {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
}

.mt-50 {
  margin-top: 50px !important;
}
</style>

