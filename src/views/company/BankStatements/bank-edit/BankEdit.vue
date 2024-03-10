<template>
  <section class="invoice-add-wrapper">
    <TabList />
    <!--  -->

    <validation-observer ref="invoiceEditForm" #default="{ invalid }">
      <b-form>
        <b-modal body-class="m-0 " content-class="m-0 " dialog-class="my-1 " v-model="modelShow" :hide-backdrop="false"
          :hide-footer="true" :scrollable="false" :no-close-on-backdrop="true" size="xl" no-close-on-esc>
          <template #modal-header="slotProps">
            <feather-icon size="16" icon="XIcon" class="cursor-pointer ml-auto" @click="closeModel" />
          </template>
          <b-row v-if="invoiceData && invoiceData.binaryId ? invoiceData.binaryId : null" class="invoice-add mx-0">
            <b-row class="w-100 mx-0">
              <b-col cols="12" xl="5" md="5" class="p-2" style="">
                <div>
                  <div style="
                      border: 1px solid lightgrey;
                      box-shadow: 0 4px 24px 0 rgba(34, 41, 60, 0.1);
                      cursor: pointer;
                    ">
                    <image-zoom ref="imageZoom" :click-zoom="false" :regular="invoiceImage" :zoom-amount="3"
                      :regular-webp="invoiceImage" :zoom="invoiceImage" :zoom-webp="invoiceImage" img-class="img-fluid">
                    </image-zoom>
                  </div>
                </div>
              </b-col>

              <b-col cols="12" xl="7" md="7" style="border-left: 1px dashed lightgrey">
                <b-tabs v-model="companyTab">
                  <b-tab>
                    <template #title>
                      <feather-icon icon="FileTextIcon" />
                      <span style="font-size: 0.8vw" class="text-capitalize">{{
                        $t("Data")
                      }}</span>
                    </template>

                    <b-row class="mt-2 mx-0 pb-2" style="border-bottom: 1px solid lightgrey">
                      <b-col cols="12" md="4" class="pl-0">
                        <div class="d-flex pl-0" style="flex-direction: column">
                          <span class="grey-text-color">
                            {{ $t("from_period") }}
                          </span>
                          <span>
                            <validation-provider #default="{ errors }" name="fromDate" rules="required">
                              <div class="position-relative d-inline-flex">
                                <flat-pickr v-model="invoiceData.fromDate"
                                  class="form-control invoice-edit-input invoice-input-top"
                                  placeholder="From St. Period" />
                                <feather-icon v-if="invoiceData.fromDate === ''" size="16" icon="CalendarIcon"
                                  class="cursor-pointer clear-all" />
                                <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer clear-all"
                                  @click="invoiceData.fromDate = ''" />
                              </div>
                            </validation-provider>
                          </span>
                        </div>
                      </b-col>

                      <b-col cols="12" md="4" class="pl-0">
                        <div class="d-flex pl-0" style="flex-direction: column">
                          <span class="grey-text-color">
                            {{ $t("to_period") }}
                          </span>
                          <span>
                            <validation-provider #default="{ errors }" name="toDate" rules="required">
                              <div class="position-relative d-inline-flex">
                                <flat-pickr v-model="invoiceData.toDate"
                                  class="form-control invoice-edit-input invoice-input-top" placeholder="To St. Period" />
                                <feather-icon v-if="invoiceData.toDate === ''" size="16" icon="CalendarIcon"
                                  class="cursor-pointer clear-all" />
                                <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer clear-all"
                                  @click="invoiceData.toDate = ''" />
                              </div>
                            </validation-provider>
                          </span>
                        </div>
                      </b-col>

                      <b-col cols="12" md="4" class="pl-0">
                        <div class="d-flex pl-0" style="flex-direction: column">
                          <span class="grey-text-color">
                            {{ $t("update_tickets.description") }}
                          </span>
                          <span>
                            <validation-provider #default="{ errors }" name="description">
                              <b-form-input v-model="invoiceData.description" class="mb-0" />
                            </validation-provider>
                          </span>
                        </div>
                      </b-col>
                    </b-row>

                    <b-row class="mt-2 mx-0 pb-1">
                      <b-col class="pl-0">
                        <div class="d-flex" style="flex-direction: column">
                          <div class="text-uppercase grey-text-color">
                            {{ $t("add_invoice.currency") }}
                          </div>
                          <div class="pt-1">
                            <b-form-select v-model="invoiceData.currency" :options="currencyOptions"
                              style="width: 100px" />
                          </div>
                        </div>
                      </b-col>
                      <b-col class="px-0">
                        <div class="d-flex" style="flex-direction: column; float: right">
                          <div class="text-uppercase grey-text-color">
                            {{ $t("total_debit") }}
                          </div>
                          <h4 style="color: #625f6e" class="pt-1">
                            <b-form-input v-model="totalDebit" type="number" @keyup="preventNum" class="mb-0"
                              style="width: 130px" />
                          </h4>
                        </div>
                        <div class="d-flex mr-2" style="flex-direction: column; float: right">
                          <div class="text-uppercase grey-text-color">
                            {{ $t("total_credit") }}
                          </div>
                          <!-- <h4 style="color: #625f6e">{{ invoiceData.vatAmount }}</h4> -->
                          <h4 style="color: #625f6e" class="pt-1">
                            <b-form-input v-model="totalCredit" type="number" class="mb-0" @keyup="preventNum"
                              style="width: 130px" />
                          </h4>
                        </div>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col>
                        <b-form-checkbox v-model="isAccount" name="is-account" @change="checkAccount">
                          {{ $t("show_accounts") }}xxx
                        </b-form-checkbox>
                      </b-col>
                    </b-row>
                    <div no-body class="invoice-add-card mb-1">
                      <!-- Items Section -->
                      <div class="invoice-padding p-0">
                        <div ref="form" class="repeater-form h-auto" :style="{ height: trHeight }">
                          <b-row ref="row" class="pb-0 m-0">
                            <!-- Item Form -->
                            <!-- ? This will be in loop => So consider below markup for single item -->
                            <b-col cols="12" class="p-0">
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div class="d-none d-lg-flex p-custom">
                                <b-row class="flex-grow-1 invoice-add-transections pb-1"
                                  style="border-bottom: 1px solid lightgrey">
                                  <!-- Single Item Form Headers -->

                                  <b-col cols="12" lg="2" class="text-uppercase grey-text-color"
                                    style="font-size: 14px" v-if="isQuickBook && isAccount">
                                    {{ $t("add_invoice.account") }}
                                  </b-col>
                                  <b-col v-if="isXero && isAccount" cols="12" lg="2"
                                    class="text-uppercase grey-text-color" style="font-size: 14px;">
                                    {{ $t("add_invoice.category") }}
                                  </b-col>
                                  <b-col v-if="isXero && isAccount" cols="12" lg="2"
                                    class="text-uppercase grey-text-color" style="font-size: 14px; ">
                                    {{ $t("add_invoice.job_cost_code") }}
                                  </b-col>

                                  <b-col cols="12" lg="2" class="text-uppercase grey-text-color" style="font-size: 14px">
                                    {{ $t("update_tickets.description") }}
                                  </b-col>
                                  <b-col cols="12" :lg="isAccount ? '1' : '2'" class="text-uppercase grey-text-color"
                                    style="font-size: 14px">
                                    Ref
                                  </b-col>
                                  <b-col cols="12" :lg="isAccount ? '1' : '2'" class="text-uppercase grey-text-color"
                                    style="font-size: 14px">
                                    {{ $t("add_invoice.date") }}
                                  </b-col>
                                  <b-col cols="12" :lg="isXero ? '1' : '2'" class="text-uppercase grey-text-color"
                                    style="font-size: 14px">
                                    {{ $t("Debit") }}
                                  </b-col>
                                  <b-col cols="12" :lg="isXero ? '1' : '2'" class="text-uppercase grey-text-color"
                                    style="font-size: 14px">
                                    {{ $t("Credit") }}
                                  </b-col>

                                  <b-col cols="12" lg="2" class="text-uppercase grey-text-color" style="font-size: 14px">
                                    {{ $t("Balance") }}
                                  </b-col>
                                </b-row>
                                <!-- <div class="form-item-action-col" /> -->
                              </div>

                              <!-- Form Input Fields OR content inside bordered area  -->
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div v-for="(
                                  item, index
                                ) in invoiceData.bankStatementTransactions" :key="index" class="d-flex pl-2">
                                <b-row class="flex-grow-1 py-1 invoice-add-transections"
                                  style="border-bottom: 1px solid lightgrey">
                                  <!-- Single Item Form Headers -->

                                  <b-col cols="12" lg="2" v-if="isQuickBook && isAccount">
                                    <label class="d-inline d-lg-none">Account</label>

                                    <validation-provider #default="{ errors, invalid }" name="Account" ref="account">
                                      <b-form-select id="account" v-model="item.account" :options="accounts"
                                        v-b-tooltip.hover :title="item.account" rules="required"
                                        @change="(v) => { if (index == 0) askForAllPostCode(v, 'account') }" immediate>
                                      </b-form-select>

                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2" v-if="isXero && isAccount">
                                    <label class="d-inline d-lg-none">Category</label>

                                    <validation-provider #default="{ errors, invalid }" name="Category"
                                      :rules="isAccount ? 'required' : ''" ref="selectCategory">
                                      <b-form-select id="selectCategory" :options="categoryItems" v-model="item.account"
                                        v-b-tooltip.hover :title="item.account"
                                        @change="(v) => { if (index == 0) askForAllPostCode(v, 'account') }" />
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2" v-if="isXero && isAccount">
                                    <label class="d-inline d-lg-none">Tax Type</label>

                                    <validation-provider #default="{ errors, invalid }" name="taxType"
                                      :rules="isAccount ? 'required' : ''" ref="postCode">
                                      <b-form-select id="postCode" :options="jobPostItems" v-model="item.taxType"
                                        v-b-tooltip.hover :title="item.taxType"
                                        @change="(v) => { if (index == 0) askForAllPostCode(v, 'taxType') }">
                                      </b-form-select>
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Description</label>
                                    <validation-provider #default="{ errors, invalid }"
                                      ref="transectionServiceOrItemDescription" name="Description" rules="required">
                                      <b-form-input id="transectionServiceOrItemDescription" v-model="item.description"
                                        :dir="$store.state.appConfig.isRTL
                                            ? 'rtl'
                                            : 'ltr'
                                          " type="text" class="mb-0" v-b-tooltip.hover :title="item.description" />
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>

                                  <b-col cols="12" :lg="isAccount ? '1' : '2'">
                                    <label class="d-inline d-lg-none">Ref</label>
                                    <validation-provider #default="{ errors, invalid }" name="reference" rules="required"
                                      ref="transectionQuantity">
                                      <b-form-input id="transectionQuantity" v-model="item.reference"
                                        class="mb-0 p-0 text-center" v-b-tooltip.hover :title="item.reference" />
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" :lg="isAccount ? '1' : '2'" class="pl-0">
                                    <label class="d-inline d-lg-none">Date</label>
                                    <validation-provider #default="{ errors, invalid }" name="fromDate" rules="required">
                                      <div class="position-relative">
                                        <flat-pickr v-model="item.date" class="form-control invoice-edit-input"
                                          placeholder="Date" v-b-tooltip.hover :title="item.date" />
                                        <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                      </div>
                                    </validation-provider>
                                  </b-col>

                                  <b-col cols="12" :lg="isXero ? '1' : '2'">
                                    <label class="d-inline d-lg-none">Debit</label>
                                    <validation-provider #default="{ errors, invalid }" name="Debit" rules="required"
                                      ref="debit">
                                      <b-form-input id="debit" v-model="item.debit" type="number" @keyup="preventNum"
                                        class="mb-0" step="any" placeholder="0.00" v-b-tooltip.hover :title="item.debit"
                                        prepend-html='<i class="fa fa-pencil">asdf</i>'>
                                      </b-form-input>

                                      <feather-icon v-if="item.debit != 0" size="20" icon="XIcon" style="
                                          position: relative;
                                          bottom: 29px;
                                          left: 88px;
                                        " @click="item.debit = 0" />

                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" :lg="isXero ? '1' : '2'">
                                    <label class="d-inline d-lg-none">Credit</label>
                                    <validation-provider #default="{ errors, invalid }" name="Credit" rules="required"
                                      ref="credit">
                                      <b-form-input id="credit" v-model="item.credit" type="number" class="mb-0"
                                        step="any" placeholder="0.00" @keyup="preventNum" v-b-tooltip.hover
                                        :title="item.credit"></b-form-input>
                                      <feather-icon v-if="item.credit != 0" size="20" icon="XIcon" style="
                                          position: relative;
                                          bottom: 29px;
                                          left: 88px;
                                        " @click="item.credit = 0" />

                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>

                                  <b-col cols="12" md="2">
                                    <label class="d-inline d-lg-none">Balance</label>
                                    <validation-provider #default="{ errors, invalid }" name="Balance" rules="required"
                                      ref="balance">
                                      <b-form-input id="balance" v-model="item.balance" type="number" class="mb-0"
                                        step="any" @keyup="preventNum" placeholder="0.00" v-b-tooltip.hover
                                        :title="item.balance" />
                                      <feather-icon v-if="item.balance != 0" size="20" icon="XIcon" style="
                                          position: relative;
                                          bottom: 29px;
                                          left: 88px;
                                        " @click="item.balance = 0" />

                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                      <small class="text-danger" v-if="invalid">{{ "This field is required" }}</small>
                                    </validation-provider>
                                  </b-col>
                                </b-row>
                                <div class="d-flex justify-content-end position-relative top-custom m-0" :style="isQuickBook
                                    ? 'padding-top: 2px; left: 3px; z-index:5 !important'
                                    : 'padding-top: 2px; left: 26px; z-index:5 !important'
                                  ">
                                  <feather-icon v-if="invoiceData.bankStatementTransactions
                                      .length !== 1
                                    " size="14" icon="Trash2Icon" color="red" class="cursor-pointer m-0"
                                    @click="removeItem(index)" />
                                  <feather-icon v-if="invoiceData.bankStatementTransactions
                                      .length == 1
                                    " size="14" icon="Trash2Icon" color="red" class="cursor-pointer invisible m-0" />
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </div>
                      </div>
                    </div>
                    <div size="sm" @click="addNewItemInItemForm" class="mb-2 grey-text-color curspor-pointer" style="
                        background-color: transparent !important;
                        border: 0px;
                        width: 100px;
                        color: #007aff !important;
                        cursor: pointer;
                      ">
                      + {{ $t("add_invoice.add_item") }}
                    </div>
                  </b-tab>
                </b-tabs>

                <b-card variant="light" class="d-flex" style="text-align: end; box-shadow: none">
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" class="mr-2"
                    :disabled="loading" @click="invoiceEdit(invoiceData, 'save', AccountTypeOption)">
                    <b-spinner v-if="loading" small variant="light" />
                    {{ $t("add_invoice.save") }}
                  </b-button>
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" type="button"
                    class="mr-2" @click="clearForm">
                    {{ $t("add_invoice.clear") }}
                  </b-button>

                  <b-button v-if="!invoiceData.verified" v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary" type="button" class="mr-2" :disabled="loading" @click="
                      invoiceEdit(invoiceData, 'verify', AccountTypeOption)
                      ">
                    <b-spinner v-if="loading" small variant="light" />

                    <!-- // Approve btn -->
                    {{ $t("add_invoice.verify") }}
                  </b-button>
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary" type="button" class="mr-2"
                    @click="closeModel">
                    {{ $t("company_invoices.close") }}
                  </b-button>
                </b-card>
              </b-col>
            </b-row>
          </b-row>
          <b-modal v-model="askAllModalShow" size="xs" centered :hide-backdrop="false" :scrollable="false"
            :no-close-on-backdrop="true" no-close-on-esc :ok-title="$t('modal_labels.ys')"
            :cancel-title="$t('modal_labels.no')" @hidden="() => addSameValueInAll(false)"
            @ok="() => addSameValueInAll(true)">
            {{ $t("modal_labels.areyousure") }}
          </b-modal>
        </b-modal>
        </b-modal>
        <b-row v-if="invoiceData && invoiceData.binaryId ? invoiceData.binaryId : null" class="invoice-add mx-0"></b-row>

      </b-form>
    </validation-observer>
    <invoice-sidebar-add-new-customer />
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  required,
  email,
  confirmed,
  password,
  regex,
  vatPercentValid,
  singlePriceValid,
  qtyValid,
} from "@validations";
import Logo from "@core/layouts/components/Logo.vue";
import { ref, onUnmounted, onMounted, onBeforeMount, onBeforeUpdate } from "@vue/composition-api";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
import store from "@/store";
import TabList from "../../TabList.vue";
import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardBody,
  BButton,
  BCardText,
  BForm,
  BFormSelect,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormTextarea,
  BFormCheckbox,
  BPopover,
  VBToggle,
  BSpinner,
  BFormRadio,
  BListGroup,
  BListGroupItem,
  BFormSelectOption,
  BFormRow,
  BImg,
  BTab,
  BTabs,
  BFormFile,
  BFormRadioGroup,
  BButtonGroup,
  BModal,
  VBTooltip,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import invoiceStoreModule from "../invoiceStoreModule";
