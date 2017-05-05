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
  import wx from 'weixin-js-sdk'
  import {getBrandDetail} from '../api/api'
  export default {
    components: {
      tabs, tabPane
    },
    created () {
      let shareUrl = this.$shareUrlFormat(location.href.split('?')[0], {brand: localStorage.getItem('brand')})
      // 获取微信配置
      this.$wxjssdk()
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
              imgUrl: img // 分享图标
            })
            // 分享好友
            wx.onMenuShareAppMessage({
              title: name, // 分享标题
              link: shareUrl, // 分享链接
              imgUrl: img // 分享图标
            })
          }
        })
      })
    }
  }
</script>
<style lang="less">
  @import "../assets/less/user.less";
</style>
