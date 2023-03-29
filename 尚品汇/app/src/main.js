import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
//三级联动组件--全局组件
import TypeNav from "@/components/TypeNav"
//轮播图组件---全局组件
import Carousel from '@/components/Carousel'
//分页器组件---全局组件
import Pagination from '@/components/pagination'
// 全局组件使用：第一个参数：全局组件名，第二个参数：那个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
    //引入swiper样式
import "swiper/css/swiper.css"

//引入elementUI组件（按需引入）
import {
    MessageBox,

} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


//引入mock
import "@/mock/mockServe"
//引入仓库
import store from '@/store'
//引入API
import * as API from '@/api'

//引入插件（图片懒加载）
import VueLazyload from 'vue-lazyload'
//引入懒加载图片
import ljz from "@/assets/1.gif"
//注册插件
Vue.use(VueLazyload, {
        loading: ljz
    })
    //引入表单校验
import "@/plugins/validate"
Vue.config.productionTip = false


new Vue({
    render: h => h(App),
    //全局事件总线配置
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')