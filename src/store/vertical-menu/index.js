import { $themeConfig } from "@themeConfig";

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
    activeTab: 1,
    refresh: true,
    savedInvoices: [],
    xsrf_token: "",
  },
  getters: {
    getActiveTab(state) {
      return state.activeTab;
    },
    getRefresh(state) {
      return state.refresh;
    },
    getXsrfToken(state) {
      return state.xsrf_token;
    },
  },
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val;
    },
    SET_ACTIVE_TABS(state, tab) {
      state.activeTab = tab;
    },
    SET_PREVENT_REFRESH(state, refresh) {
      state.refresh = refresh;
    },
    SET_TOKEN(state, token) {
      state.xsrf_token = token;
    },
  },
  actions: {},
};
