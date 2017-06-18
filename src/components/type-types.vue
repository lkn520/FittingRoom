<template>
  <div v-infinite-scroll="getTopCategory" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
    <div class="category-list">
      <router-link
        class="item"
        v-for="item in category_list"
        :style="{backgroundImage: 'url('+item.img+')'}"
        :to="{name: 'type-goods', params: {id: item.category_id, title: item.name}}"
        :key="item.category_id">
        <div class="names">
          <p class="identifying">{{item.identifying | upperCase}}</p>
          <p class="name">{{item.name}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {getTopCategory} from '../api/api'
  export default {
    created () {

    },
    data () {
      return {
        category_list: [],
        busy: false,
        page_num: 4,
        page_no: 1
      }
    },
    methods: {
      getTopCategory () {
        let params = {
          brand: localStorage.getItem('brand'),
          page_num: this.page_num,
          page_no: this.page_no
        }
        this.busy = true
        getTopCategory(params).then(data => {
          if (data.success === 1) {
            if (this.page_no <= data.data.pageTotal) {
              this.busy = false
              this.page_no ++
              this.category_list.push(...data.data.list)
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/type-types.less";
</style>
