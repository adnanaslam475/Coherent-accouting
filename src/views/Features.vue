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
          {{  $t('features.title') }}
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
          {{  $t('partners.title') }}
        </h1>
        <p class="mb-1 pb-75">
         
        </p>
      </div>
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
import  {i18n} from '@/main.js'

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
        { [i18n.tc("lbl.features")]: "Безплатни красиви фактури с опция за лого", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Конвертиране на фактури от системата на Микроинвест към други счетоводни програми.", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Безплатен OCR на фактури", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Екпорт на фактури към други Счетоводни програми", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Екпорт на създадените в системата фактури към други Счетоводни програми", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Напомняния и известия", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Стена с напомняния за ненаправени ДДС отчети.", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Темплейти за създаване на оферти към други фирми", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Качване на документи и файлове свързани с наеми и пълномощни и документи на фирма", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Фунционалности и туулове за цялостно менажиране на фирма на едно място което може да достъпвате от всякъде", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Авотоматични попълване на полета за фактури без да се въвеждат всички данни", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Отчети по чл. 117, ал. 1 от ЗДДС", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Красив и модерен дизайн лесен за научаване", [i18n.tc("companies.status")]: "✅" },
        { [i18n.tc("lbl.features")]: "Фирмени досиета", [i18n.tc("companies.status")]: "✅" }
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

