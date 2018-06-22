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
	    	<div class="totalPrice">
	    		<DetailPrice/>
	    	</div>
	   		
	    </div>
    </div>
</template>

<script>
import GoodsTitle from '../../Order/WaitPay/GoodsTitle.vue'
import OrderSucc from '../WaitView/OrderSucc.vue'
import DetailLeft from '../GoodView/DetailLeft.vue'
import DetailL from '../GoodView/DetailL.vue'
import DetailPrice from '../GoodView/DetailPrice.vue'
export default {
  name:'BadView',
  data () {
    return {
    };
  },

   components: {GoodsTitle,OrderSucc,DetailLeft,DetailL,DetailPrice},

  methods: {}
}

</script>
<style>
</style>