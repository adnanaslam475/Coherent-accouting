<template>
  <div>
    <b-tabs v-model="companyTab" align="center">
      <b-tab>
        <template #title>
          <feather-icon icon="LayersIcon" />
          <span style="font-size: 13px">{{ $t("companiess") }}</span>
        </template>
        <div class="row">
          <!-- <input data-v-9a6e255c="" type="text" placeholder="Search..." class="d-inline-block mr-1 form-control col-4" style="margin-left: 15px" /> -->
          <div class="input-group col-4 abc">
            <!----><input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('companies.search_company')"
              class="search-product form-control"
              @keyup="searchCompanies()"
            />
            <div class="input-group-append">
              <div
                class="input-group-text"
                style="height: 38px; cursor: pointer"
              >
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
          <b-button
            to="/company/create"
            variant="primary"
            class="float-right mb-1 col-2 ml-auto text-capitalize"
            style="margin-right: 15px"
            >{{ $t("companies.add_company") }}
          </b-button>
        </div>
        <b-table
          :fields="fields"
          :items="items"
          responsive
          class="mb-0"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          show-empty
          empty-text="No matching records found"
          empty-filtered-text
          @sort-changed="checkStatus"
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
                :src='"@/assets/flags/" + data.item.companyIsoAlpha2Country.toLowerCase() + ".png"'
                style="width: 30px; height: 20px; margin-left: 10px"
              >
            </div>
          </template>

          <!--  Company Name Column-->
          <template #head(companyName)>
            {{ $t("companies.company_name") }}
          </template>

          <template #cell(companyName)="data">
            <div class="d-flex align-items-center">
              <div
                v-if="data.item.companyName.indexOf(' ') > 0"
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
                  >{{ data.item.companyName.substr(0, 1)
                  }}{{
                    data.item.companyName
                      .substr(data.item.companyName.indexOf(" ") + 1, 1)
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
                  >{{ data.item.companyName.substr(0, 1)
                  }}{{ data.item.companyName.substr(1, 1).toUpperCase() }}</span
                >
              </div>
              <b-link
                style="min-width: max-content"
                class="font-weight-bold"
                :to="{ name: 'CompanyView', params: { id: data.item.id } }"
                >{{ data.item.companyName }}
              </b-link>
            </div>
            <!-- <div>{{data.item.companyName}}</div> -->
          </template>

          <!-- Company Email Column -->
          <template #head(companyMail)>
            {{ $t("companies.email") }}
          </template>

          <template #cell(companyMail)="data">
            <div>{{ data.item.companyMail }}</div>
          </template>

          <!-- Company Status Column -->
          <template #head(status)>
            {{ $t("companies.status") }}
          </template>

          <template #cell(status)="data">
            <div>{{ $t('companies.'+data.item.status) }}</div>
          </template>

          <!-- Company OwnerFirstName Column -->
          <template #head(companyOwnerFirstName)>
            {{ $t("companies.owner_first_name") }}
          </template>

          <template #cell(companyOwnerFirstName)="data">
            <div>{{ data.item.companyOwnerApi.companyOwnerName }}</div>
          </template>

          <!-- Company companyIdentificationNumber Column -->
          <template #head(companyIdentificationNumber)>
            {{ $t("companies.company_id") }}
          </template>

          <template #cell(companyIdentificationNumber)="data">
            <b-link
              class="font-weight-bold"
              :to="{ name: 'CompanyView', params: { id: data.item.id } }"
              >{{ data.item.companyIdentificationNumber }}
            </b-link>

            <!-- <div>{{data.item.companyIdentificationNumber}}</div> -->
          </template>

          <!-- CActions Column -->
          <template #head(action)>
            {{ $t("companies.actions") }}
          </template>

          <template #cell(action)="data" style="text-align: center !important">
            <div class="d-flex">
              <feather-icon
                :id="`invoice-row-${data.item.id}-preview-icon`"
                icon="EyeIcon"
                size="16"
                class="mr-1 cursor-pointer"
                @click="
                  $router.push({
                    name: 'CompanyView',
                    params: { id: data.item.id },
                  })
                "
              />
              <b-tooltip
                title="View Company"
                class="cursor-pointer"
                :target="`invoice-row-${data.item.id}-preview-icon`"
              />

              <feather-icon
                :id="`edit-${data.item.id}-preview-icon`"
                icon="EditIcon"
                size="16"
                class="mx-0"
                style="cursor: pointer"
                @click="
                  $router.push({
                    name: 'EditCompany',
                    params: { id: data.item.id },
                  })
                "
              />
              <b-tooltip
                title="Edit Company"
                :target="`edit-${data.item.id}-preview-icon`"
              />

              <feather-icon
                :id="`delete-${data.item.id}-preview-icon`"
                icon="TrashIcon"
                size="16"
                class="ml-1"
                style="cursor: pointer"
                @click="getCompanyIDtoDelete(data.item.id)"
              />
              <b-tooltip
                title="Delete Company"
                :target="`delete-${data.item.id}-preview-icon`"
              />
            </div>
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
                v-if="items.length > 0"
                v-model="currentPage"
                :total-rows="totalRecords"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                prev-text
                @input="getNewRecord"
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

        <!-- delete Confirmation Modal -->
        <b-modal
          v-model="deleteModalShow"
          :title="$t('companies.delete_company')"
          :ok-title="$t('companies.confirm')"
          :cancel-title="$t('clients_or_recipients.cancel')"
          @ok="deleteCompany(companyToDelete)"
        >
          <b-card-text class="text-center" style="font-size: 15px">
           {{ $t('companies.delete_confirmation') }} 
          </b-card-text>
        </b-modal>
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="BookOpenIcon" />
          <span style="font-size: 13px"
            >{{ $t("companies.unfinished_vat_reports") }}</span
          >
        </template>
        <crm-active-project />
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import Swal from "sweetalert2";
import CrmActiveProject from "./crm/unfinishedVatReports.vue";
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
    CrmActiveProject,
  },

  data() {
    return {
      companyToDelete: "",
      deleteModalShow: false,
      direction: "asc",
      sortField: "companyName",
      sortBy: "companyName",
      sortDesc: false,
      fields: [
        // A virtual column that doesn't exist in items
        "Country",
        // A column that needs custom formatting
        {
          key: "companyName",
          label: "Company Name",
          sortable: true,
        },
        {
          key: "companyMail",
          label: "Email",
          sortable: true,
        },
        {
          key: "status",
          sortable: true,
        },
        // A regular column
        {
          key: "companyOwnerFirstName",
          label: "Owner Name",
          sortable: true,
        },
        // A regular column
        {
          key: "companyIdentificationNumber",
          label: "Company ID",
          sortable: true,
        },
        // A virtual column made up from two fields
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
      companyTab: 0,
    };
  },
  created() {
    console.log();
    this.getAllCompanies();
  },
  methods: {
    //
    getCompanyIDtoDelete(val) {
      this.deleteModalShow = !this.deleteModalShow;
      this.companyToDelete = val;
    },
    //
    checkStatus(ctx) {
      if (ctx.sortDesc === false) {
        this.direction = "asc";
      } else {
        this.direction = "desc";
      }
      this.sortField = ctx.sortBy;
      this.getAllCompanies();
    },

    // getting the list of all companies
    async searchCompanies() {
      const data = await axios.get(
        `/account/api/company/search/${this.currentPage}/${this.perPage}?direction=${this.direction}&queryString=${this.searchQuery}&sortField=${this.sortField}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      );

      if (data.data.elements != "") {
        this.items = data.data.elements;
        this.totalRecords = data.data.totalElements;
        this.totalPages = Math.ceil(this.totalRecords / this.perPage);
        // console.log(this.totalPages);
      } else {
        this.items = [];
        this.totalRecords = "";
        this.totalPages = "";
      }
    },

    //deleting a company
    deleteCompany(companyID) {
      const token = useJwt.getToken();
      useJwt
        .DeleteCompany(token, companyID)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Company Deleted Successfully",
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          this.getAllCompanies();
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Something Went Wrong`,
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          });
        });
    },

    // getting the list of all companies
    async getAllCompanies() {
      axios.get(
        `/account/api/company/list/${this.currentPage}/${this.perPage}?direction=${this.direction}&sortField=${this.sortField}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      )
      .then((response) => {
        this.items = response.data.elements;
        this.totalRecords = response.data.totalElements;
        this.totalPages = Math.ceil(this.totalRecords / this.perPage);
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Error fetching companies",
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          });
        });
 
    },

    //
    async getNewRecord(cP) {
      // alert(cP);
      const data = await axios.get(
        `/account/api/company/list/${cP}/${this.perPage}?direction=desc&sortField=id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      );

      if (data.data.elements != "") {
        this.items = data.data.elements;
      }
    },
  },
};
</script>
<style lang="scss">
/*  */
.input-group {
  box-shadow: none !important;
}

@media (min-width: 576px) {
  .modal-dialog {
    margin: 15rem auto auto auto !important;
  }
}
</style>>
