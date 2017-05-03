const Utils = {}
import message from './components/components/message.vue'

export default Utils.install = (Vue, options) => {
  // 中间提示
  Vue.prototype.$message = (msg) => {
    let Message = Vue.extend(message)
    let msgElement = new Message({propsData: {msg: msg}}).$mount()
    document.querySelector('body').appendChild(msgElement.$el)
  }
  // 分享url
  Vue.prototype.$shareUrlFormat = (url) => {
    let queryArr = []
    if (localStorage.getItem('brand')) {
      queryArr.push(`brand=${localStorage.getItem('brand')}`)
    }
    let queryStr = queryArr.join('&')
    if (queryStr) {
      return url + '?' + queryStr
    } else {
      return url
    }
  }
}
