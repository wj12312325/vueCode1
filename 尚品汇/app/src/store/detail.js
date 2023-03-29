import { reqAddOrUpdateShopCart, reqGetGoodInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
    //产品信息
    goodInfo: {},
    //游客临时id
    uuid_token: getUUID()
}
const mutations = {
    //修改产品信息
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品详细信息
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGetGoodInfo(skuid)
        if (result.data.code == 200) {
            commit('GETGOODINFO', result.data.data)
        }
    },
    //加入购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    }
}
const getters = {
    //产品标签简化
    categoryView(state) {
        //加||{}的原因：当数据还没获取到时，goodinfo是空对象，空对象.categoryView会报错(underfined)
        return state.goodInfo.categoryView || {}
    },
    //产品信息简化
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //产品信息配置简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}