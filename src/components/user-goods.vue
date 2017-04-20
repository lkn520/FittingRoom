<template>
  <div id="user-goods" v-infinite-scroll="getMyCollectGoodsList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="goods-list">
      <router-link class="item" v-for="goods in goods_list" :to="{name: 'goods', params: {goods_id: goods.goods_id}}" :key="goods.goods_id">
        <div class="image-block">
          <v-image :source="goods.img | imageFormat" size="contain"></v-image>
        </div>
        <div class="footer-block">
          <div class="left">
            <div class="logo">
              <v-image :source="goods.brand.img" size="contain"></v-image>
            </div>
            <span class="text">{{goods.brand.name}}</span>
          </div>
          <div class="right">
            <i class="iconfont icon-yishoucang"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {getMyCollectGoodsList} from '../api/api'
  export default {
    created () {
    },
    data () {
      return {
        goods_list: [],
        page_num: 10,
        page_no: 1,
        busy: false
      }
    },
    methods: {
      getMyCollectGoodsList () {
        let params = {
          user_id: localStorage.getItem('user_id'),
          page_num: this.page_num,
          page_no: this.page_no
        }
        this.busy = true
        getMyCollectGoodsList(params).then(data => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.goods_list.push(...data.data.list)
              this.page_no ++
              this.busy = false
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/user-goods.less";
</style>
