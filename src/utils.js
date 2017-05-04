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
  Vue.prototype.$shareUrlFormat = (url, queryObj) => {
    let queryArr = []
    for (let query in queryObj) {
      queryArr.push(`${query}=${queryObj[query]}`)
    }
    let queryStr = queryArr.join('&')
    if (queryStr) {
      return (url + '?' + queryStr)
    } else {
      return encodeURIComponent(url)
    }
  }
}
