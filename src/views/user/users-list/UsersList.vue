<template>
  <div>
    <user-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>{{ $t('clients_or_recipients.show') }}</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>{{ $t('clients_or_recipients.entries') }}</label>

            <b-button
                class="ml-1"
                variant="primary"
                @click="isAddNewUserSidebarActive = true"
              >
                <span class="text-nowrap">{{  $t('clients_or_recipients.add_user') }}</span>
              </b-button>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                :placeholder="$t('company_invoices.search')"
              />
              
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative privatePersonList"
        :items="fetchUsers"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <template #empty="scope">
          <div class="d-flex align-items-center justify-content-center">
            <div class="mb-1 start-chat-icon">
              <feather-icon icon="FolderIcon" size="20" />
            </div>
            <h5 class="sidebar-toggle start-chat-text">No records found</h5>
          </div>
        </template>

        <!-- Column: Id -->
        <template #cell(id)="data">
          <span class="font-weight-bold d-block text-nowrap">
            #{{ data.value }}
          </span>
        </template>

        <!-- Column: User -->
        <template #head(firstMiddleAndLastName)>
          {{  $t('clients_or_recipients.user') }}
        </template>
        <template #cell(firstMiddleAndLastName)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                variant="primary"
                :src="data.item.avatar"
                :text="avatarText(data.item.firstMiddleAndLastName)"
              />
            </template>
            <b-link 
              :to="{
                  name: 'apps-users-edit',
                  params: { id: data.item.id },
                }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.firstMiddleAndLastName }}
            </b-link>
            <CopyToClipboard :text="data.item.firstMiddleAndLastName"  @copy="textCopyToClipboard('Username')">
              <b-badge :id="`username-${data.item.id}`" pill :variant="`light-success`" class="text-capitalize">
                <small>{{ data.item.firstMiddleAndLastName }}</small>
              </b-badge>
              <b-tooltip :target="`username-${data.item.id}`">Copy to clipboard</b-tooltip>
            </CopyToClipboard>
          </b-media>
        </template>

         <!-- Identification Number -->
         <template #head(identificationNumber)>
          {{  $t('clients_or_recipients.identification_no') }}
        </template>
        <template #cell(identificationNumber)="data">
          <CopyToClipboard :text="data.value"  @copy="textCopyToClipboard('User ID')">
            <b-badge variant="primary" class="text-capitalize" id="user-idd" style="cursor: pointer">
              <span class="text-nowrap text-capitalize">{{ data.value }}</span>
            </b-badge>
            </CopyToClipboard
          >
          <b-tooltip target="user-idd">Copy to clipboard</b-tooltip>
        </template>

        <!-- Vat Identification number -->
        <template #head(vatIdentificationNumber)>
          {{  $t('clients_or_recipients.vat_id') }}
        </template>
        <template #cell(vatIdentificationNumber)="data">
          <CopyToClipboard :text="data.value" @copy="textCopyToClipboard('VAT ID')">
            <span class="text-nowrap text-capitalize" id="vat-idd" style="cursor: pointer">{{ data.value }}</span>
          </CopyToClipboard>
          <b-tooltip target="vat-idd">Copy to clipboard</b-tooltip>
        </template>

        <!-- Address -->
        <template #head(address)>
          {{  $t('company_info.address') }}
        </template>
        <template #cell(address)="data">
          <CopyToClipboard :text="data.value" @copy="textCopyToClipboard('Address')">
            <span class="text-nowrap text-capitalize" id="user-address" style="cursor: pointer">{{ data.value }}</span>
          </CopyToClipboard>
          <b-tooltip target="user-address">Copy to clipboard</b-tooltip>
        </template>

        <!-- ID Card -->
        <template #head(idcardNumber)>
          {{  $t('clients_or_recipients.id_card') }}
        </template>
        <template #cell(idcardNumber)="data">
          <CopyToClipboard :text="data.value" @copy="textCopyToClipboard('ID Card No.')">
            <span class="text-nowrap text-capitalize" id="user-id-cardd" style="cursor: pointer">{{ data.value }}</span>
          </CopyToClipboard>
          <b-tooltip target="user-id-cardd">Copy to clipboard</b-tooltip>
        </template>

        <!-- Column: Actions -->
        <template #head(actions)>
          {{  $t('companies.actions') }}
        </template>
        <template #cell(actions)="data">
          <div class="d-flex">

            <feather-icon
              :id="`edit-${data.item.id}-preview-icon`"
              icon="EditIcon"
              size="16"
              class="mx-0"
              style="cursor: pointer"
              @click="
                $router.push({
                  name: 'apps-users-edit',
                  params: { id: data.item.id },
                })
              "
            />
            <b-tooltip
              title="Edit Details"
              :target="`edit-${data.item.id}-preview-icon`"
            />

            <feather-icon
              :id="`delete-${data.item.id}-preview-icon`"
              icon="TrashIcon"
              size="16"
              class="ml-1"
              style="cursor: pointer"
              @click="showMsgBoxTwo(data.item.id, refetchData)"
            />
            <b-tooltip
              title="Delete"
              :target="`delete-${data.item.id}-preview-icon`"
            />
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
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
            <span class="text-muted"
              >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span
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
              :total-rows="totalUsers"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
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
    </b-card>
  </div>
