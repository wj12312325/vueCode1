import request from '@/utils/request'

//获取trademark数据的接口 请求方式：get URL：/admin/product/baseTrademark/{page}/{limit}
export const reqGetTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

//添加品牌+修改品牌接口 ：
//添加：请求方式：post URL：/admin/product/baseTrademark/save
//修改：请求方式：put URL:/admin/product/baseTrademark/update
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}

//删除品牌 请求方式：delete Url:/admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })