<template>
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
</template>
<script>
  import {getTopCategory} from '../api/api'
  export default {
    created () {
      getTopCategory().then(data => {
        if (data.success === 1) {
          this.category_list = data.data.list
        }
      })
    },
    data () {
      return {
        category_list: []
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/type-types.less";
</style>
