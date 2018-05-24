<template>
  <div id="tab">
    <div class="main">
      <div class="header">
        <div class="lf head_lf">
          <img class="logo" src="../../assets/logo(white).png" alt="">
        </div>
        <div class="rt head_rt">
          <p id="quit" class="rt logout" @click="logOut">退出</p>
          <p class="head_rt_msg rt">开始时代商城后台管理</p>
        </div>
      </div>
      <div class="lf_nav lf">
        <ul class="lf_nav_out lf">
          <li  @click="choice(0)"  v-bind:class="{zhanFocus:isFocus[0]}">
            <p class="lf">
              <i class="zhan"/> <a v-bind:class="{choiceBig:isFocus[0]}" href="#/Manage">管理商品</a>
            </p>
            <ul class="lf">
              <li>  <a v-bind:class="{smFocus:smFocus[0]}" @click="smChoice(0)" href="#/Release"> 发布商品</a></li>
              <li>  <a v-bind:class="{smFocus:smFocus[1]}" @click="smChoice(1)" href="#/Home"> 首页商品</a></li>
              <li>  <a v-bind:class="{smFocus:smFocus[2]}" @click="smChoice(2)" href="#/Classify"> 分类管理</a></li>
              <li>  <a v-bind:class="{smFocus:smFocus[3]}" @click="smChoice(3)" href="#/MyGoods"> 我的商品</a></li>
            </ul>
          </li>
          <li class="lf" @click="choice(1)"  v-bind:class="{zhanFocus:isFocus[1]}">
            <p> <i class="zhan"/> <a v-bind:class="{choiceBig:isFocus[1]}" href="#/WaitPay">我的订单</a></p>
          </li>
          <li class="lf" @click="choice(2)"  v-bind:class="{zhanFocus:isFocus[2]}">
            <p> <i class="zhan"/> <a v-bind:class="{choiceBig:isFocus[2]}" href="#/WaitView">我的评价</a></p>
          </li>
          <li class="lf" @click="choice(3)"  v-bind:class="{zhanFocus:isFocus[3]}">
            <p> <i class="zhan"/> <a v-bind:class="{choiceBig:isFocus[3]}" href="#/Feedback">意见反馈</a></p>
          </li>
        </ul>
      </div>
      <div class="lf_nav_bd lf"></div>
      <div class="middle lf">
        <div class="middle_header lf">
          <p>
            {{rtHeade[index]}}
            <img v-show="index==0" class="smThree1" src="../../assets/smallThree.png">
            <span v-show="index==0" class="header_detail">{{smRtHeade[index2]}}</span>
            <i/>
          </p>
        </div>
        <div class="middle_main">
            <router-view/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:"Tab",
  data () {
    return {
      isFocus:[1,0,0,0],
      smFocus:[1,0,0,0],
      rtHeade:['商品管理','我的订单','我的评价','意见反馈'],
      smRtHeade:['发布商品','首页商品','分类管理','我的商品',''],
      index:0,
      index2:0
    };
  },
  beforeCreate:function(){
    var that = this;
    var user_id = sessionStorage.getItem('user_id');
    if(!user_id){
      alert('请先登录！')
      that.$router.push({path:'/login'})
    }
  },
  methods: {
    choice:function(index){
      this.index=index;
      let that = this;
      that.isFocus=[0,0,0,0]
      that.isFocus[index]=true;
      let str = that.smFocus.join('')
      console.log(str)
      if(index==0&&str.indexOf(1)==-1){
        that.smFocus[0]=1;
      }
      if(index!=0){
        that.smFocus=[0,0,0,0]
      }
    },

    smChoice:function(index){
      this.smFocus=[0,0,0,0]
      this.smFocus[index]=1;
      this.index2=index;
    },
    logOut:function(){
      var that = this;
      var isOut = confirm("确认退出吗？")
      console.log(isOut)
      if(isOut){
          var params = new URLSearchParams();
          this.$ajax.get(that.GLOBAL.host+that.GLOBAL.api.logout,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
            console.log(res)
            //  that.GLOBAL.userid=res.data.user_id
            //  console.log(that.GLOBAL.userid)
            sessionStorage.clear();
            that.$router.push({path:'/login'})
          }, function (res) {
            // // 这里是处理错误的回调
            // console.log(response);
            // $.alert('密码错误')
          });
      }
    }
  }
}

</script>
<style>
  .bd{
    border:1px solid red;
  }
  .header{
    width:100%;
    height:90px;
    background: #4da2ad;
  }
  .head_lf{
    margin-left:50px;
  }
  .head_rt{
    width:300px;
    color:white;
    margin-right: 30px;
    font-size:16px;
    margin-top:20px;
  }
  .head_rt_msg{
      width:160px;
  }
  #quit{
    margin-left:51px;
  }
  .lf_nav{
    width:240px;
    /* position:fixed; */
  }
  .lf_nav_bd{
    width:20px;
    height:1000px;
    background:#f1f9f9;
  }
  .lf_nav_out{
    height:1000px;
  }
  .lf_nav_out>li>p>a{
    display: block;
    font-size:16px;
    height:52px;
    width:230px;
    color:#1e1e1e;
    text-align: left;
    line-height: 52px;
  }
  .choiceBig{
    background:#f1f9f9;
  }
  .zhan{
    display: block;
    float:left;
    width:4px;
    height:30px;
    margin-top:11px;
    margin-left:4px;
    margin-right:26px;
  }

  .zhanFocus .zhan{
    background: #4da2ad;
  }

  .lf_nav_out>li>ul{
    width:230px;
    height:210px;
  }

  .lf_nav_out>li>ul>li{
    height:52px;
    line-height: 52px;
  }
  .lf_nav_out>li>ul>li>a:hover{
    color: #86bfc6;
  }
  .smFocus{
    color:#4da2ad;
  }

  .middle{
    width:1600px;
    position: absolute;
    left:260px;
    height:100%;
    background: #f0f9f9;
  }

  .middle_header{
    width:1100px;
    height:50px;
    background: #fff;
    margin-bottom:20px;
    margin-top  :20px;
    line-height:50px;
    border-radius: 4px;
  }

  .middle_header p{
    width:1060px;
    height:50px;
    line-height:50px;
    text-align: left;
    margin-left:20px;
    float:left;
    font-size:14px;
    color:#333;
  }
  .smThree1{
    transform:rotate(-90deg);
    width:10px;
    height:6px;
    margin-bottom: 2px;
    margin-right:6px;
  }

  .header_detail{
    color:#4da2ad;
  }
  .middle_header i{
    display: inline-block;
    width:750px;
    height:3px;
  }
  body{
    /* overflow-x:scroll;     */
  }
  .middle{
    width:1111px;
    /* overflow-x:auto; */
  }
  .middle_main{
    width:1100px;
    height:100%;
  }
  .clr{
    clear:both;
  }
  .logout{
    cursor: pointer;
  }
  .logout:hover{
    /* color:#4da2ad; */
  }
</style>
