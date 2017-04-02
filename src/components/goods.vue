<template>
  <div v-if="goods_detail">
    <v-header :title="goods_detail.brand_name"></v-header>
    <div class="goods-detail">
      <div class="image-block">
        <v-image :source="goods_detail.img | imageFormat" size="contain"></v-image>
      </div>
      <div class="goods-info">
        <p class="goods-name">{{goods_detail.title}}</p>
        <p class="goods-price">{{goods_detail.selling_price}}元<s>{{goods_detail.original_price}}元</s></p>
      </div>
      <div class="goods-collect" v-if="goods_detail.is_collect == 0" @click="toggleCollect">
        <i class="iconfont icon-weishoucang"></i>&nbsp;收藏
      </div>
      <div class="goods-collect" v-else @click="toggleCollect">
        <i class="iconfont icon-yishoucang icon-collected"></i>&nbsp;已收藏
      </div>
    </div>
    <div class="detail-block">
      <div class="detail-header">
        <span>更多细节图</span>
      </div>
      <div class="detail-image" v-for="item in goods_detail.more_imageUrl">
        <v-image :source="item | imageFormat" size="contain"></v-image>
      </div>
      <div class="detail-text" v-for="item in goods_detail.attribute">
        <p>{{item.key}}：{{item.value}}</p>
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
          <div class="name">1111</div>
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
  import {getGoodsDetail, toggleCollect} from '../api/api'
  export default {
    components: {
      vHeader
    },
    created () {
      let params = {
        goods_id: this.$route.params.goods_id,
        user_id: sessionStorage.getItem('user_id')
      }
      getGoodsDetail(params).then(data => {
        if (data.success === 1) {
          this.goods_detail = data.data
        }
      })
    },
    methods: {
      goToTop () {
        document.body.scrollTop = 0
      },
      toggleCollect () {
        let params = {
          type: 1,
          concrete_id: this.goods_detail.id,
          user_id: sessionStorage.getItem('user_id')
        }
        toggleCollect(params).then(data => {
          if (data.success === 1) {
            this.goods_detail.is_collect = data.data.is_collect
          }
        })
      }
    },
    data () {
      return {
        goods_detail: null
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/goods.less";
</style>
