<template>
  <div>
    <div class="nav">
      <router-link class="left" :to="{name: 'fitting'}">
        <i class="iconfont icon-dapei"></i>&nbsp;&nbsp;开始搭配
      </router-link>
      <router-link class="right" :to="{name: 'type'}">
        所有商品&nbsp;&nbsp;<i class="iconfont icon-suoyoushangpin"></i>
      </router-link>
    </div>
    <div class="goods" v-infinite-scroll="getHomeRecommend" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <template v-for="goodsAndFitting in recommend_list">
        <v-fitting-item v-for="match in goodsAndFitting.match_list" :match="match" :key="match.match_id"></v-fitting-item>
        <div class="goods-list">
          <router-link class="goods-item" v-for="goods in goodsAndFitting.goods_list" :to="{name: 'goods', params: {goods_id: goods.goods_id}}" :key="goods.goods_id">
            <div class="goods-image">
              <v-image :source="goods.img | imageFormat" size="contain"></v-image>
            </div>
            <p class="goods-text">{{goods.brand_name}}</p>
            <p class="goods-text">{{goods.title}}</p>
            <p class="goods-text goods-price">{{goods.selling_price | priceFormat}}</p>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import 'vue-swipe/dist/vue-swipe.css'
  import {mapState} from 'vuex'
  import wx from 'weixin-js-sdk'
  import vFittingItem from './components/fitting-item.vue'
  import {getCarousel, getBrandDetail, getHomeData} from '../api/api'
  export default {
    components: {
      Swipe, SwipeItem, vFittingItem
    },
    created () {
      getHomeData()
      // 轮播图
      getCarousel({brand: localStorage.getItem('brand')}).then(data => {
        if (data.success === 1) {
          this.banner_list = data.data.list
        }
      })
      let shareUrl = this.$shareUrlFormat(this.$route.path, {brand: localStorage.getItem('brand')})
      // 获取微信配置
      this.$wxjssdk()
      // 分享
      wx.ready(() => {
        // 获取品牌信息
        getBrandDetail({brand: localStorage.getItem('brand')}).then(data => {
          if (data.success === 1) {
            let {img, name} = data.data.info
            // 分享朋友圈
            wx.onMenuShareTimeline({
              title: name, // 分享标题
              link: shareUrl, // 分享链接
              imgUrl: img // 分享图标
            })
            // 分享好友
            wx.onMenuShareAppMessage({
              title: name, // 分享标题
              link: shareUrl, // 分享链接
              imgUrl: img // 分享图标
            })
          }
        })
      })
    },
    computed: {
      ...mapState['brand']
    },
    methods: {
      getHomeRecommend () {
        let params = {
          page_num: this.page_num,
          brand: localStorage.getItem('brand'),
          user_id: localStorage.getItem('user_id')
        }
        this.busy = true
        getHomeData(params).then(data => {
          if (data.success === 1) {
            this.recommend_list.push(...data.data.list)
          }
        })
      }
    },
    data () {
      return {
        banner_list: [],
        recommend_list: [],
        page_num: 100,
        page_no: 1,
        busy: false
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/home.less";
</style>
