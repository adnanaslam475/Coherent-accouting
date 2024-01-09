<template>
  <div>
    <b-row>
      <b-col cols="12" md="3">
        <b-card style="max-width: 20rem; min-height: 230px" class="mb-2">
          <div class="custome-card">
            <div style="color: green">
              <feather-icon icon="CheckCircleIcon" stroke="green" />
              CoherentAccounting
            </div>
            <div style="margin-top: 4px; margin-bottom: 4px">for</div>
            <div>
              <img
                src="@/assets/images/icons/quickbooks.png"
                style="margin-top: 15px"
                alt=""
                width="100"
              />
            </div>
            <div
              style="margin-top: 4px; margin-bottom: 4px; white-space: nowrap"
              class=""
            >
              <!-- Coherent Accounting for QuickBooks -->
              <p
                style="margin-top: 5px !important"
                class="text-center m-0 font-weight-bold"
              >
                <!-- companyInfo.connectedToQBO -->
                {{
                  companyInfo.connectedToQBO
                    ? $t("companies.con_to") +
                      (companyInfo.tenantName ? companyInfo.tenantName : "")
                    : $t("companies.pleasepress")
                }}
              </p>
            </div>

            <button
              :class="{
                'mt-1': true,
              }"
              :variant="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform == 'QUICK_BOOKS'
                  ? 'primary'
                  : 'primary'
              "
              :disabled="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform !== 'QUICK_BOOKS'
              "
              @click="showConnectionModal('qbo')"
              v-if="!companyInfo.connectedToQBO"
            >
            <img src="@/assets/images/logo/C2QB_green_btn_short_hover.svg" />
            </button>
            <b-button
              variant="outline-primary"
              class="mt-1"
              v-else
              @click="disconnectSoftware('qbo')"
              >Disconnect</b-button
            >
          </div>
        </b-card>
      </b-col>

      <!-- <b-col cols="12" md="3">
        <b-card
          style="max-width: 20rem; min-height: 230px"
          @mouseenter="isFetching ? null : getCompany()"
          :class="{ 'mb-2': true }"
        >
          <div class="custome-card">
            <div style="color: green">
              <feather-icon icon="CheckCircleIcon" stroke="green" />
              CoherentAccounting
            </div>
            <div style="margin-top: 4px; margin-bottom: 4px">for</div>
            <div>
              <img src="@/assets/images/icons/xero-icon.png" alt="" />
            </div>

            <p
              style="margin-top: 5px !important"
              class="text-center m-0 font-weight-bold"
            >
              {{
                companyInfo.connectedToXero
                  ? $t("companies.con_to") +
                    (companyInfo.tenantName ? companyInfo.tenantName : "")
                  : $t("companies.pleasepress")
              }}
            </p>

            <b-button
              :variant="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform == 'XERO'
                  ? 'outline-success'
                  : 'outline-secondary'
              "
              :class="{
                'mt-1': true,
              }"
              :disabled="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform !== 'XERO'
              "
              @click="showConnectionModal('xero')"
              v-if="!companyInfo.connectedToXero"
            >
              Connect
            </b-button>
            <b-button
              variant="outline-primary"
              class="mt-1"
              v-else
              @click="disconnectSoftware('xero')"
            >
              Disconnect
            </b-button>
          </div>
        </b-card>
      </b-col> -->
    </b-row>

    <b-modal
      v-model="isConnection"
      :hide-backdrop="false"
      :hide-footer="true"
      :scrollable="false"
      :no-close-on-backdrop="true"
    >
      <div>
        <div style="color: blue" class="text-center">
          Connect your Coherent Accounting OCR Solution with
          {{ type == "qbo" ? "QuickBook" : "Xero" }} Online account.
        </div>
        <div class="d-flex flex-column align-items-center mt-2 mb-2">
          <img :src="getPath(type)" alt="Toast image" />
        </div>

        <!-- <b-tabs pills card vertical class="connect-xero-tabs">
          <b-tab title="1" active
            ><b-card-text>
              Click the <b>Connect software</b> button - you'll be redirected
              from Coherent Accounting to
              {{ type == "qbo" ? "QuickBook" : "Xero" }} Online and promoted to
              log in.
            </b-card-text></b-tab
          >
          <b-tab title="2"
            ><b-card-text>
              Select matching company in Coherent Accounting and correponding in
              {{ type == "qbo" ? "QuickBook" : "Xero" }}
            </b-card-text></b-tab
          >
          <b-tab title="3"
            ><b-card-text>Click on the 'Authorize' button</b-card-text></b-tab
          >
        </b-tabs> -->
        <b-tabs content-class="mt-1" class="modal-tabs" align="center">
          <b-tab title="How to connect" active>
            <ol>
              <li class="my-1">
                Click the <b>Connect to QuickBooks</b> button - you'll be redirected
                from Coherent Accounting to
                {{ type == "qbo" ? "QuickBook" : "Xero" }} Online and promoted
                to log in.
              </li>
              <li class="my-1">
                Select matching company in Coherent Accounting and correponding
                in {{ type == "qbo" ? "QuickBook" : "Xero" }}
              </li>
              <li class="my-1">Click on the 'Authorize' button</li>
            </ol>
          </b-tab>
          <b-tab title="How data is used" active>
            <ol>
              <li class="my-1">
                We access only data which you gave us with permissions.
              </li>
              <li class="my-1">
                We keep your data as it is and never change it.
              </li>
              <li class="my-1">You can disconnect any time.</li>
            </ol>
          </b-tab>
        </b-tabs>
      </div>
      <div style="float: right">
        <b-button @click="isConnection = false" variant="outline"
          >Cancel</b-button
        >
        <button
          @click="connectToQuickBooks(type)"
          :disabled="isConnecting"
          variant="success"
          > <img src="@/assets/images/logo/C2QB_green_btn_short_hover.svg" /></button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BTabs,
  BTab,
  BCardText,
  BCol,
  BCard,
  BButton,
  BRow,
  BModal,
  BImg,
} from "bootstrap-vue";
import axios from "@/libs/axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BCol,
    BRow,
    BTabs,
    BTab,
    BButton,
    BCardText,
    BCard,
    BImg,
    BModal,
  },
  data() {
    return {
      isConnection: false,
      isConnecting: false,
      v: "",
      companyID: "",
      xeroConnectImg: "",
      xeroDisconnectImg: "",
      quickBookConnectImg: "",
      type: "",
      companyInfo: {},
      forXero: false,
      forQB: false,
      isFetching: false,
    };
  },
  created() {
    this.xeroConnectImg = require("@/assets/images/illustration/connectXero.svg");
    this.xeroDisconnectImg = require("@/assets/images/illustration/disconnectXero.svg");
    this.quickBookConnectImg = require("@/assets/images/illustration/quickBookConnectImg.svg");
    this.quickBookDisconnectImg = require("@/assets/images/illustration/quickBookConnectImg.svg");
    this.companyID = this.$route.params.id;
  },

  mounted() {
    this.getCompany();
    const bc = new BroadcastChannel("test_channel");
    bc.postMessage("This is a test message.");
  },

  methods: {
    // this function will coneect to quickbok
    showConnectionModal(type) {
      this.type = type;
      this.isConnection = true;
    },
    getPath(type) {
      return type == "qbo"
        ? require("@/assets/images/logo/connecttoqb.jpeg")
        : require("@/assets/images/logo/connecttoxero.jpeg");
    },

    async connectToQuickBooks(type) {
      this.isConnecting = true;
      axios
        .get(
          `/account/api/${
            type == "qbo" ? "qbo/connectToQuickbooks" : "xero/connectToXero"
          }/${this.companyID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "https://coherent-accounting.com",
            },
          }
        )
        .then((response) => {
          window.open(
            response.data.redirectUrl,
            "_blank",
            "width=600,height=400"
          );
          if (response.status == 200) {
            this.isConnection = false;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isConnecting = false;
        });
    },
    disconnectSoftware(type) {
      axios
        .get(
          `/account/api/${
            type == "qbo" ? "callback/disconnect" : "callback/disconnect/xero"
          }/${this.companyID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "https://coherent-accounting.com",
            },
          }
        )
        .then((response) => {
          type == "qbo"
            ? (this.companyInfo.connectedToQBO = false)
            : (this.companyInfo.connectedToXero = false);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${
                type == "qbo" ? "Quickbook" : "Xero"
              } disconnect successfully`,
              icon: "AlertTriangleIcon",
              variant: "success",
            },
          });
        })
        .catch((error) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: error.response?.errorMessage || "Error in disconnect",
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },

    async getCompany() {
      this.isFetching = true;
      axios
        .get(`/account/api/company/${this.companyID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "https://coherent-accounting.com",
          },
        })
        .then(({ data }) => {
          this.companyInfo = data;
          this.forXero =
            data.exportProperties && data.exportProperties.platform !== "XERO";
          this.forQB =
            data.exportProperties &&
            data.exportProperties.platform !== "QUICK_BOOKS";
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
  },
};
</script>

<style scoped>
.custome-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-tabs {
  border: 1px solid;
  border-radius: 3px;
}

ol {
  list-style: none;
  counter-reset: item;
}

li {
  counter-increment: item;
  margin-bottom: 5px;
}

li:before {
  content: counter(item);
  background: blue;
  border-radius: 100%;
  color: white;
  width: 1.5em;
  text-align: center;
  display: inline-block;
}
.status-check {
  cursor: unset;
  opacity: 0.5;
}
</style>
