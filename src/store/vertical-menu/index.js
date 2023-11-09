import { $themeConfig } from "@themeConfig";

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
    activeTab: 1,
    refresh: true,
    savedInvoices: [],
  },
  getters: {
    getActiveTab(state) {
      return state.activeTab;
    },
    getRefresh(state) {
      return state.refresh;
    },
    getSavedInvoices(state) {
      return state.savedInvoices;
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
      console.log("SET_PREVENT_REFRESH");
      state.refresh = refresh;
    },
    SET_INVOICES(state, savedInvoices) {
      console.log("SET_INVOICES");
      state.savedInvoices = savedInvoices;
    },
  },
  actions: {},
};
