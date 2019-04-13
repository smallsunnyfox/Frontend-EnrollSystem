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
    adminlogin({ commit }, adminInfo) {
        const { adminname, password } = adminInfo
        return new Promise((resolve, reject) => {
            adminLogin({ adminname: adminname, password: password })
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
