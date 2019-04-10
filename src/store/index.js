import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/users/user'
Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    token: state => state.user.token,
    name: state => state.user.name
  },
  modules: {
    user
  }
})
