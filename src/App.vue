<template>
  <div id="app" :class="{'mb-footer': isShowFooter}">
    <router-view></router-view>
    <v-footer />
  </div>
</template>
<script>
  import vFooter from './components/components/footer.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapState(['isShowFooter'])
    },
    components: {
      vFooter
    }
  }
</script>
<style lang="less">
  @import "./assets/less/App.less";
</style>
