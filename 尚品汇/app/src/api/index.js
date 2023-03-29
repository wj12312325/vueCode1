//API进行统一管理
import requests from "@/api/request";
// 引入mockRequest
import mockRequests from "./mockRequest";

//发请求：axios发请求返回结果Promise对象

// 三级联动接口
// /api/product/getBaseCategoryList  get 无参数
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//轮播图mock接口
export const mockReqBannerList = () => mockRequests({ url: '/banner' })

//floor组件mock接口
export const mockReqFloorList = () => mockRequests({ url: '/floor' })

//Search模块数据获取  请求方式：post 有参数（无必带参数）
export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params })

//Detail组件获取数据 请求方式： get 有参数skuid
export const reqGetGoodInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })

//加入购物车api 请求方式：post URL：/api/cart/addToCart/{ skuId }/{ skuNum } 有参数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

//获取用户购物车信息 请求方式：get URL：/api/cart/cartList 
export const reqGetShopCart = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车商品 请求方式：delete URL： /api/cart/deleteCart/{skuId}
export const reqDeleteCartList = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改购物车产品勾选状态 请求方法：get URL：/api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCartIsChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码 请求方式：get URL:/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册用户 请求方式 ；post URL:/api/user/passport/register
export const reqRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//用户登录 请求方式：post URL：/api/user/passport/login
export const reqLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })

//获取用户信息(通过token) 请求方式get URL:/api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => requests({ url: "/user/passport/auth/getUserInfo", method: 'get' })

//退出登录 请求方式：get URL:/api/user/passport/logout
export const reqSignOut = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取用户地址信息 请求方式：get URL：/api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取订单交易信息 请求方式:get URL:/api/order/auth/trade
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单 请求方式：post URL:/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取订单支付信息 请求方式：get URL：/api/payment/weixin/createNative/{orderId}
export const reqPayOrderInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//查询订单支付状态 请求方式：get URl:/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取我的订单信息 请求方式:get URL :/api/order/auth/{page}/{limit}
export const reqMyOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })