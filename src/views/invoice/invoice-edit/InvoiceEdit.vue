<template>
  <section class="invoice-add-wrapper">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="invoiceData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching invoice data
      </h4>
      <div class="alert-body">
        No invoice found with this invoice id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-invoice-list'}"
        >
          Invoice List
        </b-link>
        for other invoices.
      </div>
    </b-alert>
    <validation-observer ref="invoiceEditForm" #default="{ invalid }">
      <b-form @submit.prevent="invoiceEdit(invoiceData)">
        <b-row
          v-if="invoiceData"
          class="invoice-add"
        >
          <!-- Col: Left (Invoice Container) -->
          <b-col
            cols="12"
            xl="10"
            md="10"
          >
            <b-card
              no-body
              class="invoice-preview-card"
            >
              <!-- Header -->
              <b-card-body class="invoice-padding pb-0">

                <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2 invoice-add-input">

                    <!-- Header: Left Content -->
                    <div class="mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1"> Supplier Company Name: </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyName"
                             
                          >
                            <b-form-input
                              v-model="invoiceData.supplierCompany.companName"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Supplier Company Address:
                        </span>

                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyAddress"
                             
                          >
                            <b-form-input
                              v-model="invoiceData.supplierCompany.companyAddress"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Supplier Company ID Number:
                        </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyIdNumber"
                             
                          >
                            <b-form-input
                              v-model="invoiceData.supplierCompany.companyEic"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1"> Supplier Company Owner: </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="supplierCompanyOwner"
                             
                          >
                            <b-form-input
                              v-model="
                                invoiceData.supplierCompany.companyOwnerName
                              "
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Supplier Company Vat No (if exists):
                        </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <b-form-input
                            v-model="invoiceData.supplierCompany.companyVatEic"
                          />
                        </b-input-group>
                      </div>
                    </div>

                    <!-- Header: Right Content -->
                    <div class="invoice-number-date mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-1">
                        <h4 class="title mr-1">Invoice</h4>
                        <validation-provider
                          #default="{ errors }"
                          name="invoiceNumber"
                          vid="Invoice"
                           
                        >
                          <b-input-group
                            class="input-group-merge invoice-edit-input-group"
                          >
                            <b-input-group-prepend is-text>
                              <feather-icon icon="HashIcon" />
                            </b-input-group-prepend>

                            <b-form-input
                              id="invoice-data-id"
                              v-model="invoiceData.invoiceNumber"
                              disabled
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1"> Date: </span>
                        <validation-provider
                          #default="{ errors }"
                          name="dateIssued"
                           
                        >
                          <flat-pickr
                            v-model="invoiceData.dateIssued"
                            class="form-control invoice-edit-input"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </div>
                    </div>

                    <div class="mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1"> Recipient Company Name: </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="recipientCompanyName"
                             
                          >
                            <b-form-input
                              v-model="invoiceData.recipientCompany.companName"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Recipient Company Address:
                        </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="recipientCompanyAddress"
                             
                          >
                            <b-form-input
                              v-model="
                                invoiceData.recipientCompany.companyAddress
                              "
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Recipient Company ID Number:
                        </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="recipientCompanyIdNumber"
                             
                          >
                            <b-form-input
                              v-model="invoiceData.recipientCompany.companyEic"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1"> Recipient Company Owner: </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <validation-provider
                            #default="{ errors }"
                            name="recipientCompanyOwner"
                             
                          >
                            <b-form-input
                              v-model="
                                invoiceData.recipientCompany.companyOwnerName
                              "
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          Recipient Company Vat No (if exists):
                        </span>
                        <b-input-group
                          class="input-group-merge invoice-edit-input-group"
                        >
                          <b-form-input
                            companyOwnerName
                            v-model="invoiceData.recipientCompany.companyVatEic"
                          />
                        </b-input-group>
                      </div>
                    </div>
                </div>
              </b-card-body>

              <!-- Spacer -->
              <hr class="invoice-spacing">

              <!-- Invoice Client & Payment Details -->
              <b-card-body class="invoice-padding form-item-section">
                  <div
                    ref="form"
                    class="repeater-form"
                    :style="{ height: trHeight }"
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
                            <b-col cols="12" lg="2"> Item name or Service </b-col>
                            <b-col cols="12" lg="2"> Quantity </b-col>
                            <b-col cols="12" lg="2"> Measurement </b-col>
                            <b-col cols="12" lg="2"> Single Price </b-col>
                            <b-col cols="12" lg="2"> Currency </b-col>
                            <b-col cols="12" lg="2"> Total Price </b-col>
                          </b-row>
                          <div class="form-item-action-col" />
                        </div>

                        <!-- Form Input Fields OR content inside bordered area  -->
                        <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                        <div class="d-flex border rounded">
                          <b-row class="flex-grow-1 p-2">
                            <!-- Single Item Form Headers -->

                            <b-col cols="12" lg="2">
                              <label class="d-inline d-lg-none"
                                >Item name or Service</label
                              >
                              <validation-provider
                                #default="{ errors }"
                                name="transectionServiceOrItemDescription"
                                 
                              >
                                <b-form-input
                                  v-model="item.serviceOrItemDescription"
                                  :dir="
                                    $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                                  "
                                  type="text"
                                  class="mb-2"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" lg="2">
                              <label class="d-inline d-lg-none">Quantity</label>
                              <validation-provider
                                #default="{ errors }"
                                name="transectionQuantity"
                                 
                              >
                                <b-form-input
                                  v-model="item.quantity"
                                  type="number"
                                  class="mb-2"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" lg="2">
                              <label class="d-inline d-lg-none"
                                >Measurement</label
                              >
                              <validation-provider
                                #default="{ errors }"
                                name="transectionMeasurement"
                                 
                              >
                                <b-form-input
                                  v-model="item.measurement"
                                  type="text"
                                  class="mb-2"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" lg="2">
                              <label class="d-inline d-lg-none"
                                >Single Price</label
                              >
                              <validation-provider
                                #default="{ errors }"
                                name="transectionSingleAmountTransaction"
                                 
                              >
                                <b-input-group
                                  class="input-group-merge invoice-edit-input-group"
                                >
                                  <b-input-group-prepend is-text class="mb-2">
                                    <span>лв</span>
                                  </b-input-group-prepend>

                                  <b-form-input
                                    v-model="item.singleAmountTransaction"
                                    type="number"
                                    class="mb-2"
                                    step="0.01"
                                    placeholder="0.00"
                                  />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" lg="2">
                              <label class="d-inline d-lg-none">Currency</label>
                              <validation-provider
                                #default="{ errors }"
                                name="transectionCurrency"
                                 
                              >
                                <b-form-input
                                  v-model="invoiceData.currency"
                                  type="text"
                                  class="mb-2"
                                  placeholder="lv"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col cols="12" lg="2">
                              <label class="d-inline d-lg-none"
                                >Total Price</label
                              >
                              <validation-provider
                                #default="{ errors }"
                                name="transectionTotal"
                                 
                              >
                                <b-input-group
                                  class="input-group-merge invoice-edit-input-group"
                                >
                                  <b-input-group-prepend is-text class="mb-2">
                                    <span>лв</span>
                                  </b-input-group-prepend>

                                  <b-form-input
                                    :value="(item.singleAmountTransaction * item.quantity).toFixed(2)"
                                    disabled
                                    class="mb-2"
                                  />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                          </b-row>
                          <div
                            class="d-flex flex-column justify-content-between border-left py-50 px-25"
                          >
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
                          <p class="invoice-total-title">Total price NonVat:</p>
                          <p class="invoice-total-amount">
                            <validation-provider
                              #default="{ errors }"
                              name="amountNonVat"
                               
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-input-group-prepend is-text>
                                  <span>лв</span>
                                </b-input-group-prepend>

                                <b-form-input
                                  :value="amountNonVat(invoiceData.transactions) ? amountNonVat(invoiceData.transactions) : 0"
                                  disabled
                                />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">VAT:</p>
                          <p class="invoice-total-amount">
                            <validation-provider
                              #default="{ errors }"
                              name="vat"
                               
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-form-input
                                  v-model="invoiceData.vatPercent"
                                  :value="
                                    invoiceData.vatPercent
                                      ? invoiceData.vatPercent
                                      : 20
                                  "
                                  step="0.01"
                                  type="number"
                                />

                                <b-input-group-append is-text>
                                  <span>%</span>
                                </b-input-group-append>
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">VAT Amount:</p>
                          <p class="invoice-total-amount">
                            <validation-provider
                              #default="{ errors }"
                              name="vatPercent"
                               
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-input-group-prepend is-text>
                                  <span>лв</span>
                                </b-input-group-prepend>
                                <b-form-input                    
                                  :value="vatAmount(invoiceData.transactions,invoiceData.vatPercent)"
                                  type="number"
                                  disabled
                                />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">Discount Percent:</p>
                          <p class="invoice-total-amount">
                            <validation-provider
                              #default="{ errors }"
                              name="tradeDiscountPercent"
                               
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-form-input
                                  v-model="invoiceData.tradeDiscountPercent"
                                  :value="
                                    invoiceData.tradeDiscountPercent
                                      ? invoiceData.tradeDiscountPercent
                                      : 0
                                  "
                                  step="0.01"
                                  type="number"
                                />

                                <b-input-group-append is-text>
                                  <span>%</span>
                                </b-input-group-append>
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">Discount Sum:</p>
                          <p class="invoice-total-amount">
                            <validation-provider
                              #default="{ errors }"
                              name="tradeDiscountAmount"
                               
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-input-group-prepend is-text>
                                  <span>лв</span>
                                </b-input-group-prepend>

                                <b-form-input
                                  :value="
                                    tradeDiscountAmount(
                                      invoiceData.transactions,
                                      invoiceData.vatPercent,
                                      invoiceData.tradeDiscountPercent
                                    )
                                      ? tradeDiscountAmount(
                                          invoiceData.transactions,
                                          invoiceData.vatPercent,
                                          invoiceData.tradeDiscountPercent
                                        )
                                      : 0
                                  "
                                  disabled
                                />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <hr class="my-50" />
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">Total Price:</p>
                          <p class="invoice-total-amount">
                            <validation-provider
                              #default="{ errors }"
                              name="totalPrice"
                               
                            >
                              <b-input-group
                                class="input-group-merge invoice-edit-input-group"
                              >
                                <b-input-group-prepend is-text>
                                  <span>лв</span>
                                </b-input-group-prepend>

                                <b-form-input
                                  :value="
                                    totalPrice(
                                      invoiceData.transactions,
                                      invoiceData.vatPercent,
                                      invoiceData.tradeDiscountPercent
                                    )
                                      ? totalPrice(
                                          invoiceData.transactions,
                                          invoiceData.vatPercent,
                                          invoiceData.tradeDiscountPercent
                                        )
                                      : 0
                                  "
                                  disabled
                                />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-body>

              <!-- Spacer -->
              <hr class="invoice-spacing">
            </b-card> 
          </b-col>

          <!-- Right Col: Card -->
          <b-col
            cols="12"
            md="2"
            xl="2"
            class="invoice-actions"
          >

            <!-- Action Buttons -->
            <b-card>


              <!-- Button: DOwnload -->
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                class="mb-75"
                block
                :to="{ name: 'apps-invoice-preview', params: { id: invoiceData.id }}"
              >
                Preview
              </b-button>

              <!-- Button: Print -->
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                block
                :disabled="invalid || loading"
                type="submit"
              >
              <b-spinner v-if="loading" small variant="light" />
                Save
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <invoice-sidebar-send-invoice />
    <invoice-sidebar-add-payment />
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Logo from '@core/layouts/components/Logo.vue'
import { ref, onUnmounted } from '@vue/composition-api'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BCard, BCardBody, BButton, BCardText, BForm, BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend, BInputGroupAppend, BFormTextarea, BFormCheckbox, BPopover, BAlert, BLink, VBToggle,BSpinner
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import invoiceStoreModule from '../invoiceStoreModule'
import InvoiceSidebarSendInvoice from '../InvoiceSidebarSendInvoice.vue'
import InvoiceSidebarAddPayment from '../InvoiceSidebarAddPayment.vue'
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
    BInputGroupAppend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    BAlert,
    BLink,
    flatPickr,
    vSelect,
    Logo,
    InvoiceSidebarSendInvoice,
    InvoiceSidebarAddPayment,
    ValidationProvider, 
    ValidationObserver,
    BSpinner 
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],

  // Reset Tr Height if data changes
  watch: {
    // eslint-disable-next-line func-names
    'invoiceData.transactions': function () {
      this.initTrHeight()
    },
  },
  data() {
    return {
      loading: false,
    };
  },
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
      this.invoiceData.transactions.push(JSON.parse(JSON.stringify(this.itemFormBlankItem)))

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
        setTimeout(() => {
          this.$refs.form.style.overflow = null
        }, 350)
      })
    },
    removeItem(index) {
      this.invoiceData.transactions.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form ? this.$refs.form.scrollHeight : 0)
      })
    },
    invoiceEdit(invoiceData) {
      invoiceData.transactions.map(item =>{
        item.transactionTotalAmountNonVat = (parseFloat(item.singleAmountTransaction) * parseFloat(item.quantity)).toFixed(2)
        return item
      })
      this.$refs.invoiceEditForm.validate().then((success) => {
        if (success) {
          this.loading = true;
          let token = useJwt.getToken()
          useJwt
                .EditInvoice(token, router.currentRoute.params.id, invoiceData)
                .then((response) => {
                  this.loading = false
                  
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: `Invoice Updated Successfully`,
                      icon: "EditIcon",
                      variant: "success",
                    },
                  });
                })
                .catch((error) => {
                  this.loading = false
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: `${error.response.data.errorMessage}`,
                      icon: "EditIcon",
                      variant: "error",
                    },
                  });
                });
        }
      });
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
      serviceOrItemDescription: "",
      singleAmountTransaction: 0.00,
      quantity: 0,
      measurement: "",
      transactionTotalAmountNonVat: ""
    }

    const invoiceData = ref(null)
    
    store.dispatch('app-invoice/fetchInvoice', { id: router.currentRoute.params.id })
      .then(response => {
        invoiceData.value = response.data

        // ? We are adding some extra data in response for data purpose
        // * Your response will contain this extra data
        // ? [Purpose is to make it more API friendly and less static as possible]
        invoiceData.value.transactions = response.data.transactions.map(item=>{
          return item
        })
      })
      .catch(error => {
        if (error.response.status === 404) {
          invoiceData.value = undefined
        }
      })

    const vatAmount = (item, vatPercent)=> {
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totalVatAmount = parseFloat(amountNonVat) * (parseFloat(vatPercent)/100)
      invoiceData.value.vatAmount = parseFloat(totalVatAmount).toFixed(2);
      return parseFloat(totalVatAmount).toFixed(2);
    }

    const amountNonVat = (item)=> {
      let totalAmountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity) * parseFloat(ele.singleAmountTransaction);
      }, 0);
      invoiceData.value.amountNonVat = parseFloat(totalAmountNonVat ? totalAmountNonVat : 0).toFixed(2);
      return parseFloat(totalAmountNonVat ? totalAmountNonVat : 0).toFixed(2);
    }
    const tradeDiscountAmount = (item, vatPercent, tradeDiscountPercent)=> {
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totaltradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));
      invoiceData.value.tradeDiscountAmount = parseFloat(totaltradeDiscountAmount).toFixed(2);
      return parseFloat(totaltradeDiscountAmount).toFixed(2);
    }
    const totalPrice = (item, vatPercent, tradeDiscountPercent)=> {
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let tradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));

      let totalPrice =
        parseFloat(amountNonVat) +
        (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat) -
        tradeDiscountAmount;
      invoiceData.value.totalAmount = parseFloat(totalPrice).toFixed(2);
      return parseFloat(totalPrice).toFixed(2);
    }

    return {
      invoiceData,
      itemFormBlankItem,
      vatAmount,
      totalPrice,
      amountNonVat,
      tradeDiscountAmount
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";

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
.gap-2 {
  grid-gap: 20px;
}
.invoice-add .invoice-total-wrapper {
  max-width: 25rem !important;
}
.invoice-add-input span.title.mr-1 {
  width: 12rem !important;
  min-width: 12rem !important;
}
.invoice-add-input .invoice-number-date .title.mr-1 {
  width: 5rem !important;
  min-width: 5rem !important;
}
</style>
