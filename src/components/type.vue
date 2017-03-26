<template>
  <div>
    <tabs>
      <tab-pane>
        <router-link class="tab-link" :to="{name: 'type'}" replace exact>分类</router-link>
      </tab-pane>
      <tab-pane>
        <router-link class="tab-link" :to="{name: 'type-user'}" replace>用户</router-link>
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
<style>

</style>
