import { Promise } from 'q'
import { adminLogin } from '../../api/user'
import { setToken } from '../../utils/auth'

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
    //登录action
    adminlogin({ commit }, form) {
        return new Promise((resolve, reject) => {
            const {adminname, password} = form
            adminLogin(adminname,password)
                .then(response => {
                    const { data } = response
                    const { name, role } = data
                    commit('SET_ROLE', role)
                    commit('SET_NAME', name)
                    setToken(name,role)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
        })
    },
    /*getInfo({ commit }) {
        return new Promise((resolve,reject) =>{
            getUserInfo(state.name,state.role)
        })
    }*/
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
