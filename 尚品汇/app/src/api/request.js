//对axios进行二次封装
import axios from 'axios';
// 引入nprogress
import nprogress from 'nprogress';

// 引入nprogress样式:进度条样式
import "nprogress/nprogress.css"
//引入仓库store
import store from '@/store'

nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 2000, showSpinner: false, trickle: false })

const requests = axios.create({
    // 基础路径
    baseURL: '/api',
    //请求超时时间：5s
    timeout: 5000,
});

//请求拦截器:在发请求之前可以做一下事
requests.interceptors.request.use((config) => {
    nprogress.start(); //进度条开始
    if (store.state.detail.uuid_token) {
        //设置请求头：(不能乱设置，要和后端商量好了的)
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //如果有token,就把在请求头上带上token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    return config; //配置对象，里面有一个很重要的属性headers请求头
});

//响应拦截器：服务器响应数据回来时，可以做一下事
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done()
    return res;
}, (error) => {
    return Promise.reject(new Error('fail'))
})

export default requests