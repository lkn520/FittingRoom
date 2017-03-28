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
    <div class="detail-block">
      <div class="detail-header">
        <span>更多细节图</span>
      </div>
      <div class="detail-image">
        <v-image source="/static/images/QZ1.png" size="contain"></v-image>
      </div>
      <div class="detail-image">
        <v-image source="/static/images/QZ1.png" size="contain"></v-image>
      </div>
    </div>
    <div class="recommend-block">
      <div class="recommend-header">
        <span>精选搭配</span>
      </div>
      <div class="recommend-list">
        <div class="item">
          <div class="image-block">
            <v-image source="/static/images/QZ1.png"></v-image>
          </div>
          <div class="name">111</div>
          <div class="price">111</div>
        </div>
        <div class="item">
          <div class="image-block"></div>
          <div class="name"></div>
          <div class="price"></div>
        </div>
        <div class="item">
          <div class="image-block"></div>
          <div class="name"></div>
          <div class="price"></div>
        </div>
      </div>
    </div>
    <div id="top" @click="goToTop()">
      <i class="iconfont icon-shang"></i>
    </div>
  </div>
</template>
<script>
  import vHeader from './components/header.vue'
  export default {
    components: {
      vHeader
    },
    methods: {
      goToTop () {
        document.body.scrollTop = 0
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/goods.less";
</style>
