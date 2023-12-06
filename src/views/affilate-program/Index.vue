<template>
  <div>
    <div class="mb-5">
      <h3 class="mb-1">
        {{ $t("affiliate_program.title_referral_url") }}
      </h3>
      <div class="row">
        <div class="input-group col-6 abc affiliate-link">
          <input
            v-model="affiliateLink"
            type="text"
            class="search-product form-control"
            style="height: 38px"
            disabled
          >
          <div class="input-group-append">
            <div
              id="affiliate-link-copy"
              class="input-group-text"
              style="height: 38px; cursor: pointer"
              @click="copyAffiliateLink"
            >
              <CopyToClipboard
                :text="affiliateLink"
                @copy="copyAffiliateLink"
              >
                <feather-icon
                  icon="CopyIcon"
                  size="14"
                />
              </CopyToClipboard>
            </div>
            <b-tooltip target="affiliate-link-copy">{{
              copyToClipboard
            }}</b-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="mb-1">
        {{ $t("affiliate_program.title_reffered_friends") }}
      </h2>
      <b-card>
        <b-table
          :fields="fields"
          :items="items"
          responsive
          class="mb-0"
          show-empty
          :empty-text="$t(`affiliate_program.no_record`)"
          empty-filtered-text
        >
          <template>
            <div class="d-flex align-items-center justify-content-center">
              <div class="mb-1 start-chat-icon">
                <feather-icon
                  icon="FolderIcon"
                  size="40"
                />
              </div>
              <h5 class="sidebar-toggle start-chat-text">
                {{ $t("affiliate_program.no_record") }}
              </h5>
            </div>
          </template>

          <!-- User Column -->
          <template #head(user)>
            {{ $t("affiliate_program.user") }}
          </template>

          <template #cell(user)="data">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div
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
                  <span>{{ data.item.user.firstName.substr(0, 1).toUpperCase()
                  }}{{ data.item.user.lastName.substr(0, 1).toUpperCase() }}</span>
                </div>
              </div>
              <div>
                <h5 style="color: #0a64bc">
                  {{ data.item.user.firstName }} {{ data.item.user.lastName }}
                </h5>
                <p style="margin-bottom: 0px">
                  {{ data.item.user.email }}</p>
              </div>
            </div>
          </template>

          <!-- User Column -->
          <template #head(subscribedToDate)>
            {{ $t("affiliate_program.subscribed_to_date") }}
          </template>

          <!-- Active Column -->
          <template #head(active)>
            {{ $t("affiliate_program.Paid_for_current_month") }}
          </template>

          <template #cell(active)="data">
            <div>
              <b-badge
                pill
                :variant="`${
                  data.item.active ? 'light-success' : 'light-warning'
                }`"
                class="text-capitalize"
              >
                {{ data.item.active ? $t("affiliate_program.paid") : $t("affiliate_program.unpaid") }}
              </b-badge>
            </div>
          </template>
        </b-table>
        <b-row class="text-center mb-2">
          <b-col cols="12">
            <b-spinner
              v-if="loadMore"
              large
              variant="primary"
            />
            <div
              v-else
              style="height: 35px"
            />
            <div ref="loadMoreObserver" />
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>
<script>
import {
  BTable, BTooltip, BCard, BBadge, BSpinner, BRow, BCol,
} from "bootstrap-vue";

import axios from "@/libs/axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import CopyToClipboard from "vue-copy-to-clipboard";

export default {
  components: {
    BCard,
    BTable,
    BTooltip,
    BBadge,
    BSpinner,
    BRow,
    BCol,
    CopyToClipboard,
  },

  data() {
    return {
      copyToClipboard: "Copy to clipboard",
      direction: "asc",
      sortField: "firstName",
      sortBy: "firstName",
      sortDesc: false,
      fields: [
        {
          key: "user",
          label: "Refferal Info",
          sortable: true,
        },
        {
          key: "subscribedToDate",
          label: "Subscribed To Date",
          sortable: true,
        },
        {
          key: "active",
          label: "Payment Status",
          sortable: true,
        },
      ],
      items: [],
      affiliateLink: "",
      loadMore: false,
      currentPage: 0,
    };
  },
  created() {
    this.getAffiliateLink();
  },
  mounted() {
    this.observeScroll();
  },
  methods: {
    //
    async getAffiliateLink() {
      try {
        const data = await axios.get(
          `/account/api/affiliate/get-my-affiliate-url`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "http://localhost:8080",
            },
          }
        );

        if (data && data.data && data.data.affiliateUrl) {
          this.affiliateLink = data.data.affiliateUrl;
        } else {
          this.affiliateLink = "";
        }
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Affiliate Link Fetched Error",
            icon: "DeleteIcon",
            variant: "danger",
          },
        });
      }
    },
    // getting the list of all affiliates
    async getAllAffiliates() {
      axios
        .get(`/account/api/affiliate/get-user-affiliates/${this.currentPage}/10`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        })
        .then(response => {
          if (response && response.data && response.data.elements) {
            const affilates = response.data.elements.map(affilate => ({
              user: {
                email: affilate.email,
                firstName: affilate.firstName,
                lastName: affilate.lastName,
              },
              ...affilate,
            }));

            if (this.items.length) {
              this.items.push(...affilates);
            } else {
              this.items = affilates;
            }
          } else {
            this.items = [];
          }

          this.loadMore = false;
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Error fetching affiliates",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },
    // Scroll to bottom to fetch affiliates
    observeScroll() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(async entries => {
        this.loadMore = true;
        if (entries[0].isIntersecting) {
          this.currentPage += 1;
          this.getAllAffiliates();
        }
      }, options);
      observer.observe(this.$refs.loadMoreObserver);
    },
    // Show toast when copy affiliate link clicked
    copyAffiliateLink() {
      this.$root.$emit("bv::hide::tooltip");
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Affiliate Link Copy",
          icon: "DeleteIcon",
          variant: "success",
        },
      });
    },
  },
};
</script>
<style lang="scss">
/*  */
.input-group {
  box-shadow: none !important;
}
.affiliate-link {
  input.form-control:disabled {
    text-align: left;
    background-color: #fff;
  }
}
</style>
