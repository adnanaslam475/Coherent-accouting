<template>
  <section class="invoice-add-wrapper">
    <b-row class="invoice-add">

      <!-- Col: Left (Invoice Container) -->
      <b-col
        cols="12"
        xl="10"
        md="10"
      >
        <b-form @submit.prevent>
          <b-card
            no-body
            class="invoice-preview-card"
          >
            <!-- Header -->
            <b-card-body class="invoice-padding pb-0 px-0">

              <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2">

                <!-- Header: Left Content -->
                <div class="mt-md-0 mt-2">
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Supplier Company Name:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.supplierCompany.companName"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Supplier Company Address:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                       v-model="invoiceData.supplierCompany.companyAddress"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Supplier Company ID Number:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.supplierCompany.companyEic"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Supplier Company Owner:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.supplierCompany.companyOwnerName"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Supplier Company Vat No (if exists):
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.supplierCompany.companyVatEic"
                      />
                    </b-input-group>
                  </div>
                </div>

                <!-- Header: Right Content -->
                <div class="invoice-number-date mt-md-0 mt-2">
                  <div class="d-flex align-items-center mb-1">
                    <h4 class="invoice-title">
                      Invoice
                    </h4>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="invoice-data-id"
                        v-model="invoiceData.invoiceNumber"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Date:
                    </span>
                    <flat-pickr
                      v-model="invoiceData.dateIssued"
                      class="form-control invoice-edit-input"
                    />
                  </div>
                </div>

                <div class="mt-md-0 mt-2">
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Recipient Company Name:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.recipientCompany.companName"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Recipient Company Address:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.recipientCompany.companyAddress"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Recipient Company ID Number:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.recipientCompany.companyEic"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Recipient Company Owner:
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        v-model="invoiceData.recipientCompany.companyOwnerName"
                      />
                    </b-input-group>
                  </div>
                  <div class="d-flex align-items-center mb-1">
                    <span class="title mr-1">
                      Recipient Company Vat No (if exists):
                    </span>
                    <b-input-group class="input-group-merge invoice-edit-input-group">
                      <b-form-input
                        companyOwnerName  v-model="invoiceData.recipientCompany.companyVatEic "
                      />
                    </b-input-group>
                  </div>
                </div>
              </div>
            </b-card-body>

            <!-- Spacer -->
            <hr class="invoice-spacing">

            <!-- Items Section -->
            <b-card-body class="invoice-padding form-item-section">
              <div
                ref="form"
                class="repeater-form"
                :style="{height: trHeight}"
              >
                <b-row
                  v-for="(item, index) in invoiceData.transactions"
                  :key="index"
                  ref="row"
                  class="pb-2"
                >

                  <!-- Item Form -->
                  <!-- ? This will be in loop => So consider below markup for single item -->
                  <b-col cols="12">

                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-none d-lg-flex">
                      <b-row class="flex-grow-1 px-1">
                        <!-- Single Item Form Headers -->
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          Item name or Service
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          Quantity
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          Measurement
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          Single Price
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          Currency
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          Total Price
                        </b-col>
                      </b-row>
                      <div class="form-item-action-col" />
                    </div>

                    <!-- Form Input Fields OR content inside bordered area  -->
                    <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                    <div class="d-flex border rounded">
                      <b-row class="flex-grow-1 p-2">
                        <!-- Single Item Form Headers -->
 
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline d-lg-none">Item name or Service</label>
                          <b-form-input
                            v-model="item.serviceOrItemDescription"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            type="text"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline d-lg-none">Quantity</label>
                          <b-form-input
                            v-model="item.quantity"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline d-lg-none">Measurement</label>
                          <b-form-input
                            v-model="item.measurement"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline d-lg-none">Single Price</label>
                          <b-form-input
                            v-model="item.singleAmountTransaction"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline d-lg-none">Currency</label>
                          <b-form-input
                            v-model="invoiceData.currency"
                            type="number"
                            class="mb-2"
                          />
                        </b-col>
                        <b-col
                          cols="12"
                          lg="2"
                        >
                          <label class="d-inline d-lg-none">Total Price</label>
                          <b-form-input
                            :value="item.singleAmountTransaction * item.quantity"
                            disabled
                          />
                        </b-col>

                      </b-row>
                      <div class="d-flex flex-column justify-content-between border-left py-50 px-25">
                        <feather-icon
                          size="16"
                          icon="XIcon"
                          class="cursor-pointer"
                          @click="removeItem(index)"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                size="sm"
                variant="primary"
                @click="addNewItemInItemForm"
              >
                Add Item
              </b-button>
            </b-card-body>

            <!-- Invoice Description: Total -->
            <b-card-body class="invoice-padding pb-0">
              <b-row>

                <!-- Col: Sales Persion -->
                <b-col
                  cols="12"
                  md="6"
                  class="mt-md-0 mt-3 d-flex align-items-center"
                  order="2"
                  order-md="1"
                >
                </b-col>

                <!-- Col: Total -->
                <b-col
                  cols="12"
                  md="6"
                  class="mt-md-6 d-flex justify-content-end"
                  order="1"
                  order-md="2"
                >
                  <div class="invoice-total-wrapper">
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Total price NonVat:
                      </p>
                      <p class="invoice-total-amount">

                        <b-form-input
                          :value="amountNonVat(invoiceData.transactions) ? amountNonVat(invoiceData.transactions) : 0"
                          disabled
                        />
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        VAT:
                      </p>
                      <p class="invoice-total-amount">
                        <b-form-input
                          v-model="invoiceData.vatAmount"
                          type="number"
                        />
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Discount Percent:
                      </p>
                      <p class="invoice-total-amount">
                        <b-form-input
                          v-model="invoiceData.vatPercent"
                          type="number"
                        />
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Discount Sum:
                      </p>
                      <p class="invoice-total-amount">
                        <b-form-input
                          :value="discountSum(invoiceData.transactions,invoiceData.vatAmount,invoiceData.vatPercent) ? discountSum(invoiceData.transactions,invoiceData.vatAmount,invoiceData.vatPercent) : 0"
                          disabled
                        />
                      </p>
                    </div>
                    <hr class="my-50">
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Total Price:
                      </p>
                      <p class="invoice-total-amount">
                        <b-form-input
                          :value="totalPrice(invoiceData.transactions,invoiceData.vatAmount,invoiceData.vatPercent) ? totalPrice(invoiceData.transactions,invoiceData.vatAmount,invoiceData.vatPercent) : 0"
                          disabled
                        />
                      </p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Spacer -->
            <hr class="invoice-spacing">

            <!-- Note -->
            <b-card-body class="invoice-padding pt-0">
              <span class="font-weight-bold">Note: </span>
              <b-form-textarea v-model="invoiceData.note" />
            </b-card-body>
          </b-card>
        </b-form>
      </b-col>

      <!-- Right Col: Card -->
      <b-col
        cols="12"
        md="2"
        xl="2"
        class="invoice-actions mt-md-0 mt-2"
      >

        <!-- Action Buttons -->
        <b-card>

          <!-- Button: DOwnload -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="mb-75"
            block
          >
            Preview
          </b-button>

          <!-- Button: Print -->
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            block
          >
            Save
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <invoice-sidebar-add-new-customer />
  </section>
