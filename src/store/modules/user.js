import { getToken, setToken, removeToken } from '@/utils/auth'
import { Promise } from 'q'
import { adminlogin } from '../../api/user'

const state = {
  token: getToken(),
  role: 'visitor',
  name: '',
  avatar: '',
  phonenumber: '',
  organization: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONENUMBER: (state, phonenumber) => {
    state.phonenumber = phonenumber
  },
  SET_ORG: (state, organization) => {
    state.organization = organization
  }

}

const actions = {
  adminlogin ({ commit }, adminInfo) {
    const { adminname, password } = adminInfo
    return new Promise((resolve, reject) => {
      adminlogin({ adminname: adminname, password: password })
        .then(response => {
          const { data } = response
          console.log(data)
          commit('SET_NAME', data.name)
          commit('SET_PHONENUMBER', data.phonenumber)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
