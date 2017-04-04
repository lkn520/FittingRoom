<template>
  <div @touchmove.prevent.stop>
    <v-header title="搭配"></v-header>
    <div class="fitting-block" >
      <div class="scene">
        <img class="goods-img"
             @touchstart.prevent="sceneDown($event, goods)"
             @touchmove.prevent="sceneMove($event, goods)"
             @touchend.prevent="sceneUp($event, goods)"
             :src="goods.img | imageFormat" v-for="goods in scene_list"
             :style="{'transform': `translate3d(${goods.x}px, ${goods.y}px, 0)`, 'zIndex': goods.sort}"
             :class="{'current': select_goods&&select_goods.goods_id === goods.goods_id}"
        >
        <div class="save-btn" @click="saveFitting()"><i class="iconfont icon-baocun"></i>&nbsp;保存</div>
        <div class="edit-group">
          <div class="edit-item" @click="clearScene()">
            <i class="iconfont icon-qingkong"></i>清空
          </div>
          <div class="edit-item" @click="upGoods()">
            <i class="iconfont icon-shang"></i>向上
          </div>
          <div class="edit-item" @click="downGoods()">
            <i class="iconfont icon-xia"></i>向下
          </div>
          <div class="edit-item" @click="delGoods()">
            <i class="iconfont icon-shanchu"></i>删除
          </div>
        </div>
      </div>
    </div>
    <div class="fitting-goods" :class="{'pull-up-enter': isPullUp}" @touchmove.stop>
      <div class="goods-nav">
        <div class="nav-list">
          <div class="item icon-arrow" :class="{'pull-up': isPullUp}" @click="isPullUp = !isPullUp"><i class="iconfont icon-zhankai"></i></div>
          <div class="item" v-for="item in nav_list" @click="getCategoryGoods(item.category_id)">
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
          this.getCategoryGoods(this.nav_list[0].category_id)
        }
      })
    },
    data () {
      return {
        isPullUp: false,
        sceneMoveUse: false,
        scene_list: [],
        goods_list: [],
        nav_list: [],
        select_goods: null,
        sort: 50
      }
    },
    methods: {
      sceneDown (e, goods) {
        this.sceneMoveUse = true
        goods.offsetX = e.touches[0].clientX - goods.x
        goods.offsetY = e.touches[0].clientY - goods.y
        this.select_goods = goods
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
            goods_id: goods.goods_id,
            img: goods.img,
            x: 0,
            y: 0,
            scale: 1,
            angle: 0,
            sort: this.sort++
          }
          this.scene_list.push(goodsObj)
        } else {
          this.scene_list = this.scene_list.filter((item) => {
            return item.goods_id !== goods.goods_id
          })
        }
      },
      saveFitting () {
        let params = {
          user_id: sessionStorage.getItem('user_id'),
          jsonStrGoods: JSON.stringify(this.scene_list)
        }
        // alert(JSON.stringify(params))
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
          if (hashmap[item.goods_id] === 1) {
            this.$set(item, 'current', true)
          } else {
            this.$set(item, 'current', false)
          }
        })
      },
      clearScene () {
        this.scene_list = []
        this.goodsListInit()
      },
      delGoods () {
        if (this.select_goods) {
          this.scene_list = this.scene_list.filter(item => {
            return item.goods_id !== this.select_goods.goods_id
          })
          this.goodsListInit()
        }
        this.select_goods = null
      },
      upGoods () {
        if (this.select_goods) {
          let i = 0
          this.scene_list.sort((a, b) => {
            return a.sort - b.sort
          })
          for (;i < this.scene_list.length; i++) {
            if (this.scene_list[i].goods_id === this.select_goods.goods_id) {
              break
            }
          }
          if (this.scene_list[i + 1]) {
            [this.scene_list[i + 1].sort, this.scene_list[i].sort] = [this.scene_list[i].sort, this.scene_list[i + 1].sort]
          }
        }
      },
      downGoods () {
        if (this.select_goods) {
          let i = 0
          this.scene_list.sort((a, b) => {
            return a.sort - b.sort
          })
          for (;i < this.scene_list.length; i++) {
            if (this.scene_list[i].goods_id === this.select_goods.goods_id) {
              break
            }
          }
          if (this.scene_list[i - 1]) {
            [this.scene_list[i - 1].sort, this.scene_list[i].sort] = [this.scene_list[i].sort, this.scene_list[i - 1].sort]
          }
        }
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
