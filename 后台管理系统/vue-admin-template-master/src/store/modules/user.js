import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        routes: [],
        buttons: [],
        roles: [],
        //对比之后 展示的路由
        resultAsyncRoutes: [],
        resultAllRoutes: []
    }
}

const state = getDefaultState()

const mutations = {
        RESET_STATE: (state) => {
            Object.assign(state, getDefaultState())
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, { avatar, routes, buttons, roles }) => {
            state.avatar = avatar
            state.routes = routes
            state.buttons = buttons
            state.roles = roles
        },
        //计算出最终的异步路由
        SET_ASYNCROUTES: (state, asyncRoutes) => {
            state.resultAsyncRoutes = asyncRoutes
                //合并
            state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
                //添加新路由
            router.addRoutes(state.resultAllRoutes)
        }
    }
    //递归
const computedAsyncRoutes = (asyncRoutes, routes) => {
    return asyncRoutes.filter(item => {
        if (routes.indexOf(item.name) != -1) {
            if (item.children && item.children.length) {
                item.children = computedAsyncRoutes(item.children, routes)
            }
            return true
        }
    })
}

const actions = {
    // user login
    // login({ commit }, userInfo) {
    //   const { username, password } = userInfo
    //   return new Promise((resolve, reject) => {
    //     login({ username: username.trim(), password: password }).then(response => {
    //       const { data } = response
    //       commit('SET_TOKEN', data.token)
    //       setToken(data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    async login({ commit }, userInfo) {
        const { username, password } = userInfo
        const result = await login({ username: username.trim(), password: password })
        console.log(result)
        if (result.code == 20000) {
            commit('SET_TOKEN', result.data.token)
            setToken(result.data.token)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                const { name, avatar, routes, buttons, roles } = data
                commit('SET_NAME', name)
                commit('SET_AVATAR', { avatar, routes, buttons, roles })
                    //异步路由
                commit('SET_ASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}