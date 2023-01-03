<template>
  <div title="Unfinished vat reports">
    <div class="row">
      <!-- filter -->
      <div class="input-group col-4 abc mb-1">
        <input
          v-model="filter"
          type="text"
          placeholder="Search Company"
          class="search-product form-control"
        />
        <div class="input-group-append">
          <div class="input-group-text" style="height: 38px; cursor: pointer">
            <!-- #7367f0 -->
            <svg
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
        <!---->
      </div>
    </div>

    <b-table
      striped
      hover
      responsive
      class="position-relative"
      :current-page="currentPage"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      show-empty
      empty-text="No matching records found"
      empty-filtered-text
    >
      <template #empty="scope">
        <div class="d-flex align-items-center justify-content-center">
          <div class="mb-1 start-chat-icon">
            <feather-icon icon="FolderIcon" size="40" />
          </div>
          <h5 class="sidebar-toggle start-chat-text">No records found</h5>
        </div>
      </template>

      <!-- Country Column-->
      <template #head(period)>
        {{ $t("companies.period") }}
      </template>
      <template #cell(period)="data">
        <span class="text-success font-weight-bolder">
          {{ data.value }}
        </span>
      </template>

      <!--  Company Name Column-->
      <template #head(companyName)>
        {{ $t("companies.company_name") }}
      </template>

      <template #cell(companyName)="data">
        <div class="d-flex align-items-center">
          <div
            v-if="data.item.companyApi.companyName.indexOf(' ') > 0"
            style="
              margin-right: 8px;
              border-radius: 50%;
              color: white;
              min-width: 32px;
              min-height: 28px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
            "
            class="btn-primary"
          >
            <span
              >{{ data.item.companyApi.companyName.substr(0, 1)
              }}{{
                data.item.companyApi.companyName
                  .substr(data.item.companyApi.companyName.indexOf(" ") + 1, 1)
                  .toUpperCase()
              }}</span
            >
          </div>
          <div
            v-else
            style="
              margin-right: 8px;
              border-radius: 50%;
              background-color: #7367f0;
              color: white;
              min-width: 32px;
              min-height: 28px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
            "
          >
            <span
              >{{ data.item.companyApi.companyName.substr(0, 1)
              }}{{
                data.item.companyApi.companyName.substr(1, 1).toUpperCase()
              }}</span
            >
          </div>
          <b-link
            style="min-width: max-content"
            class="font-weight-bold"
            :to="{
              name: 'CompanyView',
              params: { id: data.item.companyApi.id },
            }"
            >{{ data.item.companyApi.companyName }}
          </b-link>
        </div>
        <!-- <div>{{data.item.companyName}}</div> -->
      </template>

      <!-- Company Email Column -->
      <template #head(companyMail)>
        {{ $t("companies.email") }}
      </template>

      <template #cell(companyMail)="data">
        <div>{{ data.item.companyApi.companyMail }}</div>
      </template>

      <!-- Company Status Column -->
      <template #head(status)>
        {{ $t("companies.status") }}
      </template>

      <template #cell(status)="data">
        <div>{{ data.item.companyApi.status }}</div>
      </template>

      <!-- Company OwnerFirstName Column -->
      <template #head(companyOwnerFirstName)>
        {{ $t("companies.owner_first_name") }}
      </template>

      <template #cell(companyOwnerFirstName)="data">
        <div>{{ data.item.companyApi.companyOwnerApi.companyOwnerName }}</div>
      </template>

      <!-- Company companyIdentificationNumber Column -->
      <template #head(companyIdentificationNumber)>
        {{ $t("companies.company_id") }}
      </template>

      <template #cell(companyIdentificationNumber)="data">
        <b-link
          class="font-weight-bold"
          :to="{ name: 'CompanyView', params: { id: data.item.companyApi.id } }"
          >{{ data.item.companyApi.companyIdentificationNumber }}
        </b-link>

        <!-- <div>{{data.item.companyIdentificationNumber}}</div> -->
      </template>



    </b-table>

    <b-card-body class="d-flex justify-content-end flex-wrap pt-0">

      <!-- pagination -->
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0"
        >
          <template #prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </div>
    </b-card-body>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import {
  BTable,
  BAvatar,
  BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardBody,
  BLink,
  BTooltip,
} from "bootstrap-vue";

export default {
  components: {
    BCardCode,
    BTable,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
    BLink,
    BTooltip,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [5, 10, 15],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        // A virtual column that doesn't exist in items
        {
          key: "period",
          sortable: false,
        },
        // A column that needs custom formatting
        {
          key: "companyName",
          label: "Company Name",
          sortable: false,
        },
        {
          key: "companyMail",
          label: "Email",
          sortable: false,
        },
        {
          key: "status",
          sortable: false,
        },
        // A regular column
        {
          key: "companyOwnerFirstName",
          label: "Owner Name",
          sortable: false,
        },
        // A regular column
        {
          key: "companyIdentificationNumber",
          label: "Company ID",
          sortable: false,
        }

        // A virtual column made up from two fields

      ],
      /* eslint-disable global-require */
      items: [],
      /* eslint-disable global-require */
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  created() {
    this.$http
      .get("/account/api/dashboard/companies-with-unfinished-month-vat-reports")
      .then((res) => {
        this.items = res.data;
      })
      .catch((error)=>{
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Error fetching vat reports`,
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        });
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