import InvoiceSidebarAddNewCustomer from "../InvoiceSidebarAddNewCustomer.vue";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
// import imageZoom from "vue-image-zoomer"
import router from "@/router";
import axios from "@/libs/axios";
import { i18n } from "@/main.js";
import VueEasyLightbox from "vue-easy-lightbox";
// const modelShow = ref(false)
const zoomAmount = ref(1);
import imageZoom from "vue-image-zoomer";
import { mapGetters } from "vuex";
import { preventNum } from "@core/comp-functions/forms/prevent-num";

export default {
  components: {
    imageZoom,
    VueEasyLightbox,
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BTabs,
    BTab,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    flatPickr,
    vSelect,
    Logo,
    InvoiceSidebarAddNewCustomer,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    BFormRadio,
    BListGroup,
    BListGroupItem,
    TabList,
    BFormSelectOption,
    BFormRow,
    BImg,
    BFormFile,
    BFormRadioGroup,
    BButtonGroup,
    BModal,
  },

  data() {
    return {
      companyTab: 0,
      accounts: [],
      isUploading: i18n.tc("add_invoice.upload_logo"),

      companyIDisInvalid: false,
      scheduleOptionToggleValue: false,
      scheduleTypes: ["WEEKLY", "MONTHLY"],

      // days: [{ text: i18n.tc("company_info.MON"), value: "MON" }, { text: "TUE", value: "TUE" }, { text: "WED", value: "WED" }, { text: "THU", value: "THU" }, { text: "FRI", value: "FRI" }, { text: "SAT", value: "SAT" }, { text: "SUN", value: "SUN" }],
      daySelected: false,
      clauseToSend: "",
      bankNameToSend: "",

      required,
      email,
      confirmed,
      password,
      regex,
      vatPercentValid,
      singlePriceValid,
      qtyValid,
      isWeekSelected: false,
    };
  },
  directives: {
    Ripple,
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  mixins: [heightTransition],
  mounted() {
    this.getAccounts();
  },

  computed: {
    formIsValid() {
      let i = 0;
      let requiredField = [];
      while (i < this.invoiceData.bankStatementTransactions.length) {
        const temp = [
          this.$refs.transectionServiceOrItemDescription[i].flags.valid,
          this.$refs.transectionQuantity[i].flags.valid,
          this.$refs.debit[i].flags.valid,
          this.$refs.credit[i].flags.valid,
        ];

        if (this.isXero && this.isAccount) {
          temp.push(this.$refs.selectCategory[i].flags.valid);
          temp.push(this.$refs.postCode[i].flags.valid);
        }

        if (this.isQuickBook && this.isAccount) {
          requiredField.push(this.$refs.account[i].flags.valid);
        }

        requiredField.push(...temp);

        i++;
      }
      return requiredField.every((item) => (item === true ? true : false));
    },

    totalCredit() {
      let total = 0;
      for (let item of this.invoiceData.bankStatementTransactions) {
        total += Number(item.credit);
      }

      return total;
    },
    totalDebit() {
      let total = 0;
      for (let item of this.invoiceData.bankStatementTransactions) {
        total += Number(item.debit);
      }

      return total;
    },

    ...mapGetters("verticalMenu", ["getActiveTab",'getXsrfToken']),
  },
  methods: {
    getAccounts() {
      var config = {
        method: "get",
        url: `/account/api/invoice/get-accounts/${router.currentRoute.params.companyId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://coherent-accounting.com",
        },
      };
      axios(config)
        .then((response) => {
          this.accounts = response.data;
        })
        .catch(function (error) { });
    },
    reverse() {
      let temp = this.invoiceData.supplierCompany;
      this.invoiceData.supplierCompany = this.invoiceData.recipientCompany;
      this.invoiceData.recipientCompany = temp;
    },

    addNewItemInItemForm() {
      // this.$refs.form.style.overflow = "hidden"
      this.invoiceData.bankStatementTransactions.push(
        JSON.parse(JSON.stringify(this.itemFormBlankItem))
      );
    },
    removeItem(index) {
      this.invoiceData.bankStatementTransactions.splice(index, 1);
      // this.populateValues()
    },
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },

    invoiceEdit(invoiceData, redirectPage, AccountTypeOption) {
      if (this.invoiceData?.binaryId && this.invoiceData?.binaryId !== null) {
        if (
          (redirectPage === "save" || redirectPage === "verify") &&
          !this.formIsValid
        )
          return;
      }

      let self = this;
      this.$refs.invoiceEditForm.validate().then((success) => {
        // if (this.companyIDisInvalid === false && this.isWeekSelected === false) {
        this.loading = true;
        if (redirectPage == "verify") {
          invoiceData.verified = true;
        }
        if (!self.isAccount) {
          invoiceData.bankStatementTransactions.forEach((item) => {
            item.taxType = null;
            item.account = null;
          });
        }

        invoiceData.companyId = router.currentRoute.params.companyId;
        invoiceData.currency = invoiceData.currency;
        let token = useJwt.getToken();
        useJwt
          .EditBankStatement(token, router.currentRoute.params.id, invoiceData)
          .then((response) => {
            this.loading = false;

            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.$t("invoice_details.invoice_updated_successfully"),
                icon: "EditIcon",
                variant: "success",
              },
            });

            if (redirectPage == "invoices") {
              return this.$router.push({
                name: "CompanyView",
                params: {
                  id: router.currentRoute.params.companyId,
                  InvoiceId: 4,
                  // InvoiceId: 5,
                },
              });
            } else if (redirectPage == "verify") {
              return this.$router.push({
                name: "CompanyView",
                params: {
                  id: router.currentRoute.params.companyId,
                  InvoiceId: 4,
                },
              });
            } else {
              return true;
            }
          })
          .catch((error) => {
            this.loading = false;
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `${error.response.data.errorMessage}`,
                icon: "AlertTriangleIcon",
                variant: "danger",
              },
            });
          });
        // }
      });
    },
    showMsgBoxTwo(id, invoiceData) {
      const h = this.$createElement;
      // Using HTML string
      // More complex structure
      const messageVNode = h("div", { class: ["bvModalFont"] }, [
        h("p", { class: ["text-center card-text"] }, [
          `${this.$t("protocol.description")}`,
        ]),
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: `${this.$t("protocol.title")}`,
          okVariant: "primary",
          okTitle: `${this.$t("protocol.yes")}`,
          cancelTitle: `${this.$t("protocol.no")}`,
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.loading = true;
            invoiceData.invoiceNumber = "1" + invoiceData.invoiceNumber;
            invoiceData.documentType = "PROTOCOL";
            let token = useJwt.getToken();
            useJwt
              .addCompanyInvoice(
                token,
                router.currentRoute.params.companyId,
                invoiceData
              )
              .then((response) => {
                this.loading = false;

                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `Protocol Added Successfully`,
                    icon: "EditIcon",
                    variant: "success",
                  },
                });
                this.$router.push({
                  name: "company-invoice-edit",
                  params: {
                    id: id,
                    companyId: router.currentRoute.params.companyId,
                  },
                });
              })
              .catch((error) => {
                this.loading = false;
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `${error.response.data.errorMessage}`,
                    icon: "EditIcon",
                    variant: "error",
                  },
                });
              });
          } else {
            this.$router.push({
              name: "company-invoice-edit",
              params: {
                id: id,
                companyId: router.currentRoute.params.companyId,
              },
            });
          }
        });
    },
  },
  setup() {
    var loading = ref(false);
    var trHeight = ref(0);
    // var totalTax = ref(0)
    var isAccount = ref(false);
    var showInvoiceInput = ref(false);
    var showTaxInput = ref(false);
    var showTotalInput = ref(false);
    var showinvoiceCurrency = ref(false);
    var modelShow = ref(false);
    const categoryItems = ref();
    const jobPostItems = ref();
    const jobPostSelected = ref();
    const selectedCategory = ref();
    var bankProcess = ref("");
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    function closeModel() {
      this.modelShow = false;
      this.$router.push({
        name: "CompanyView",
        params: {
          id: router.currentRoute.params.companyId,
          InvoiceId: this.getActiveTab,
        },
      });
    }

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    var AccountTypeOption = ref("company");

    const itemFormBlankItem = {
      description: "",
      debit: 0.0,
      credit: 0.0,
      payee: "",
      balance: 0,
      date: "",
      taxType: "",
      account: "",
    };

    const invoiceData = ref(null);

    const visible = ref(false);

    var supplierID = ref(null);
    var companyName = ref("");
    const isUploading = ref("");

    const showLogo = ref(null);

    const logoToUpload = ref("");
    const invoiceImage = ref("");

    const isBlue = ref(false);
    const isPurple = ref(false);
    const isGreen = ref(false);
    const isOrange = ref(false);
    const isGray = ref(false);
    const companyInfo = ref(null);
    const currencyOptions = [
      { value: "лв.", text: "лв." },
      { value: "$", text: "$" },
      { value: "€", text: "€" },
      { value: "£", text: "£" },
    ];
    var isBank = ref(false);
    var companyInBG = ref(false);
    var isQuickBook = ref(false);
    var isXero = ref(false);


    const askAllModalShow = ref(null);
    const askAllTaxType = ref(null);
    const modalName = ref('');


    var companyData = ref(null);
    var companyName = ref("");

    store
      .dispatch("app-invoice/fetchInvoice", {
        id: router.currentRoute.params.id,
      })
      .then((response) => {
        response.data.currency =
          response?.data?.currency?.toLowerCase().trim() == "lv"
            ? "лв."
            : response?.data?.currency?.toLowerCase().trim() == "bgn"
              ? "лв."
              : response.data.currency;

        invoiceData.value = response.data;

        if (invoiceData.value.platform == "XERO") {
          axios
            .get(
              `${axios.defaults.baseURL}/account/api/export/get-accounts-codes-xero/${router.currentRoute.params.companyId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((response) => {
              categoryItems.value = Object.entries(response.data).map(
                ([key, value]) => ({
                  value: key,
                  text: `${key}-${value}`,
                })
              );
            });
        }

        if (invoiceData.value.platform == "XERO") {
          axios
            .get(
              `${axios.defaults.baseURL}/account/api/export/get-tax-types-xero/${router.currentRoute.params.companyId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((response) => {
              jobPostItems.value = response.data;
            });
        }

        if (invoiceData.value?.binaryId) {
          modelShow.value = true;
        } else {
          modelShow.value = false;
        }

        if (invoiceData.value?.binaryId) {
          axios
            .get(
              `${axios.defaults.baseURL}/binaries/api/get-binary/${invoiceData.value?.binaryId}/${router.currentRoute.params.companyId}`,
              { responseType: "blob" }
            )
            .then((response) => {
              if (response.status === 200) {
                const reader = new FileReader();
                reader.readAsDataURL(response.data);

                reader.onload = function () {
                  const filePath = reader.result;
                  invoiceImage.value = filePath;
                };
              }
            })
            .catch();
        }

        if (
          invoiceData.value.bankStatementTransactions[0].account ||
          invoiceData.value.bankStatementTransactions[0].taxType
        ) {
          isAccount.value = true;
        } else {
          isAccount.value = false;
        }
        invoiceData.value.bankStatementTransactions =
          invoiceData?.value?.bankStatementTransactions?.length > 0
            ? invoiceData.value.bankStatementTransactions
            : [JSON.parse(JSON.stringify(itemFormBlankItem))];
        // invoiceData.value.vatPercent = invoiceData?.value?.vatPercent ? invoiceData.value.vatPercent : 20

        invoiceData.value.transactions = response?.data?.transactions?.map(
          (item) => {
            return item;
          }
        );
      })
      .catch((error) => {
        
      });


    onMounted(() => {
      axios
        .get(`/account/api/company/${router.currentRoute.params.companyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "https://coherent-accounting.com",
          },
        })
        .then((response) => {
          companyData.value = response.data;
          if (response.data.companyCountry == "Bulgaria") {
            companyInBG.value = true;
          }
          let statements = invoiceData.value.bankStatementTransactions;
          for (let statement of statements) {
            if (response.data.exportProperties.platform == "QUICK_BOOKS") {
              if (statement.account == null) {
                isQuickBook.value = false;
                isAccount.value = false;
              } else {
                isAccount.value = true;
                isQuickBook.value = true;
              }
            }
            if (response.data.exportProperties.platform == "XERO") {
              if (statement.account == null) {
                isXero.value = false;
                isAccount.value = false;
              } else {
                isAccount.value = true;
                isXero.value = true;
              }
            }
          }

          companyName.value = response.data.companyName;

          supplierID.value = response.data.companyIdentificationNumber;

        })
        .catch((error) => {

        });
    });

    const checkAccount = () => {
      if (companyData.value.exportProperties.platform == "XERO") {
        isXero.value = !isXero.value;
      }
      if (companyData.value.exportProperties.platform == "QUICK_BOOKS") {
        isQuickBook.value = true;
      }
      console.log('checkAccount=', isXero.value, isQuickBook.value)
    };

    const amountNonVat = (item) => {
      let totalAmountNonVat = item.reduce((acc, ele) => {
        return (
          acc +
          parseFloat(ele.quantity) * parseFloat(ele.singleAmountTransaction)
        );
      }, 0);
      invoiceData.value.amountNonVat = parseFloat(
        totalAmountNonVat ? totalAmountNonVat : 0
      ).toFixed(2);
      return parseFloat(totalAmountNonVat ? totalAmountNonVat : 0).toFixed(2);
    };
    const vatAmount = (item, vatPercent) => {
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totalVatAmount =
        parseFloat(amountNonVat) * (parseFloat(vatPercent) / 100);
      invoiceData.value.vatAmount = parseFloat(totalVatAmount).toFixed(2);
      return parseFloat(totalVatAmount).toFixed(2);
    };
    const tradeDiscountAmount = (item, vatPercent, tradeDiscountPercent) => {
      tradeDiscountPercent = tradeDiscountPercent ? tradeDiscountPercent : 0;
      vatPercent = vatPercent ? vatPercent : 0;
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totaltradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));
      invoiceData.value.tradeDiscountAmount = parseFloat(
        totaltradeDiscountAmount
      ).toFixed(2);
      return parseFloat(totaltradeDiscountAmount).toFixed(2);
    };
    const totalPrice = (item, vatPercent, tradeDiscountPercent) => {
      tradeDiscountPercent = tradeDiscountPercent ? tradeDiscountPercent : 0;
      vatPercent = vatPercent ? vatPercent : 0;
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
    };

    var populateValues = () => {
      amountNonVat = amountNonVat ? amountNonVat : 0;
      var vatPercent = invoiceData.value.vatPercent
        ? invoiceData.value.vatPercent
        : 0;
      var tradeDiscountPercent = invoiceData.value.tradeDiscountPercent
        ? invoiceData.value.tradeDiscountPercent
        : 0;

      invoiceData.value.transactions.forEach((item, index) => {
        invoiceData.value.transactions[index].vatAmountTransaction =
          (parseFloat(
            invoiceData.value.transactions[index].quantity *
            invoiceData.value.transactions[index].singleAmountTransaction
          ) *
            parseFloat(vatPercent)) /
          100;
      });

      invoiceData.value.amountNonVat = parseFloat(amountNonVat).toFixed(2);

      var totalVatAmount =
        parseFloat(amountNonVat) * (parseFloat(vatPercent) / 100);
      invoiceData.value.vatAmount = parseFloat(totalVatAmount).toFixed(2);

      var tradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));
      invoiceData.value.tradeDiscountAmount =
        parseFloat(tradeDiscountAmount).toFixed(2);

      var totalPrice =
        parseFloat(amountNonVat) +
        (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat) -
        tradeDiscountAmount;
      invoiceData.value.totalAmount = parseFloat(totalPrice).toFixed(2);
    };

    const clearForm = () => {
      invoiceData.value = {
        invoiceNumber: "",
        dateIssued: "",
        supplierCompany: {
          companyOwnerName: "",

          companyEic: "",
          companyVatEic: "",
        },
        recipientCompany: {
          companyOwnerName: "",

          companyEic: "",
          companyVatEic: "",
        },
        currency: invoiceData.value.currency,
        amountNonVat: invoiceData.value.amountNonVat,
        vatAmount: invoiceData.value.vatAmount,
        vatPercent: 20,
        tradeDiscountPercent: 0,
        tradeDiscountAmount: invoiceData.value.tradeDiscountAmount,
        totalAmount: invoiceData.value.totalAmount,

        // ? Set single Item in form for adding data
        transactions: invoiceData.value.transactions,
        transactionType: invoiceData.value.transactionType,
        invoiceType: invoiceData.value.invoiceType,
        saleType: invoiceData.value.saleType,
        documentType: "INVOICE",
        verified: invoiceData.value.verified,
        scheduled: false,
        cronScheduleApi: {
          dayOfMonth: "",
          dayOfWeek: "",
          scheduleType: "",
        },
        dueDate: "",
      };
    };
    var isScheduled = ref(false);
    var isNotScheduled = ref(false);
    var checkSchedule = ref(false);
    var scheduledTypeOffCase = ref("");
    var isScheduledTypeOffCaseMonthly = ref(false);
    var isScheduledTypeOffCaseWeekly = ref(false);
    var offCaseScheduleType = ref("");
    var offCaseScheduleDayOfMonth = ref("");
    var offCaseScheduleDayOfWeek = ref("");

    var datalistEicRecipient = ref([]);
    var showSuggestionsEicRecipient = ref(false);

    var datalistPerson = ref([]);
    var showSuggestionsPerson = ref(false);

    var datalistPersonIdNumber = ref([]);
    var showSuggestionsPersonIdNumber = ref(false);
    const clearAll = (type) => {
      if (type == "supplier") {
        invoiceData.value.supplierCompany = {
          companyOwnerName: "",

          companyEic: "",
          companyVatEic: "",
        };
      } else if (type == "recipient") {
        invoiceData.value.recipientCompany = {
          companyOwnerName: "",

          companyEic: "",
          companyVatEic: "",
        };
      }
    };

    const askForAllPostCode = (val, name) => {
      askAllModalShow.value = true;
      askAllTaxType.value = val;
      modalName.value = name
    };

    const addSameValueInAll = (condition) => {
      if (condition) {
        const arr = invoiceData.value.bankStatementTransactions;
        const temp = {
          ...invoiceData.value,
          bankStatementTransactions: arr.map((v) => {
            return { ...v, [modalName.value]: askAllTaxType.value };
          }),
        };
        invoiceData.value = temp;
      }
      askAllModalShow.value = null;
      askAllTaxType.value = null;
      modalName.value = ''
    };

    return {
      showTaxInput,
      showTotalInput,
      isQuickBook,
      isXero,
      askAllModalShow,
      askAllTaxType,
      modalName, askForAllPostCode, addSameValueInAll,
      trHeight,
      loading,
      showinvoiceCurrency,
      showInvoiceInput,
      selectedCategory,
      jobPostSelected,
      jobPostItems,
      categoryItems,
      closeModel,
      modelShow,
      companyInBG,
      bankProcess,
      companyData,
      isBank,
      companyName,
      companyInfo,
      populateValues,
      logoToUpload,
      invoiceImage,
      showLogo,
      isUploading,

      checkAccount,
      supplierID,

      AccountTypeOption,
      invoiceData,
      currencyOptions,
      preventNum,
      itemFormBlankItem,
      vatAmount,
      totalPrice,
      amountNonVat,
      tradeDiscountAmount,
      datalistEicRecipient,
      showSuggestionsEicRecipient,
      datalistPerson,
      showSuggestionsPerson,
      datalistPersonIdNumber,
      showSuggestionsPersonIdNumber,
      clearForm,
      clearAll,
      isGray,
      isPurple,
      isGreen,
      isOrange,
      isBlue,
      isAccount,
      isScheduled,
      isNotScheduled,
      checkSchedule,
      scheduledTypeOffCase,
      isScheduledTypeOffCaseMonthly,
      isScheduledTypeOffCaseWeekly,
      offCaseScheduleType,
      offCaseScheduleDayOfMonth,
      offCaseScheduleDayOfWeek,
      visible,
    };
  },
};
</script>

