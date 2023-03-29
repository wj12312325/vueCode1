import { reqSearchList } from "@/api";

// 存储数据的地方
const state = {
        //search数据
        searchList: {}
    }
    // 唯一修改state的手段
const mutations = {
        //search模块数据修改
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    }
    //处理action，可以书写自己的业务，也可以处理异步
const actions = {
    //search模块数据获取
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params)
        if (result.data.code == 200) {
            commit('GETSEARCHLIST', result.data.data)
        }

    }
};
// 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    total(state) {
        return state.searchList.total
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}