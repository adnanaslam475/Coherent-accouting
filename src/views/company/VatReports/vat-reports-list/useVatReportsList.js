import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInvoicesList() {
    // Use toast
    const toast = useToast()

    const refVatReportsTable = ref(null)

    // Table Handlers 
    const tableColumns = [
        // { key: 'id', label: '#', sortable: true },
        { key: 'period', sortable: true },
        { key: 'nameAndAddress', label: 'Company Name  and Address', sortable: true },
        { key: 'cell01', label: 'total sum base taxes', sortable: true },
        { key: 'cell20', label: 'total vat', sortable: true },
        { key: 'cell30',label: 'base tax and tax addition', sortable: true },
        { key: 'cell31', label: 'with full tax credit', sortable: true },
        { key: 'cell40', label: 'total  tax credit',sortable: true },
        { key: 'cell50', label: 'VAT to pay',sortable: true },
        { key: 'cell60', label: 'VAT to exclude',sortable: true },
        { key: 'cell70', label: 'tax to pay',sortable: true },
        { key: 'cell71', label: 'tax to pay effective',sortable: true },
        { key: 'actions' },
    ]

    const perPage = ref(10)
    const totalVatReports = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('period')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)
    const companyId = ref(null)

    const dataMeta = computed(() => {
        const localItemsCount = refVatReportsTable.value ? refVatReportsTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalVatReports.value,
        }
    })

    const refetchData = () => {
        refVatReportsTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery, statusFilter], () => {
        refetchData()
    })

    //fetching vat reports list
    const fetchVatReports = (ctx, callback) => {
        store
            .dispatch('vat-reports/fetchVatReports', {
                sortField: sortBy.value,
                direction: isSortDirDesc.value,
                currentPage: currentPage.value,
                perPage: perPage.value,
                q: searchQuery.value, 
                companyId: companyId.value

            })
            .then(response => {
                const { elements, totalElements } = response.data

                callback(elements)
                totalVatReports.value = totalElements
            })
            .catch((err) => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: "Error fetching vat reports",
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    return {
        fetchVatReports,
        tableColumns,
        perPage,
        currentPage,
        companyId,
        totalVatReports,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refVatReportsTable,
        statusFilter,
        refetchData,
    }

}