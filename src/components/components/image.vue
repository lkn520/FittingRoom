<template>
  <div :style="{backgroundImage: `url(${source})`, backgroundSize: size}" class="image"></div>
</template>
<script>
  export default {
    props: {
      source: {
        type: String
      },
      size: {
        default: 'cover',
        type: String
      }
    }
  }
</script>
<style lang="less">
  .image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
