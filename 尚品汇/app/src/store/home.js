import { reqCategoryList, mockReqBannerList, mockReqFloorList } from "@/api";


// 存储数据的地方
const state = {
        //三级联动数据
        categoryList: [],
        //轮播图数据
        bannerList: [],
        //floor组件数据
        floorList: []

    }
    // 唯一修改state的手段
const mutations = {
        //三级联动数据修改
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        //轮播图数据修改
        BANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        //floor组件数据修改
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList
        }
    }
    //处理action，可以书写自己的业务，也可以处理异步
const actions = {
    //三级联动数据获取
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.data.code == 200) {
            commit('CATEGORYLIST', result.data.data)
        }
    },
    //轮播图数据获取 mock
    async bannerList({ commit }) {
        let result = await mockReqBannerList()
        if (result.data.code == 200) {
            commit('BANNERLIST', result.data.data)
        }
    },
    //获取floor组件数据 mock
    async getFloorList({ commit }) {
        let result = await mockReqFloorList()
        if (result.data.code == 200) {
            commit('GETFLOORLIST', result.data.data)
        }
    }
};
// 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}