<template>
  <div>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">{{ $t("message.seachLabel") }}</label>
          <b-form-input
            v-model="searchTerm"
            :placeholder="$t('message.SearchPlaceholder')"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm,
      }"
      :pagination-options="{
        enabled: true,
        perPage: pageLength,
      }"
    >
      <!-- Slot: Table Column -->
      <template slot="table-column" slot-scope="props">
        <span v-if="props.column.label === 'Country'" class="text-nowrap">
            {{ $t("companies.country") }}
        </span>
        <span v-else-if="props.column.label === 'Company Name'" class="text-nowrap">
            {{ $t("companies.company_name") }}
        </span>
        <span v-else-if="props.column.label === 'Email'" class="text-nowrap">
            {{ $t("companies.email") }}
        </span>
        <span v-else-if="props.column.label === 'Status'" class="text-nowrap">
            {{ $t("companies.status") }}
        </span>
        <span v-else-if="props.column.label === 'Owner Name'" class="text-nowrap">
            {{ $t("companies.owner_first_name") }}
        </span>
        <span v-else-if="props.column.label === 'Company ID'" class="text-nowrap">
            {{ $t("companies.company_id") }}
        </span>
        <span v-else-if="props.column.label === 'Period'" class="text-nowrap">
            {{ $t("companies.period") }}
        </span>
        <span v-else-if="props.column.label === 'Action'" class="text-nowrap">
            {{ $t("companies.actions") }}
        </span>
        <span v-else>
          {{ props.column.label }}
        </span>
      </template>

      <!-- Slot: Table Row -->
      <template slot="table-row" slot-scope="props">
        <!-- Column: Country -->
        <span v-if="props.column.field === 'country'" class="text-nowrap">
            <img
                :src='"@/assets/flags/" + props.row.companyApi.companyIsoAlpha2Country.toLowerCase() + ".png"'
                style="width: 30px; height: 20px; margin-left: 10px"
            />
        </span>

        <!-- Column: Name -->
        <span v-else-if="props.column.field === 'companyName'" class="text-nowrap">
            <div class="d-flex align-items-center">
                <div
                    v-if="props.row.companyApi.companyName.indexOf(' ') > 0"
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
                    >{{ props.row.companyApi.companyName.substr(0, 1)
                    }}{{
                        props.row.companyApi.companyName
                        .substr(props.row.companyApi.companyName.indexOf(" ") + 1, 1)
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
                    >{{ props.row.companyApi.companyName.substr(0, 1)
                    }}{{
                        props.row.companyApi.companyName.substr(1, 1).toUpperCase()
                    }}</span
                    >
                </div>
                <b-link
                    style="min-width: max-content"
                    class="font-weight-bold"
                    :to="{
                    name: 'CompanyView',
                    params: { id: props.row.companyApi.id },
                    }"
                    >{{ props.row.companyApi.companyName }}
                </b-link>
            </div>
        </span>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'companyMail'">
            {{ props.row.companyApi.companyMail }}
        </span>

        <span v-else-if="props.column.field === 'status'">
          <b-badge :variant="statusVariant(props.row.companyApi.status)">
            {{ props.row.companyApi.status }}
          </b-badge>
        </span>

        <span v-else-if="props.column.field === 'companyOwnerFirstName'">
            {{ props.row.companyApi.companyOwnerApi.companyOwnerName }}
        </span>

        <span v-else-if="props.column.field === 'companyIdentificationNumber'">
            {{ props.row.companyApi.companyIdentificationNumber }}
        </span>

        <span v-else-if="props.column.field === 'period'">
            {{ props.row.period }}
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
            <div class="d-flex">
            <feather-icon
                :id="`invoice-row-${props.row.companyApi.id}-preview-icon`"
                icon="EyeIcon"
                size="16"
                class="mr-1 cursor-pointer"
                @click="
                $router.push({
                    name: 'CompanyView',
                    params: { id: props.row.companyApi.id },
                })
                "
            />
            <b-tooltip
                title="View Company"
                class="cursor-pointer"
                :target="`invoice-row-${props.row.companyApi.id}-preview-icon`"
            />

            <feather-icon
                :id="`edit-${props.row.companyApi.id}-preview-icon`"
                icon="EditIcon"
                size="16"
                class="mx-0"
                style="cursor: pointer"
                @click="
                $router.push({
                    name: 'EditCompany',
                    params: { id: props.row.companyApi.id },
                })
                "
            />
            <b-tooltip
                title="Edit Company"
                :target="`edit-${props.row.id}-preview-icon`"
            />
            </div>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template slot="pagination-bottom" slot-scope="props">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              {{ $t("message.pagelength") }}
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['5', '10', '15']"
              class="mx-1"
              @input="
                (value) => props.perPageChanged({ currentPerPage: value })
              "
            />
            <span class="text-nowrap">
              {{ $t("message.of") }} {{ props.total }}
              {{ $t("message.pageText2") }}
            </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value) => props.pageChanged({ currentPage: value })"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BAlert,
  BDropdown,
  BDropdownItem,
  BLink
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BAlert,
    BDropdown,
    BDropdownItem,
    BLink
  },
  data() {
    return {
      pageLength: 10,
      dir: false,
      columns: [
        // A virtual column that doesn't exist in items
        {
          field: "country",
          label: "Country",
        },
        // A column that needs custom formatting
        {
          field: "companyName",
          label: "Company Name",
        },
        {
          field: "companyMail",
          label: "Email",
        },
        {
          field: "status",
          label: "Status",
        },
        // A regular column
        {
          field: "companyOwnerFirstName",
          label: "Owner Name",
        },
        // A regular column
        {
          field: "companyIdentificationNumber",
          label: "Company ID",
        },
        {
          field: "period",
          label: "Period",
        },
        // A virtual column made up from two fields
        {
          key: "action",
          label: "Action",
        },
      ],
      rows: [],
      searchTerm: "",
    };
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current: "light-primary",
        Professional: "light-success",
        Rejected: "light-danger",
        Resigned: "light-warning",
        Applied: "light-info",
        ACTIVE: "light-primary"
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
    },
  },
  created() {
    this.$http
      .get("/account/api/dashboard/companies-with-unfinished-month-vat-reports")
      .then((res) => {
        this.rows = res.data;
      });
  },
};
</script>
<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
