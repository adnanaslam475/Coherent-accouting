<template>
  <div>
    <b-row>
      <b-col cols="12" md="3">
        <b-card style="max-width: 20rem" class="mb-2">
          <div class="custome-card">
            <div style="color: green">
              <feather-icon icon="CheckCircleIcon" stroke="green" />
              CoherentAccounting
            </div>
            <div style="margin-top: 4px; margin-bottom: 4px">for</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 64 64"
              >
                <path
                  fill="#82d8bb"
                  d="M32 4A28 28 0 1 0 32 60A28 28 0 1 0 32 4Z"
                ></path>
                <path
                  fill="#72caaf"
                  d="M32 9A23 23 0 1 0 32 55A23 23 0 1 0 32 9Z"
                ></path>
                <path
                  fill="#fff"
                  d="M22 21c-6.065 0-11 4.935-11 11s4.935 11 11 11v-4c-3.86 0-7-3.14-7-7s3.14-7 7-7h4v22c0 2.209 1.791 4 4 4V21H22zM42 43c6.065 0 11-4.935 11-11s-4.935-11-11-11v4c3.86 0 7 3.14 7 7s-3.14 7-7 7h-4V17c0-2.209-1.791-4-4-4v30H42z"
                ></path>
                <path
                  fill="none"
                  stroke="#8d6c9f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M22 21c-6.065 0-11 4.935-11 11s4.935 11 11 11v-4c-3.86 0-7-3.14-7-7s3.14-7 7-7h4v22c0 2.209 1.791 4 4 4V21H22zM42 43c6.065 0 11-4.935 11-11s-4.935-11-11-11v4c3.86 0 7 3.14 7 7s-3.14 7-7 7h-4V17c0-2.209-1.791-4-4-4v30H42z"
                ></path>
                <path
                  fill="none"
                  stroke="#8d6c9f"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M32 4A28 28 0 1 0 32 60 28 28 0 1 0 32 4zM29 9.201c-.677.088-1.343.209-2 .355M23 10.879c-4.066 1.735-7.534 4.592-10 8.197M34.098 52.919L34.202 54.916M39.096 51.79L39.681 53.703M43.673 49.485L44.703 51.2M47.556 46.142L48.971 47.556"
                ></path>
              </svg>
            </div>
            <div
              style="margin-top: 4px; margin-bottom: 4px; white-space: nowrap"
              class=""
            >
              Coherent Accounting for QuickBooks
            </div>
            <b-button
              :variant="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform == 'QUICK_BOOKS'
                  ? 'outline-success'
                  : 'outline-secondary'
              "
              class="mt-1"
              @click="showConnectionModal('qbo')"
              v-if="!companyInfo.connectedToQBO"
              :disabled="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform !== 'QUICK_BOOKS'
              "
              >Connect</b-button
            >
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

      <b-col cols="12" md="3">
        <b-card style="max-width: 20rem" class="mb-2">
          <div class="custome-card">
            <div style="color: green">
              <feather-icon icon="CheckCircleIcon" stroke="green" />
              CoherentAccounting
            </div>
            <div style="margin-top: 4px; margin-bottom: 4px">for</div>
            <div>
              <img src="@/assets/images/icons/xero-icon.png" alt="" />
            </div>
            <div class="m-0" style="margin-top: 4px; margin-bottom: 4px">
              Coherent Accounting for Xero
            </div>
            <div
              :variant="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform == 'XERO'
                  ? 'outline-success'
                  : 'outline-secondary'
              "
              class="mt-1 cursor-pointer d-flex flex-column align-items-center"
              @click="showConnectionModal('xero')"
              v-if="!companyInfo.connectedToXero"
              :disabled="
                companyInfo.exportProperties &&
                companyInfo.exportProperties.platform !== 'XERO'
              "
            >
              <p class="text-center m-0">
                Connected to {{ companyInfo.tenantName }}
              </p>
              <b-img
                :src="xeroConnectImg"
                style="width: 90%; height: 70px"
                alt="logo"
              />
              <!-- Connect -->
            </div>
            <div
              variant="outline-primary"
              class="mt-1 cursor-pointer"
              v-else
              @click="disconnectSoftware('xero')"
            >
              <b-img
                :src="xeroDisconnectImg"
                style="width: 90%; height: 70px"
                alt="logo"
              />
              <!-- Disconnect -->
            </div>
          </div>
        </b-card>
      </b-col>
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

        <b-tabs pills card vertical class="connect-xero-tabs">
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
        </b-tabs>
        <!-- <b-tabs content-class="mt-1" class="modal-tabs" align="center">
          <b-tab title="How to connect" active>
            <ol>
              <li class="my-1">
                Click the <b>Connect software</b> button - you'll be redirected
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
        </b-tabs> -->
      </div>
      <div class="mt-1" style="float: right">
        <b-button @click="isConnection = false" variant="outline"
          >Cancel</b-button
        >
        <b-button
          @click="connectToQuickBooks(type)"
          :disabled="isConnecting"
          variant="success"
          >Connect software</b-button
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
      type: "",
      companyInfo: {},
    };
  },
  created() {
    this.xeroConnectImg = require("@/assets/images/connectXero.jpeg");
    this.xeroDisconnectImg = require("@/assets/images/disConnectXero.jpeg");
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
              "Access-Control-Allow-Origin": "http://localhost:8080",
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
      console.log("type", type);
      axios
        .get(
          `/account/api/${
            type == "qbo" ? "callback/disconnect" : "callback/disconnect/xero"
          }/${this.companyID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "http://localhost:8080",
            },
          }
        )
        .then((response) => {
          console.log("first", response.data);
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
      axios
        .get(`/account/api/company/${this.companyID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        })
        .then((response) => {
          this.companyInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
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
.connect-xero-tabs a {
  border-radius: 10px !important;
  border: 1px solid red;
}
</style>
