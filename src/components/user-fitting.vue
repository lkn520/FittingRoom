<template>
  <div id="user-fitting" v-infinite-scroll="getMyMatchList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="fitting-list">
      <div class="item" v-for="(fitting, i) in fitting_list">
        <i class="iconfont icon-weishoucang fitting-collect" v-show="fitting.is_my_collect === 1 && fitting.is_collect === 0" @click="toggleCollect(fitting)"></i>
        <i class="iconfont icon-yishoucang fitting-collect" v-show="fitting.is_my_collect === 1 && fitting.is_collect === 1" @click="toggleCollect(fitting)"></i>
        <i class="iconfont icon-shanchu fitting-delete" v-show="fitting.is_my_collect === 0" @click="deleteFitting(fitting, i)"></i>
        <div class="image-block">
          <v-image :source="fitting.img | imageFormat" size="contain"></v-image>
        </div>
        <div class="footer-block">
          <router-link class="nav-group" :to="{name: 'fitting-detail', params: {match_id: fitting.match_id}}">
            <i class="iconfont icon-xiangqing"></i>&nbsp;&nbsp;详情
          </router-link>
          <router-link class="nav-group" :to="{name: 'fitting', query: {match_id: fitting.match_id, collect: fitting.is_my_collect}}">
            <i class="iconfont icon-dapei"></i>&nbsp;&nbsp;设计
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getMyMatchList, toggleCollect, deleteMath} from '../api/api'
  export default {
    data () {
      return {
        fitting_list: [],
        busy: false,
        page_num: 4,
        page_no: 1
      }
    },
    methods: {
      getMyMatchList () {
        let params = {
          user_id: localStorage.getItem('user_id'),
          page_num: this.page_num,
          page_no: this.page_no,
          brand: localStorage.getItem('brand')
        }
        this.busy = true
        getMyMatchList(params).then((data) => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              data.data.list.map(n => {
                n.is_collect = n.is_my_collect
              })
              this.fitting_list.push(...data.data.list)
              this.page_no ++
              this.busy = false
            }
          }
        })
      },
      toggleCollect (match) {
        let params = {
          type: 2,
          user_id: localStorage.getItem('user_id'),
          concrete_id: match.match_id
        }
        toggleCollect(params).then(data => {
          if (data.success === 1) {
            match.is_collect = data.data.is_collect
          }
        })
      },
      deleteFitting (match, i) {
        let params = {
          match_id: match.match_id,
          user_id: localStorage.getItem('user_id')
        }
        deleteMath(params).then(data => {
          if (data.success === 1) {
            this.fitting_list.splice(i, 1)
            this.$message(data.desc)
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/user-fitting.less";
</style>
