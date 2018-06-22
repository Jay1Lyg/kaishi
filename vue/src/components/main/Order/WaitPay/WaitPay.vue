<template>
<div>
   <div class="twoTitle">
      <GoodsTitle />
   </div>
   <div class="orderTitle">
     <OrderNum/>
   </div> 
   <div class="detailH">
      <OrderDetail titleMsg="等待付款"/>
   </div>
   <div class="orderTitle">
     <OrderNum/>
   </div> 
   <div class="detailTwos">
      <input type="checkbox" class="checkbox"/>
      <ul class="detailMsgs">
       <DetailSmall/>
       <DetailSmall/>
       <DetailSmall/>
       <DetailSmall/>
       <DetailSmall/>
       <DetailSmall/>
      </ul>
      <ul class="price">
       <Price titleMsg="等待付款"/>
      </ul>
   </div>
</div>

</template>

<script>
import OrderNum from './OrderNum.vue'
import OrderDetail from './OrderDetail.vue'
import Price from './Price.vue'
import GoodsTitle from './GoodsTitle.vue'
import DetailSmall from './DetailSmall'
export default {
  name:'WaitPay',
  data () {
    return {
      twoTitleArr:["商品信息","数量","金额","运费","共计","订单类型","买家信息"],
    };
  },

  components: {OrderNum,OrderDetail,Price,GoodsTitle,DetailSmall},
  mounted () {  
    this.init();  
  },  
  methods: {
  init() {  
        const self = this;  
      }  
  },
    
}

</script>
<style>
.oneTitle {
    width: 100%;
    height: 53px;
    line-height: 53px;
    overflow: hidden;
    border-bottom: 4px solid #fff;
}
.oneTitle ul li {
    float: left;
    margin-left: 80px;
}
.twoTitle {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #e4e4e4;
    overflow: hidden;
    margin-top: 20px;
    border-radius: 2px;
}
.orderTitle {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
    font-size: 14px;
    color: #6b6b6b;
    overflow: hidden;
}
.searchK {
    width: 300px;
    height: 40px;
    line-height: 40px;
    border-radius: 145px;
    font-size: 14px;
    color: #bcbcbc;
    overflow: hidden;
    border: 1px solid #86bfc6;
}
.orderTitle ul li.orderNum {
    margin: 0px 40px 0 20px;
}
.orderTitle ul li {
    float: left;
}
.orderTitle ul li.createTime {
    margin-right: 40px;
}
.orderTitle ul li.downTime {
    margin-left: 340px;
    color: red;
}
.detailH {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #fff;
    border-radius: 2px;
}
body .location {
    position: relative;
}
.detailH .goodsMsg {
    width: 366px;
}
.detailH ul li {
    width: 124px;
    float: left;
    height: 100px;
    text-align: center;
}

.goodsMsg {
    overflow: hidden;
}
.detailTwos{
  height:auto;
  background:#fff;
  overflow:hidden;
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.detailTwos .detailMsgs {
    width: 551px;
}
.detailMsgs, .price {
    float: left;
}
.detailTwos .price {
    width: 496px;
}
.location .locationImg{
  width:26px;
  height:27px;
  margin:37px auto;
  background:url(../../../../assets/Bugmsg.png) no-repeat;
  background-size:100%;
}
.location .locationImg:hover{
  background:url(../../../../assets/hoverbug.png) no-repeat;
  background-size:100%;
}
</style>