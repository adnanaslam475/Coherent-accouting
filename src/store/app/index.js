import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    ocrInvoiceData: {},
    isMultipleUploads: 1
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    getOCR(state) {
      return state.ocrInvoiceData
    },
    getCurrentTab(state) {
      return state.isMultipleUploads
    }
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    MULTIPLE_UPLOADS(state, val) {
      state.isMultipleUploads = val

    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    setOCR(state, payload) {
      state.ocrInvoiceData = payload
      console.log(state.ocrInvoiceData, '=p=p=p=p=p=p=p=p')
    }
  },
  actions: {},
}
