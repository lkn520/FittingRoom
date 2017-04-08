const Utils = {}
import message from './components/components/message.vue'

export default Utils.install = (Vue, options) => {
  Vue.prototype.$message = (msg) => {
    let Message = Vue.extend(message)
    let msgElement = new Message({propsData: {msg: msg}}).$mount()
    document.querySelector('body').appendChild(msgElement.$el)
  }
}
