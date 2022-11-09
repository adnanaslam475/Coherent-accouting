<template>
    <b-card-code>
        <b-tabs v-model="companyTab">
            <b-tab>
            <template #title>
                <feather-icon icon="BriefcaseIcon" />
                <span>Company Info</span>
            </template>
            <CompanyInfo :companyTab="companyTab" @state="update($event)"  />
            </b-tab>
            
            <b-tab>
            <template #title>
                <feather-icon icon="FileTextIcon" />
                <span>Invoices</span>
            </template>
            <Invoice  />
            </b-tab>

            <b-tab>
            <template #title>
                <feather-icon icon="DollarSignIcon" />
                <span>Create Invoice</span>
            </template>
            <VATMonthReport />
            </b-tab>

            <b-tab>
            <template #title>
                <feather-icon icon="FlagIcon" />
                <span>Yearly Reports</span>
            </template>
            <YearlyReport />
            </b-tab>

            <b-tab>
            <template #title>
                <feather-icon icon="FlagIcon" />
                <span>Vat Reports</span>
            </template>
            <YearlyReport />
            </b-tab>

            <b-tab>
            <template #title>
                <feather-icon icon="FileIcon" />
                <span>Not Verified Invoices</span>
            </template>
            <NotVerifiedInvoice />
            </b-tab>

            <b-tab>
            <template #title>
                <feather-icon icon="FolderIcon" />
                <span>Documents</span>
            </template>
            <Document />
            </b-tab>

            <b-tab>
            <template #title>
                <feather-icon icon="UserIcon" />
                <span>Private Persons</span>
            </template>
            <Document />
            </b-tab>

        </b-tabs>

        <template #code>
            {{ codeIcon }}
        </template>
    </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import CompanyInfo from './CompanyInfo/CompanyInfo.vue'
import Invoice from './Invoice/Invoice.vue'
import VATMonthReport from './VATMonthReports/VATMonthReport.vue'
import YearlyReport from './YearlyReports/YearlyReport.vue'
import NotVerifiedInvoice from './Invoice/NotVerifiedInvoice.vue'
import Document from './Documents/Document.vue'
import PrivatePersons from './PrivatePersons/PrivatePerson.vue'
import { codeIcon } from './code'
import { BTabs, BTab, BCardText } from 'bootstrap-vue'

export default {
    components: {
        BCardCode,
        CompanyInfo,
        Invoice,
        VATMonthReport,
        YearlyReport,
        NotVerifiedInvoice,
        Document,
        PrivatePersons,
        BTabs,
        BTab,
        BCardText
    },
    data () {
        return {
        codeIcon,
        companyTab: 0
        }
    },
    methods: {
        update(value) {
            this.companyTab = value
        }
    }
}
</script>

<style lang="scss">
    // 
</style>