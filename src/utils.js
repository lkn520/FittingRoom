const Utils = {}
import {wxjssdk} from './api/api'
import wx from 'weixin-js-sdk'
import message from './components/components/message.vue'

export default Utils.install = (Vue, options) => {
  // 中间提示
  Vue.prototype.$message = (msg) => {
    let Message = Vue.extend(message)
    let msgElement = new Message({propsData: {msg: msg}}).$mount()
    document.querySelector('body').appendChild(msgElement.$el)
  }
  // 分享url
  Vue.prototype.$shareUrlFormat = (path, queryObj) => {
    let queryArr = []
    let url = 'http://' + location.host + `#${path}`
    for (let query in queryObj) {
      queryArr.push(`${query}=${queryObj[query]}`)
    }
    let queryStr = queryArr.join('&')
    console.log(url + '?' + queryStr)
    if (queryStr) {
      return url + '?' + queryStr
    } else {
      return url
    }
  }
  // 配置微信
  Vue.prototype.$wxjssdk = () => {
    wxjssdk({curr_url: encodeURIComponent(location.href.split('#')[0])}).then(data => {
      if (data.success === 1) {
        let {appId, nonceStr, signature, timestamp} = data.data
        wx.config({
          debug: false,
          appId,
          nonceStr,
          signature,
          timestamp,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
      }
    })
  }
}
