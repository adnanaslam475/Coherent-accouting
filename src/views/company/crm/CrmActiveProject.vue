<template>
  <div>
    <b-table
      :fields="fields"
      :items="items"
      responsive
      class="mb-0"
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
      <template #head(Country)>
        {{ $t("companies.country") }}
      </template>

      <template #cell(Country)="data">
        <div>
          <img
            :src='"@/assets/flags/" + data.item.companyApi.companyIsoAlpha2Country.toLowerCase() + ".png"'
            style="width: 30px; height: 20px; margin-left: 10px"
          />
        </div>
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

      <template #head(period)>
        {{ $t("companies.period") }}
      </template>

      <template #cell(period)="data">
          {{ data.value }}
        <!-- <div>{{data.item.companyIdentificationNumber}}</div> -->
      </template>

      <template #head(action)>
        {{ $t("companies.actions") }}
      </template>

      <template #cell(action)="data" style="text-align: center !important">
        <div class="d-flex">
          <feather-icon
            :id="`invoice-row-${data.item.companyApi.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mr-1 cursor-pointer"
            @click="
              $router.push({
                name: 'CompanyView',
                params: { id: data.item.companyApi.id },
              })
            "
          />
          <b-tooltip
            title="View Company"
            class="cursor-pointer"
            :target="`invoice-row-${data.item.companyApi.id}-preview-icon`"
          />

          <feather-icon
            :id="`edit-${data.item.companyApi.id}-preview-icon`"
            icon="EditIcon"
            size="16"
            class="mx-0"
            style="cursor: pointer"
            @click="
              $router.push({
                name: 'EditCompany',
                params: { id: data.item.companyApi.id },
              })
            "
          />
          <b-tooltip
            title="Edit Company"
            :target="`edit-${data.item.id}-preview-icon`"
          />
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import Swal from "sweetalert2";
import {
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
  BProgress,
  BModal,
  BCardText,
  BTabs,
  BTab,
} from "bootstrap-vue";

import useJwt from "@/auth/jwt/useJwt";
import axios from "@/libs/axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
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
    BModal,
    BCardText,
    BTabs,
    BTab,
  },

  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        "Country",
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
        },
        {
          key: "period",
          sortable: false,
        },
        // A virtual column made up from two fields
        {
          key: "action",
          label: "Action",
        },
      ],
      items: [],
    };
  },
  created() {
    this.getAllCompanies();
  },
  methods: {
    async getAllCompanies() {
      axios
        .get(
          "/account/api/dashboard/companies-with-unfinished-month-vat-reports"
        )
        .then((response) => {
          const projectsData = response.data;
          if (projectsData?.length !== 0 && projectsData !== undefined) {
            this.items = projectsData;
          }
        });
    },
  },
};
</script>
