import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)

// // 存储数据的地方
// const state = {}
//     // 唯一修改state的手段
// const mutations = {}
//     //处理action，可以书写自己的业务，也可以处理异步
// const actions = {};
// // 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {}

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    //vuex模块开发
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})