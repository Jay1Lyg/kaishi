<template>
 <div class="coupon" v-show="isShow" >
    <div class="outDiv" @scroll.prevent></div>
     <div class="centerMain" style="height:400px;">
      <div class="cenHeader">
        <div class="headLeft">
          <p>设置优惠券</p>
        </div>
        <div class="headRtPoi" @click="closeShow">
          <div class="headRt"></div>
        </div>
      </div>
      <div class="cenBody">
        <div class="cenDetail">
          <span>
            请设置一个优惠劵
          </span>
        </div>
        <div class="showMsg">
          <div>
            <div class="ones_inp clear" style="height:100%;">
              <div class="Coupon" style="margin:auto">
                <div class="floor_one">
                    <p>满</p>
                    <el-input v-model="full_money" type="number" size="mini" style="width:100px; margin-top:5px;margin-left:-10px;"></el-input>
                    <p style="width:60px;">减</p>
                    <el-input v-model="reduce_money" type="number" size="mini" style="width:100px; margin-top:5px;margin-left:-30px;"></el-input>
                </div>
                <div class="floor_two">
                <div class="parameters">
                  <div  class="parameter lf">
                    <div class="parat_in lf" style="width:64px">开始</div>
                      <el-date-picker size="mini"
                        format="yyyy-MM-dd" 
                        @change="getTime"
                        style="width:150px;margin:8px;"
                        v-model="start_time"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <div  class="parameter lf">
                      <div class="parat_in lf" style="width:35px">结束</div>
                        <el-date-picker size="mini" style="width:150px;margin:8px;"
                          v-model="end_time"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Btn class="successSub" sm v-on:isClick="successSub" msg="确认发布"></Btn>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/commonComponents/Btn'

import service from '@/utils/require'
import { Message } from 'element-ui'

export default {
  name:'alertAdd',
  data () {
    return {
      data:{},
      full_money:'',
      reduce_money:0,
      start_time:'',
      end_time:'',
      isShow:false,   
    };
  },
  watch:{
    isShow(curVal,oldVal){
      if(curVal){
        stop();
      }else{
        move();
      }
      function stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      }
      /***取消滑动限制***/
       function move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      }
    },
  },
  components: {
    Btn 
  },

  methods: {
    changeDate:function(date){
      var start_timeStr = 
        date.getFullYear()+'-'
        +(date.getMonth()+1)+'-'
        +date.getDate()

      return start_timeStr
    },

    getTime:function(val){
      console.log(val)
    },
    closeShow(){
      this.isShow=false; 
      move()
      /**
       *取消滑动限制
       **/
      function move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      }
    },
    successSub:function(){
      var that = this

      var loading = this.$loading()
      // 7.设置优惠券
      //   接口：/program/setCoupon（post）
      //   请求参数： userid;
      //              full_money;
      //              reduce_money;
      //              start_time;
      //              end_time;
     if(
        that.full_money &&
        that.reduce_money &&
        that.start_time && 
        that.end_time 
      ){
       service.postMsg('setCoupon',
        { 
          'userid':sessionStorage.getItem('user_id'),
          'full_money':that.full_money,
          'reduce_money':that.reduce_money,
          'start_time':that.changeDate(that.start_time),
          'end_time':that.changeDate(that.end_time)
        })
        .then((res)=>{  
          that.$parent.$parent.searchAllMsg()
          that.isShow=false;
          loading.close();
          that.$notify({
            title: '成功',
            message: '发步成功',
            type: 'success'
          });
        })
      }else{
        console.log('信息不完善')
        Message({
          message: '亲~您的信息不完善哦',
          type: 'error',
          duration: 3 * 1000
        })
      }
      
    }
  }
}

</script>
<style>
.coupon .centerMain{
    z-index:15;
    position: fixed;
    left: 50%;
    top: 50%;

    margin: -200px 0 0 -350px;
}
</style>
<style>
@import './setOutImg'
</style>