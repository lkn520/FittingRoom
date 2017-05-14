<template>
  <div class="match-block" v-infinite-scroll="getMatchList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="match-list">
      <v-fitting-item v-for="match in match_list" :match="match" :key="match.match_id">

      </v-fitting-item>
    </div>
  </div>
</template>
<script>
  import vFittingItem from './components/fitting-item.vue'
  import {getMatchList} from '../api/api'
  export default {
    components: {
      vFittingItem
    },
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
          user_id: localStorage.getItem('user_id'),
          brand: localStorage.getItem('brand')
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
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/type-user.less";
</style>
