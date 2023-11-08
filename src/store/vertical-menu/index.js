import { $themeConfig } from "@themeConfig";

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
    activeTab: 1,
  },
  getters: {
    getActiveTab(state) {
      return state.activeTab;
    },
  },
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val;
    },
    SET_ACTIVE_TABS(state, tab) {
      state.activeTab = tab;
    },
  },
  actions: {},
};
