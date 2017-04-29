<template>
  <div>
    <div class="home-swipe">
      <swipe>
        <swipe-item class="swipe-item" v-for="item in banner_list" :key="item.banner_id">
          <v-image :source="item.img | imageFormat"></v-image>
        </swipe-item>
      </swipe>
    </div>
    <div class="nav">
      <router-link class="left" :to="{name: 'fitting'}">
        <i class="iconfont icon-dapei"></i>&nbsp;&nbsp;开始搭配
      </router-link>
      <router-link class="right" :to="{name: 'type'}">
        所有商品&nbsp;&nbsp;<i class="iconfont icon-suoyoushangpin"></i>
      </router-link>
    </div>
    <div class="goods" v-infinite-scroll="getBrandRecommendCommodity" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="goods-list">
        <router-link class="goods-item" v-for="goods in recommend_list" :to="{name: 'goods', params: {goods_id: goods.goods_id}}" :key="goods.goods_id">
          <div class="goods-image">
            <v-image :source="goods.img | imageFormat" size="contain"></v-image>
          </div>
          <p class="goods-text">{{goods.brand_name}}</p>
          <p class="goods-text">{{goods.title}}</p>
          <p class="goods-text goods-price">{{goods.selling_price | priceFormat}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'
  import wx from 'weixin-js-sdk'
  import {mapState} from 'vuex'
  import {getCarousel, getBrandRecommendCommodity, wxjssdk, getBrandDetail} from '../api/api'
  export default {
    components: {
      Swipe, SwipeItem
    },
    computed: {
      ...mapState['brand']
    },
    created () {
      getCarousel({brand: localStorage.getItem('brand')}).then(data => {
        if (data.success === 1) {
          this.banner_list = data.data.list
        }
      })
      wxjssdk().then(data => {
        if (data.success === 1) {
          let {appId, nonceStr, signature, timestamp} = data.data
          wx.config({
            debug: false,
            appId,
            nonceStr,
            signature,
            timestamp,
            jsApiList: ['onMenuShareTimeline']
          })
        }
      })
      // 分享
      wx.ready(() => {
        getBrandDetail({brand: localStorage.getItem('brand')}).then(data => {
          if (data.success === 1) {
            let {img, name} = data.data.info
            wx.onMenuShareTimeline({
              title: name, // 分享标题
              link: '', // 分享链接
              imgUrl: img, // 分享图标
              success () {
                // 用户确认分享后执行的回调函数
              },
              cancel () {
                // 用户取消分享后执行的回调函数
              }
            })
          }
        })
      })
    },
    methods: {
      getBrandRecommendCommodity () {
        let params = {
          page_num: this.page_num,
          page_no: this.page_no,
          brand: localStorage.getItem('brand')
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
