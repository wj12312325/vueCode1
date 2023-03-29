<template>
  <div>
    <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btn.add1')!=-1">添加1</el-button>
    <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btn.add2')!=-1">添加2</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>