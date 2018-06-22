<template>

<div class="home">
  <!-- 活动设置 -->
  <broadcast :carouselProduction="totalMsg.carouselProduction"></broadcast>
  <!-- 店长推荐 -->
  <recommend :hotSellGoods="totalMsg.hotSellGoods"></recommend>
  <!-- 优惠券设置 -->
  <coupon :coupon="totalMsg.coupon"></coupon>
  <activeSet ref="activeSet" :activity_setting="totalMsg.activity_setting"></activeSet>

  <div class="homeSub">
    <Btn style="width:200px;" msg="确认发布" v-on:isClick="successBtn"></Btn>
  </div>
</div>
</template>

<script>

import broadcast from './mainShow/broadcast'
import activeSet from './mainShow/activeSet'
import coupon from './mainShow/coupon'
import recommend from './mainShow/recommend'

import service from '@/utils/require'
import Btn from '@/components/commonComponents/Btn'


export default {
  
  name:'homeMain',
  data () {
    return {
        totalMsg:{}
    };
  },
  props:{
    showDetail:Array
  },
  components: {
    broadcast,//轮播展示
    recommend,//店长推荐
    coupon,//优惠券
    activeSet,//活动设置
    Btn,//按钮
  },
  created:function(){
     this.searchAllMsg()
  },
  methods: {
    /**
     * 查询当前页面所有信息
     */
    searchAllMsg:function(){
      let that = this;
      service.postMsg('searchHomepageInfo',{
        "user_id": sessionStorage.getItem('user_id'),
      }).then((res)=>{
        that.totalMsg = res.data
        console.log(res.data)
      })
      
    },
    //提交
    successBtn:function(){
      var checked = this.$refs.activeSet.isChecked;
      var money = this.$refs.activeSet.money;
      var activity_setting = this.totalMsg.activity_setting
      var activity_id = activity_setting
      var that = this
      if((activity_setting.length!=0)){
        /**
         * 删除
         */
        service.postMsg('deleteActivityInfo',{
          "activity_id": activity_setting[0].activity_id,
        }).then((res)=>{
          console.log(res.data)
          that.searchAllMsg()
        })
      }

      if(checked&&money){
        /**
         * 添加
         */
        service.postMsg('setActivityInfo',{
          "userid": sessionStorage.getItem('user_id'),
          'freeShiping_num':money
        }).then((res)=>{
          console.log(res.data) 
          that.searchAllMsg()
        })
      }
    },
    myclick:function(){
      console.log("提交的绑定单击事件")
    },
    jumpTo:function(){
      var showDetail = this.showDetail;
      for(var i in showDetail){
        showDetail[i]=false;
      }
      showDetail.homeSet=true
      this.$emit("showDetail",showDetail)  
      console.log("触发了点击事件")    
    }
  }
}

</script>
<style>
  .homeSub .sm{
    width:150px;
    font-size:20px;
    margin-left:120px;
  }
</style>
<style>
  @import './homeCss/homeMain.css'
</style>