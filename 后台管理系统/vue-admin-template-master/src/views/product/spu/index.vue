<template>
  <div>
    <el-card style="margin:20px 0">
      <GategorySelect @getCategoryId="getCategoryId" :show="sence != 0"></GategorySelect>
    </el-card>
    <el-card>
      <div v-show="sence == 0">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" @click="addSpu"
          :disabled="!category3Id">添加SPU</el-button>
        <el-table border :data="records">
          <el-table-column label="序号" align type="index" width="80"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="success" icon="el-icon-plus" title="添加sku" @click="addSku(row)"></el-button>
              <el-button type="warning" icon="el-icon-edit" title="修改spu" @click="updataSpu(row)"></el-button>
              <el-button type="info" icon="el-icon-info" title="查看当前spu全部sku列表" @click="lookSku(row)"></el-button>
              <el-popconfirm style="margin-left:10px" title="确定删除这个SPU吗？" @onConfirm="deleteSpu(row)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" title="删除spu"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination style="margin-top:20px;text-align:center" :total="total" :current-page="page" :page-size="limit"
          @current-change="getSpuData" @size-change="changeSizes" :page-sizes="[3, 5, 10]"
          layout="prev,pager,next,jumper,->,sizes,total">
        </el-pagination>
      </div>
      <spuForm v-show="sence == 1" @changeSence="changeSence" ref="spu"></spuForm>
      <skuForm v-show="sence == 2" ref="sku" @changeSences="changeSences"></skuForm>

      <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible" :before-close="closeDialog">
        <el-table :data="skuList" border  v-loading="loading">
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column label="默认图片">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" style="width:100px;height:100px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import skuForm from './skuForm'
import spuForm from './spuForm'
export default {
  name: 'Spu',
  components: {
    skuForm, spuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 3,
      total: 0,
      records: [],
      sence: 0,
      dialogTableVisible:false,
      spu:{},
      skuList:[],
      loading:true
    }
  },
  methods: {
    //获取分类id
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuData()
      }

    },
    //获取spu数据
    async getSpuData(pages = 1) {
      this.page = pages
      const { page, limit, category3Id } = this
      let result = await this.$API.spu.reqGetSpuList(page, limit, category3Id)
      if (result.code == 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    //切换展示条数
    changeSizes(limit) {
      this.limit = limit
      this.getSpuData()
    },
    //添加spu
    addSpu() {
      this.sence = 1
      this.$refs.spu.getSpuData(this.category3Id)
    },
    //修改spu
    updataSpu(row) {
      this.sence = 1
      this.$refs.spu.getData(row)
    },
    //切换场景 spuform
    changeSence({ sence, flag }) {
      this.sence = sence
      if (flag == '更新') {
        this.getSpuData(this.page)
      } else {
        this.getSpuData()
      }
    },
    //删除Spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getSpuData(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    //添加Sku
    addSku(row) {
      this.sence = 2
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    //切换场景 skuform
    changeSences(sence) {
      this.sence = sence
    },
    //查看当前spu全部sku的列表回调
    async lookSku(spu) {
      this.dialogTableVisible=true
      this.spu=spu
      let result=await this.$API.spu.reqSkuList(spu.id)
      if(result.code==200){
        this.skuList=result.data
        this.loading=false
      }
    },
    //关闭dialog的回调
    closeDialog(done){
      this.loading=true
      this.skuList=[]
      done()
    }
  }
}
</script>

<style>
</style>