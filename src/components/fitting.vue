<template>
  <div @touchmove.prevent.stop>
    <v-header title="搭配">
      <router-link class="user-link" slot="right" :to="{name: 'user'}">我的搭配</router-link>
    </v-header>
    <div class="fitting-block">
      <div class="scene" v-if="scene_list.length">
        <div class="scene-goods" @click.self.prevent.stop="select_goods = null">
          <img class="goods-img"
               crossorigin="anonymous"
               @touchstart.prevent="sceneDown($event, goods)"
               @touchmove.prevent="sceneMove($event, goods)"
               @touchend.prevent="sceneUp($event, goods)"
               :src="goods.goods.img | imageFormat" v-for="goods in scene_list"
               :style="{'transform': `translate3d(${goods.x}px, ${goods.y}px, 0) scale3d(${goods.scale}, ${goods.scale}, 1) rotateZ(${goods.angle}deg)`, 'zIndex': goods.sort}"
               :class="{'current': select_goods&&select_goods.goods_id === goods.goods_id}"
          >
        </div>
        <div class="edit-block">
          <div class="edit-group">
            <div class="edit-item" @click="clearScene()">
              清空
            </div>
            <div class="edit-item" @click="upGoods()">
              <i class="iconfont icon-shang-copy"></i>&nbsp;向上
            </div>
            <div class="edit-item" @click="downGoods()">
              <i class="iconfont icon-xia"></i>&nbsp;向下
            </div>
            <div class="edit-item" @click="delGoods()">
              <i class="iconfont icon-shanchu"></i>&nbsp;删除
            </div>
          </div>
          <div class="save-btn" @click="saveFitting()"><i class="iconfont icon-baocun"></i>&nbsp;保存</div>
        </div>
      </div>
      <div class="scene-empty" v-else>
        <v-image source="/static/images/fittingbg.jpg" size="contain"></v-image>
        <p>请选择商品进行搭配</p>
      </div>
    </div>
    <div class="fitting-goods" :class="{'pull-up-enter': isPullUp}" @touchmove.stop>
      <div class="icon-arrow" :class="{'pull-up': isPullUp}" @click="isPullUp = !isPullUp"><i class="iconfont icon-zhankai"></i></div>
      <div class="goods-nav">
        <div class="nav-list">
          <div class="item" :class="{'active': 'r' == category_id}" @click="getCategoryGoods('r')">
            <span>推荐</span>
          </div>
          <div class="item" :class="{'active': 'c' == category_id}" @click="getCategoryGoods('c')">
            <span>收藏</span>
          </div>
          <div class="item" :class="{'active': item.category_id == category_id}" v-for="item in nav_list" @click="getCategoryGoods(item.category_id)">
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
  import {createUserMatch, getTopCategory, getCategoryGoods, getMatchDetail, getGoodsDetail} from '../api/api'
  import Html2canvas from 'html2canvas'
  export default {
    components: {
      vHeader
    },
    created () {
      // 判断再次搭配
      if (this.$route.query.match_id) {
        let params = {
          match_id: this.$route.query.match_id
        }
        getMatchDetail(params).then(data => {
          if (data.success === 1) {
            this.scene_list = data.data.list
          }
        })
      } else if (this.$route.query.goods_id) {
        let params = {
          goods_id: this.$route.query.goods_id
        }
        getGoodsDetail(params).then(data => {
          if (data.success === 1) {
            let goodsObj = {
              goods_id: data.data.goods_id,
              goods: {
                img: data.data.img
              },
              x: 0,
              y: 0,
              scale: 1,
              angle: 0,
              sort: this.sort++
            }
            this.scene_list.push(goodsObj)
          }
        })
      }
      // 获取分类
      getTopCategory().then(data => {
        if (data.success === 1) {
          this.nav_list = data.data.list
          this.getCategoryGoods(this.nav_list[0].category_id)
        }
      })
      // 缩放
      this.$on('onScale', (goods, scale) => {
        goods.scale = scale + (+goods.scale)
      })
      // 旋转
      this.$on('onRotate', (goods, angle) => {
        goods.angle = angle + (+goods.angle)
      })
    },
    data () {
      return {
        isPullUp: false,
        sceneMoveUse: false,
        scene_list: [],
        goods_list: [],
        nav_list: [],
        touchVector: {},
        select_goods: null,
        category_id: -1,
        sort: 50,
        touchDistance: 0,
        previousPinchScale: 1
      }
    },
    methods: {
      _getDistance (xLen, yLen) {
        return Math.sqrt(xLen * xLen + yLen * yLen)
      },
      _getRotateDirection (vector1, vector2) {
        return vector1.x * vector2.y - vector2.x * vector1.y
      },
      _getRotateAngle (vector1, vector2) {
        let direction = this._getRotateDirection(vector1, vector2)
        direction = direction > 0 ? -1 : 1
        let len1 = this._getDistance(vector1.x, vector1.y)
        let len2 = this._getDistance(vector2.x, vector2.y)
        let mr = len1 * len2
        if (mr === 0) return 0
        let dot = vector1.x * vector2.x + vector1.y * vector2.y
        let r = dot / mr
        if (r > 1) r = 1
        if (r < -1) r = -1
        return Math.acos(r) * direction * 180 / Math.PI
      },
      onScale (goods) {
        return (scale) => {
          goods.scale += scale
        }
      },
      sceneDown (e, goods) {
        this.select_goods = goods
        if (e.touches.length === 1) {
          this.sceneMoveUse = true
          goods.offsetX = e.touches[0].clientX - goods.x
          goods.offsetY = e.touches[0].clientY - goods.y
        }

        if (e.touches.length > 1) {
          let point1 = e.touches[0]
          let point2 = e.touches[1]
          let xLen = point1.pageX - point2.pageX
          let yLen = point1.pageY - point2.pageY
          this.touchDistance = this._getDistance(xLen, yLen)
          this.previousPinchScale = 1
          // 旋转
          this.touchVector = {
            x: point2.pageX - point1.pageX,
            y: point2.pageY - point1.pageY
          }
        }
      },
      sceneUp (e, goods) {
        this.sceneMoveUse = false
      },
      sceneMove (e, goods) {
        if (e.touches.length === 1 && this.sceneMoveUse) {
          goods.x = e.touches[0].clientX - goods.offsetX
          goods.y = e.touches[0].clientY - goods.offsetY
        }

        if (e.touches.length > 1) {
          let point1 = e.touches[0]
          let point2 = e.touches[1]
          let xLen = point1.pageX - point2.pageX
          let yLen = point1.pageY - point2.pageY
          let touchDistance = this._getDistance(xLen, yLen)
          if (this.touchDistance) {
            let pinchScale = touchDistance / this.touchDistance
            this.$emit('onScale', goods, pinchScale - this.previousPinchScale)
            this.previousPinchScale = pinchScale
          }
          // 旋转
          if (this.touchVector) {
            let vector = {
              x: point2.pageX - point1.pageX,
              y: point2.pageY - point1.pageY
            }
            let angle = this._getRotateAngle(vector, this.touchVector)
            this.$emit('onRotate', goods, angle)
            this.touchVector.x = vector.x
            this.touchVector.y = vector.y
          }
        }
      },
      selectGoods (goods) {
        if (this.isPullUp) {
          if (!goods.current) {
            let goodsObj = {
              goods_id: goods.goods_id,
              goods: {
                img: goods.img
              },
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
        } else {
          this.isPullUp = true
        }
      },
      saveFitting () {
        let _this = this
        let base64Img = ''
        this.select_goods = null
        Html2canvas(document.querySelector('.scene-goods'), {
          allowTaint: true,
          taintTest: false,
          onrendered (canvas) {
            base64Img = canvas.toDataURL()
            let params = {
              user_id: localStorage.getItem('user_id'),
              jsonStrGoods: JSON.stringify(_this.scene_list),
              base64Img
            }
            if (_this.$route.query.collect === 0 && _this.$route.query.match_id) {
              params.match_id = _this.$route.query.match_id
            }
            createUserMatch(params).then(data => {
              _this.$message(data.desc)
            })
          }
        })
      },
      getCategoryGoods (id) {
        let params = {
          category: id,
          user_id: localStorage.getItem('user_id'),
          brand: localStorage.getItem('brand')
        }
        this.category_id = id
        getCategoryGoods(params).then(data => {
          if (data.success === 1) {
            this.goods_list = data.data.list
            this.goodsListInit()
          } else {
            this.goods_list = []
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
      },
      delGoods () {
        if (this.select_goods) {
          this.scene_list = this.scene_list.filter(item => {
            return item.goods_id !== this.select_goods.goods_id
          })
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
    },
    watch: {
      scene_list () {
        this.goodsListInit()
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
