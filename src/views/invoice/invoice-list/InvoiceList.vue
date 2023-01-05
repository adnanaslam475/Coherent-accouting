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
          md="5"
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
            :to="{ name: 'apps-invoice-add'}"
          >
          {{ $t("company_invoices.add_invoice") }} 
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="7"
        >
          <div class="d-flex align-items-center justify-content-end">
            <div class="position-relative mr-1 filter-date">
              <flat-pickr
                v-model="dateFrom"
                class="form-control invoice-edit-input invoice-input-top"
                :placeholder="$t('company_invoices.start_date')"
              />

              <feather-icon v-if="dateFrom === ''"
                size="16"
                icon="CalendarIcon"
                class="cursor-pointer clear-all"
              />
              <feather-icon v-else
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                @click="dateFrom = ''"
              />
            </div>
            <div class="position-relative mr-1 filter-date">
              <flat-pickr
                v-model="dateTo"
                class="form-control invoice-edit-input invoice-input-top"
                :placeholder="$t('company_invoices.end_date')"
              />

              <feather-icon v-if="dateTo === ''"
                size="16"
                icon="CalendarIcon"
                class="cursor-pointer clear-all"
              />
              <feather-icon v-else
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                @click="dateTo = ''"
              />
            </div>
            <div class="position-relative flex-1">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder="$t('company_invoices.search')"
              />
              <feather-icon
                size="16"
                icon="XIcon"
                class="cursor-pointer clear-all"
                @click="searchQuery = ''"
              />
            </div>

          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="fetchInvoices"
      :fields="tableColumns"
      responsive
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative invoiceList"
    >
      <template #empty="scope">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mb-1 start-chat-icon">
            <feather-icon
                icon="FolderIcon"
                size="20"
            />
          </div>
          <h5 class="sidebar-toggle start-chat-text">
            No records found
          </h5>
        </div>
      </template>

      <template #head(invoiceStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: invoiceNumber -->
      <template #head(invoiceNumber)>
        {{ $t("company_invoices.invoice_no") }}
      </template>
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
      <template #head(invoiceDate)>
        {{ $t("company_invoices.date_issued") }}
      </template>
      <template #cell(invoiceDate)="data">
        <span class="text-nowrap">
          {{ data.item.dateIssued }}
        </span>
      </template>


      <!-- Column: recipientCompany -->
      <template #head(recipientCompanyName)>
        {{ $t("company_invoices.recipient_company") }}
      </template>
      <template #cell(recipientCompanyName)="data">
        <span
          :id="`recipientCompany-row-${data.item.id}`"
          class="text-nowrap"
        >
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
            {{ data.item.recipientCompany.companName }}
          </p>
          <p class="mb-0">
            Eic: {{ data.item.recipientCompany.companyEic }}
          </p>
          <p class="mb-0">
            {{ data.item.recipientCompany.companyOwnerName }}
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
      <template #head(supplierCompanyName)>
        {{ $t("company_invoices.supplier_company") }}
      </template>

      <template #cell(supplierCompanyName)="data">

        <span
          :id="`supplierCompany-row-${data.item.id}`"
          class="text-nowrap"
        >
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
            {{ data.item.supplierCompany.companName }}
          </p>
          <p class="mb-0">
            Eic: {{ data.item.supplierCompany.companyEic }}
          </p>
          <p class="mb-0">
            {{ data.item.supplierCompany.companyOwnerName }}
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
      <template #head(amountNonVat)>
        {{ $t("company_invoices.amount_non_vat") }}
      </template>
      <template #cell(amountNonVat)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency == 'lv' || data.item.currency == 'лв' || data.item.currency == 'лв.'">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: totalAmount -->
      <template #head(totalAmount)>
        {{ $t("company_invoices.total_amount") }}
      </template>
      <template #cell(totalAmount)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency == 'lv' || data.item.currency == 'лв' || data.item.currency == 'лв.'">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: vatAmount -->
      <template #head(vatAmount)>
        {{ $t("company_invoices.vat_amount") }}
      </template>
      <template #cell(vatAmount)="data">
        <span class="text-nowrap">
          <span v-if="data.item.currency == 'lv' || data.item.currency == 'лв' || data.item.currency == 'лв.'">лв. {{ data.value }}</span>
          <span v-else>{{ data.item.currency }} {{ data.value }}</span>
        </span>
      </template>

      <!-- Column: currency -->
      <!-- <template #cell(currency)="data">
        <span class="text-nowrap">
          {{ data.value }}
        </span>
      </template> -->

      <!-- Column: Actions -->
      <template #head(actions)>
            {{ $t('companies.actions') }}
          </template>
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
            dropleft
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
              <span class="align-middle ml-50">{{ $t('download') }}</span>
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'apps-invoice-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">{{ $t('company_info.edit') }}</span>
            </b-dropdown-item>
            <b-dropdown-item @click="showMsgBoxTwo(data.item.id,refetchData)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">{{ $t('company_info.delete') }}</span>
            </b-dropdown-item>
          </b-dropdown>
          <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :ref="`invoicePdf${data.item.id}`"
            :preview-modal="false"
            :paginate-elements-by-height="1100"
            filename="invoice"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a3"
            :pdf-margin="10"
            pdf-orientation="portrait"
            pdf-content-width="1125px"
            @progress="onProgress($event)"
          >
            <section
              slot="pdf-content"
              class="invoice-pdf invoice-preview-list"
            >
              <invoice-download :invoice-data="data.item" />
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
  BCard, BRow, BCol, BCardBody, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BTableLite, BCardText, BAlert, VBToggle, BCardHeader,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import VueHtml2pdf from 'vue-html2pdf'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'
