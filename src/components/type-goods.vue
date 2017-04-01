<template>
  <div id="type-goods" v-infinite-scroll="getCategoryGoods" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <v-header :title="$route.params.title"></v-header>
    <div class="goods-list">
      <div class="item" v-for="item in goods_list">
        <div class="image-block">
          <v-image :source="item.img | imageFormat" size="contain"></v-image>
        </div>
        <div class="footer-block">
          <div class="left" @click="toggleCollect(item.id)">
            <i class="iconfont icon-weishoucang"></i>&nbsp;收藏
          </div>
          <div class="right">
            <i class="iconfont icon-dapei"></i>&nbsp;搭配
          </div>
        </div>
      </div>
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
          page_no: this.goods_list
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
      toggleCollect (id) {
        let params = {
          type: 1,
          user_id: sessionStorage.getItem('user_id'),
          concrete_id: id
        }
        toggleCollect(params).then(data => {})
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/type-goods.less";
</style>
