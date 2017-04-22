<template>
  <div class="message-block" v-if="isShow" style="z-index: 9999;">
    <span>{{msg}}</span>
  </div>
</template>
<script>
  export default {
    name: 'message',
    props: ['msg'],
    data () {
      return {
        isShow: true
      }
    },
    created () {
      setTimeout(() => {
        this.isShow = false
      }, 3000)
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/message.less";
</style>
