<template>
	<div>
		<div class="twoTitle">
	      <GoodsTitle operate="操作"/>
	   	</div>
	   	<div class="orderTitle">
	   		<OrderSucc/>
	    </div> 
	   	<div class="detailH">
	   		<DetailLeft/>
	   	</div>
	   	<div class="orderTitle">
	   		<OrderSucc/>
	    </div> 
	    <div class="DetailBig">
	    	<div class="detailMsgs">
	    		<DetailL/>
	    		<DetailL/>
	    		<DetailL/>
	    		<DetailL/>
	    		<DetailL/>
	    	</div>
	    	<div class="flex" style="height:flexHeight">
	    		<div class="totalPrice">
	    			<DetailPrice/>
	    		</div>
	    	</div>	
	    	
	   		
	    </div>
    </div>
</template>

<script>
import GoodsTitle from '../../Order/WaitPay/GoodsTitle.vue'
import OrderSucc from '../WaitView/OrderSucc.vue'
import DetailLeft from './DetailLeft.vue'
import DetailL from './DetailL.vue'
import DetailPrice from './DetailPrice.vue'
//import ViewAlert from '../ViewAlert.vue'
export default {
  name:'GoodView',
  data () {
    return {
    	flexHeight:"100px"
    };
  },

  components: {GoodsTitle,DetailLeft,OrderSucc,DetailL,DetailPrice},
  mounted(){
  this.create();
  },
  methods: {
	  create(){ 

	  }
  }
}

</script>
<style>
.DetailBig{
  width:100%;
  background:#fff;
  overflow:hidden;
  border-radius:2px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-bottom:1px solid #ddd;
}
.DetailBig .goodsMsg{
  width:366px;
}
.goodsMsg img,
.goodsMsg .checkbox,
.goodsMsg div{
  float:left;
}
.goodsMsg div{
 line-height:22px;
 padding:5px;
 box-sizing:border-box;
 overflow:auto;
 width:300px;
 height:auto;
  margin-top:-73px;
  margin-left:83px;
}
.DetailBig ul li{
  width:124px;
  float:left;
  height:100px;
  line-height:100px;
  text-align:center;
}

.totalPrice{
	height:100px;
	margin-right:125px;
}
</style>