</template>

<script>
import Logo from '@core/layouts/components/Logo.vue'
import { ref, onUnmounted } from '@vue/composition-api'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import {
  BRow, BCol, BCard, BCardBody, BButton, BCardText, BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend, BFormTextarea, BFormCheckbox, BPopover, VBToggle,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import invoiceStoreModule from '../invoiceStoreModule'
import InvoiceSidebarAddNewCustomer from '../InvoiceSidebarAddNewCustomer.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    flatPickr,
    vSelect,
    Logo,
    InvoiceSidebarAddNewCustomer,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,

  },
  mixins: [heightTransition],
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = 'hidden'
      this.invoiceData.items.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)))

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },
    removeItem(index) {
      this.invoiceData.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    amountNonVat(item){
          return item.reduce((acc, ele) => {
            return acc + parseInt(ele.quantity * ele.singleAmountTransaction);
          }, 0);
    },
    discountSum(item,vatAmount,vatPercent){
      let amountNonVat = item.reduce((acc, ele) => {
            return acc + parseInt(ele.quantity * ele.singleAmountTransaction);
          }, 0);
      return parseInt(vatPercent)/100 * (parseInt(amountNonVat) + (parseInt(vatAmount)/100 * parseInt(amountNonVat)))
    },
    totalPrice(item,vatAmount,vatPercent){
      let amountNonVat = item.reduce((acc, ele) => {
            return acc + parseInt(ele.quantity * ele.singleAmountTransaction);
          }, 0);
      let discountSum =  parseInt(vatPercent)/100 * (parseInt(amountNonVat) + (parseInt(vatAmount)/100 * parseInt(amountNonVat)))

      return parseInt(amountNonVat) + parseInt(vatAmount)/100 * parseInt(amountNonVat) - discountSum
    }
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const itemFormBlankItem = {
      serviceOrItemDescription: '',
      singleAmountTransaction: 0,
      quantity: 0,
      measurement: '',
      totalAmount: ''
    }

    const invoiceData = ref({
      invoiceNumber: "",
      dateIssued: "",
      supplierCompany: {
		    companyOwnerName: "",
		    companName: "",
        companyEic: "",
        companyVatEic: null,
        companyAddress: ""
	    },
      recipientCompany: {
		    companyOwnerName: "",
		    companName: "",
        companyEic: "",
        companyVatEic: null,
        companyAddress: ""
	    },
      currency: "",
      vatAmount: "",
      vatPercent: "",
      // ? Set single Item in form for adding data
      transactions: [JSON.parse(JSON.stringify(itemFormBlankItem))],

      salesPerson: '',
      note: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!',
      paymentMethod: null,
    })

    const itemsOptions = [
      {
        itemTitle: 'App Design',
        cost: 24,
        qty: 1,
        description: 'Designed UI kit & app pages.',
      },
      {
        itemTitle: 'App Customization',
        cost: 26,
        qty: 1,
        description: 'Customization & Bug Fixes.',
      },
      {
        itemTitle: 'ABC Template',
        cost: 28,
        qty: 1,
        description: 'Bootstrap 4 admin template.',
      },
      {
        itemTitle: 'App Development',
        cost: 32,
        qty: 1,
        description: 'Native App Development.',
      },
    ]


    
    return {
      invoiceData,
      itemsOptions,
      itemFormBlankItem,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
      color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
@import '~@core/scss/base/components/variables-dark';

.form-item-section {
background-color:$product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: .35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }

  }
}
.gap-2{
  grid-gap: 20px;
}
.invoice-add .invoice-total-wrapper{
  max-width: 25rem !important;
}
</style>
