<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-card v-if="socialAccounts" class="card-transaction" no-body>
          <b-card-header>
            <h3>{{ $t('social_accounts') }}</h3>
          </b-card-header>

          <b-card-body>
            <div
              v-for="item in socialAccounts"
              :key="item.name"
              class="transaction-item mb-0"
              style="padding-bottom: 4px; padding-block-end: 20px;"
            >
              <b-media class="align-items-center"  no-body>
                <b-media-aside style="align-self: unset !important;">
                    <b-img :src="item.logo" width="35" />
                </b-media-aside>
                <b-media-body>
                  <h4 class="transaction-title">
                    {{ item.name }}
                  </h4>
                  <small
                    v-if="item.links && item.links.link"
                    tag="a"
                    :href="item.links.link"
                    style="opacity: 1; color: #0A64BC; font-size: 1rem;"
                  >
                    {{ item.links.username }}
                  </small>

                  <small v-else> Not Connected </small>
                </b-media-body>
              </b-media>
              <div>
                <b-media no-body>
                  <b-media-aside class="m-0">
                    <b-avatar
                      class="rounded-0"
                      size="48"
                      :variant="item.connected ? 'light-warning' : 'light-info'"
                    >
                      <feather-icon
                        size="20"
                        :icon="item.connected ? 'Trash2Icon' : 'LinkIcon'"
                      />
                    </b-avatar>
                  </b-media-aside>
                </b-media>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import gmail from "@/assets/images/icons/brands/gmail.png";
import chat from "@/assets/images/icons/brands/chat.png";
import youtube from "@/assets/images/icons/brands/youtube.png";
import facebook from "@/assets/images/icons/brands/facebook.png";
import google from "@/assets/images/icons/brands/google.png";
import intagram from "@/assets/images/icons/brands/instagram.png";
import twitter from "@/assets/images/icons/brands/twitter.png";
import BCardCode from "@core/components/b-card-code";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BCard,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BCardText,
  BListGroup,
  BListGroupItem,
  BAvatar,
  BImg,
  BMedia,
  BMediaAside,
  BMediaBody,
  BIcon,
  BBtn,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { codeVerticalIcon } from "@/views/forms/form-layout/code";

export default {
  components: {
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BInputGroup,
    BInputGroupPrepend,
    BForm,
    BButton,
    BCard,
    BCardBody,
    BCardTitle,
    BCardHeader,
    BCardText,
    BListGroup,
    BListGroupItem,
    BAvatar,
    BImg,
    BMedia,
    BMediaAside,
    BMediaBody,
    BIcon,
    BBtn,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      codeVerticalIcon,
      socialAccounts: [
        {
          logo: facebook,
          name: "Facebook",
          connected: false,
        },
        {
          logo: twitter,
          name: "Twitter",
          links: {
            username: "@CoherentAccounting",
            link: "#",
          },
          connected: true,
        },
        {
          logo: intagram,
          name: "Instagram",
          links: {
            username: "@CoherentAccounting",
            link: "#",
          },
          connected: true,
        },
        {
          logo: google,
          name: "Google",
          connected: false,
        },
        {
          logo: youtube,
          name: "Youtube",
          connected: false,
        },
        {
          logo: gmail,
          name: "Gmail",
          connected: false,
        },
        {
          logo: chat,
          name: "Chat",
          connected: false,
        },
      ],
    };
  },
};
</script>
<style lang="">
/*  */
</style>
