<template>
  <div>
    <v-header title="搭配"></v-header>
    <div class="fitting-block">
      <div class="scene"></div>
    </div>
  </div>
</template>
<script>
  import vHeader from './components/header.vue'
  export default {
    components: {
      vHeader
    }
  }
</script>
<style lang="less">
  @import '../assets/less/fitting.less';
</style>
