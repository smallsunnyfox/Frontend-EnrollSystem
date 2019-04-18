/* eslint-disable prefer-promise-reject-errors */
import { Promise } from 'q'
import { login, participantRegister } from '../../api/user'
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
          if (data.status === 'loginSuccess') {
            commit('SET_ROLE', data.name)
            commit('SET_NAME', data.role)
            setToken(data.name, data.role)
            resolve()
          } else if (data.status === 'passwordFault') {
            Message({
              showClose: true,
              message: '您的密码错误了哦！请仔细地再试一次哦！',
              type: 'error'
            })
            reject()
          } else if (data.status === 'userNotFound') {
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
  },
  participantRegister ({ commit }, form) {
    return new Promise((resolve, reject) => {
      const { participantname, password, passwordtwo, phonenumber } = form
      if (password === passwordtwo) {
        participantRegister(participantname, password, phonenumber)
          .then(response => {
            if (response.data.status === 'RegisterSuccess') {
              resolve()
            } else if (response.data.status === 'AlreadyExist') {
              Message({
                showClose: true,
                message: '该用户名已存在！请换个名字重新注册哦！',
                type: 'error'
              })
              reject()
            } else {
              Message({
                showClose: true,
                message: '系统被外星人袭击了，请再次尝试注册！',
                type: 'warning'
              })
              reject()
            }
          }).catch(error => {
            reject(error)
          })
      } else {
        reject()
      }
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
