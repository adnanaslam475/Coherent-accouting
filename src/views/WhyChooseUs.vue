<template>
  <div>
    <b-row class="auth-inner m-0">
      <navbarAds />
    </b-row>
    <section id="about">
      <div class="text-center">
        <h1 class="text-primary text-center mt-5">
          {{ $t('why_choose_use.title') }}
        </h1>
      </div>
    </section>
    <b-row>
      <b-container class="p-5">
        <b-row class="p-5">
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_1') }}
              </h2>
            </div>
          </b-col>
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/1.png"
            />
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/2.png"
            />
          </b-col>
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_2') }}
              </h2>
            </div>
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_3') }}
              </h2>
            </div>
          </b-col>
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/3.png"
            />
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/4.png"
            />
          </b-col>
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_4') }}
              </h2>
            </div>
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_5') }}
              </h2>
            </div>
          </b-col>
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/5.png"
            />
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/6.png"
            />
          </b-col>
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_6') }}
              </h2>
            </div>
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_7') }}
              </h2>
            </div>
          </b-col>
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/7.png"
            />
          </b-col>
        </b-row>
        <b-row class="p-5">
          <b-col cols="6">
            <b-img
              width="500px"
              src="@/assets/images/why-choose-us/8.png"
            />
          </b-col>
          <b-col cols="6">
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
              <h2>
                {{ $t('why_choose_use.title_8') }}
              </h2>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
  </div>
</template>

<script>
import {
  BCol, BRow, BContainer, BImg,
} from 'bootstrap-vue'
import navbarAds from './navbarAds.vue'

export default {
  name: 'WhyChooseUs',
  components: {
    navbarAds,
    BRow,
    BCol,
    BContainer,
    BImg,
  },
}
</script>

<style scoped>

</style>
