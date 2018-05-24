<template>
<div class="body" id="body">
  <router-view/>
  <div class="_header">
    <div class="head_lf">
      <img class="logo" src="../assets/logo.png" alt="">
    </div>
    <div class="_head_rt">
      开始时代商城后台管理
    </div>
  </div>
  <div class="main_login">
    <div class="main_left">
        <img class="main_lf_img" src="../assets/login.png" alt="">
    </div>
    <div class="main_rt">
      <div class="login_head">
        用户登录
      </div>
      <div class="login_main">
          <div class="input_out uname" v-bind:class="{ activeU: isActive}"  @click="inputName">
            <img class="inpImg" v-show="isActive" src="../assets/userName.png">
            <img class="inpImg" v-show="!isActive" src="../assets/userName2.png">
            <input class="input" v-model="userName" placeholder="请输入用户名"  v-focus="isActive" @blur="blur0" type="text" >
          </div>
          <div class="input_out upwd" v-bind:class="{ activeU: isActive1}"  @click="inputPwd">
            <img class="inpImg" v-show="isActive1" src="../assets/userPwd.png">
            <img class="inpImg" v-show="!isActive1" src="../assets/userPwd2.png">
            <input class="input" v-model="upwd" placeholder="请输入密码"  v-focus="isActive1" @blur="blur1" type="password" >
          </div>

        <div class="submit">
            <a  class="btn_login" v-bind:class="{ activeU: isActive1}" href="" @click.prevent="submitMsg($event)">登录</a>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import service from '../utils/require'
import userLogin from '../userLogin/userLogin'
export default {
  directives: {
     focus: {
        update: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
  },
  name:"UserLogin",
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
    inputName:function(){
      this.isActive=true;
    },
    inputPwd:function(){
      this.isActive1=true;
    },

    blur0:function(){
      this.isActive=false;
    },
    blur1:function(){
      this.isActive1=false;
    },

    submitMsg:function(el){
      var that = this;
      userLogin(that.userName,that.upwd,that);
    },
  }


}

</script>
<style>
    ._header{
      width:100%;
      height:88px;
      border-bottom:4px solid #4da2ad;
    }
    .head_lf{
      margin-left:40px;
      float:left;
    }

    ._head_rt{
      float:right;
      margin-right:40px;
      font-size:18px;
      color:#4da2ad;
      line-height: 84px;
    }

    .main_login{
      display: flex;
      justify-content:center;
    }

    .main_left{
      float:left;
      margin-top:100px;
    }
    .main_lf_img{
      width:564px;
      height:490px;
    }

    .main_rt{
      margin-top:160px;
      width:360px;
      height: 400px;
      border:1px solid #70b6bc;
      border-radius: 4px;
      margin-left:220px;
    }

    .login_head{
      color:white;
      font-size:28px;
      font-weight: 700;
      width:100%;
      height:72px;
      background: #4da2ad;
      line-height: 72px;
    }

    .login_main{
      width:280px;
      height: 282px;
      background: #fffdff;
      margin-left:39px;
    }
    .uname{
      margin-top:40px;
    }

    .input_out{
      width:282px;
      height:50px;
      border:1px solid #d7d7d7;

      border-radius: 4px;
      display: flex;
      align-items:center;/*指定垂直居中*/
    }
    .activeU{
      border:1px solid #4da2ad;

    }
    .upwd{
      margin-top:32px;

    }

    .inpImg{
      width:26px;
      height:28px;
      margin-left:20px;
    }

    .input{
      border: 0px;outline:none;cursor: pointer;
      font-size:16px;
      width:166px;
      margin-left:50px;
    }

    .btn_login{
      display: block;
      width:282px;
      height:54px;
      background: #70b6bc;
      color:white;
      line-height: 54px;
      font-size:22px;
      margin-top:40px;
      border-radius: 4px;
    }

    .btn_login:active,.btn_login:hover{
      background: #4da2ad;
      color:white;
    }
    .btn_login:focus{
      color:white;
    }
</style>
