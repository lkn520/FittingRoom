<template>
  <div v-if="fitting">
    <v-header title="搭配方案"></v-header>
    <div class="fitting-image">
      <v-image :source="fitting.info.img | imageFormat" size="contain"></v-image>
    </div>
    <div class="fitting-detail-goods">
      <div class="goods-list">
        <div class="item" v-for="goods in fitting.list">
          <div class="image-block">
            <v-image :source="goods.goods.img | imageFormat" size="contain"></v-image>
          </div>
          <div class="goods-info">
            <p class="brand-name">{{goods.goods.brand_name}}</p>
            <p class="name">{{goods.goods.title}}</p>
            <p class="price">{{goods.goods.selling_price | priceFormat}}<s>{{goods.goods.original_price | priceFormat}}</s></p>
          </div>
          <router-link class="goods-link" :to="{name: 'goods', params: {goods_id: goods.goods.goods_id}}">详情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from './components/header.vue'
  import {getMatchDetail} from '../api/api'
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
    }
  }
</script>
<style lang="less">
 @import "../assets/less/fitting-detail.less";
</style>
