<template>
  <div id="type-goods" v-infinite-scroll="getCategoryGoods" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <v-header :title="$route.params.title"></v-header>
    <div class="goods-list">
      <router-link class="item" v-for="item in goods_list" :to="{name: 'goods', params: {goods_id: item.goods_id}}" :key="item.goods_id">
        <div class="image-block">
          <v-image :source="item.img | imageFormat" size="contain"></v-image>
        </div>
        <div class="footer-block">
          <div class="left" @click.prevent="toggleCollect(item)" v-if="item.is_collect == 1">
            <i class="iconfont icon-yishoucang icon-collect"></i>&nbsp;已收藏
          </div>
          <div class="left" @click.prevent="toggleCollect(item)" v-else>
            <i class="iconfont icon-weishoucang"></i>&nbsp;收藏
          </div>
          <router-link class="right" :to="{name: 'fitting', query: {goods_id: item.goods_id}}">
            <i class="iconfont icon-dapei"></i>&nbsp;搭配
          </router-link>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {getCategoryGoods, toggleCollect} from '../api/api'
  import vHeader from './components/header.vue'
  export default {
    components: {
      vHeader
    },
    data () {
      return {
        page_num: 10,
        page_no: 1,
        goods_list: [],
        busy: false
      }
    },
    methods: {
      getCategoryGoods () {
        let params = {
          category: this.$route.params.id,
          page_num: this.page_num,
          page_no: this.page_no,
          user_id: sessionStorage.getItem('user_id')
        }
        this.busy = true
        getCategoryGoods(params).then(data => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.page_no++
              this.busy = false
              this.goods_list.push(...data.data.list)
            }
          }
        })
      },
      toggleCollect (goods) {
        let params = {
          type: 1,
          user_id: sessionStorage.getItem('user_id'),
          concrete_id: goods.goods_id
        }
        toggleCollect(params).then(data => {
          if (data.success === 1) {
            goods.is_collect = data.data.is_collect
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/type-goods.less";
</style>
