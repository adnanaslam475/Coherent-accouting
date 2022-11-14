<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            @click="actionTab"
          >
            Add Record
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />

          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="fetchInvoices"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList"
    >

      <template #head(invoiceStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(id)="data">
        <b-link
          :to="{ name: 'apps-invoice-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          #{{ data.value }}
        </b-link>
      </template>

      <!-- Column: invoiceNumber -->
      <template #cell(invoiceNumber)="data">
        <b-link
          :to="{ name: 'apps-invoice-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          <span class="text-nowrap">
            {{ data.value }}
          </span>
        </b-link>
      </template>

      <!-- Column: Issued Date -->
      <template #cell(invoiceDate)="data">
        <span class="text-nowrap">
          {{ data.item.dateIssued }}
        </span>
      </template>

      <template #cell(documentType)="data">
        <b-link
          :to="{ name: 'apps-invoice-preview', params: { id: data.item.id }}"
          class="font-weight-bold"
        >
          <span class="text-nowrap">
            {{ data.value }}
          </span>
        </b-link>
      </template>

      <!-- Column: recipientCompany -->
      <template #cell(recipientCompanyName)="data">
        <span class="text-nowrap"  :id="`recipientCompany-row-${data.item.id}`">
          <b-badge
            pill
            :variant="`light-success`"
            class="text-capitalize"
          >
            {{ data.item.recipientCompany.companName }}
          </b-badge>
        </span>
        <b-tooltip
          :target="`recipientCompany-row-${data.item.id}`"
          placement="top"
        >
          <p class="mb-0">
            Company Eic: {{ data.item.recipientCompany.companyEic }}
          </p>
          <p class="mb-0">
            Company Owner Name: {{ data.item.recipientCompany.companyOwnerName }}
          </p>

          <!-- <p class="mb-0">
            Company Vat Eic: {{ data.item.recipientCompany.companyVatEic }}
          </p>
          <p class="mb-0">
            Company Address: {{ data.item.recipientCompany.companyAddress }}
          </p>
          <p class="mb-0">
            Owner EGN: {{ data.item.recipientCompany.ownerEGN }}
          </p> -->
        </b-tooltip>
      </template>

      <!-- Column: supplierCompany -->
      <template #cell(supplierCompanyName)="data">
 
        <span class="text-nowrap"  :id="`supplierCompany-row-${data.item.id}`">
          <b-badge
            pill
            :variant="`light-success`"
            class="text-capitalize"
          >
            {{ data.item.supplierCompany.companName }}
          </b-badge>
        </span>
        <b-tooltip
          :target="`supplierCompany-row-${data.item.id}`"
          placement="top"
        >
        
          <p class="mb-0">
            Company Eic: {{ data.item.supplierCompany.companyEic }}
          </p>
          <p class="mb-0">
            Company Owner Name: {{ data.item.supplierCompany.companyOwnerName }}
          </p>

          <!-- <p class="mb-0">
            Company Vat Eic: {{ data.item.supplierCompany.companyVatEic }}
          </p>
          <p class="mb-0">
            Company Address: {{ data.item.supplierCompany.companyAddress }}
          </p>
          <p class="mb-0">
            Owner EGN: {{ data.item.supplierCompany.ownerEGN }}
          </p> -->
        </b-tooltip>
      </template>

      <!-- Column: amount non vat -->
      <template #cell(amountNonVat)="data">
        <span class="text-nowrap">
           
          <span v-if="data.item.currency == 'lv'">лв{{ data.value }}</span>
          <span v-if="data.item.currency == 'usd'">${{ data.value }}</span>
          <span v-if="data.item.currency == 'euro'">€{{ data.value }}</span>
          
        </span>
      </template>

      <!-- Column: totalAmount -->
      <template #cell(totalAmount)="data">
        <span class="text-nowrap">
           
          <span v-if="data.item.currency == 'lv'">лв{{ data.value }}</span>
          <span v-if="data.item.currency == 'usd'">${{ data.value }}</span>
          <span v-if="data.item.currency == 'euro'">€{{ data.value }}</span>
          
        </span>
      </template>

      <!-- Column: vatAmount -->
      <template #cell(vatAmount)="data">
        <span class="text-nowrap">
           
          <span v-if="data.item.currency == 'lv'">лв{{ data.value }}</span>
          <span v-if="data.item.currency == 'usd'">${{ data.value }}</span>
          <span v-if="data.item.currency == 'euro'">€{{ data.value }}</span>
          
        </span>
      </template>

      <!-- Column: currency -->
      <!-- <template #cell(currency)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template> -->

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap">

          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1 cursor-pointer"
            @click="$router.push({ name: 'apps-invoice-preview', params: { id: data.item.id }})"
          />
          <b-tooltip
            title="Preview Invoice"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.id}-preview-icon`"
          />

          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="generatePDF(data.item.id)">
              <feather-icon icon="DownloadIcon" />
              <span class="align-middle ml-50">Download</span>
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'apps-invoice-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="invoiceDelete(data.item.id,refetchData)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
          <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1100"
            filename="invoice"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            :pdf-margin="10"
            pdf-orientation="portrait"
            pdf-content-width="800px"
            @progress="onProgress($event)"
            :ref="`invoicePdf${data.item.id}`"
          >
            <section slot="pdf-content">
              <b-card
                  no-body
                  class="invoice-preview-card pdf-view invoice-preview-list"
              >
              <b-card-body class="invoice-padding pb-0">
              <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0" style="grid-gap:10px">
                <!-- Header: Left Content -->
                <div class="mt-md-0 mt-2 flex-1">
                  <b-card
                    no-body
                    class="invoice-preview"
                  > 
                    <b-card-header class="justify-content-center">
                        <h4 class="m-0">Supplier</h4>
                    </b-card-header>
                    
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Name:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.supplierCompany.companName }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Address:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.supplierCompany.companyAddress }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company ID Number:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.supplierCompany.companyEic }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Owner:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.supplierCompany.companyOwnerName }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Vat No (if exists):
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.supplierCompany.companyVatEic }}
                      </p>
                    </div>
                    
                  </b-card>
                </div>

                <div class="mt-md-0 mt-2">
                  <b-card
                    no-body
                    class="invoice-preview"
                  >
                    <b-card-header class="justify-content-center"> 
                  <h4 class="invoice-title m-0">
                    Invoice
                    <span class="invoice-number">#{{ data.item.id }}</span>
                  </h4>
                </b-card-header>

                  <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Date Issued:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.dateIssued}}
                      </p>
                    </div>
                  <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Invoice Number:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.invoiceNumber }}
                      </p>
                    </div>
                
                  </b-card>
                </div>

                <div class="mt-md-0 mt-2 invoice-data-wrapper-right flex-1">
                  <b-card
                    no-body
                    class="invoice-preview"
                  > 
                    <b-card-header class="justify-content-center">
                        <h4 class="m-0">Recipient</h4>
                    </b-card-header>
                   
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Name:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.recipientCompany.companName }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Address:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.recipientCompany.companyAddress }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company ID Number:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.recipientCompany.companyEic }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Owner:
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.recipientCompany.companyOwnerName }}
                      </p>
                    </div>
                    <div class="row m-0">
                      <p class="invoice-date-title col-6 p-0 pr-1">
                        Company Vat No (if exists):
                      </p>
                      <p class="invoice-date col-6 p-0">
                        {{ data.item.recipientCompany.companyVatEic }}
                      </p>
                    </div>
                   
                    </b-card>
                </div>
              </div>
            </b-card-body>
         
              
                <!-- Invoice Description: Table -->
                <b-table-lite
                  responsive
                  :items="data.item.transactions"
                  :fields="['serviceOrItemDescription', 'quantity', 'measurement', 'singleAmountTransaction', 'transactionTotalAmountNonVat']"            
                >
                  <template #cell(singleAmountTransaction)="data">
                    <b-card-text class="font-weight-bold mb-25">
                      лв{{ data.item.singleAmountTransaction }}
                    </b-card-text>
                  </template>
                  <template #cell(transactionTotalAmountNonVat)="data">
                    <b-card-text class="font-weight-bold mb-25">
                      лв{{ data.item.transactionTotalAmountNonVat }}
                    </b-card-text>
                  </template>
                </b-table-lite>

                <!-- Invoice Description: Total -->
                <b-card-body class="invoice-padding pb-0">
                  <b-row class="invoiceStat">

                    <!-- Col: Sales Persion -->
                    <b-col
                      cols="12"
                      md="6"
                      class="mt-md-0 mt-3"
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
                            лв{{data.item.amountNonVat}}
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            VAT:
                          </p>
                          <p class="invoice-total-amount">
                            {{data.item.vatPercent}}%
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            VAT Amount:
                          </p>
                          <p class="invoice-total-amount">
                            лв{{data.item.vatAmount}}
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            Discount Percent:
                          </p>
                          <p class="invoice-total-amount">
                            {{data.item.tradeDiscountPercent}}%
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            Discount Sum:
                          </p>
                          <p class="invoice-total-amount">
                            лв{{data.item.tradeDiscountAmount}}
                          </p>
                        </div>
                        <hr class="my-50">
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            Total Price:
                          </p>
                          <p class="invoice-total-amount">
                            лв{{data.item.totalAmount}}
                          </p>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
            </section>
          </vue-html2pdf>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>

      
    </div>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol,BCardBody, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,BTableLite,BCardText,BAlert,VBToggle,BCardHeader
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import useInvoicesList from './useInvoiceList'
import VueHtml2pdf from "vue-html2pdf";
import invoiceStoreModule from '../invoiceStoreModule'
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  props: ['invoiceTab'],
  methods: {
    state() {
      return 1;
    },
    actionTab() {
      this.$emit("state", this.state())
    },
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    generatePDF(itemID) {
      this.$refs['invoicePdf'+itemID].generatePdf();
    },
    invoiceDelete(id, refetchData) {
      let token = useJwt.getToken()
      useJwt
        .DeleteInvoice(token,id)
        .then((response) => {
          
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Invoice Deleted Successfully`,
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          refetchData()
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        });
    }

  },
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    vSelect,
    BCardBody,
    BTableLite,
    BCardText,
    BAlert,
    VBToggle,
    VueHtml2pdf,
    BCardHeader
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    const {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList()

  

    return {
      fetchInvoices,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },

}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.invoiceList th{
  position: relative;
  vertical-align: middle !important;
}
.gap-2 {
  grid-gap: 26px;
}
.invoice-add .invoice-total-wrapper {
  max-width: 25rem !important;
}
.invoice-preview-list .invoice-date-wrapper{
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
}

.invoice-preview-list .invoice-date-wrapper.invoice-middle-content{
  min-width: max-content;
}
.invoiceStat .invoice-total-item{
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
}
.invoice-preview-list .invoice-date-title,.invoiceStat .invoice-total-item .invoice-total-title{
  font-weight: bold !important;
}
.invoice-preview-list .invoice-date{
  font-weight: 400 !important;
}
.flex-1{
  flex: 1;
}
</style>
