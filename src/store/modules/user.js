/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-promise-reject-errors */
import { Promise } from 'q'
import { login, participantRegister, organizerRegister, getUserInfo, updatePwd, forgetPwd, updateProfile } from '../../api/user'
import { setToken, getRole, getName, initToken } from '../../utils/auth'
import { Message } from 'element-ui'
const state = {
  role: '',
  name: '',
  phonenumber: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_PHONENUMBER: (state, phonenumber) => {
    state.phonenumber = phonenumber
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
            if (role === 'admin') {
              Message({
                showClose: true,
                message: '未找到该管理员！请确认管理员用户名是否正确！',
                type: 'error'
              })
            } else {
              Message({
                showClose: true,
                message: '未找到该用户！请确认用户名是否正确！',
                type: 'error'
              })
            }
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
          Message({
            showClose: true,
            message: '系统被外星人袭击了，请再次尝试登录！',
            type: 'warning'
          })
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
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试注册！',
              type: 'warning'
            })
            reject(error)
          })
      } else {
        reject()
      }
    })
  },
  organizerRegister ({ commit }, form) {
    return new Promise((resolve, reject) => {
      const { organizername, password, passwordtwo, phonenumber } = form
      if (password === passwordtwo) {
        organizerRegister(organizername, password, phonenumber)
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
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试注册！',
              type: 'warning'
            })
            reject(error)
          })
      } else {
        reject()
      }
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo(getName(), getRole())
        .then(response => {
          commit('SET_PHONENUMBER', response.data.phonenumber)
          commit('SET_ROLE', getRole())
          commit('SET_NAME', getName())
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve) => {
      commit('SET_PHONENUMBER', '')
      commit('SET_ROLE', '')
      commit('SET_NAME', '')
      initToken()
      resolve()
    })
  },
  updatePwd ({ commit }, form) {
    return new Promise((resolve, reject) => {
      updatePwd(getName(), getRole(), form.oldpwd, form.newpwd)
        .then(response => {
          if (response.data.status === 'UpdateSuccess') {
            resolve()
          } else if (response.data.status === 'PwdFault') {
            Message({
              showClose: true,
              message: '原密码错误！',
              type: 'warning'
            })
            reject()
          } else {
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试修改！',
              type: 'warning'
            })
            reject()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  forgetPwd ({ commit }, form) {
    return new Promise((resolve, reject) => {
      forgetPwd(getName(), getRole(), form.fnewpwd)
        .then(response => {
          if (response.data.status === 'UpdateSuccess') {
            resolve()
          } else {
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试修改！',
              type: 'warning'
            })
            reject()
          }
        }).catch(error => {
          Message({
            showClose: true,
            message: '系统被外星人袭击了，请再次尝试修改！',
            type: 'warning'
          })
          reject(error)
        })
    })
  },
  updateProfile ({ commit }, form) {
    return new Promise((resolve, reject) => {
      updateProfile(getName(), getRole(), form.myname, form.myphone)
        .then(response => {
          if (response.data.status === 'UpdateSuccess') {
            commit('SET_NAME', form.myname)
            commit('SET_PHONENUMBER', form.myphone)
            setToken(form.myname, getRole())
            resolve()
          } else {
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试修改！',
              type: 'warning'
            })
            reject()
          }
        }).catch(error => {
          Message({
            showClose: true,
            message: '系统被外星人袭击了，请再次尝试修改！',
            type: 'warning'
          })
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
