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
            <div class="item" v-for="item in nav_list" @click="getCategoryGoods(item.id)">
              <span>{{item.name}}</span>
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
  import vHeader from './components/header.vue'
  import {createUserMatch, getTopCategory, getCategoryGoods} from '../api/api'
  export default {
    components: {
      vHeader
    },
    created () {
      getTopCategory().then(data => {
        if (data.success === 1) {
          this.nav_list = data.data.list
          this.getCategoryGoods(this.nav_list[0].id)
        }
      })
    },
    data () {
      return {
        isPullUp: false,
        sceneMoveUse: false,
        scene_list: [],
        goods_list: [],
        nav_list: []
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
            return item.goods_id !== goods.id
          })
        }
      },
      saveFitting () {
        let params = {
          user_id: sessionStorage.getItem('user_id'),
          jsonStrGoods: JSON.stringify(this.scene_list)
        }
        alert(JSON.stringify(params))
        createUserMatch(params)
      },
      getCategoryGoods (id) {
        let params = {
          category: id
        }
        getCategoryGoods(params).then(data => {
          if (data.success === 1) {
            this.goods_list = data.data.list
            this.goodsListInit()
          }
        })
      },
      goodsListInit () {
        let hashmap = {}
        this.scene_list.forEach(item => {
          hashmap[item.goods_id] = 1
        })
        this.goods_list.forEach(item => {
          if (hashmap[item.id] === 1) {
            this.$set(item, 'current', true)
          }
        })
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
