<template>
  <div>
    <tabs>
      <tab-pane>
        <router-link class="tab-link" :to="{name: 'user'}" replace exact>我的搭配</router-link>
      </tab-pane>
      <tab-pane>
        <router-link class="tab-link" :to="{name: 'user-goods'}" replace>我的衣帽间</router-link>
      </tab-pane>
    </tabs>
    <router-view></router-view>
  </div>
</template>
<script>
  import {tabs, tabPane} from './components/tabs.vue'
  export default {
    components: {
      tabs, tabPane
    }
  }
</script>
<style lang="less">
  @import "../assets/less/user.less";
</style>
