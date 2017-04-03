<template>
  <div>
    <v-header v-if="goods_detail" :title="goods_detail.brand_name"></v-header>
    <div v-if="goods_detail">
      <div class="goods-detail">
        <div class="image-block">
          <v-image :source="goods_detail.img | imageFormat" size="contain"></v-image>
        </div>
        <div class="goods-info">
          <p class="goods-name">{{goods_detail.title}}</p>
          <p class="goods-price">{{goods_detail.selling_price | priceFormat}}<s>{{goods_detail.original_price | priceFormat}}</s></p>
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
    </div>
    <div class="recommend-block">
      <div class="recommend-header">
        <span>精选搭配</span>
      </div>
      <div class="recommend-list" v-infinite-scroll="getChoicenessMatchList" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
        <router-link class="item" v-for="item in choiceness_list" :to="{name: 'goods', params: {goods_id: item.id}}" :key="item.id" replace>
          <div class="image-block">
            <v-image :source="item.img | imageFormat" size="contain"></v-image>
          </div>
          <div class="name">{{item.brand_name}}</div>
          <div class="price">{{item.selling_price | priceFormat}}</div>
        </router-link>
      </div>
    </div>
    <div id="top" @click="goToTop()">
      <i class="iconfont icon-shang"></i>
    </div>
  </div>
</template>
<script>
  import vHeader from './components/header.vue'
  import {getGoodsDetail, toggleCollect, getChoicenessMatchList} from '../api/api'
  export default {
    components: {
      vHeader
    },
    created () {
      this.getGoodsDetail()
    },
    beforeRouteUpdate (to, from, next) {
      this.getGoodsDetail(to.params.goods_id)
      next()
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
      },
      getChoicenessMatchList () {
        let params = {
          goods_id: this.$route.params.goods_id,
          page_num: this.page_num,
          page_no: this.page_no
        }
        this.busy = true
        getChoicenessMatchList(params).then(data => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.page_no ++
              this.busy = false
              this.choiceness_list.push(...data.data.list)
            }
          }
        })
      },
      getGoodsDetail () {
        let goodsId = typeof arguments[0] === 'undefined' ? this.$route.params.goods_id : arguments[0]
        let params = {
          goods_id: goodsId,
          user_id: sessionStorage.getItem('user_id')
        }
        getGoodsDetail(params).then(data => {
          if (data.success === 1) {
            this.goods_detail = data.data
            this.goToTop()
          }
        })
      }
    },
    data () {
      return {
        goods_detail: null,
        page_num: 4,
        page_no: 1,
        choiceness_list: [],
        busy: false
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/goods.less";
</style>
