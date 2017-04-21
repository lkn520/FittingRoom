<template>
  <div id="user-fitting" v-infinite-scroll="getMyMatchList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="fitting-list">
      <div class="item" v-for="fitting in fitting_list">
        <i class="iconfont icon-yishoucang fitting-collect" v-show="fitting.is_my_collect === 1"></i>
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
  import {getMyMatchList} from '../api/api'
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
          page_no: this.page_no
        }
        this.busy = true
        getMyMatchList(params).then((data) => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.fitting_list.push(...data.data.list)
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
  @import "../assets/less/user-fitting.less";
</style>
