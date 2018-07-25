import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencies: {}
  },
  mutations: {
    SET_CURRENCIES (state, currencies) {
      state.currencies = currencies
    }
  },
  actions: {
    setCurrencies ({ commit }, currencies) {
      commit('SET_CURRENCIES', currencies)
    }
  },
  getters: {
    currencies: state => state.currencies
  }
})
