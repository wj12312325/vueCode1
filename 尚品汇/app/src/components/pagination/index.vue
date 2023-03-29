<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startAndEnd.start>1" @click="$emit('getPageNo',1)" >1</button>

        <button v-if="startAndEnd.start>2">···</button>

        <button v-for="(page, index) in showButton" :key="index"  @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{ page }}</button>




        <button v-if="startAndEnd.end<totalPage-1">···</button>
        <button v-if="startAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>

        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共{{ total }}条</button>
        
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        //计算分页器总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        //计算分页器起始/结束数字
        startAndEnd() {
            let start = 0, end = 0
            let { pageNo, totalPage, continues } = this
            //不够分页数 即：一共才4页，不能分5页
            if (continues > totalPage) {
                start = 1
                end = totalPage
            } else {
                //够分页数
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                //纠正起始数字
                if (start < 1) {
                    start = 1
                    end = continues
                }
                //纠正结束数字
                if (end > totalPage) {
                    start = totalPage - continues + 1
                    end = totalPage
                }
            }
            return { start, end }
        },
        showButton(){
            var a =[]
            for(var i=this.startAndEnd.start;i<=this.startAndEnd.end;i++){
                a.push(i)
            }
            return a
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
.active{
    background-color: skyblue;
}
</style>