import InvoiceDownload from '../invoice-download/InvoiceDownload.vue'
import invoiceStoreModule from '../invoiceStoreModule'
import useInvoicesList from './useInvoiceList'
import Ripple from 'vue-ripple-directive'
import  {i18n} from '@/main.js'

export default {
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
    BCardHeader,
    InvoiceDownload,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  props: ['invoiceTab'],
  methods: {
    state() {
      return 1
    },
    actionTab() {
      this.$emit('state', this.state())
    },
    onProgress(event) {
      console.log(`Processed: ${event} / 100`)
    },
    generatePDF(itemID) {
      this.$refs[`invoicePdf${itemID}`].generatePdf()
    },
    showMsgBoxTwo(id,refetchData) {
      const h = this.$createElement
        // Using HTML string
        // More complex structure
      const messageVNode = h('div', { class: ['bvModalFont'] }, [
        h('p', { class: ['text-center card-text'] }, [
        i18n.tc('company_invoices.delete_invoice_confirm'),
        ])
      ])
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: i18n.tc('company_invoices.delete_invoice'),
          okVariant: 'primary',
          okTitle: i18n.tc('companies.confirm'),
          cancelTitle: i18n.tc('clients_or_recipients.cancel'),
          hideHeaderClose: false,
          centered: true,
        })
        .then(value => {
          if(value){
            this.invoiceDelete(id, refetchData)
          }
        })
    },
    invoiceDelete(id, refetchData) {
      const token = useJwt.getToken()
      useJwt
        .DeleteInvoice(token, id)
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Invoice Deleted Successfully',
              icon: 'DeleteIcon',
              variant: 'success',
            },
          })
          refetchData()
        })
        .catch(error => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: 'DeleteIcon',
              variant: 'error',
            },
          })
        })
    },

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
      dateFrom,
      dateTo,
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
      dateFrom,
      dateTo,
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
@import "@core/scss/vue/libs/vue-flatpicker.scss";
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
  grid-gap: 25px;
}
 
.invoice-preview-list .invoice-date-wrapper{
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
}
.invoice-preview-list .invoice-date-wrapper p.invoice-date-title{
  width: 12rem !important;
  min-width: max-content;
  font-size: 12px;
}
.invoice-preview-list .invoice-date-wrapper.invoice-middle-content p.invoice-date-title{
  width: auto !important;
  min-width: max-content;
}

.invoiceStat .invoice-total-item{
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
}
.invoice-preview-list .invoice-date-title,.invoiceStat .invoice-total-item .invoice-total-title{
  font-weight: 500 !important;
}
.invoice-preview-list .invoice-date{
  font-weight: bold !important;
}
.invoice-preview.date-issued{
  width: max-content;
  margin-right: 0;
  margin-left: auto;
}
.invoiceNumber{
  font-weight: 500;
  font-size: 16px;
}
 
.dark-layout .card.invoice-card{
  border-color: #3b4253!important;
}

.card-header.invoice-header h5{
  color: #fff !important;
}

.card-body.invoice-body .invoice-date-wrapper{
  margin-bottom: 0 !important;
  padding: 0.2rem 0 !important;
  border-bottom: 1px solid #ebe9f1;
}
.dark-layout .card-body.invoice-body .invoice-date-wrapper{
  border-color: #3b4253!important;
}
.card-body.invoice-body.invoice-body-pdf{
  padding: 1rem;
  padding-top: 0;
}

 
.invoice-pdf{
  background-color: #f8f8f8;
}

.dark-layout .invoice-pdf{
  background-color: #161d31;
}
.invoice-preview .invoice-date-wrapper .invoice-date-title,.invoice-preview .invoice-date-wrapper .invoice-date{
  margin-bottom: 0;
}
.invoice-pdf .gap-2{
  gap: 15px;
}
.filter-date{
  max-width: 10rem;
}
</style>
