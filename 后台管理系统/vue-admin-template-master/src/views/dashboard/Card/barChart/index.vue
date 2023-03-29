<template>
    <div class="charts" ref="echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'BarChart',
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
                    type: 'bar',
                    data: [50, 15, 99, 50, 75, 15, 66, 15, 66, 99, 66, 0],
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