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
            <div style="margin-top: 4px; margin-bottom: 4px">
              Coherent Accounting for <br />
              QuickBooks Online
            </div>
            <b-button
              variant="outline-success"
              class="mt-1"
              @click="showConnectionModal('qbo')"
              v-if="!companyInfo.connectedToQBO"
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
        <b-card style="max-width: 20rem; height: 233px" class="mb-2">
          <div class="custome-card">
            <div style="color: green">
              <feather-icon icon="CheckCircleIcon" stroke="green" />
              CoherentAccounting
            </div>
            <div style="margin-top: 4px; margin-bottom: 4px">for</div>
            <div>
              <img src="@/assets/images/icons/xero-icon.png" alt="" />
            </div>
            <div style="margin-top: 4px; margin-bottom: 4px">
              Coherent Accounting for Xero
            </div>
            <b-button
              variant="outline-success"
              class="mt-1"
              @click="showConnectionModal('xero')"
              v-if="!companyInfo.connectedToXero"
              >Connect</b-button
            >
            <b-button
              variant="outline-primary"
              class="mt-1"
              v-else
              @click="disconnectSoftware('xero')"
              >Disconnect</b-button
            >
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
        <div style="color: orangered">
          Connect your Dext Prepare account with your CoherentAccounting for
          {{ type == "qbo" ? "QuickBook" : "Xero" }} Online account.
        </div>
        <div style="height: 150px">
          <!-- <img src="" alt=""> -->
          Here will be Image
        </div>
        <div>
          <b> On average it takes 10 seconds to connect. </b>
        </div>
        <b-tabs content-class="mt-1" class="modal-tabs" align="center">
          <b-tab title="How to connect" active>
            <ol>
              <li class="my-1">
                Click the <b>connect software</b> button - you'll be redirected
                to CoherentAccounting for
                {{ type == "qbo" ? "QuickBook" : "Xero" }} Online and promoted
                to log in.
              </li>
              <li class="my-1">Select company account (if applicable)</li>
              <li class="my-1">
                Select Dimension 1 and Dimension 2 (if applicable)
              </li>
              <li class="my-1">Click on the 'Authorize' button</li>
            </ol>
          </b-tab>
          <b-tab title="How your data is used">
            <ol>
              <li>
                Click the <b>connect software</b> button - you'll be redirected
                to CoherentAccounting for QuickBooks Online and promoted to log
                in.
              </li>
              <li>Select client account (if applicable)</li>
              <li>Select Dimension 1 and Dimension 2 (if applicable)</li>
              <li>Click on the 'Authorize' button</li>
            </ol>
          </b-tab>
        </b-tabs>
      </div>
      <div class="mt-1" style="float: right">
        <b-button @click="isConnection = false" variant="outline"
          >Cancel</b-button
        >
        <b-button @click="connectToQuickBooks(type)" variant="success"
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
} from "bootstrap-vue";
import axios from "@/libs/axios";
export default {
  components: {
    BCol,
    BRow,
    BTabs,
    BTab,
    BButton,
    BCardText,
    BCard,
    BModal,
  },
  data() {
    return {
      isConnection: false,
      companyID: "",
      type: "",
      companyInfo: {},
    };
  },
  created() {
    this.companyID = this.$route.params.id;
  },
  mounted() {
    this.getCompany();
  },
  updated() {
    // Wincheck = window.open(
    //   "https://coherent-accounting.com/account/api/callback/oauth2redirect?code=AB11699029227lYztWdR68ds01Hzf2sbFEM3YNuBOePqjbvlPu&state=68083c15-8311-49b1-91dd-d13b06766552&realmId=4620816365341301640"
    // );
    // if (Wincheck.closed) {
    //   alert("It's closed!");
    // } else alert("It's still open!");
  },
  methods: {
    // this function will coneect to quickbok
    showConnectionModal(type) {
      this.type = type;
      this.isConnection = true;
    },
    async connectToQuickBooks(type) {
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
        //   window.opener.location.reload();

          const a = window.open(
            response.data.redirectUrl,
            "_blank",
            "width=600,height=400"
          );
          var pollTimer = window.setInterval(function () {
            try {
              if (win.document.URL.indexOf(response.data.redirectUrl) != -1) {
                window.clearInterval(pollTimer);

                $state.go("etsy.connected");
              }
            } catch (e) {
              // Error Handling
            }
          }, 500);
          //   setInterval(() => {
          //     var _query = document.querySelector("pre")?.innerHTML;

          //     console.log("setInterval", _query);
          //     if (
          //       _query?.includes("https://www.coherent-accounting.com/company")
          //       //   "https://coherent-accounting.com/account/api/callback/oauth2redirect?code=AB11699032995MtQVikAly85dEKLvlFs5RPjuVn9Vbm1qb3x7J&state=37bc38b5-d2fd-44d6-9eb2-e651e6590351&realmId=4620816365341301640"
          //     ) {
          //       console.log("setInterval1");
          //       a.close();
          //     }
          //   }, 1000);
        })
        .catch((error) => {
          console.log(error);
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
              "Access-Control-Allow-Origin": "http://localhost:8080",
            },
          }
        )
        .then((response) => {
          console.log(response, "asdfasdfasdfddddddd");
          type == "qbo"
            ? (this.companyInfo.connectedToQBO = false)
            : (this.companyInfo.connectedToXero = false);
        })
        .catch((error) => {
          console.log(error);
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
  background: orangered;
  border-radius: 100%;
  color: white;
  width: 1.5em;
  text-align: center;
  display: inline-block;
}
</style>
