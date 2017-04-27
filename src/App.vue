<template>
  <div id="body" :class="{'mb-footer': isShowFooter}">
    <router-view></router-view>
    <v-footer v-show="isShowFooter" />
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
    },
    beforeCreate () {
      let setDocumentTitle = (title) => {
        document.title = title
        if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
          let iframe = document.createElement('iframe')
          iframe.src = '/favicon.ico'
          iframe.style.display = 'none'
          iframe.onload = () => {
            setTimeout(() => {
              iframe.remove()
            }, 10)
          }
          document.body.appendChild(iframe)
        }
      }
      setDocumentTitle(localStorage.getItem('brand'))
    }
  }
</script>
<style lang="less">
  @import "./assets/less/App.less";
</style>
