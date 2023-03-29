import request from '@/utils/request'

//获取spu数据接口 请求方式 get URL： /admin/product/{page}/{limit}
export const reqGetSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, params: { category3Id }, method: 'get' })

//获取spu信息 /admin/product/getSpuById/{spuId} get 
export const reqGetSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

//获取品牌信息 /admin/product/baseTrademark/getTrademarkList get
export const reqGetTrademarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

//获取spu图片接口 /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" })

//获取平台全部销售属性 /admin/product/baseSaleAttrList get
export const reqSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: "get" })

//修改或上传spu /admin/product/saveSpuInfo /admin/product/updateSpuInfo post
export const reqSaveOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: "post", data: spuInfo })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', method: "post", data: spuInfo })
    }
}

//删除Spu /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

//获取spu销售属性接口 /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: "get" })

//获取平台属性 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })
    //添加sku /admin/product/saveSkuInfo post
export const reqSaveSkuInfo = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

//获取spu的全部sku GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: "get" })