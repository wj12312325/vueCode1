<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted(){
    //通知Vuex发请求，获取数据，存储到仓库中 派发一个action 放在qpp中。提前准备好，只执行一次
    this.$store.dispatch('home/categoryList')
  }
};
</script>

<style>
</style>