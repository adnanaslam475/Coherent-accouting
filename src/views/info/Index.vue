<template>
  <div class="">
    <b-row class="info-wrapper m-0 align-items-start">
      <navbarAds />
      <b-col
        sm="12"
        lg="6"
        order="2"
        order-lg="1"
        class="d-flex align-items-center px-2 p-lg-5"
      >
        <div>
          <div class="mb-3">
            <h1>Coherent Accounting</h1>
            <p>
              Make your Accounting routines Fast - Connect QuickBooks & Coherent
              Accounting Our platform's main functionality is data extraction
              based on OCR from invoices, receipts, and bank statements.
            </p>
            <p>
              We are the only platform that makes data exaction with OCR and we
              extract line items from receipts and invoices with their line
              properties.
            </p>
            <ol>
              <li>Item Description</li>
              <li>Single Price</li>
              <li>Quantity</li>
              <li>Total Price</li>
            </ol>
            <p>
              This process optimizes and improves the daily workflows of every
              accountant and bookkeeper to their maximum. Join thousands of
              users using Coherent Accounting and start saving hours of time.
              With our platform, you will no longer have to manually input all
              expense receipts, expense invoices, or bank statements.
            </p>
            <p>
              We support one-click functionality that publishes recognized
              invoices, receipts, and bank statements data in your QuickBooks
              Online account.
            </p>
          </div>
          <b-button variant="primary" :to="{ name: 'register' }">
            Try For Free!
          </b-button>
        </div>
      </b-col>
      <b-col
        sm="12"
        lg="6"
        order="1"
        order-lg="2"
        class="d-flex align-items-center p-5"
      >
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img
            fluid
            src="@/assets/images/pages/info-image.jpeg"
            alt="Login V2"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BRow, BCol, BImg, BButton, VBTooltip } from "bootstrap-vue";
import navbarAds from "../navbarAds.vue";

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BButton,
    navbarAds,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.info-wrapper {
  // background-color: #0d2772;
  min-height: 100vh;
  // color: #fff;
  padding-bottom: 40px;

  h1 {
    // color: #fff;
  }
}
</style>
