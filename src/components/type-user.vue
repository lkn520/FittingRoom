<template>
  <div class="match-block" v-infinite-scroll="getMatchList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="match-list">
      <div class="item" v-for="match in match_list">
        <div class="image-block">
          <v-image :source="match.img | imageFormat" size="contain"></v-image>
        </div>
        <div class="user-block">
          <p class="name">{{match.user.name}}</p>
          <div class="face">
            <v-image :source="match.user.img | imageFormat"></v-image>
          </div>
        </div>
        <div class="edit-block">
          <router-link class="group" :to="{name: 'fitting-detail', params: {match_id: match.match_id}}"><i class="iconfont icon-xiangqing"></i>&nbsp;详情</router-link>
          <div class="group" v-if="match.is_collect == 0" @click="toggleCollect(match)"><i class="iconfont icon-weishoucang"></i>&nbsp;收藏</div>
          <div class="group" v-else @click="toggleCollect(match)"><i class="iconfont icon-yishoucang icon-collect"></i>&nbsp;已收藏</div>
          <router-link class="group" :to="{name: 'fitting', query: {match_id: match.match_id}}"><i class="iconfont icon-dapei"></i>&nbsp;设计</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getMatchList, toggleCollect} from '../api/api'
  export default {
    data () {
      return {
        page_num: 10,
        page_no: 1,
        match_list: [],
        busy: false
      }
    },
    methods: {
      getMatchList () {
        let params = {
          page_num: this.page_num,
          page_no: this.page_no,
          user_id: localStorage.getItem('user_id')
        }
        this.busy = true
        getMatchList(params).then(data => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.match_list.push(...data.data.list)
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
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/type-user.less";
</style>
