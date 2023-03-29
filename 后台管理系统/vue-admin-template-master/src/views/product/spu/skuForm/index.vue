<template>
    <el-form label-width="80px">
        <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="重量(千克)">
            <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
        </el-form-item>
        <el-form-item label="规格描述">
            <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id"
                    style="margin-right:35px;margin-bottom: 10px;">
                    <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                        <el-option :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList"
                            :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id"
                    style="margin-right:35px;margin-bottom: 10px;">
                    <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                        <el-option :value="`${saleAttr.id}:${saleAttrValue.id}`"
                            v-for="saleAttrValue in saleAttr.spuSaleAttrValueList " :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片列表">
            <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="{row}">
                        <img :src="row.imgUrl" style="width:100px;height:100px">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设置默认</el-button>
                        <el-button v-else>默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveSkuInfo">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'SkuForm',
    data() {
        return {
            spuImageList: [],
            spuSaleAttrList: [],
            attrInfoList: [],
            spu: {},
            skuInfo: {
                category3Id: 0,
                price: 0,
                skuAttrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueId: 0,
                    // }
                ],
                skuDefaultImg: "",
                skuDesc: "",
                skuImageList: [
                    // {
                    //     "id": 0,
                    //     "imgName": "string",
                    //     "imgUrl": "string",
                    //     "isDefault": "string",
                    //     "skuId": 0,
                    //     "spuImgId": 0
                    // }
                ],
                skuName: "",
                skuSaleAttrValueList: [
                    // {
                    //     "id": 0,
                    //     "saleAttrId": 0,
                    //     "saleAttrName": "string",
                    //     "saleAttrValueId": 0,
                    //     "saleAttrValueName": "string",
                    //     "skuId": 0,
                    //     "spuId": 0
                    // }
                ],
                spuId: 0,
                tmId: 0,
                weight: ""
            },
            imageList: []
        }
    },
    methods: {
        //获取初始化数据
        async getData(category1Id, category2Id, spu) {
            this.spu = spu
            this.skuInfo.category3Id = spu.category3Id
            this.skuInfo.spuId = spu.id
            this.skuInfo.tmId = spu.tmId
            let result = await this.$API.spu.reqSpuImageList(spu.id)
            if (result.code == 200) {
                const list = result.data
                list.forEach(item => {
                    item.isDefault = 0
                });
                this.spuImageList = list
            }
            let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
            if (result1.code == 200) {
                this.spuSaleAttrList = result1.data
            }
            let result2 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
            if (result2.code == 200) {
                this.attrInfoList = result2.data
            }
        },
        //复选框
        handleSelectionChange(params) {
            this.imageList = params
        },
        //设置默认（排他）
        changeDefault(row) {
            this.spuImageList.forEach(item => {
                item.isDefault = 0
            })
            row.isDefault = 1
            this.skuInfo.skuDefaultImg = row.imgUrl
        },
        //取消的回调
        cancel() {
            this.$emit('changeSences', 0)
            Object.assign(this._data, this.$options.data())
        },
        //保存的回调
        async saveSkuInfo() {
            const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this
            //平台属性整理
            skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
                if (item.attrIdAndValueId) {
                    const [attrId, valueId] = item.attrIdAndValueId.split(':')
                    prev.push({ attrId, valueId })
                }
                return prev
            }, [])

            //销售属性整理
            skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
                if (item.attrIdAndValueId) {
                    const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
                    prev.push({ saleAttrId, saleAttrValueId })
                }
                return prev
            }, [])

            //图片整理
            skuInfo.skuImageList = imageList.map(item => {
                return {
                    imgName: item.imgName,
                    imgUrl: item.imgUrl,
                    isDefault: item.isDefault,
                    spuImgId: item.id
                }
            })

            let result = await this.$API.spu.reqSaveSkuInfo(skuInfo)
            if (result.code == 200) {
                this.$message({ type: 'success', message: '添加SKU成功' })
                this.$emit('changeSences', 0)

            }
        }
    }

}
</script>

<style>
</style>