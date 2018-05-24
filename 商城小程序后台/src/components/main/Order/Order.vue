<template>
<div>
  <p>this is order</p>
  <p><a href="#/WaitPay">我的订单</a></p>
  <ul>
    <li>  <a href="#/WaitPay"> 等待付款</a></li>
    <li>  <a href="#/WaitDeliver"> 等待发货 </a></li>
    <li>  <a href="#/SendMsg"> 物流信息</a></li>
    <li>  <a href="#/AfterSale"> 售后订单</a></li>
    <li>  <a href="#/SuccessSale"> 成功订单</a></li>
  </ul>
  <router-view/>
</div>

</template>

<script>
export default {
  name:'Order',
  data () {
    return {
    };
  },

  components: {},

  methods: {
    plotClick(index){
        console.log(index)
    }
  }
}

</script>
<style>
</style>