<style lang="scss" scoped>
:v-deep .modal-xl {
  width: 104% !important;
  margin: 0 !important;
}

.reverse-button {
  position: relative;
  top: 50%;
}

.myModelClass {
  min-width: 100vw !important;
  margin: 0px !important;
}

// @import "assets/css/style.css";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.grey-text-color {
  color: darkgrey;
  font-weight: 500;
}

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
@import "~@core/scss/base/components/variables-dark";

.flatpickr-input {
  background-color: white !important;
}

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
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

.accountType {
  display: flex;
  gap: 10px;
  justify-content: end;
  margin-bottom: 2rem;
}

.cursor-pointer {
  height: 25px;
  width: 25px;
  margin-right: 16px;
}

@media (min-width: 1200px) {

  /* modify this based on when the issue occurs */
  .cursor-pointer {
    /* Example: increase the size of the buttons at larger viewport sizes */
    height: 23px;
    width: 23px;
  }
}

.invoice-add-input span.title.mr-1 {
  width: 12rem !important;
  min-width: 12rem !important;
}

.invoice-add-input .invoice-number-date .title.mr-1 {
  width: 5rem !important;
  min-width: 5rem !important;
}

.input-suggesstions {
  position: absolute;
  z-index: 99;
  width: 47%;
  border: 1px solid rgba(87, 100, 111, 0.3);
  border-radius: 0 !important;
  max-height: 15rem;
  overflow: auto;
}

