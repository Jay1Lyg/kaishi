<template>
	  
      <ul>
        <li class="orderNum">订单编号:{{orderNums}}</li>
        <li class="createTime">创建时间:{{createTime}}</li>
        <li>买家：{{buller}}</li>
        <li class="downTime">距离订单关闭：{{shutDownTime}}</li>
      </ul>
  
</template>
<script>
export default {
  name:'OrderNum',
  data () {
    return {
      orderNums:"454515842154",
      createTime:"2018.03.03  12:30",
      buller:"小小仙姑",
      shutDownTime:"1天1小时2分钟"
    };
  },

  components: {},

  methods: {}
}

</script>
<style>
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