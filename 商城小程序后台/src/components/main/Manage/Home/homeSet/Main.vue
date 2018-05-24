<template>

<div class="home">
  <router-view/>
  <!-- 轮播 -->
  <div class="Carousel">
    <div class="ones_inp clear" style="height:100%;">
        <p class="label"> <span class="redX">*</span>&nbsp;轮播展示商品
          <br>
          <span style="font-size:12px;color:#949494;">(默认<span style="color:#4da2ad">第一张</span>图片为商品封面图)</span>
        </p>
        <div class="subImgs" @click="jumpTo">
          <subImg sty="width:418px;height:220px;" ></subImg>
          <subImg sty="width:418px;height:220px;"  src=true></subImg>
        </div>
      </div>
  </div>
  <!-- 店长推荐 -->
  <div>
     <div class="ones_inp clear" style="height:100%;">
        <p class="label"> <span class="redX">*</span>&nbsp;店长推荐商品
          <br>
          <span style="font-size:12px;color:#949494;">(最多可添加<span style="color:#4da2ad">6件</span>商品)</span>
        </p>
        <div class="subImgs">
          <subImg sty="width:150px;height:150px;" ></subImg>
          <subImg sty="width:150px;height:150px;"  src=true></subImg>
        </div>
      </div>
  </div>
  <!-- 优惠券 -->
  <div>
     <div class="ones_inp clear" style="height:100%;">
        <p class="label">优惠券设置</p>
        <div class="Coupon">
          <div class="floor_one">
              <p >满</p>
              <el-input v-model="data.inp1" size="mini" style="width:60px; margin-top:5px;margin-left:-10px;"></el-input>
              <p style="width:60px;">减</p>
              <el-input v-model="data.inp2" size="mini" style="width:60px; margin-top:5px;margin-left:-30px;"></el-input>
          </div>
          <div class="floor_two">
        <div class="parameters">
          <div  class="parameter lf">
            <div class="parat_in lf" style="width:64px">起始日期</div>
              <el-date-picker size="mini" style="width:150px;margin:8px;"
                v-model="data.date1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </div>
          <div  class="parameter lf">
            <div class="parat_in lf" style="width:35px">限用</div>
           <el-date-picker size="mini" style="width:150px;margin:8px;"
                v-model="data.date2"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </div>
        </div>
          </div>
        </div>
      </div>

  </div>
  <!-- 活动设置 -->
  <div></div>
  
  <!-- 提交 -->
  <div class="release_btns">
        <Btn class="release_btn" msg="确认发布" v-on:isClick="successBtn"  v-on:click="myclick"></Btn>
  </div>
</div>
</template>

<script>
import subImg from '../../../scomponents/subImg'
import Btn from '../../../scomponents/Btn'
    

export default {
  
  name:'Main',
  data () {
    return {
      data:{}
    };
  },
  props:['showDetail'],
  components: {
    subImg,Btn
  },

  methods: {
    successBtn:function(){
      console.log("提交按钮传递进入的事件")
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
  .parameter{
    min-width: 130px;
    max-width:250px;
    height:100%;
    float:left;
  }
  .ones_inp{
    margin-top:20px;
    margin-bottom:20px;
    min-height:50px;
  }
  .parat_in{
    line-height:54px;
    margin-left:10px;
    font-size:14px;
  }
   .subImgs{
    width:600px;
    min-height:200px;
    margin-left: 320px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  /* 上传图片组 */
  /* 优惠券 */
  .Coupon{
    width:504px;
    min-height: 100px;
    border-radius: 4px;
    border:1px solid #4da2a4;
    margin-left:320px;
    text-align:center;
  } 
  .floor_one{
    border-bottom:1px solid #ccc;
    height:50px;
    width:100%;
    display: flex;
    justify-content: center;
  }
  .floor_one p{
    margin:15px;
  }
.home{
    width:1100px;
    background:#fff;
    margin-top:80px;
  }
  .label{
    position: absolute;
    text-align: right;
    right:820px;
    /* padding-top:15px; */
    line-height: 44px;
  }
.redX{
    color:red;
    display: inline-block;
    line-height: 44px;
    font-size:14px;
    margin-left:4px;
  }
  .release_btns{
    display:flex;
    justify-content:center;
    padding-bottom:40px;
  }
</style>