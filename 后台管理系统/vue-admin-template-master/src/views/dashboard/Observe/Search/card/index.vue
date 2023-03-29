<template>
    <div>
        <div class="card-header">
            <span>{{ title }}</span>
            <i class="el-icon-info"></i>
        </div>
        <div class="card-content">
            <span>{{ count }}</span>
            <div class="card-main">
                <slot name="charts">
                </slot>
            </div>
        </div>
        <div class="card-footer">
            <slot name="footer">
            </slot>

        </div>
    </div>

</template>

<script>
export default {
    name: 'card',
    props: ['title', 'count']

}
</script>

<style scoped>
.card-header {
    margin-top: 20px;
    color: rgb(202, 196, 196);
    font-size: 14px;
}

.card-header i {
    margin-left: 10px;
}

.card-content {
    display: flex;
    flex-direction: row;
    font-size: 26px;
    margin: 10px 0;
    padding: 10px 0;

}

.card-main {
    font-size: 14px;
    margin-left: 20px;
    margin-top:8px;
    color: rgb(202, 196, 196);
}


.card-footer {
    height: 50px;
}
</style>