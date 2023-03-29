<template>
    <el-card class="box-card" sytle="margin:10px 0 ">
        <div slot="header" class="clearfix">
            <!-- @tab-click="handleClick" -->
            <el-tabs v-model="activeName" class="tab">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visit"></el-tab-pane>
            </el-tabs>
            <div class="right">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <el-date-picker type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                    size="mini" style="width:250px;margin:0 20px" v-model="date" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
        </div>
        <div>
            <el-row>
                <el-col :span="18">
                    <div class="chart" ref="chart"></div>

                </el-col>
                <el-col :span="6">
                    <span>门店{{ title }}排名</span>
                    <ul v-if="title == '销售额'">
                        <li>
                            <div>
                                <span class="SpanBlack">1</span>
                                <span>肯德基</span>
                            </div>
                            <span>323234</span>
                        </li>
                        <li>
                            <div>
                                <span class="SpanBlack">2</span>
                                <span>麦当劳</span>
                            </div>
                            <span>299132</span>
                        </li>
                        <li>
                            <div>
                                <span class="SpanBlack">3</span>
                                <span>必胜客</span>
                            </div>
                            <span>283998</span>
                        </li>
                        <li>
                            <div>
                                <span>4</span>
                                <span>海底捞</span>
                            </div>
                            <span>266223</span>
                        </li>
                        <li>
                            <div>
                                <span>5</span>
                                <span>西贝莜面村</span>
                            </div>
                            <span>223445</span>
                        </li>
                        <li>
                            <div>
                                <span>6</span>
                                <span>汉堡王</span>
                            </div>
                            <span>219663</span>
                        </li>
                        <li>
                            <div>
                                <span>7</span>
                                <span>真功夫</span>
                            </div>
                            <span>200997</span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li>
                            <div>
                                <span class="SpanBlack">1</span>
                                <span>麦当劳</span>
                            </div>
                            <span>211335</span>
                        </li>
                        <li>
                            <div>
                                <span class="SpanBlack">2</span>
                                <span>肯德基</span>
                            </div>
                            <span>210597</span>
                        </li>
                        <li>
                            <div>
                                <span class="SpanBlack">3</span>
                                <span>必胜客</span>
                            </div>
                            <span>200998</span>
                        </li>
                        <li>
                            <div>
                                <span>4</span>
                                <span>海底捞</span>
                            </div>
                            <span>199220</span>
                        </li>
                        <li>
                            <div>
                                <span>5</span>
                                <span>西贝莜面村</span>
                            </div>
                            <span>195444</span>
                        </li>
                        <li>
                            <div>
                                <span>6</span>
                                <span>汉堡王</span>
                            </div>
                            <span>180161</span>
                        </li>
                        <li>
                            <div>
                                <span>7</span>
                                <span>真功夫</span>
                            </div>
                            <span>172995</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>

    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
    name: 'Sale',
    data() {
        return {
            activeName: 'sale',
            echarts: null,
            date: []
        }
    },
    mounted() {
        this.$store.dispatch('getData')

        this.echarts = echarts.init(this.$refs.chart)
        this.echarts.setOption({
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '50%',
                    data: []
                }
            ]
        })
    },
    computed: {
        ...mapState({
            listState: state => state.home.list
        }),
        title() {
            return this.activeName == 'sale' ? '销售额' : '访问量'
        }
    },
    watch: {
        title() {
            this.echarts.setOption({
                title: {
                    text: this.title + '趋势'
                },
                xAxis: [
                    {
                        data: this.title == "销售额" ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis,
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '50%',
                        data: this.title == "销售额" ? this.listState.orderFullYear : this.listState.userFullYear,
                    }
                ]
            })
        },
        listState() {
            this.echarts.setOption({
                xAxis: [
                    {
                        data: this.listState.orderFullYearAxis,
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '50%',
                        data: this.listState.orderFullYear,
                    }
                ]

            })

        }
    },
    methods: {
        //今日
        setDay() {
            const day = dayjs().format('YYYY-MM-DD')
            this.date = [day, day]
        },
        //本周
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            this.date = [start, end]
        },
        //本月
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.date = [start, end]
        },
        //本年
        setYear() {
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.date = [start, end]
        },
    }

}
</script>

<style scoped>
>>>.el-card__header {
    border-bottom: none;
}

.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0;
}

.right span {
    margin: 0 10px
}

.chart {
    width: 100%;
    height: 300px;
}

ul li {
    list-style: none;
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
}

li div {
    display: flex;
}

li div span:nth-child(1) {
    margin-right: 25px;
    display: block;
    height: 18px;
    width: 18px;
    text-align: center;

}

.SpanBlack {
    background-color: black;
    color: white;
    border-radius: 50%;

}
</style>