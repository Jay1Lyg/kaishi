<template>
	<div>
	   <div class="twoTitle">
	      <GoodsTitle/>
	   </div>
	   <div class="orderTitle">
	     <OrderSucc/>
	   </div> 
	   <div class="detailH">
	      <OrderDetail titleMsg="待评价" />
	   </div>
	    <div class="orderTitle">
	     <OrderSucc/>
	   </div> 
	    <div class="detailTwos">
	      <input type="checkbox" class="checkbox"/>
	      <div class="detailMsgs">
	       <DetailSmall/>
	       <DetailSmall/>
	       <DetailSmall/>
	       <DetailSmall/>
	       <DetailSmall/>
	      </div>
	      <div class="price">
	       <Price titleMsg="待评价"/>	
	      </div>
	    </div>
	    <div class="sendAcp" v-show="false">
	    	<img src="../../../../assets/succ.png">
	    	<p>已成功向买家发送邀请</p>
	    </div>
	</div>
</template>

<script>
import GoodsTitle from '../../Order/WaitPay/GoodsTitle.vue'
import OrderDetail from '../../Order/WaitPay/OrderDetail.vue'
import Price from '../../Order/WaitPay/Price.vue'
import DetailSmall from '../../Order/WaitPay/DetailSmall.vue'
import OrderSucc from './OrderSucc.vue'

export default {
  name:'WaitView',
  data () {
    return {
    };
  },

  components: {GoodsTitle,OrderSucc,OrderDetail,Price,DetailSmall},

  methods: {}
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
.firstliWidth{
  width:366px;
}
.sendAcp{
	width:300px;
	height:170px;
	border-radius:4px;
	background:#fff;
	text-align:center;
 	box-shadow:#4da2ad 0px 0px 30px 5px;
}
.sendAcp img{
	margin-top:35px;
}
.detailMsgs div{
	height:100px;
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