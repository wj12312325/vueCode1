<template>
  <div>
    <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btn.add3')!=-1">添加3</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>