<template>
  <div class="header">
    <div class="left">
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="right"></div>
  </div>
</template>
<script>
  export default {
    props: ['title']
  }
</script>
<style lang="less">
  @import "../../assets/less/header.less";
</style>
