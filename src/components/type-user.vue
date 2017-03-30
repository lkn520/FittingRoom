<template>
  <div>
    type-user
  </div>
</template>
<script>
  import {getMatchList} from '../api/api'
  export default {
    created () {
      getMatchList()
    }
  }
</script>
<style>

</style>
