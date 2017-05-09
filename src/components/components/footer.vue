<template>
   <div class="footer" style="z-index: 100;">
    <router-link class="item" :to="{name: 'home'}">
      <i class="iconfont icon-shouye"></i>
      <span class="text">首页</span>
    </router-link>
    <router-link class="item" :to="{name: 'type'}">
      <i class="iconfont icon-fenlei"></i>
      <span class="text">分类</span>
    </router-link>
    <router-link class="item" :to="{name: 'user'}">
      <i class="iconfont icon-wode"></i>
      <span class="text">我的</span>
    </router-link>
  </div>
</template>
<script>
    export default {}
</script>
<style lang="less">
  @import "../../assets/less/footer.less";
</style>
