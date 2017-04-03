<template>
  <div>
    <v-header title="搭配"></v-header>
    <div class="fitting-block" >
      <div class="scene" @click.prevent>
        <img class="goods-img"
             @touchstart="sceneDown($event, goods)"
             @touchmove="sceneMove($event, goods)"
             @touchend="sceneUp($event, goods)"
             :src="goods.img | imageFormat" v-for="goods in scene_list"
             :style="{'transform': `translate3d(${goods.x}px, ${goods.y}px, 0)`}"
        >
        <div class="save-btn" @click="saveFitting()"><i class="iconfont icon-baocun"></i>&nbsp;保存</div>
      </div>
    </div>
    <transition name="pull-up">
      <div class="fitting-goods" :class="{'pull-up-enter': isPullUp}" @click.prevent>
        <div class="goods-nav">
          <div class="nav-list">
            <div class="item icon-arrow" @click="isPullUp = !isPullUp"><i class="iconfont icon-zhankai"></i></div>
            <div class="item">
              <span>全部</span>
            </div>
            <div class="item">
              <span>收藏</span>
            </div>
            <div class="item">
              <span>手套</span>
            </div>
            <div class="item">
              <span>上衣</span>
            </div>
            <div class="item">
              <span>裤子</span>
            </div>
            <div class="item">
              <span>外套</span>
            </div>
            <div class="item">
              <span>鞋子</span>
            </div>
          </div>
        </div>
        <div class="goods-group">
          <div class="goods-list">
            <div class="item" v-for="goods in goods_list" @click="selectGoods(goods)" :class="{'current': goods.current}">
              <v-image :source="goods.img | imageFormat" size="contain"></v-image>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  let goodsList = [
    {
      id: 2,
      img: '/M2/img/goods/coat/WT2.png'
    },
    {
      id: 3,
      img: '/M2/img/goods/coat/WT3.png'
    },
    {
      id: 4,
      img: '/M2/img/goods/coat/WT4.png'
    }
  ]
  import vHeader from './components/header.vue'
  // import {createUserMatch} from '../api/api'
  export default {
    components: {
      vHeader
    },
    data () {
      return {
        isPullUp: false,
        sceneMoveUse: false,
        scene_list: [],
        goods_list: goodsList
      }
    },
    methods: {
      sceneDown (e, goods) {
        this.sceneMoveUse = true
        goods.offsetX = e.touches[0].clientX - goods.x
        goods.offsetY = e.touches[0].clientY - goods.y
      },
      sceneUp (e, goods) {
        this.sceneMoveUse = false
      },
      sceneMove (e, goods) {
        goods.x = e.touches[0].clientX - goods.offsetX
        goods.y = e.touches[0].clientY - goods.offsetY
      },
      selectGoods (goods) {
        if (typeof goods.current === 'undefined') {
          this.$set(goods, 'current', true)
        } else {
          goods.current = !goods.current
        }
        if (goods.current) {
          let goodsObj = {
            goods_id: goods.id,
            img: goods.img,
            x: 0,
            y: 0,
            scale: 1,
            angle: 0
          }
          this.scene_list.push(goodsObj)
        } else {
          this.scene_list = this.scene_list.filter((item) => {
            return item.id !== goods.id
          })
        }
      },
      saveFitting () {
        let params = {
          user_id: sessionStorage.getItem('user_id'),
          jsonStrGoods: JSON.stringify(this.scene_list)
        }
        console.log(params)
        // createUserMatch()
      }
    }
  }
</script>
<style lang="less">
  @import '../assets/less/fitting.less';
  .pull-up-enter {
    transform: translateY(-8.04rem);
  }
</style>
