<template>
  <div>
    <v-header title="title"></v-header>
    <div class="goods-detail">
      <div class="image-block">
        <v-image source="/static/images/QZ1.png" size="contain"></v-image>
      </div>
      <div class="goods-info">
        <p class="goods-name">11</p>
        <p class="goods-price">111<s>1111</s></p>
      </div>
      <div class="goods-collect"><i class="iconfont icon-weishoucang"></i>&nbsp;收藏</div>
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
  @import "../assets/less/goods.less";
</style>
