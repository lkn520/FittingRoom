<template>
  <div id="signin">
    <div class="signin-mask"></div>
    <div class="signin-container">
      <div class="close" @click="$router.back()">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="user">
        <i class="iconfont icon-denglutouxiang"></i>
      </div>
      <div class="username-input">
        <input type="text" placeholder="请输入账号" v-model="username">
      </div>
      <div class="password-input">
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="submit-block">
        <span class="signin" v-text="isSignin? '登录':'注册'" @click="submit"></span>
        <span class="signup" v-text="isSignin? '注册':'登录 '" @click="isSignin = !isSignin"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import {userLogin, userReg} from '../api/api'
  export default {
    data () {
      return {
        isSignin: true,
        username: '',
        password: ''
      }
    },
    methods: {
      submit () {
        let params = {
          name: this.username,
          password: this.password
        }
        if (this.isSignin) {
          userLogin(params).then(data => {
            if (data.success === 1) {
              sessionStorage.setItem('user_id', data.data.user_id)
              this.$router.push({
                name: 'user'
              })
            } else {
              alert(data.desc)
            }
          })
        } else {
          userReg(params).then(data => {
            console.log(data)
          })
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../assets/less/signin.less";
</style>
