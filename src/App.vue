<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import axios from "@/libs/axios";

import { useWindowSize, useCssVar } from "@vueuse/core";
import router from "@/router";
import store from "@/store";
import { mapGetters } from "vuex";
import useJwt from "@/auth/jwt/useJwt";

import { getCookieValue } from "./auth/utils";

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

export default {
  components: {
    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,
  },
  data() {
    return {
      currentPlan: null,
      isUnderMaintenance: false,
      is500: false,
    };
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    ...mapGetters("verticalMenu", ["getXsrfToken"]),
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      return `layout-${this.contentLayoutType}`;
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    },
  },
  mounted() {
    setTimeout(() => {
      axios.defaults.headers["X-XSRF-TOKEN"] = getCookieValue("XSRF-TOKEN");
    }, 0);
    const t = localStorage.getItem("accessToken");

    if (!localStorage.getItem("user_token")) {
      useJwt
        .login(
          {
            grant_type: "password",
            username: "amazon_6011_@abv.bg",
            password: "1234",
          },
          this.getXsrfToken
        )
        .then((response) => {
          localStorage.setItem(
            "user_token",
            response.data.access_token["x-xsrf-token"]
          );
        })
        .catch((error) => {
          store.commit(
            "verticalMenu/SET_TOKEN",
            error.response?.headers["x-xsrf-token"]
          );
        })
        .finally(() => {});
    }
    axios
      .get(axios.defaults.baseURL)
      .then((r) => {})
      .catch((e) => {});
    if (t) {
      axios
        .get(`${axios.defaults.baseURL}/account/api/maintenance/health`)
        .then((res) => {
          this.isUnderMaintenance =
            res.status === 500 || res.data.isUnderMaintenance;
          if (res.status === 500 || res.data.isUnderMaintenance) {
            router.push("/under-maintenance");
          }
        })
        .catch((e) => {
          this.isUnderMaintenance = true;
          router.push("/under-maintenance");
        })
        .finally(() => {});
      axios
        .get(`${axios.defaults.baseURL}/index/api/maintenance/health`)
        .then((res) => {
          if (
            this.isUnderMaintenance &&
            (res.data.isUnderMaintenance || res.status == 500)
          ) {
            router.push("/under-maintenance");
          }
        })
        .catch((e) => {
          router.push("/under-maintenance");
        })
        .finally(() => {});
    }
  },
  created() {
    // const t = localStorage.getItem("accessToken");
    // if (!localStorage.getItem("user_token")) {
    //   useJwt
    //     .login(
    //       {
    //         grant_type: "password",
    //         username: "amazon_6011_@abv.bg",
    //         password: "1234",
    //       },
    //       this.getXsrfToken
    //     )
    //     .then((response) => {
    //       localStorage.setItem(
    //         "user_token",
    //         response.data.access_token["x-xsrf-token"]
    //       );
    //     })
    //     .catch((error) => {
    //       store.commit(
    //         "verticalMenu/SET_TOKEN",
    //         error.response?.headers["x-xsrf-token"]
    //       );
    //     })
    //     .finally(() => {});
    // }
    // axios
    //   .get(axios.defaults.baseURL)
    //   .then((r) => {})
    //   .catch((e) => {});
    // if (t) {
    //   axios
    //     .get(`${axios.defaults.baseURL}/account/api/maintenance/health`)
    //     .then((res) => {
    //       this.isUnderMaintenance =
    //         res.status === 500 || res.data.isUnderMaintenance;
    //       if (res.status === 500 || res.data.isUnderMaintenance) {
    //         router.push("/under-maintenance");
    //       }
    //     })
    //     .catch((e) => {
    //       this.isUnderMaintenance = true;
    //       router.push("/under-maintenance");
    //     })
    //     .finally(() => {});
    //   axios
    //     .get(`${axios.defaults.baseURL}/index/api/maintenance/health`)
    //     .then((res) => {
    //       if (
    //         this.isUnderMaintenance &&
    //         (res.data.isUnderMaintenance || res.status == 500)
    //       ) {
    //         router.push("/under-maintenance");
    //       }
    //     })
    //     .catch((e) => {
    //       router.push("/under-maintenance");
    //     })
    //     .finally(() => {});
    // }
  },

  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim();
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      );
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout;
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },
  setup() {
    const { skin, skinClasses } = useAppConfig();

    // If skin is dark when initialized => Add class to body
    if (skin.value === "dark") document.body.classList.add("dark-layout");

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade",
    });

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });

    return {
      skinClasses,
    };
  },
};
</script>
