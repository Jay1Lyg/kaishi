<template>
	  
      <ul>
        <li class="orderNum">订单编号:{{OrderNum}}</li>
        <li class="createTime">交易成功:{{OrderTime}}</li>
        <li>买家：{{buller}}</li>
      </ul>
  
</template>
<script>
export default {
  name:'OrderSucc',
  data () {
    return {
      OrderNum:"454515842154",
      OrderTime:"2018.03.03  12:30",
      buller:"小小仙姑"
    };
  },

  components: {},

  methods: {}
}

</script>
<style>
.orderTitle {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
    font-size: 14px;
    color: #6b6b6b;
    overflow: hidden;
}
.orderTitle ul li{
  float:left;
}
.orderTitle ul li.orderNum{
  margin:0px 40px 0 20px;
}
.orderTitle ul li.createTime{
  margin-right:40px;
}
.orderTitle ul li.downTime{
  margin-left:340px;
  color:red;
}
</style>