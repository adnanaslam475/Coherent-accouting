<template>
    <div>
        <b-card
            title="Add New Company"
            class="mb-2 w-100"
        >
        <b-card-body>
            <b-form @submit="saveCompany()">
                <b-form-row>
                    <b-col>
                        <b-form-group
                            id="input-group-1"
                            label="Company Name"
                            label-for="company_name"
                        >
                            <b-form-input
                                id="company_name"
                                v-model="form.company_name"
                                type="text"
                                placeholder="Company Name"
                                autocomplete="off"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            id="input-group-1"
                            label="Company Email"
                            label-for="company_email"
                        >
                            <b-form-input
                                id="company_email"
                                v-model="form.company_email"
                                type="email"
                                placeholder="Company Email"
                                autocomplete="off"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-form-group
                            id="input-group-1"
                            label="Owner Name"
                            label-for="owner_name"
                        >
                            <b-form-input
                                id="owner_name"
                                v-model="form.owner_name"
                                type="text"
                                placeholder="Owner Name"
                                autocomplete="off"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            id="input-group-1"
                            label="Company Identification Number"
                            label-for="company_identification_number"
                        >
                            <b-form-input
                                id="company_identification_number"
                                v-model="form.company_identification_number"
                                type="text"
                                placeholder="Company Identification Number"
                                autocomplete="off"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="relief-primary" class="float-right">Save</b-button>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-card-body>
        
        </b-card>
    </div>
</template>

<script>
import { BCard, BcardText, BButton, BForm, BFormGroup, BFormInput, BFormRow, BCol } from 'bootstrap-vue'

export default {
    components: {
        BCard,
        BcardText,
        BButton,
        BForm,
        BFormGroup,
        BFormInput,
        BFormRow,
        BCol
    },
    data () {
        return {
            form: {
                company_name: null,
                company_email: null,
                owner_name: null,
                company_identification_number: null
            }
        }
    },
    methods: {
        saveCompany() {
            this.$router.push('/companies')
        }
    },
    created() {
        // 
    }
}
</script>

<style lang="scoped">
    /*  */
</style>