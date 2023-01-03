<template>
  <b-card>
    <div class="row">
      <b-button
        v-b-modal.ticket-create-modal
        variant="relief-primary"
        class="float-right mb-1 col-2 ml-auto"
        style="margin-right: 15px"
        >{{ $t("tickets_page.add_new_ticket") }}
      </b-button>
    </div>
    <b-table :fields="fields" :items="items" responsive class="mb-0">
      <!-- Ticket Title -->
      <template #head(title)>
        {{ $t("tickets_page.title") }}
      </template>

      <!-- Ticket Content -->
      <template #head(ticketContent)>
        {{ $t("tickets_page.content") }}
      </template>

      <!-- Ticket Coreation Date -->
      <template #head(creationDate)>
        {{ $t("tickets_page.created_date") }}
      </template>

      <!-- Ticket Answer-->
      <template #head(answer)>
        {{ $t("tickets_page.answer") }}
      </template>

      <!-- Ticket Status -->
      <template #head(status)>
        {{ $t("companies.status") }}
      </template>

      <!-- Ticket Content -->
      <template #head(action)>
        {{ $t("companies.actions") }}
      </template>

    
      <template style="text-align: center !important" #cell(status)="data">
        <span
          :id="`recipientCompany-row-${data.item.id}`"
          class="text-nowrap"
        >
          <b-badge
            pill
            :variant="`${data.value.toLowerCase() == 'resolved' ? 'light-success' : 'light-warning' }`"
            class="text-uppercase"
          >
            {{ $t('tickets_page.'+data.value) }}
          </b-badge>
        </span>
      </template>
      <template style="text-align: center !important" #cell(action)="data">
        <!-- Dropdown -->
        <!-- <b-dropdown
          variant="link"
          toggle-class="p-0"
          no-caret
          :right="$store.state.appConfig.isRTL"
        >
          <template #button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="16"
              class="align-middle text-body ml-1"
            />
          </template>
          <b-dropdown-item @click="editTicket(data.item)">
            <feather-icon icon="EditIcon"/>
            <span class="align-middle ml-50">Edit</span>
          </b-dropdown-item>
        </b-dropdown> -->

        <div class="cursor-pointer" @click="editTicket(data.item)">
          <feather-icon icon="EditIcon" />
          <span class="align-middle ml-50">{{ $t('company_info.edit') }}</span>
        </div>
        <!-- </b-button> -->
      </template>
    </b-table>
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
            @input="getAllTickets"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
    <!-- basic modal -->
    <b-modal
      id="ticket-create-modal"
      :title="$t('update_tickets.add_ticket')"
      :ok-title="$t('update_tickets.submit')"
      :cancel-title="$t('update_tickets.close')"
      cancel-variant="outline-secondary"
      @ok="validationCreateTicket"
      @close="resetModal"
      @show="resetModal"
    >
      <b-card-text>
        <validation-observer ref="simpleRules">
          <b-form @submit.prevent="validationCreateTicket()">
            <b-row>
              <b-col sm="12">
                <b-form-group :label="$t('update_tickets.title')" label-for="title">
                  <validation-provider
                    #default="{ errors }"
                    name="Title"
                    vid="Title"
                    rules="required"
                  >
                    <b-form-input
                      v-model="ticket.title"
                      :state="errors.length > 0 ? false : null"
                      name="title"
                      placeholder="Title"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group :label="$t('update_tickets.description')" label-for="last-name">
                  <validation-provider
                    #default="{ errors }"
                    name="Description"
                    vid="Description"
                    rules="required"
                  >
                    <b-form-textarea
                      id="textarea-default"
                      v-model="ticket.ticketContent"
                      placeholder="Textarea"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-card-text>
    </b-modal>
    <b-modal
      id="ticket-update-modal"
      :title="$t('update_tickets.update_ticket')"
      :ok-title="$t('create_company.update')"
      :cancel-title="$t('update_tickets.close')"
      cancel-variant="outline-secondary"
      @ok="validationUpdateTicket"
      @close="resetModal"
    >
      <b-card-text>
        <validation-observer ref="simpleRules">
          <b-form @submit.prevent="validationUpdateTicket()">
            <b-row>
              <b-col sm="12">
                <b-form-group :label="$t('update_tickets.title')" label-for="title">
                  <validation-provider
                    #default="{ errors }"
                    name="Title"
                    vid="Title"
                    rules="required"
                  >
                    <b-form-input
                      v-model="ticket.title"
                      name="title"
                      placeholder="Title"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group :label="$t('update_tickets.description')" label-for="last-name">
                  <validation-provider
                    #default="{ errors }"
                    name="Description"
                    vid="Description"
                    rules="required"
                  >
                    <b-form-textarea
                      id="textarea-default"
                      v-model="ticket.ticketContent"
                      placeholder="Textarea"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
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
} from "bootstrap-vue";
import axios from "@/libs/axios";
// eslint-disable-next-line import/extensions
import BCardCode from "@core/components/b-card-code/BCardCode";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

extend("required", required);
extend("min", min);

export default {
  components: {
    BFormTextarea,
    BForm,
    BFormGroup,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BDropdown,
    BDropdownItem,
    BPagination,
    BCardText,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BTooltip,
    BCardCode,
    BTable,
    BProgress,
    BBadge,
    BButton,
    BLink,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      ticket: {},
      fields: [
        {
          key: "title",
          label: "Title",
        },
        {
          key: "ticketContent",
          label: "Content",
        },
        {
          key: "creationDate",
          label: "Created Date",
          tdClass: "width-25",
        },
        {
          key: "answer",
          label: "Answer",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "action",
          label: "Action",
        },
      ],
      items: [],
      currentPage: 1,
      perPage: "10",
      totalRecords: "",
      totalPages: "",
      searchQuery: "",
      required,
    };
  },
  mounted() {
    this.getAllTickets();
  },
  methods: {
    // getting the list of all companies
    async getAllTickets() {
      axios.get(
        `/account/api/ticket/list/${this.currentPage}/${this.perPage}?direction=desc&sortField=id`
      )
      .then((response) => {
        this.items = response.data.elements;
        this.totalRecords = response.data.totalElements;
        this.totalPages = Math.ceil(this.totalRecords / this.perPage);
        })
        .catch((error) => {
          console.log(error);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Error fetching tickets",
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          });
        });
      
    },
    async createTicket() {
      const data = await axios.post(
        "/account/api/ticket/create-ticket",
        this.ticket
      );
      if (data.status === 201) {
        await this.getAllTickets();
        this.resetModal();
        this.makeToast("success", "Success", "Ticket Created Successfully");
      }
    },
    async updateTicket() {
      const data = await axios.put(
        `/account/api/ticket/update-ticket/${this.ticket.id}`,
        this.ticket
      );
      if (data.status === 200) {
        await this.getAllTickets();
        this.resetModal();
        this.makeToast("success", "Success", "Ticket Updated Successfully");
      }
    },
    resetModal() {
      console.log("res");
      this.ticket = {};
      this.$bvModal.hide("ticket-create-modal");
      this.$bvModal.hide("ticket-update-modal");
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      this.createTicket();
    },
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: false,
      });
    },
    editTicket(ticket) {
      this.ticket = ticket;
      this.$bvModal.show("ticket-update-modal");
    },
    validationCreateTicket() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          this.createTicket();
        }
      });
    },
    validationUpdateTicket() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          this.updateTicket();
        }
      });
    },
  },
};
</script>
<style scoped>
.width-25 {
  width: 25px;
}
</style>
