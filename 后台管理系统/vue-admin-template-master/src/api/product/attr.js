import request from '@/utils/request'

//获取一级分类的数据 /admin/product/getCategory1 get
export const reqGategoryList1 = () => request({ url: '/admin/product/getCategory1', method: "get" })

//获取二级分类数据(使用一级分类id) /admin/product/getCategory2/{category1Id} get
export const reqGategoryList2 = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

//获取三级分类数据(使用二级分类id) /admin/product/getCategory3/{category2Id} get
export const reqGategoryList3 = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

//获取商品基本数据接口 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

//添加与修改商品基本属性 /admin/product/saveAttrInfo post
export const reqAddOrUpdateAttrInfo = (data) => request({ url: '/admin/product/saveAttrInfo', data, method: 'post' })