<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="SPU名称" :model="spu">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述" :model="spu">
                <el-input type="textarea" placeholder="SPU描述" rows="4" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
                    :file-list='spuImageList'
                    :on-success="handleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
                    <el-option :label="unselect.name" v-for="unselect in unSelectSaleAttr" :key="unselect.id"
                        :value="`${unselect.id}:${unselect.name}`"></el-option>
                </el-select>
                <el-button type="primary" :disabled="!attrIdAndAttrName" icon="el-icon-plus" @click="addSaleAttr">添加销售属性</el-button>
                <el-table border :data="spu.spuSaleAttrList">
                    <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName" width="90"></el-table-column>
                    <el-table-column label=" 属性值名称列表">
                        <template slot-scope="{row}">
                            <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
                                {{ tag.saleAttrValueName}}
                            </el-tag>
                            <!-- @keyup.enter.native="handleInputConfirm"  -->
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                                size="small" @blur="handleInputConfirm(row)" >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small"  @click="showInput(row)">添加
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="90">
                    <template slot-scope="{$index}">
                        <el-button type="danger" icon="el-icon-delete" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveOrUpdateSpu">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            spu: {
                category3Id: 0,
                description: "",
                spuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     spuId: 0
                    // }
                ],
                spuName: "",
                spuSaleAttrList: [
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "string",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         {
                    //             baseSaleAttrId: 0,
                    //             id: 0,
                    //             isChecked: "string",
                    //             saleAttrName: "string",
                    //             saleAttrValueName: "string",
                    //             spuId: 0
                    //         }
                    //     ]
                    // }
                ],
                tmId: ''
            },
            spuImageList: [],
            trademarkList: [],
            saleAttrList: [],
            attrIdAndAttrName: ''
        };
    },
    methods: {
        //照片墙删除照片
        handleRemove(file, fileList) {
            this.spuImageList=fileList
        },
        //照片墙预览图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //照片墙上传图片成功
        handleSuccess(response,file, fileList){
            this.spuImageList=fileList
        },
        //发请求获取初始数据 修改
        async getData(spu) {
            let spuresult = await this.$API.spu.reqGetSpu(spu.id)
            if (spuresult.code == 200) {
                this.spu = spuresult.data
            }
            let trademarkresult = await this.$API.spu.reqGetTrademarkList()
            if (trademarkresult.code == 200) {
                this.trademarkList = trademarkresult.data
            }
            let spuImageresult = await this.$API.spu.reqSpuImageList(spu.id)
            if (spuImageresult.code == 200) {
                const attrList = spuImageresult.data
                attrList.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                });
                this.spuImageList = attrList
            }
            let saleAttrresult = await this.$API.spu.reqSaleAttrList()
            if (saleAttrresult.code == 200) {
                this.saleAttrList = saleAttrresult.data
            }
        },
        //添加销售属性
        addSaleAttr(){
            const [baseSaleAttrId,saleAttrName]=this.attrIdAndAttrName.split(":")
            let newSaleAttr ={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
            this.spu.spuSaleAttrList.push(newSaleAttr)
            this.attrIdAndAttrName=''
        },
        //点击添加按钮
        showInput(row){
            this.$set(row,'inputVisible',true)
            this.$set(row,'inputValue','')
        },
        //当input失去焦点时
        handleInputConfirm(row){
            console.log(row)
            const {baseSaleAttrId,inputValue}=row
            if(inputValue.trim()==''){
                this.$message("属性值不能为空")
                return
            }
            let result =row.spuSaleAttrValueList.some(item=>item.saleAttrValueName==inputValue)
            if(result){
                this.$message("属性值不能重复")
                return
            }
            let newSaleAttrValue={baseSaleAttrId,saleAttrValueName:inputValue}
            row.spuSaleAttrValueList.push(newSaleAttrValue)

            row.inputVisible=false

        },
        //上传或修改 保存
        async saveOrUpdateSpu(){
            this.spu.spuImageList=this.spuImageList.map(item=>{
                return{
                    imgName:item.name,
                    imgUrl:(item.response &&item.response.data) ||item.url
                }
            })

            let result = await this.$API.spu.reqSaveOrUpdateSpu(this.spu)
            if(result.code==200){
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
                this.$emit('changeSence',{sence:0,flag:this.spu.id ? "更新":"上传"})
            }
            Object.assign(this._data,this.$options.data())

        },
        //发请求获取初始数据 添加
        async getSpuData(category3Id){
            this.spu.category3Id=category3Id

            let trademarkresult = await this.$API.spu.reqGetTrademarkList()
            if (trademarkresult.code == 200) {
                this.trademarkList = trademarkresult.data
            }
            let saleAttrresult = await this.$API.spu.reqSaleAttrList()
            if (saleAttrresult.code == 200) {
                this.saleAttrList = saleAttrresult.data
            }
        },
        //取消按钮
        cancel(){
            this.$emit('changeSence', {sence:0,flge:''})
            Object.assign(this._data,this.$options.data())
        }
    },
    computed: {
        unSelectSaleAttr() {
             let result =this.saleAttrList.filter(item => {
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName;
                })
            })
            return result
        }
    }
}
</script>

<style>
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  </style>