.dark-layout .input-suggesstions {
  border-color: #3b4253;
}

.input-suggesstions .list-group-item {
  border-bottom: 0 !important;
  border-radius: 0 !important;
  background-color: #f8f8f8 !important;
  cursor: pointer;
}

.dark-layout .input-suggesstions .list-group-item {
  background-color: #161d31 !important;
}

.dark-layout .card.invoice-card {
  border-color: #3b4253 !important;
}

.card-header.invoice-header h5 {
  color: #fff !important;
}

.invoice-input-top {
  width: 16rem;
  max-width: 100%;
}

.invoice-input-middle .input-group.invoice-edit-input-group span {
  width: 100%;
}

.v-select {
  margin-top: 3px !important;
}

/*--------------------------------------------------------------
>> TABLE OF CONTENTS:
----------------------------------------------------------------
1. Normalize
2. Typography
3. Invoice General Style
--------------------------------------------------------------*/
/*--------------------------------------------------------------
2. Normalize
----------------------------------------------------------------*/
/* @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"); */
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

/* Sections
   ========================================================================== */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */
main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/* Text-level semantics
   ========================================================================== */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */
/**
 * Remove the border on images inside links in IE 10.
 */
img {
  border-style: none;
}

/* Forms
   ========================================================================== */
/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */
button,
input {
  /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */
fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */
legend {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */
[type="checkbox"],
[type="radio"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/* Interactive
   ========================================================================== */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/* Misc
   ========================================================================== */
/**
 * Add the correct display in IE 10+.
 */
template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */
[hidden] {
  display: none;
}

/*--------------------------------------------------------------
2. Typography
----------------------------------------------------------------*/
body,
html {
  color: #666;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6em;
  overflow-x: hidden;
  background-color: #f5f6fa;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  clear: both;
  color: #111;
  padding: 0;
  margin: 0 0 20px 0;
  font-weight: 500;
  line-height: 1.2em;
}

h1 {
  font-size: 60px;
}

h2 {
  font-size: 48px;
}

h3 {
  font-size: 30px;
}

h4 {
  font-size: 24px;
}

h5 {
  font-size: 18px;
}

h6 {
  font-size: 16px;
}

p,
div {
  margin-top: 0;
  line-height: 1.5em;
}

p {
  margin-bottom: 15px;
}

ul {
  margin: 0 0 25px 0;
  padding-left: 20px;
  list-style: disc;
}

ol {
  padding-left: 20px;
  margin-bottom: 25px;
}

dfn,
cite,
em,
i {
  font-style: italic;
}

blockquote {
  margin: 0 15px;
  font-style: italic;
  font-size: 20px;
  line-height: 1.6em;
  margin: 0;
}

address {
  margin: 0 0 15px;
}

img {
  border: 0;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

a {
  color: inherit;
  text-decoration: none;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

a:hover {
  color: #007aff;
}

button {
  color: inherit;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

table {
  width: 100%;
  caption-side: bottom;
  border-collapse: collapse;
}

th {
  text-align: left;
}

td {
  border-top: 1px solid #dbdfea;
}

td {
  padding: 10px 15px;
  line-height: 1.55em;
}

th {
  padding: 10px 15px;
  line-height: 1.55em;
}

dl {
  margin-bottom: 25px;
}

dl dt {
  font-weight: 600;
}

b,
strong {
  font-weight: bold;
}

pre {
  color: #666;
  border: 1px solid #dbdfea;
  font-size: 18px;
  padding: 25px;
  border-radius: 5px;
}

kbd {
  font-size: 100%;
  background-color: #666;
  border-radius: 5px;
}

a:hover {
  color: #007aff;
}

ul {
  padding-left: 15px;
}

/*--------------------------------------------------------------
3. Invoice General Style
----------------------------------------------------------------*/
.tm_f10 {
  font-size: 10px;
}

.tm_f11 {
  font-size: 11px;
}

.tm_f12 {
  font-size: 12px;
}

.tm_f13 {
  font-size: 13px;
}

.tm_f14 {
  font-size: 14px;
}

.tm_f15 {
  font-size: 15px;
}

.tm_f16 {
  font-size: 16px;
}

.tm_f17 {
  font-size: 17px;
}

.tm_f18 {
  font-size: 18px;
}

.tm_f19 {
  font-size: 19px;
}

.tm_f20 {
  font-size: 20px;
}

.tm_f21 {
  font-size: 21px;
}

.tm_f22 {
  font-size: 22px;
}

.tm_f23 {
  font-size: 23px;
}

.tm_f24 {
  font-size: 24px;
}

.tm_f25 {
  font-size: 25px;
}

.tm_f26 {
  font-size: 26px;
}

.tm_f27 {
  font-size: 27px;
}

.tm_f28 {
  font-size: 28px;
}

.tm_f29 {
  font-size: 29px;
}

.tm_f30 {
  font-size: 30px;
}

.tm_f40 {
  font-size: 40px;
}

.tm_f50 {
  font-size: 50px;
}

.tm_light {
  font-weight: 300;
}

.tm_normal {
  font-weight: 400;
}

.tm_medium {
  font-weight: 500;
}

.tm_semi_bold {
  font-weight: 600;
}

.tm_bold {
  font-weight: 700;
}

.tm_m0 {
  margin: 0px;
}

.tm_mb0 {
  margin-bottom: 0px;
}

.tm_mb1 {
  margin-bottom: 1px;
}

.tm_mb2 {
  margin-bottom: 2px;
}

.tm_mb3 {
  margin-bottom: 3px;
}

.tm_mb4 {
  margin-bottom: 4px;
}

.tm_mb5 {
  margin-bottom: 5px;
}

.tm_mb6 {
  margin-bottom: 6px;
}

.tm_mb7 {
  margin-bottom: 7px;
}

.tm_mb8 {
  margin-bottom: 8px;
}

.tm_mb9 {
  margin-bottom: 9px;
}

.tm_mb10 {
  margin-bottom: 10px;
}

.tm_mb11 {
  margin-bottom: 11px;
}

.tm_mb12 {
  margin-bottom: 12px;
}

.tm_mb13 {
  margin-bottom: 13px;
}

.tm_mb14 {
  margin-bottom: 14px;
}

.tm_mb15 {
  margin-bottom: 15px;
}

.tm_mb16 {
  margin-bottom: 16px;
}

.tm_mb17 {
  margin-bottom: 17px;
}

.tm_mb18 {
  margin-bottom: 18px;
}

.tm_mb19 {
  margin-bottom: 19px;
}

.tm_mb20 {
  margin-bottom: 20px;
}

.tm_mb21 {
  margin-bottom: 21px;
}

.tm_mb22 {
  margin-bottom: 22px;
}

.tm_mb23 {
  margin-bottom: 23px;
}

.tm_mb24 {
  margin-bottom: 24px;
}

.tm_mb25 {
  margin-bottom: 25px;
}

.tm_mb26 {
  margin-bottom: 26px;
}

.tm_mb27 {
  margin-bottom: 27px;
}

.tm_mb28 {
  margin-bottom: 28px;
}

.tm_mb29 {
  margin-bottom: 29px;
}

.tm_mb30 {
  margin-bottom: 30px;
}

.tm_mb40 {
  margin-bottom: 40px;
}

.tm_mb90 {
  margin-bottom: 90px;
}

.tm_pt25 {
  padding-top: 25px;
}

.tm_pt0 {
  padding-top: 0;
}

.tm_radius_6_0_0_6 {
  border-radius: 6px 0 0 6px;
}

.tm_radius_0_6_6_0 {
  border-radius: 0 6px 6px 0;
}

.tm_radius_0 {
  border-radius: 0 !important;
}

.tm_width_1 {
  width: 8.33333333%;
}

.tm_width_2 {
  width: 16.66666667%;
}

.tm_width_3 {
  width: 25%;
}

.tm_width_4 {
  width: 33.33333333%;
}

.tm_width_5 {
  width: 41.66666667%;
}

.tm_width_6 {
  width: 50%;
}

.tm_width_7 {
  width: 58.33333333%;
}

.tm_width_8 {
  width: 66.66666667%;
}

.tm_width_9 {
  width: 75%;
}

.tm_width_10 {
  width: 83.33333333%;
}

.tm_width_11 {
  width: 91.66666667%;
}

.tm_width_12 {
  width: 100%;
}

.tm_border {
  border: 1px solid #dbdfea;
}

.tm_border_bottom {
  border-bottom: 1px solid #dbdfea;
}

.tm_border_top {
  border-top: 1px solid #dbdfea;
}

.tm_border_left {
  border-left: 1px solid #dbdfea;
}

.tm_border_right {
  border-right: 1px solid #dbdfea;
}

.tm_round_border {
  border: 1px solid #dbdfea;
  overflow: hidden;
  border-radius: 6px;
}

.tm_accent_color,
.tm_accent_color_hover:hover {
  color: #007aff;
}

.tm_accent_bg,
.tm_accent_bg_hover:hover {
  background-color: #007aff;
}

.gray_bg {
  background-color: #f6d1ff !important;
}

.purple_bg {
  background-color: #ad3978 !important;
}

.green_bg {
  background-color: #8fce00 !important;
}

.orange_bg {
  background-color: #ffa500 !important;
}

.tm_accent_bg_10 {
  background-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_bg_20 {
  background-color: rgba(0, 122, 255, 0.15);
}

.tm_green_bg {
  background-color: #34c759;
}

.tm_green_bg_15 {
  background-color: rgba(52, 199, 89, 0.1);
}

.tm_primary_bg,
.tm_primary_bg_hover:hover {
  background-color: #111;
}

.tm_primary_bg_2 {
  background-color: #000036;
}

.tm_danger_color {
  color: red;
}

.tm_primary_color {
  color: #111;
}

.tm_secondary_color {
  color: #666;
}

.tm_ternary_color {
  color: #b5b5b5;
}

.tm_white_color {
  color: #fff;
}

.tm_white_color_60 {
  color: rgba(255, 255, 255, 0.6);
}

.tm_gray_bg {
  background: #f5f6fa;
}

.tm_ternary_bg {
  background-color: #b5b5b5;
}

.tm_accent_10_bg {
  background-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_border {
  border-color: #007aff;
}

.tm_accent_border_10 {
  border-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_border_20 {
  border-color: rgba(0, 122, 255, 0.2);
}

.tm_accent_border_30 {
  border-color: rgba(0, 122, 255, 0.3);
}

.tm_accent_border_40 {
  border-color: rgba(0, 122, 255, 0.4);
}

.tm_accent_border_50 {
  border-color: rgba(0, 122, 255, 0.5);
}

.tm_primary_border {
  border-color: #111;
}

.tm_gray_border {
  border-color: #f5f6fa;
}

.tm_primary_border_2 {
  border-color: #000036;
}

.tm_secondary_border {
  border-color: #666;
}

.tm_ternary_border {
  border-color: #b5b5b5;
}

.tm_border_color {
  border-color: #dbdfea;
}

.tm_border_1 {
  border-style: solid;
  border-width: 1px;
}

.tm_body_lineheight {
  line-height: 1.5em;
}

.tm_invoice_in {
  position: relative;
  z-index: 100;
}

.tm_container {
  max-width: none;
  padding: 30px 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.tm_text_center {
  text-align: center;
}

.tm_text_uppercase {
  text-transform: uppercase;
}

.tm_text_right {
  text-align: right;
}

.tm_align_center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.tm_border_bottom_0 {
  border-bottom: 0;
}

.tm_border_top_0 {
  border-top: 0;
}

.tm_table_baseline {
  vertical-align: baseline;
}

.tm_border_none {
  border: none !important;
}

.tm_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_justify_between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.tm__align_center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.tm_border_left_none {
  border-left-width: 0;
}

.tm_border_right_none {
  border-right-width: 0;
}

.tm_table_responsive {
  overflow-x: auto;
}

.tm_table_responsive>table {
  min-width: 600px;
}

.tm_50_col>* {
  width: 50%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_no_border {
  border: none !important;
}

.tm_grid_row {
  display: -ms-grid;
  display: grid;
  grid-gap: 10px 20px;
  list-style: none;
  padding: 0;
}

.tm_col_2 {
  -ms-grid-columns: (1fr) [2];
  grid-template-columns: repeat(2, 1fr);
}

.tm_col_3 {
  -ms-grid-columns: (1fr) [3];
  grid-template-columns: repeat(3, 1fr);
}

.tm_col_4 {
  -ms-grid-columns: (1fr) [4];
  grid-template-columns: repeat(4, 1fr);
}

.tm_max_w_150 {
  max-width: 150px;
}

.tm_left_auto {
  margin-left: auto;
}

hr {
  background: #dbdfea;
  height: 1px;
  border: none;
  margin: 0;
}

.tm_invoice {
  background: #fff;
  border-radius: 10px;
  padding: 50px;
}

.tm_invoice_footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice_footer table {
  margin-top: -1px;
}

.tm_invoice_footer .tm_left_footer {
  width: 58%;
  padding: 10px 15px;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice_footer .tm_right_footer {
  width: 42%;
}

.tm_note {
  margin-top: 30px;
  font-style: italic;
}

.tm_font_style_normal {
  font-style: normal;
}

.tm_sign img {
  max-height: 45px;
}

.tm_coffee_shop_img {
  position: absolute;
  height: 200px;
  opacity: 0.04;
  top: 40px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.tm_coffee_shop_img img {
  max-height: 100%;
}

.tm_invoice.tm_style1 .tm_invoice_right {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  width: 60%;
}

.tm_invoice.tm_style1 .tm_invoice_table {
  grid-gap: 1px;
}

.tm_invoice.tm_style1 .tm_invoice_table>* {
  border: 1px solid #dbdfea;
  margin: -1px;
  padding: 8px 15px 10px;
}

.tm_invoice.tm_style1 .tm_invoice_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right div {
  line-height: 1em;
}

.tm_invoice.tm_style1 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.tm_invoice.tm_style1 .tm_invoice_info_2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-top: 1px solid #dbdfea;
  border-bottom: 1px solid #dbdfea;
  padding: 11px 0;
}

.tm_invoice.tm_style1 .tm_invoice_seperator {
  min-height: 18px;
  border-radius: 1.6em;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-right: 20px;
}

.tm_invoice.tm_style1 .tm_invoice_info_list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1 .tm_invoice_info_list>*:not(:last-child) {
  margin-right: 20px;
}

.tm_invoice.tm_style1 .tm_logo img {
  max-height: 50px;
}

.tm_invoice.tm_style1 .tm_logo.tm_size1 img {
  max-height: 60px;
}

.tm_invoice.tm_style1 .tm_logo.tm_size2 img {
  max-height: 70px;
}

.tm_invoice.tm_style1 .tm_grand_total {
  padding: 8px 15px;
}

.tm_invoice.tm_style1 .tm_box_3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1 .tm_box_3>* {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.tm_invoice.tm_style1 .tm_box_3 ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tm_invoice.tm_style1 .tm_box_3 ul li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1 .tm_box_3 ul li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_invoice.tm_style1 .tm_box_3 ul span {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style1 .tm_box_3 ul span:first-child {
  margin-right: 5px;
}

.tm_invoice.tm_style1 .tm_box_3 ul span:last-child {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.tm_invoice.tm_style2 .tm_invoice_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #dbdfea;
  padding-bottom: 15px;
  position: relative;
}

.tm_invoice.tm_style2 .tm_invoice_left {
  width: 30%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_invoice_right {
  width: 70%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style2 .tm_invoice_info_left {
  width: 30%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_invoice_info_right {
  width: 70%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_logo img {
  max-height: 60px;
}

.tm_invoice.tm_style2 .tm_invoice_title {
  line-height: 0.8em;
}

.tm_invoice.tm_style2 .tm_invoice_info_in {
  padding: 12px 20px;
  border-radius: 10px;
}

.tm_invoice.tm_style2 .tm_card_note {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.tm_invoice.tm_style2 .tm_invoice_footer .tm_left_footer {
  padding-left: 0;
}

.tm_invoice.tm_style1.tm_type1 {
  padding: 0px 50px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
  // height: 110px;
  position: relative;
}

.tm_invoice.tm_style1.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 70%;
  -webkit-transform: skewX(35deg);
  transform: skewX(35deg);
  top: 0px;
  right: -100px;
  overflow: hidden;
}

.tm_invoice.tm_style1.tm_type1 .tm_shape_bg img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transform: skewX(-35deg) translateX(-45px);
  transform: skewX(-35deg) translateX(-45px);
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_right {
  position: relative;
  z-index: 2;
}

.tm_invoice.tm_style1.tm_type1 .tm_logo img {
  max-height: 70px;
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
  margin-right: 0;
  border-radius: 0;
  -webkit-transform: skewX(35deg);
  transform: skewX(35deg);
  position: absolute;
  height: 100%;
  width: 60.5%;
  right: -75px;
  overflow: hidden;
  border: none;
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
  -webkit-transform: skewX(-35deg) translateX(-10px);
  transform: skewX(-35deg) translateX(-10px);
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
  position: relative;
  padding: 4px 0;
}

.tm_invoice.tm_style1.tm_type1 .tm_card_note,
.tm_invoice.tm_style1.tm_type1 .tm_invoice_info_list {
  position: relative;
  z-index: 1;
}

@media (min-width: 500px) {
  .tm_invoice.tm_style1.tm_type2 {
    position: relative;
    overflow: hidden;
    border-radius: 0;
  }

  .tm_invoice.tm_style1.tm_type2 td {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_pt0 {
    padding-top: 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 0px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    overflow: hidden;
    padding: 0 15px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars span {
    height: 100px;
    width: 5px;
    display: block;
    margin: -15px 20px 0;
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars.tm_type1 {
    top: initial;
    bottom: 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars.tm_type1 span {
    margin: 0 20px 0;
    position: relative;
    bottom: -15px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape {
    height: 230px;
    width: 250px;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape .tm_shape_in {
    position: absolute;
    height: 350px;
    width: 350px;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    top: -199px;
    left: 67px;
    overflow: hidden;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape.tm_type1 {
    top: initial;
    bottom: 0;
    right: initial;
    left: 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape.tm_type1 .tm_shape_in {
    top: 135px;
    left: -153px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2 {
    height: 120px;
    width: 120px;
    border: 5px solid currentColor;
    padding: 20px;
    position: absolute;
    bottom: -30px;
    right: 77px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2 .tm_shape_2_in {
    height: 100%;
    width: 100%;
    border: 20px solid currentColor;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2.tm_type1 {
    left: -76px;
    right: initial;
    bottom: 245px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2.tm_type1 .tm_shape_2_in {
    border-width: 6px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_invoice_right {
    width: 40%;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_logo img {
    max-height: 65px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_invoice_footer {
    margin-bottom: 120px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_right_footer {
    position: relative;
    padding: 6px 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_right_footer table {
    position: relative;
    z-index: 2;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_left_footer {
    padding: 30px 15px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_3 {
    position: absolute;
    top: 0;
    left: -40px;
    height: 100%;
    width: calc(100% + 150px);
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_4 {
    position: absolute;
    bottom: 200px;
    left: 0;
    height: 200px;
    width: 200px;
  }
}

.tm_invoice.tm_style1.tm_type3 {
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.tm_invoice.tm_style1.tm_type3 .tm_shape_1 {
  position: absolute;
  top: -1px;
  left: 0;
}

.tm_invoice.tm_style1.tm_type3 .tm_shape_2 {
  position: absolute;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1.tm_type3 .tm_logo img {
  max-height: 60px;
}

.tm_invoice.tm_style1.tm_type3 .tm_invoice_head.tm_mb20 {
  margin-bottom: 65px;
}

.tm_invoice.tm_style1.tm_type3 .tm_invoice_info_list {
  position: relative;
  padding: 10px 0 10px 40px;
}

.tm_invoice.tm_style1.tm_type3 .tm_invoice_info_list_bg {
  position: absolute;
  height: 100%;
  width: calc(100% + 100px);
  top: 0;
  left: 0;
  border-radius: 20px 0 0 0px;
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
}

.tm_invoice.tm_style2.tm_type1 {
  padding-top: 0;
  padding-bottom: 0;
  border-width: 40px 0 0;
  border-style: solid;
  position: relative;
  overflow: hidden;
}

.tm_invoice.tm_style2.tm_type1.tm_small_border {
  border-width: 7px 0 0;
}

.tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 42%;
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
  top: 0px;
  left: -100px;
}

.tm_invoice.tm_style2.tm_type1 .tm_invoice_head {
  padding-top: 15px;
  border-bottom: none;
}

.tm_invoice.tm_style2.tm_type1 .tm_logo {
  position: relative;
  z-index: 2;
}

.tm_invoice.tm_style2.tm_type1 .tm_bottom_invoice {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 15px 50px 20px;
  border-top: 1px solid #dbdfea;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 30px -50px 0;
}

.tm_invoice_content {
  position: relative;
  z-index: 10;
}

.tm_invoice_wrap {
  position: relative;
  z-index: 9;
}

.tm_note_list li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_list.tm_style1 {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tm_list.tm_style1 svg {
  width: 16px;
  height: initial;
}

.tm_list.tm_style1 .tm_list_icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  left: 0;
  top: 3px;
}

.tm_list.tm_style1 li {
  padding-left: 25px;
  position: relative;
}

.tm_list.tm_style1 li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_list.tm_style1.tm_text_right li {
  padding-left: 0;
  padding-right: 25px;
}

.tm_list.tm_style1.tm_text_right .tm_list_icon {
  left: initial;
  right: 0;
}

.tm_section_heading {
  border-width: 0 0 1px 0;
  border-style: solid;
}

.tm_section_heading>span {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 7px 7px 0 0;
}

.tm_section_heading .tm_curve_35 {
  margin-left: 12px;
  margin-right: 0;
}

.tm_section_heading .tm_curve_35 span {
  display: inline-block;
}

.tm_padd_15_20 {
  padding: 15px 20px;
}

.tm_padd_8_20 {
  padding: 8px 20px;
}

.tm_padd_20 {
  padding: 20px;
}

.tm_padd_15 {
  padding: 15px;
}

.tm_padd_10 {
  padding: 10px;
}

.tm_padd_5 {
  padding: 5px;
}

.tm_curve_35 {
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
  padding: 12px 20px 12px 30px;
  margin-left: 22px;
  margin-right: 22px;
}

.tm_curve_35>* {
  -webkit-transform: skewX(35deg);
  transform: skewX(35deg);
}

.tm_dark_invoice_body {
  background-color: #18191a;
}

.tm_dark_invoice {
  background: #252526;
  color: rgba(255, 255, 255, 0.65);
}

.tm_dark_invoice .tm_primary_color {
  color: rgba(255, 255, 255, 0.9);
}

.tm_dark_invoice .tm_secondary_color {
  color: rgba(255, 255, 255, 0.65);
}

.tm_dark_invoice .tm_ternary_color {
  color: rgba(255, 255, 255, 0.4);
}

.tm_dark_invoice .tm_gray_bg {
  background: rgba(255, 255, 255, 0.08);
}

.tm_dark_invoice .tm_border_color,
.tm_dark_invoice .tm_round_border,
.tm_dark_invoice td,
.tm_dark_invoice th,
.tm_dark_invoice .tm_border_top,
.tm_dark_invoice .tm_border_bottom {
  border-color: rgba(255, 255, 255, 0.1);
}

.tm_dark_invoice+.tm_invoice_btns {
  background: #252526;
  border-color: #252526;
}

@media (min-width: 1000px) {
  .tm_invoice_btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 0px;
    margin-left: 20px;
    position: absolute;
    left: 100%;
    top: 0;
    -webkit-box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    border: 3px solid #fff;
    border-radius: 6px;
    background-color: #fff;
  }

  .tm_invoice_btn {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    position: relative;
  }

  .tm_invoice_btn svg {
    width: 24px;
  }

  .tm_invoice_btn .tm_btn_icon {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 42px;
    width: 42px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .tm_invoice_btn .tm_btn_text {
    position: absolute;
    left: 100%;
    background-color: #111;
    color: #fff;
    padding: 3px 12px;
    display: inline-block;
    margin-left: 10px;
    border-radius: 5px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-weight: 500;
    min-height: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
  }

  .tm_invoice_btn .tm_btn_text:before {
    content: "";
    height: 10px;
    width: 10px;
    position: absolute;
    background-color: #111;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    left: -3px;
    top: 50%;
    margin-top: -6px;
    border-radius: 2px;
  }

  .tm_invoice_btn:hover .tm_btn_text {
    opacity: 1;
    visibility: visible;
  }

  .tm_invoice_btn:not(:last-child) {
    margin-bottom: 3px;
  }

  .tm_invoice_btn.tm_color1 {
    background-color: rgba(0, 122, 255, 0.1);
    color: #007aff;
    border-radius: 5px 5px 0 0;
  }

  .tm_invoice_btn.tm_color1:hover {
    background-color: rgba(0, 122, 255, 0.2);
  }

  .tm_invoice_btn.tm_color2 {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34c759;
    border-radius: 0 0 5px 5px;
  }

  .tm_invoice_btn.tm_color2:hover {
    background-color: rgba(52, 199, 89, 0.2);
  }
}

@media (max-width: 999px) {
  .tm_invoice_btns {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 0px;
    margin-top: 20px;
    -webkit-box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    border: 3px solid #fff;
    border-radius: 6px;
    background-color: #fff;
    position: relative;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .tm_invoice_btn {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    position: relative;
    border-radius: 5px;
    padding: 6px 15px;
  }

  .tm_invoice_btn svg {
    width: 24px;
  }

  .tm_invoice_btn .tm_btn_icon {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-right: 8px;
  }

  .tm_invoice_btn:not(:last-child) {
    margin-right: 3px;
  }

  .tm_invoice_btn.tm_color1 {
    background-color: rgba(0, 122, 255, 0.1);
    color: #007aff;
  }

  .tm_invoice_btn.tm_color1:hover {
    background-color: rgba(0, 122, 255, 0.2);
  }

  .tm_invoice_btn.tm_color2 {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34c759;
  }

  .tm_invoice_btn.tm_color2:hover {
    background-color: rgba(52, 199, 89, 0.2);
  }
}

@media (max-width: 767px) {
  .tm_col_4 {
    -ms-grid-columns: (1fr) [1];
    grid-template-columns: repeat(1, 1fr);
  }

  .tm_col_2_md {
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }

  .tm_m0_md {
    margin: 0;
  }

  .tm_mb10_md {
    margin-bottom: 10px;
  }

  .tm_mb15_md {
    margin-bottom: 15px;
  }

  .tm_mb20_md {
    margin-bottom: 20px;
  }

  .tm_mobile_hide {
    display: none;
  }

  .tm_invoice {
    padding: 30px 20px;
  }

  .tm_invoice .tm_right_footer {
    width: 100%;
  }

  .tm_invoice_footer {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .tm_invoice_footer .tm_left_footer {
    width: 100%;
    border-top: 1px solid #dbdfea;
    margin-top: -1px;
    padding: 15px 0;
  }

  .tm_invoice.tm_style2 .tm_card_note {
    margin-top: 0;
  }

  .tm_note.tm_text_center {
    text-align: left;
  }

  .tm_note.tm_text_center p br {
    display: none;
  }

  .tm_invoice_footer.tm_type1 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style2 .tm_invoice_head {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style2 .tm_invoice_head>* {
    width: 100%;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_invoice_left {
    margin-bottom: 15px;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_text_right {
    text-align: left;
  }

  .tm_invoice.tm_style2 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style2 .tm_invoice_info>* {
    width: 100%;
  }

  .tm_invoice.tm_style1.tm_type1 {
    padding: 30px 20px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
    height: initial;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-left: 15px;
    padding-right: 15px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    width: 100%;
    -webkit-transform: initial;
    transform: initial;
    right: 0;
    top: 0;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_logo img {
    max-height: 60px;
  }

  .tm_invoice.tm_style2.tm_type1 {
    border-width: 20px 0 0;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
    width: 250px;
    height: 80px;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_invoice_head .tm_text_center {
    text-align: left;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_logo {
    top: -8px;
    margin-bottom: 15px;
  }

  .tm_invoice.tm_style2 .tm_invoice_info_in {
    padding: 12px 15px;
  }

  .tm_border_none_md {
    border: none !important;
  }

  .tm_border_left_none_md {
    border-left-width: 0;
  }

  .tm_border_right_none_md {
    border-right-width: 0;
  }

  .tm_padd_left_15_md {
    padding-left: 15px !important;
  }

  .tm_invoice.tm_style2 .tm_logo img {
    max-height: 50px;
  }

  .tm_curve_35 {
    -webkit-transform: skewX(0deg);
    transform: skewX(0deg);
    margin-left: 0;
    margin-right: 0;
  }

  .tm_curve_35>* {
    -webkit-transform: inherit;
    transform: inherit;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator,
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
    -webkit-transform: initial;
    transform: initial;
  }

  .tm_section_heading .tm_curve_35 {
    margin-left: 0;
  }

  .tm_shape_2.tm_type1 {
    display: none;
  }
}

@media (max-width: 500px) {
  .tm_border_none_sm {
    border: none !important;
  }

  .tm_flex_column_sm {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_align_start_sm {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .tm_m0_sm {
    margin-bottom: 0;
  }

  .tm_invoice.tm_style1 .tm_logo {
    margin-bottom: 10px;
  }

  .tm_invoice.tm_style1 .tm_invoice_head {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_left,
  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right {
    width: 100%;
  }

  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right {
    text-align: left;
  }

  .tm_list.tm_style2 li {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_list.tm_style2 li>* {
    padding: 5px 20px;
  }

  .tm_col_2,
  .tm_col_3 {
    -ms-grid-columns: (1fr) [1];
    grid-template-columns: repeat(1, 1fr);
  }

  .tm_col_2_sm {
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }

  .tm_table.tm_style1.tm_type1 {
    padding: 0px 20px;
  }

  .tm_box2_wrap {
    -ms-grid-columns: (1fr) [1];
    grid-template-columns: repeat(1, 1fr);
  }

  .tm_box.tm_style1.tm_type1 {
    max-width: 100%;
    width: 100%;
  }

  .tm_invoice.tm_style1 .tm_invoice_left {
    max-width: 100%;
  }

  .tm_f50 {
    font-size: 30px;
  }

  .tm_invoice.tm_style1 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .tm_invoice.tm_style1 .tm_invoice_seperator {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 100%;
    margin-right: 0;
    min-height: 5px;
  }

  .tm_invoice.tm_style1 .tm_invoice_info_list {
    width: 100%;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .tm_invoice.tm_style1 .tm_invoice_seperator+.tm_invoice_info_list {
    margin-bottom: 5px;
  }

  .tm_f30 {
    font-size: 22px;
  }

  .tm_invoice.tm_style1 .tm_box_3 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style1 .tm_box_3 span br {
    display: none;
  }

  .tm_invoice.tm_style1 .tm_box_3>*:not(:last-child) {
    margin-bottom: 15px;
  }

  .tm_invoice.tm_style1 .tm_box_3 ul li {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style1 .tm_box_3 ul li:not(:last-child) {
    margin-bottom: 5px;
  }
}

/*--------------------------------------------------------------
  Will apply only print window
----------------------------------------------------------------*/
@media print {
  .tm_gray_bg {
    background-color: #f5f6fa !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_ternary_bg {
    background-color: #b5b5b5 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_primary_bg {
    background-color: #111 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_secondary_bg {
    background-color: #666 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_bg {
    background-color: #007aff;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_bg_10 {
    background-color: rgba(0, 122, 255, 0.1) !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_bg_20 {
    background-color: rgba(0, 122, 255, 0.15) !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_white_color {
    color: #fff !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_color {
    color: #007aff !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_ternary_color {
    color: #b5b5b5 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_hide_print {
    display: none !important;
  }

  .tm_dark_invoice .tm_gray_bg {
    background-color: #111 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_dark_invoice {
    background: #111 !important;
    color: rgba(255, 255, 255, 0.65) !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_dark_invoice .tm_gray_bg {
    background: rgba(255, 255, 255, 0.05) !important;
    -webkit-print-color-adjust: exact;
  }

  hr {
    background: #dbdfea !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_col_4,
  .tm_col_4.tm_col_2_md {
    -ms-grid-columns: (1fr) [4];
    grid-template-columns: repeat(4, 1fr);
  }

  .tm_col_2_md {
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }

  .tm_mb1 {
    margin-bottom: 1px;
  }

  .tm_mb2 {
    margin-bottom: 2px;
  }

  .tm_mb3 {
    margin-bottom: 3px;
  }

  .tm_mb4 {
    margin-bottom: 4px;
  }

  .tm_mb5 {
    margin-bottom: 5px;
  }

  .tm_mb6 {
    margin-bottom: 6px;
  }

  .tm_mb7 {
    margin-bottom: 7px;
  }

  .tm_mb8 {
    margin-bottom: 8px;
  }

  .tm_mb9 {
    margin-bottom: 9px;
  }

  .tm_mb10 {
    margin-bottom: 10px;
  }

  .tm_mb11 {
    margin-bottom: 11px;
  }

  .tm_mb12 {
    margin-bottom: 12px;
  }

  .tm_mb13 {
    margin-bottom: 13px;
  }

  .tm_mb14 {
    margin-bottom: 14px;
  }

  .tm_mb15 {
    margin-bottom: 15px;
  }

  .tm_mb16 {
    margin-bottom: 16px;
  }

  .tm_mb17 {
    margin-bottom: 17px;
  }

  .tm_mb18 {
    margin-bottom: 18px;
  }

  .tm_mb19 {
    margin-bottom: 19px;
  }

  .tm_mb20 {
    margin-bottom: 20px;
  }

  .tm_mb21 {
    margin-bottom: 21px;
  }

  .tm_mb22 {
    margin-bottom: 22px;
  }

  .tm_mb23 {
    margin-bottom: 23px;
  }

  .tm_mb24 {
    margin-bottom: 24px;
  }

  .tm_mb25 {
    margin-bottom: 25px;
  }

  .tm_mb26 {
    margin-bottom: 26px;
  }

  .tm_mb27 {
    margin-bottom: 27px;
  }

  .tm_mb28 {
    margin-bottom: 28px;
  }

  .tm_mb29 {
    margin-bottom: 29px;
  }

  .tm_mb30 {
    margin-bottom: 30px;
  }

  .tm_mb40 {
    margin-bottom: 40px;
  }

  .tm_mobile_hide {
    display: block;
  }

  .tm_invoice {
    padding: 10px;
  }

  .tm_invoice .tm_right_footer {
    width: 42%;
  }

  .tm_invoice_footer {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice_footer .tm_left_footer {
    width: 58%;
    padding: 10px 15px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    border-top: none;
    margin-top: 0px;
  }

  .tm_invoice.tm_style2 .tm_card_note {
    margin-top: 5px;
  }

  .tm_note.tm_text_center {
    text-align: center;
  }

  .tm_note.tm_text_center p br {
    display: initial;
  }

  .tm_invoice_footer.tm_type1 {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_head {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_head>.tm_invoice_left {
    width: 30%;
  }

  .tm_invoice.tm_style2 .tm_invoice_head>.tm_invoice_right {
    width: 70%;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_invoice_left {
    margin-bottom: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_text_right {
    text-align: right;
  }

  .tm_invoice.tm_style2 .tm_invoice_info {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_info>.tm_invoice_info_left {
    width: 30%;
  }

  .tm_invoice.tm_style2 .tm_invoice_info>.tm_invoice_info_right {
    width: 70%;
  }

  .tm_invoice.tm_style1.tm_type1 {
    padding: 0px 20px 30px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
    height: 110px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
    padding: 4px 0;
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    top: initial;
    margin-right: 0;
    border-radius: 0;
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
    position: absolute;
    height: 100%;
    width: 57.5%;
    right: -60px;
    overflow: hidden;
    border: none;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_logo img {
    max-height: 70px;
  }

  .tm_invoice.tm_style2.tm_type1 {
    border-width: 20px 0 0;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
    height: 100%;
    width: 42%;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_invoice_head .tm_text_center {
    text-align: center;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_logo {
    top: initial;
    margin-bottom: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_info_in {
    padding: 12px 20px;
  }

  .tm_invoice.tm_style2 .tm_logo img {
    max-height: 60px;
  }

  .tm_curve_35 {
    -webkit-transform: skewX(-35deg);
    transform: skewX(-35deg);
    margin-left: 22px;
    margin-right: 22px;
  }

  .tm_curve_35>* {
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
    -webkit-transform: skewX(-35deg) translateX(-45px);
    transform: skewX(-35deg) translateX(-45px);
  }

  .tm_section_heading .tm_curve_35 {
    margin-left: 12px;
  }

  .tm_round_border {
    border-top-width: 2px;
  }

  .tm_border_left_none_md {
    border-left-width: 1px;
  }

  .tm_border_right_none_md {
    border-right-width: 1px;
  }

  .tm_note {
    margin-top: 30px;
  }

  .tm_pagebreak {
    page-break-before: always;
  }
}
</style>
