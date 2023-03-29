import { reqGetCode, reqGetUserInfo, reqLogin, reqRegister, reqSignOut } from "@/api"

const state = {
    //验证码
    code: '',
    //token (令牌)
    token: localStorage.getItem('TOKEN'),
    //用户信息
    userInfo: ''

}
const mutations = {
    //修改验证码
    GETCODE(state, code) {
        state.code = code
    },
    //修改token
    USERLOGIN(state, token) {
        state.token = token
    },
    //修改用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //修改退出信息
    SIGNOUT(state) {
        state.token = ''
        state.userInfo = ''
        localStorage.removeItem('TOKEN')
    }

}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.data.code == 200) {
            commit('GETCODE', result.data.data)
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqRegister(user)
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqLogin(data)
        if (result.data.code == 200) {
            commit('USERLOGIN', result.data.data.token)
            localStorage.setItem('TOKEN', result.data.data.token)
        } else {
            return Promise.reject(new Error('登录失败'))
        }
    },
    //获取用户信息(通过token)
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        if (result.data.code == 200) {
            commit('GETUSERINFO', result.data.data)
        }
    },
    //通过登录
    async signOut({ commit }) {
        let result = await reqSignOut()
        if (result.data.code == 200) {
            commit('SIGNOUT')
        } else {
            return Promise.reject(new Error('失败'))
        }
    }

}
const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}