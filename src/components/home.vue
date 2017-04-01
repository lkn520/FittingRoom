<template>
  <div>
    <div class="home-swipe">
      <swipe>
        <swipe-item class="swipe-item" v-for="item in banner_list" :key="item.id">
          <v-image :source="item.banner_img | imageFormat"></v-image>
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
    <div class="goods" v-infinite-scroll="getBrandRecommendCommodity" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="goods-list">
        <router-link class="goods-item" :to="{name: 'goods', params: {id: '1'}}" v-for="item in recommend_list" :key="item.id">
          <div class="goods-image">
            <v-image :source="item.img | imageFormat" size="contain"></v-image>
          </div>
          <p class="goods-text">{{item.brand_name}}</p>
          <p class="goods-text">{{item.title}}</p>
          <p class="goods-text goods-price">{{item.selling_price | priceFormat}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'
  import {getCarousel, getBrandRecommendCommodity} from '../api/api'
  export default {
    components: {
      Swipe, SwipeItem
    },
    created () {
      getCarousel().then(data => {
        if (data.success === 1) {
          this.banner_list = data.data.list
        }
      })
    },
    methods: {
      getBrandRecommendCommodity () {
        let params = {
          page_num: this.page_num,
          page_no: this.page_no
        }
        this.busy = true
        getBrandRecommendCommodity(params).then(data => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.page_no ++
              this.busy = false
              this.recommend_list.push(...data.data.list)
            }
          }
        })
      }
    },
    data () {
      return {
        banner_list: [],
        recommend_list: [],
        page_num: 10,
        page_no: 1,
        busy: false
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/home.less";
</style>
