<template>
    <div>
        <div class="card-header">
            <span>{{title}}</span>
            <i class="el-icon-info"></i>
        </div>
        <div class="card-content">{{count}}</div>
        <div class="card-charts">
            <slot name="charts">
            </slot>
        </div>
        <div class="card-footer">
            <slot name="footer">
            
            </slot>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Detail',
    props:['title','count']

}
</script>

<style scoped>
    .card-header{
        display: flex;
        justify-content: space-between;
        color:rgb(202, 196, 196);
        font-size: 14px;
    }
    .card-content{
      font-size: 26px;  
      margin: 10px 0;
      padding: 10px 0;

    }
    .card-charts{
        height: 50px;
        font-size: 14px;
        
    }
    
    .card-footer{
        border-top: 1px solid #eee;
        height: 20px;
        padding-top: 10px;
    }

</style>