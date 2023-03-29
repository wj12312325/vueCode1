<template>
    <div style="margin-bottom:10px">
        <el-row>
            <el-col :span="6">
                <el-card>
                    <Detail title="总销售额" count="￥ 126560">
                        <template slot="charts">
                            <div>
                                <span>周同比&nbsp;&nbsp;56.67%</span>
                                &nbsp;
                                <i class="el-icon-caret-top" style="color:red"></i>
                                &nbsp;
                                <span>日同比&nbsp;&nbsp;19.16%</span>
                                &nbsp;
                                <i class="el-icon-caret-bottom" style="color:greenyellow"></i>
                            </div>
                        </template>
                        <template slot="footer">
                            <span>日销售额￥ 12423</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail title="访问量" count="88460">
                        <template slot="charts">
                            <LineChart></LineChart>
                        </template>
                        <template slot="footer">
                            <span>日访问量 1234</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail title="支付笔数" count="88460">
                        <template slot="charts">
                            <BarChart></BarChart>
                        </template>
                        <template slot="footer">
                            <span>转化率 65%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail title="运营活动效果" count="78%">
                        <template slot="charts">
                            <ProgressChart></ProgressChart>
                        </template>
                        <template slot="footer">
                            <span>周同比&nbsp;&nbsp;12%</span>
                            &nbsp;
                            <i class="el-icon-caret-top" style="color:red"></i>
                            &nbsp;
                            <span>日同比&nbsp;&nbsp;11%</span>
                            &nbsp;
                            <i class="el-icon-caret-bottom" style="color:greenyellow"></i>
                        </template>
                    </Detail>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './lineChart'
import BarChart from './barChart'
import ProgressChart from './progressChart'
export default {
    name: 'Card',
    components: { Detail, LineChart ,BarChart,ProgressChart}

}
</script>

<style>
</style>