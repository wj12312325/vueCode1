<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0" @click="addLogo">添加</el-button>
    <!-- 表格组件 -->
    <el-table border style="margin:10px 0" :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" @click="changeLogo(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteLogo(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination style="margin-top:20px;text-align:center" :total="total" :current-page="page" :page-size="limit"
      :page-sizes="[3, 5, 10]" @current-change="getPageList" @size-change="changeSizes"
      layout="prev,pager,next,jumper,->,sizes,total">
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form style="width:80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible: false,
      imageUrl: "",
      tmForm: {
        logoUrl: '',
        tmName: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ],
      }

    }
  },
  methods: {
    //获取列表数据
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      let result = await this.$API.trademark.reqGetTradeMarkList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    //换每页展示的数据数
    changeSizes(limit) {
      this.limit = limit
      this.getPageList()
    },
    //添加LOGO
    addLogo() {
      this.tmForm = {
        logoUrl: '',
        tmName: ''
      }
      this.dialogFormVisible = true
    },
    //修改LOGO
    changeLogo(row) {
      console.log(row)
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },
    //上传成功时
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    //上传前 判断图片格式与大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //确认上传或者修改
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          console.log(result)
          if (result.code == 200) {
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '上传品牌成功'
            })
            this.getPageList(this.tmForm.id ? this.page : 1)
          }
        } else {
          console.log('请正确填写！')
          return false
        }
      })
    },
    //删除logo
    deleteLogo(row) {
      this.$confirm(`是否删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList(this.list.length>1?this.page:this.page-1)
        }else{
          alert('删除失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    this.getPageList()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>