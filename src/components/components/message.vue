<template>
  <div class="message-block" v-if="isShow">
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
  .message-block {
    position: fixed;
    z-index: 9999;
    top: 0; left: 0; right: 0; bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.4rem;
    height: 1.0rem;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 6px;
    color: #fff;
  }
</style>
