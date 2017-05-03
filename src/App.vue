<template>
  <div id="body" :class="{'mb-footer': isShowFooter}">
    <router-view></router-view>
    <v-footer v-show="isShowFooter" />
  </div>
</template>
<script>
  import vFooter from './components/components/footer.vue'
  import {mapState} from 'vuex'
  import wx from 'weixin-js-sdk'
  import {wxjssdk, getBrandDetail} from './api/api'
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
    },
    created () {
      let shareUrl = this.$shareUrlFormat(location.href)
      // 获取微信配置
      wxjssdk({curr_url: location.href.split('#')[0]}).then(data => {
        if (data.success === 1) {
          let {appId, nonceStr, signature, timestamp} = data.data
          wx.config({
            debug: false,
            appId,
            nonceStr,
            signature,
            timestamp,
            jsApiList: ['onMenuShareTimeline']
          })
        }
      })
      // 分享
      wx.ready(() => {
        // 获取品牌信息
        getBrandDetail({brand: localStorage.getItem('brand')}).then(data => {
          if (data.success === 1) {
            let {img, name} = data.data.info
            // 分享朋友圈
            wx.onMenuShareTimeline({
              title: name, // 分享标题
              link: shareUrl, // 分享链接
              imgUrl: img, // 分享图标
              success () {
                // 用户确认分享后执行的回调函数
              },
              cancel () {
                // 用户取消分享后执行的回调函数
              }
            })
            // 分享好友
            wx.onMenuShareAppMessage({
              title: name, // 分享标题
              desc: '', // 分享描述
              link: shareUrl, // 分享链接
              imgUrl: img, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })
          }
        })
      })
    }
  }
</script>
<style lang="less">
  @import "./assets/less/App.less";
</style>
