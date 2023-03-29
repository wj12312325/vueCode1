// 引入Vue 和VueRoter
import Vue from "vue";
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
    // 引入路由组件
import store from '@/store'
//引入一级路由 (使用路由懒加载-不直接引入)
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// //引入二级路由
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, resole, reject) {
    if (resole && reject) {
        originPush.call(this, location, resole, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resole, reject) {
        if (resole && reject) {
            originReplace.call(this, location, resole, reject)
        } else {
            originReplace.call(this, location, () => {}, () => {})
        }
    }
    //配置路由
let router = new VueRouter({
        //配置路由
        routes: [{
                path: '/home',
                component: () =>
                    import ('@/pages/Home'),
                // 元信息
                meta: { show: true }
            },
            {
                path: '/login',
                component: () =>
                    import ('@/pages/Login'),
                meta: { show: false }
            },
            {
                path: '/register',
                component: () =>
                    import ('@/pages/Register'),
                meta: { show: false }
            },
            {
                //  path: '/search/:keyword?  加？代表params可传可不传
                path: '/search/:keyword?',
                component: () =>
                    import ('@/pages/Search'),
                meta: { show: true },
                name: 'search',
                // 路由组件传props数据：三种方式
                // 1：props: true 只能传是params数据
                // 2:props: { a: 1, n: 2 } 传另外的数据
                // 3:props: ($route) => { 可以传params和query
                //     return {
                //         keyword: $route.params.keyword,
                //         k: $route.query.k
                //     }
                // }
                // 简写： props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
                // props: ($route) => ({ keyword: $route.params.keyword, })
            },
            //重定向,默认跳转
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/detail/:skuid',
                component: () =>
                    import ('@/pages/Detail'),
                meta: { show: true },
                name: 'detail'
            },
            {
                path: '/addCartSuccess',
                component: () =>
                    import ('@/pages/AddCartSuccess'),
                meta: { show: true },
                name: 'addCartSuccess'
            },
            {
                path: '/shopCart',
                component: () =>
                    import ('@/pages/ShopCart'),
                meta: { show: true }

            },
            {
                path: '/trade',
                component: () =>
                    import ('@/pages/Trade'),
                meta: { show: true },
                beforeEnter: (to, from, next) => {
                    if (from.path == '/shopcart' || from.path == '/') {
                        next()
                    } else {
                        next(false)
                    }
                }
            },
            {
                path: '/pay',
                component: () =>
                    import ('@/pages/Pay'),
                meta: { show: true },
                beforeEnter: (to, from, next) => {
                    if (from.path == '/trade' || from.path == '/') {
                        next()
                    } else {
                        next(false)
                    }
                }
            },
            {
                path: '/paysuccess',
                component: () =>
                    import ('@/pages/PaySuccess'),
                meta: { show: true }
            },
            {
                path: '/center',
                component: () =>
                    import ('@/pages/Center'),
                meta: { show: true },
                children: [{
                        path: 'myorder',
                        component: () =>
                            import ('@/pages/Center/myOrder')
                    },
                    {
                        path: 'grouporder',
                        component: () =>
                            import ('@/pages/Center/groupOrder')
                    },
                    {
                        path: '/center',
                        redirect: '/center/myorder'
                    }
                ]
            }

        ],
        //默认跳到最上面
        scrollBehavior(to, from, savedPosition) {
            return { y: 0 }
        }
    })
    // router.beforeEach((to, from, next) => {
    //     let token = store.state.user.token
    //     if (token) {
    //         //登录
    //         if (to.path == '/login') {
    //             next('/home')
    //         } else {
    //             next()
    //         }
    //     } else {
    //         //未登录
    //         let toPath = to.path
    //         if (toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf("/trade") != -1) {
    //             next('/login?redirect=' + toPath)
    //         } else {
    //             next()
    //         }
    //     }
    // })

export default router