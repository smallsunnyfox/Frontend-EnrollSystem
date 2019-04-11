import admin from './admin'
import organizer from './organizer'
import participant from './participant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { test } from '@/api/user'
import { Promise, resolve, reject } from 'q'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    name: 'zs',
    avatar: '',
    phonenumber: ''
  },
  modules: {
    admin,
    organizer,
    participant
  },
  getters: {

  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    TestAction ({ commit }) {
      return new Promise((resolve, reject) => {
        test().then(response => {
          commit('SET_NAME', response.data.name)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
