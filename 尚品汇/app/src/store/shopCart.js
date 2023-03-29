import { reqDeleteCartList, reqGetShopCart, reqUpdateCartIsChecked } from "@/api"

const state = {
    //购物车数据
    shopcartList: []
}
const mutations = {
    //修改购物车数据
    GETSHOPCART(state, shopcartList) {
        state.shopcartList = shopcartList
    }

}
const actions = {
    //获取购物车数据
    async getShopCart({ commit }) {
        let result = await reqGetShopCart()
        if (result.data.code == 200) {
            commit('GETSHOPCART', result.data.data)
        }
    },
    //删除购物车数据
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartList(skuId)
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //修改购物车产品勾选状态
    async updataCartIsChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCartIsChecked(skuId, isChecked)
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //删除购物车全部勾选产品
    deleteAllIsChecked({ dispatch, getters }) {
        let promiseAll = []
        getters.shopcartList.cartInfoList.forEach(item => {
            let promise = item.isChecked && dispatch('deleteCartList', item.skuId)
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    //修改全部勾选产品的状态
    changeAllCartIsChecked({ dispatch, getters }, isChecked) {
        let promiseAll = []
        getters.shopcartList.cartInfoList.forEach(item => {
            let promise = dispatch('updataCartIsChecked', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }

}
const getters = {
    //简化购物车数据
    shopcartList(state) {
        return state.shopcartList[0] || {}
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}