</template>

<script>
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import UsersListFilters from "./UsersListFilters.vue";
import useUsersList from "./useUsersList";
import userStoreModule from "../userStoreModule";
import UserListAddNew from "./UserListAddNew.vue";
import CopyToClipboard from "vue-copy-to-clipboard";
import  {i18n} from '@/main.js'

export default {
  components: {
    UsersListFilters,
    UserListAddNew,
    BTooltip,
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
    vSelect,
    CopyToClipboard,
  },
  methods: {
    // 
    textCopyToClipboard(val) {
      this.$root.$emit("bv::hide::tooltip");
      this.$toast({
        component: ToastificationContent,
        props: {
          title: val + " copied",
          icon: "DeleteIcon",
          variant: "success",
        },
      });

    },
    //
    showMsgBoxTwo(id,refetchData) {
      const h = this.$createElement
        // Using HTML string
        // More complex structure
      const messageVNode = h('div', { class: ['bvModalFont'] }, [
        h('p', { class: ['text-center card-text'] }, [
        i18n.tc('clients_or_recipients.delete_client_confirm'),
        ]) 
      ])
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: i18n.tc('clients_or_recipients.delete_client'),
          okVariant: 'primary',
          okTitle: i18n.tc('companies.confirm'),
          cancelTitle: i18n.tc('clients_or_recipients.cancel'),
          hideHeaderClose: false,
          centered: true,
        })
        .then(value => {
          if(value){
            this.UserDelete(id, refetchData)
          }
        })
    },
    UserDelete(id, refetchData) {
      const token = useJwt.getToken();
      useJwt
        .DeleteUser(token, id)
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Client Deleted Successfully",
              icon: "DeleteIcon",
              variant: "success",
            },
          });
          refetchData();
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.response.data.errorMessage}`,
              icon: "DeleteIcon",
              variant: "error",
            },
          });
        });
    },
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = "app-user";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const isAddNewUserSidebarActive = ref(false);

    const roleOptions = [
      { label: "Admin", value: "admin" },
      { label: "Author", value: "author" },
      { label: "Editor", value: "editor" },
      { label: "Maintainer", value: "maintainer" },
      { label: "Subscriber", value: "subscriber" },
    ];

    const planOptions = [
      { label: "Basic", value: "basic" },
      { label: "Company", value: "company" },
      { label: "Enterprise", value: "enterprise" },
      { label: "Team", value: "team" },
    ];

    const statusOptions = [
      { label: "Pending", value: "pending" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ];

    const {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList();

    return {
      // Sidebar
      isAddNewUserSidebarActive,

      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      roleOptions,
      planOptions,
      statusOptions,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.privatePersonList th {
  position: relative;
  vertical-align: middle !important;
}
span.b-avatar-text span {
  color: #ffc0cb !important;
}
</style>
