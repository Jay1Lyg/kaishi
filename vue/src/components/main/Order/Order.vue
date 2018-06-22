<template>
<div>
   <div class="oneTitle">
      <ul>  
        <li>  <a href="#/WaitPay" :class="{active:index[0]}"  @click="toggle(0)">等待付款</a></li>
        <li>  <a href="#/WaitDeliver" :class="{active:index[1]}" @click="toggle(1)">等待发货</a></li>
        <li>  <a href="#/SendMsg" :class="{active:index[2]}" @click="toggle(2)" > 物流信息</a></li>
        <li>  <a href="#/AfterSale" :class="{active:index[3]}" @click="toggle(3)"> 售后订单</a></li>
        <li>  <a href="#/SuccessSale" :class="{active:index[4]}" @click="toggle(4)"> 成功订单</a></li>
        <li>
          <div class="searchK">
            <input type="text" placeholder="订单编号、买家名称"/><a>搜索</a>
          </div>
        </li>
      </ul>
   </div>
  <router-view/>
</div>

</template>

<script>
export default {
  name:'Order',
  data () {
    return {
      index:[1,0,0,0,0],
      active:'active',
      indexs:0,
    };
  },

  components: {},

  methods: {
      toggle:function(indexs){
      console.log(indexs);
        for(var i in this.index){
          this.index[i]=0;
        }         
        this.index[indexs]=1;
        console.log(this.index);
      }
  }
}

</script>
<style>
.oneTitle ul li{
 float:left;
 margin-left:80px;
}
.oneTitle ul li a{
  display:inline-block;
  height:51px;
  
}
.active{
  color:#4da2ad;
  border-bottom:2px solid red;
}
.unactive{
  color:#666;
  border-bottom:none;
}
.searchK{
  width:300px;
  height:40px;
  line-height:40px;
  border-radius:145px;
  font-size:14px;
  color:#bcbcbc;
  overflow:hidden;
  border:1px solid #86bfc6;
}
.searchK:hover{
   border:1px solid #4da2ad;
}
.searchK input{
  border:none;
  background:none;
  outline:none;
}
.searchK a{
  display:inline-block;
  background:#86bfc6;
  width:56px;
  float:right;
}
.searchK a:hover{
   background:#4da2ad;
   color:#fff;
}
</style>