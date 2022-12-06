import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInvoicesList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'invoiceNumber', sortable: true},
    { key: 'invoiceDate', label: "date Issued", sortable: true },
    { key: 'transactionType', sortable: true },
    { key: 'recipientCompanyName', label: "recipient Company", sortable: true},
    { key: 'supplierCompanyName', label: "supplier Company" , sortable: true },
    { key: 'amountNonVat', sortable: true },
    { key: 'totalAmount', sortable: true },
    { key: 'vatAmount', sortable: true },
    
    // { key: 'vatPercent', sortable: true, formatter: val => `${val}%` },
    // { key: 'tradeDiscountAmount', sortable: true, formatter: val => `$${val?val:"0"}` },
    // { key: 'tradeDiscountPercent', sortable: true, formatter: val => `${val}%` },
    
    // { key: 'currency', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalInvoices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const dateFrom = ref('')
  const dateTo = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)
  const companyId = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInvoices.value,
    }
  })

  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, dateFrom, dateTo, searchQuery, statusFilter], () => {
    refetchData()
  })

  const fetchInvoices = (ctx, callback) => {
    store
      .dispatch('app-invoice/fetchInvoices', {
        sortField: sortBy.value,
        direction: isSortDirDesc.value,
        verified: true,
        currentPage : currentPage.value,
        perPage: perPage.value,
        q: searchQuery.value,
        companyId: companyId.value,
        dateFrom: dateFrom.value,
        dateTo: dateTo.value
      })
      .then(response => {
        const { elements, totalElements } = response.data

        callback(elements)
        totalInvoices.value = totalElements
      })
      .catch((err) => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching invoices' list",
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInvoiceStatusVariantAndIcon = status => {
    if (status === 'Partial Payment') return { variant: 'warning', icon: 'PieChartIcon' }
    if (status === 'Paid') return { variant: 'success', icon: 'CheckCircleIcon' }
    if (status === 'Downloaded') return { variant: 'info', icon: 'ArrowDownCircleIcon' }
    if (status === 'Draft') return { variant: 'primary', icon: 'SaveIcon' }
    if (status === 'Sent') return { variant: 'secondary', icon: 'SendIcon' }
    if (status === 'Past Due') return { variant: 'danger', icon: 'InfoIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }

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
    companyId,
    statusFilter,

    resolveInvoiceStatusVariantAndIcon,
    resolveClientAvatarVariant,

    refetchData,
  }
}
