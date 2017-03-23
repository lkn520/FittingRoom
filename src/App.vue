<template>
  <div id="app">
    <v-footer />
    <router-view></router-view>
  </div>
</template>
<script>
  import vFooter from './components/components/footer.vue'
  export default {
    name: 'app',
    components: {
      vFooter
    }
  }
</script>
<style lang="less">
  @import "./assets/less/App.less";
</style>
