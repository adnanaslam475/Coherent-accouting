<template>
  <b-card>
    <div class="row">
      <!-- <input data-v-9a6e255c="" type="text" placeholder="Search..." class="d-inline-block mr-1 form-control col-4" style="margin-left: 15px" /> -->
      <div class="input-group col-4 abc">
        <input
          data-v-15eba8c6=""
          type="text"
          placeholder="Search Product"
          v-model="searchQuery"
          class="search-product form-control "
          id="__BVID__3198"
          @keyup="searchCompanies()"
        />
        <div data-v-15eba8c6="" class="input-group-append">
          <div data-v-15eba8c6="" class="input-group-text" style="height: 38px; cursor:pointer">
            <!-- #7367f0 -->
            <svg
              data-v-15eba8c6=""
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              height="14px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-muted feather feather-search"
            >
              <circle data-v-15eba8c6="" cx="11" cy="11" r="8"></circle>
              <line
                data-v-15eba8c6=""
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              ></line>
            </svg>
          </div>
        </div>
        <!---->
      </div>
      <b-button
        v-b-modal.ticket-create-modal
        variant="relief-primary"
        class="float-right mb-1 col-2 ml-auto"
        style="margin-right: 15px"
      >Add New Ticket
      </b-button>
    </div>
    <b-table
      :fields="fields"
      :items="items"
      responsive
      class="mb-0"
    ></b-table>

    <div class="mx-2 mb-2 mt-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <!-- <span class="text-muted"
            >Showing {{ currentPage + 9 - 9 }} to {{ currentPage + 9 }} of
            {{ this.totalRecords }} entries</span
          > -->
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRecords"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
            prev-text
          >
            <!--              @input="getNewRecord"-->
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18"/>
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18"/>
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
    <!-- basic modal -->
    <b-modal
      id="ticket-create-modal"
      title="Add New Ticket"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-card-text>
        <b-form @submit.prevent="createTicket()">
          <b-row>
            <b-col sm="12">
              <b-form-group
                label="Title"
                label-for="title"
              >
                <b-form-input
                  v-model="ticket.title"
                  name="title"
                  placeholder="Title"
                />
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group
                label="Description"
                label-for="last-name"
              >

                <b-form-textarea
                  v-model="ticket.ticketContent"
                  id="textarea-default"
                  placeholder="Textarea"
                  rows="3"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-card-text>
    </b-modal>

  </b-card>
</template>
<script>
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardText,
  BCol,
  BDropdown,
  BDropdownItem,
  BFormInput,
  BLink,
  BMedia,
  BPagination,
  BProgress,
  BRow,
  BTable,
  BTooltip,
  BForm,
  BFormGroup,
  BFormTextarea,
} from 'bootstrap-vue'
import axios from '@/libs/axios'
// eslint-disable-next-line import/extensions
import BCardCode from '@core/components/b-card-code/BCardCode'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'

export default {
  components: {
    BFormTextarea,
    BForm,
    BFormGroup,
    BCardCode,
    BTable,
    BProgress,
    BBadge,
    BButton,
    BLink,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BCardText,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      ticket: {},
      fields: [
        {
          key: 'title',
          label: 'Title',
        },
        {
          key: 'ticketContent',
          label: 'Content',
        },
        {
          key: 'creationDate',
          label: 'Created Date',
        },
        {
          key: 'answer',
          label: 'Answer',
        },
        {
          key: 'status',
          label: 'Status',
        },
      ],
      items: [],
      currentPage: 1,
      perPage: '10',
      totalRecords: '',
      totalPages: '',
      searchQuery: '',
      required,
    }
  },
  mounted() {
    this.getAllTickets()
  },
  methods: {
    // getting the list of all companies
    async getAllTickets() {
      const data = await axios.get(`/account/api/ticket/list/${this.currentPage}/${this.perPage}?direction=desc&sortField=id`,)
      console.log(data)
      if (data.data.elements !== '') {
        this.items = data.data.elements
        this.totalRecords = data.data.totalElements
        this.totalPages = Math.ceil(this.totalRecords / this.perPage)
        // console.log(this.totalPages);
      }
    },
    async createTicket() {
      const data = await axios.post('/account/api/ticket/create-ticket', this.ticket)
      if (data.status === 201) {
        await this.getAllTickets()
        this.resetModal()
        this.makeToast('success', 'Success', 'Ticket Created Successfully')
      }
    },
    resetModal() {
      this.ticket = {}
      this.$bvModal.hide('ticket-create-modal')
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      this.createTicket()
    },
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: false,
      })
    },
  },
}
</script>
<style lang="">
/*  */
</style>