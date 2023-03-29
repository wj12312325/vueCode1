<template>
  <div>
    <el-table :data="records" border>
      <el-table-column
        type="index"
        align="center"
        width="80"
        label="序号"
      ></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        width="150"
      ></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80" prop="weight"></el-table-column>
      <el-table-column label="价格" width="80" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="info"
            icon="el-icon-bottom"
            v-if="row.isSale == 0"
            @click="OnSale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-top"
            v-else
            @click="CancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteSku(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      @current-change="getSkuList"
      layout="prev,pager,next,jumper,->,sizes,total"
      style="text-align: center"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
          >
            {{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      records: [],
      skuInfo: {},
      show: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //获取初始化数据
    async getSkuList(pages = 1) {
      this.page = pages;
      let result = await this.$API.sku.reqSkuList(this.page, this.limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //切换分页器limit
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    //上架
    async OnSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    //下架
    async CancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    //edit
    edit() {
      this.$message({
        type: "info",
        message: "正在开发中",
      });
    },
    //获取sku数据
    async getSkuInfo(sku) {
      let result = await this.$API.sku.reqGetSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
      this.show = true;
    },
    //删除SKU
    async deleteSku(sku) {
      let result = await this.$API.sku.reqDeleteSku(sku.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除SKU成功",
        });
        this.getSkuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: 600;
}

.el-col {
  margin: 10px 10px;
}

::v-deep .el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
