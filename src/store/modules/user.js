/* eslint-disable prefer-promise-reject-errors */
import { Promise } from 'q'
import { login } from '../../api/user'
import { setToken } from '../../utils/auth'
import { Message } from 'element-ui'
const state = {
  role: '',
  name: '',
  avatar: '',
  phonenumber: '',
  organization: ''
}

const mutations = {
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
  // 登录action
  login ({ commit }, form) {
    return new Promise((resolve, reject) => {
      const { name, password, role } = form
      login(name, password, role)
        .then(response => {
          const { data } = response
          const { status, name, role } = data
          if (status === 'loginSuccess') {
            commit('SET_ROLE', role)
            commit('SET_NAME', name)
            setToken(name, role)
            resolve()
          } else if (status === 'passwordFault') {
            Message({
              showClose: true,
              message: '您的密码错误了哦！请仔细地再试一次哦！',
              type: 'error'
            })
            reject()
          } else if (status === 'userNotFound') {
            Message({
              showClose: true,
              message: '您还没注册怎么能登录呢！',
              type: 'error'
            })
            reject()
          } else {
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试登录！',
              type: 'warning'
            })
            reject()
          }
        }).catch(error => {
          reject(error)
        })
    })
  }
  /* getInfo({ commit }) {
          return new Promise((resolve,reject) =>{
              getUserInfo(state.name,state.role)
          })
      } */
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
