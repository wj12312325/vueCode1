<template>
    <div>
        <el-card>
            <div class="header">
                <span>销售额类型占比</span>
                <div class="radio">
                    <el-radio-group v-model="value" size="medium">
                        <el-radio-button label="全部渠道"></el-radio-button>
                        <el-radio-button label="线上"></el-radio-button>
                        <el-radio-button label="门店"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div>
                <div class="echart" ref="echart"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'Category',
    data() {
        return {
            value: '全部渠道'
        }
    },
    mounted() {
        const echart = echarts.init(this.$refs.echart)
        echart.setOption({
            title:{
                text:'搜索引擎',
                subtext:1048,
                left:'center',
                top:'center'
            },
            tooltip: {
                trigger: 'item'
            },
            
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside'
                    },
                    
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ]
                }
            ]
        })
        echart.on('mouseover',(params)=>{
            const {value,name}= params.data
            echart.setOption({
                title:{
                    text:name,
                    subtext:value
                }
            })

        })
    
    }

}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    height: 40px;
}

.radio {
    margin-top: -10px;
}
.echart{
    width: 100%;
    height: 300px;
}
</style>