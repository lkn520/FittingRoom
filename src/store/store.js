import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShowFooter: true
}

const mutations = {
  toggleFooter (state, bln) {
    state.isShowFooter = bln
  }
}

export default new Vuex.Store({
  state,
  mutations
})
