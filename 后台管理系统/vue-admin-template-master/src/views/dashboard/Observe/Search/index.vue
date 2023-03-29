<template>
    <div>
        <el-card>
            <div class="header">
                <span>线上热门搜索</span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item >双皮奶</el-dropdown-item>
                        <el-dropdown-item >蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="main">
                <el-row>
                    <el-col :span="12">
                        <card title="搜索用户数" count="12321">
                            <template slot="charts">
                                <span>17.1%</span>
                                &nbsp;
                                <i class="el-icon-caret-top" style="color:red"></i>
                                &nbsp;
                                <i class="el-icon-caret-bottom" style="color:greenyellow"></i>
                            </template>
                            <template slot="footer">
                                <lineChart></lineChart>
                            </template>
                        </card>
                    </el-col>
                    <el-col :span="12">
                        <card title="人均搜索次数" count="2.7">
                            <template slot="charts">
                                <span>26.2%</span>
                                &nbsp;
                                <i class="el-icon-caret-top" style="color:red"></i>
                                &nbsp;
                                <i class="el-icon-caret-bottom" style="color:greenyellow"></i>
                            </template>
                            <template slot="footer">
                                <lineChart></lineChart>
                            </template>
                        </card>
                    </el-col>
                </el-row>
            </div>
            <div class="footer">
                <el-table ref="filterTable" style="width: 100%; margin-top: 10px;" border>
                    <el-table-column label="排名" width="90" type="index">
                    </el-table-column>
                    <el-table-column label="搜索关键字">
                    </el-table-column>
                    <el-table-column label="用户数" sortable>
                    </el-table-column>
                    <el-table-column label="周涨幅" sortable>
                    </el-table-column>
                </el-table>
                <el-pagination layout="prev, pager, next" :total="1000" class="pagination" style="text-align: right;">
                </el-pagination>
            </div>
        </el-card>

    </div>
</template>

<script>
import card from './card'
import lineChart from './lineChart'
export default {
    name: 'Search',
    components: { card, lineChart }

}
</script>

<style>
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  </style>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    height: 40px;
}
</style>