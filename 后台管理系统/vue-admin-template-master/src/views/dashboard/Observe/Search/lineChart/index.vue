<template>
    <div class="charts" ref="echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'LineChart',
    mounted() {
        let LineCharts = echarts.init(this.$refs.echarts)
        LineCharts.setOption({
            xAxis: {
                show: false,
                type: 'category'
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'line',
                    data: [50, 15, 99, 50, 75, 15, 66],
                    itemStyle: {
                        opacity: 0
                    },
                    smooth: true,
                    lineStyle: {
                        color: 'blue'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'blue' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            tooltip:{}

        })
    }

}
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>