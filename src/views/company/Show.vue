<template>
    <div>
        <b-row>
            <b-col lg="12" md="12" sm="12">
                <CompanyTabs />
            </b-col>
        </b-row>
    </div>
</template>

<script>

import { BRow, BCol } from 'bootstrap-vue'

import CompanyTabs from './CompanyTabs.vue'

export default {
    name: 'CompanyView',
    components: {
        BRow,
        BCol,
        CompanyTabs
    },
    data () {
        return {
            // 
        }
    }
}
</script>

<style>
    /*  */
</style>