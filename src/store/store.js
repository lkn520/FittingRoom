import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShowFooter: true,
  brand: null
}

const mutations = {
  toggleFooter (state, bln) {
    state.isShowFooter = bln
  },
  setBrand (state, brand) {
    state.brand = brand
  }
}

export default new Vuex.Store({
  state,
  mutations
})
