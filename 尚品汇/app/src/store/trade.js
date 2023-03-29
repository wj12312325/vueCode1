import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
    //用户地址信息
    addressInfo: [],
    //交易订单信息
    orderInfo: {}

}
const mutations = {
    //修改用户地址信息
    GETADDRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    //修改交易订单信息
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }

}
const actions = {
    //获取用户地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.data.code == 200) {
            commit('GETADDRESSINFO', result.data.data)
        }
    },
    //获取订单交易信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.data.code == 200) {
            commit('GETORDERINFO', result.data.data)
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