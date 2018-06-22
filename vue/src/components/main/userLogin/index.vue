<template>
<div class="body" id="body">
  <router-view/>
  <div class="_header">
    <div class="head_lf">
      <img class="logo" src="../../../assets/logo.png" alt="">
    </div>
    <div class="_head_rt">
      开始时代商城后台管理
    </div>
  </div>
  <div class="main_login">
    <div class="main_left">
        <img class="main_lf_img" src="../../../assets/login.png" alt="">
    </div>
    <div class="main_rt">
      <div class="login_head">
        用户登录
      </div>
      <div class="login_main">
          <div class="input_out uname" v-bind:class="{ activeU: isActive}"  @click="isActive=true">
            <img class="inpImg" v-show="isActive" src="../../../assets/userName.png">
            <img class="inpImg" v-show="!isActive" src="../../../assets/userName2.png">
            <input class="input" v-model="userName" placeholder="请输入用户名"  v-focus="isActive" @blur="isActive=false" type="text" >
          </div>
          <div class="input_out upwd" v-bind:class="{ activeU: isActive1}"  @click="isActive1=true">
            <img class="inpImg" v-show="isActive1" src="../../../assets/userPwd.png">
            <img class="inpImg" v-show="!isActive1" src="../../../assets/userPwd2.png">
            <input class="input" v-model="upwd" placeholder="请输入密码"  v-focus="isActive1" @blur="isActive1=false" type="password" >
          </div>
        <div class="submit">
            <a  class="btn_login" href="" @click.prevent="submitMsg($event)">登录</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import userLogin from './userLogin'
export default {
  name:"UserLogin",  
  directives: {
     focus: {
        update: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
  },
  data () {
    return {
      isActive:false,
      isActive1:false,
      UserId:"",
      userName:'',
      upwd:'',
    };
  },
  methods: {
    submitMsg:function(){
      var that = this;
      userLogin(that.userName,that.upwd,that);
    },
  }
}

</script>
<style>
 @import './uesrLogin.css'
</style>
