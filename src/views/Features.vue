<template>
  <div>
    <b-row class="auth-inner m-0">
      <navbarAds />
    </b-row>
    <b-table striped hover :items="items"></b-table>
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
  </div>
</template>
  
<script>
import { BAvatar, BTable } from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import navbarAds from "./navbarAds.vue"
import {
  BRow, BCol, BCard, BCardBody, BForm, BInputGroup, BFormInput, BCardText, BInputGroupPrepend,
} from 'bootstrap-vue'

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
    BTable
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
        { feature: "Безплатни красиви фактури с опция за лого", status: "✅" },
        { feature: "Конвертиране на фактури от системата на Микроинвест към други счетоводни програми.", status: "✅" },
        { feature: "Безплатен OCR на фактури", status: "✅" },
        { feature: "Екпорт на фактури към други Счетоводни програми", status: "✅" },
        { feature: "Екпорт на създадените в системата фактури към други Счетоводни програми", status: "✅" },
        { feature: "Напомняния и известия", status: "✅" },
        { feature: "Стена с напомняния за ненаправени ДДС отчети.", status: "✅" },
        { feature: "Темплейти за създаване на оферти към други фирми", status: "✅" },
        { feature: "Качване на документи и файлове свързани с наеми и пълномощни и документи на фирма", status: "✅" },
        { feature: "Фунционалности и туулове за цялостно менажиране на фирма на едно място което може да достъпвате от всякъде", status: "✅" },
        { feature: "Авотоматични попълване на полета за фактури без да се въвеждат всички данни", status: "✅" },
        { feature: "Отчети по чл. 117, ал. 1 от ЗДДС", status: "✅" },
        { feature: "Красив и модерен дизайн лесен за научаване", status: "✅" },
        { feature: "Фирмени досиета", status: "✅" }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>

