<template>
  <div>
    <div class="home-swipe">
      <swipe>
        <swipe-item class="swipe-item">
          <v-image source="/static/images/QZ1.png"></v-image>
        </swipe-item>
        <swipe-item class="swipe-item">
          <v-image source="/static/images/QZ1.png"></v-image>
        </swipe-item>
        <swipe-item class="swipe-item">
          <v-image source="/static/images/QZ1.png"></v-image>
        </swipe-item>
      </swipe>
    </div>
    <div class="nav">
      <router-link class="left" :to="{name: 'type'}">
        <i class="iconfont icon-dapei"></i>&nbsp;&nbsp;开始搭配
      </router-link>
      <router-link class="right" :to="{name: 'type'}">
        所有商品&nbsp;&nbsp;<i class="iconfont icon-suoyoushangpin"></i>
      </router-link>
    </div>
    <div class="goods">
      <div class="goods-list">
        <div class="goods-item">
          <div class="goods-image">
            <v-image source="'/static/images/QZ1.png'" size="contain"></v-image>
          </div>
          <p class="goods-text">VALENTINO</p>
          <p class="goods-text">金属杰克</p>
          <p class="goods-text goods-price">￥3982</p>
        </div>
        <div class="goods-item">
          <div class="goods-image">
            <v-image source="'/static/images/QZ1.png'" size="contain"></v-image>
          </div>
          <p class="goods-text">VALENTINO</p>
          <p class="goods-text">金属杰克</p>
          <p class="goods-text goods-price">￥3982</p>
        </div>
        <div class="goods-item">
          <div class="goods-image">
            <v-image source="'/static/images/QZ1.png'" size="contain"></v-image>
          </div>
          <p class="goods-text">VALENTINO</p>
          <p class="goods-text">金属杰克</p>
          <p class="goods-text goods-price">￥3982</p>
        </div>
        <div class="goods-item">
          <div class="goods-image">
            <v-image source="'/static/images/QZ1.png'" size="contain"></v-image>
          </div>
          <p class="goods-text">VALENTINO</p>
          <p class="goods-text">金属杰克</p>
          <p class="goods-text goods-price">￥3982</p>
        </div>
        <div class="goods-item">
          <div class="goods-image">
            <v-image source="'/static/images/QZ1.png'" size="contain"></v-image>
          </div>
          <p class="goods-text">VALENTINO</p>
          <p class="goods-text">金属杰克</p>
          <p class="goods-text goods-price">￥3982</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'
  export default {
    components: {
      Swipe, SwipeItem
    }
  }
</script>
<style lang="less">
  @import "../assets/less/home.less";
</style>
