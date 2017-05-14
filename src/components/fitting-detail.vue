<template>
  <div v-if="fitting">
    <v-header title="搭配方案">
      <i slot="right" class="iconfont icon-shouye" @click="$router.push({'name': 'home'})"></i>
    </v-header>
    <div class="fitting-image">
      <v-image :source="fitting.info.img | imageFormat" size="contain"></v-image>
    </div>
    <div class="fitting-edit">
      <div class="fitting-edit__btn" @click="toggleCollect(fitting.info)" v-if="fitting.info.is_collect == 1">
        <i class="iconfont icon-yishoucang"></i>&nbsp;&nbsp;已收藏
      </div>
      <div class="fitting-edit__btn" @click="toggleCollect(fitting.info)" v-else>
        <i class="iconfont icon-weishoucang"></i>&nbsp;&nbsp;收藏
      </div>
      <router-link class="fitting-edit__btn" :to="{name: 'fitting', query: {match_id: fitting.info.id}}">
        <i class="iconfont icon-dapei"></i>&nbsp;&nbsp;设计
      </router-link>
    </div>
    <div class="fitting-detail-goods">
      <div class="goods-list">
        <div class="item" v-for="goods in fitting.list" v-if="goods.is_goods == 1">
          <div class="image-block">
            <v-image :source="goods.goods.img | imageFormat" size="contain"></v-image>
          </div>
          <div class="goods-info">
            <p class="brand-name">{{goods.goods.brand_name}}</p>
            <p class="name">{{goods.goods.title}}</p>
            <p class="price">{{goods.goods.selling_price | priceFormat}}<s>{{goods.goods.original_price | priceFormat}}</s></p>
          </div>
          <div class="goods-link">
            <router-link :to="{name: 'goods', params: {goods_id: goods.goods.goods_id}}">详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from './components/header.vue'
  import {getMatchDetail, toggleCollect} from '../api/api'
  export default {
    components: {
      vHeader
    },
    created () {
      let params = {
        match_id: this.$route.params.match_id
      }
      getMatchDetail(params).then(data => {
        if (data.success === 1) {
          this.fitting = data.data
        }
      })
    },
    data () {
      return {
        fitting: null
      }
    },
    methods: {
      toggleCollect (match) {
        let params = {
          type: 2,
          user_id: localStorage.getItem('user_id'),
          concrete_id: match.id
        }
        toggleCollect(params).then(data => {
          if (data.success === 1) {
            match.is_collect = data.data.is_collect
          }
        })
      }
    }
  }
</script>
<style lang="less">
 @import "../assets/less/fitting-detail.less";
</style>
