<template>
  <div>
    <el-card style="margin:20px 0">
      <GategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></GategorySelect>
    </el-card>

    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" style="margin:20px 0" @click="addAttr" :disabled="!category3Id">
          添加属性</el-button>
        <el-table border :data="attrList">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"></el-table-column>
          <el-table-column label="属性值列表" width="width" prop="prop">
            <template slot-scope="{row}">
              <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin:0 20px">
                {{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="150">
            <template slot-scope="{row}">
                <el-button type="warning" icon="el-icon-edit" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrList">添加属性值
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="margin:20px 0" border :data="attrInfo.attrValueList">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="属性值名称" prop="prop" width="=width">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.valueName" placeholder="请输入属性名称" v-if="row.flag" @blur="toLook(row, $index)"
                @keyup.native.enter="toLook(row, $index)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row, $index)" style="height:100px; display: block;">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="=width">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确认要删除${row.valueName}吗?`" @onConfirm="deleteAttr($index)">
            <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
             </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttrList" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "",
        attrValueList: [
        ],
        categoryId: 0,
        categoryLevel: 3,
      }
    }
  },
  methods: {
    //获取三级分类的id
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
        this.getAttrList()
      }
    },
    //获取商品属性
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      let result = await this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id)
      console.log(result)
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    //添加属性
    addAttr() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: "",
        attrValueList: [
        ],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    //修改属性
    updateAttr(row) {
      this.isShowTable = false
      //这里必须要深拷贝，浅拷贝不行
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item => {
        // 不能直接 item.flag=false (因为这样的话就没有响应式了，基础知识)添加新的响应式属性要用#set
        this.$set(item, 'flag', false)
      })
    },
    //添加属性值
    addAttrList() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    //切换到查看模式 并且获取焦点
    toLook(row, index) {
      if (row.valueName.trim() == '') {
        this.$message('输入不能为空')
        // this.$nextTick(() => {
        //   this.$refs[index].focus()
        // })
        return
      }
      let isRepeat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      if (isRepeat) {
        this.$message('不能重复输入')

        return
      }
      row.flag = false
    },
    //切换到编辑模式 同时获取焦点
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    //删除属性值
    deleteAttr(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    //修改与上传属性
    async addOrUpdateAttrList(){
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttrInfo(this.attrInfo)
        this.isShowTable=true
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败')
      }
    }
  }
}
</script>

<style>
</style>