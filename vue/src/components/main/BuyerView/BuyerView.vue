<template>
<div>
    <div class="oneTitle">
      <ul>  
        <li>  <a href="#/WaitView" :class="{active:index[0]}"  @click="toggle(0)">待评价</a></li>
        <li>  <a href="#/GoodView" :class="{active:index[1]}" @click="toggle(1)">好评</a></li>
        <li>  <a href="#/MidView" :class="{active:index[2]}" @click="toggle(2)" > 中评</a></li>
        <li>  <a href="#/BadView" :class="{active:index[3]}" @click="toggle(3)"> 差评</a></li>
        <li class="searchWidth">
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
  name:'BuyerView',
  data () {
    return {
      index:[1,0,0,0],
      active:'active',
      indexs:0,
    };
  },

  components: {},

  methods: {
    toggle:function(indexs){
      for(var i in this.index){
        this.index[i]=0;
      }
      this.index[indexs]=1;
    }
  }
}

</script>
<style>
.oneTitle{
  width:100%;
  height:53px;
  line-height:53px;
  overflow:hidden;
  border-bottom:4px solid #fff;
}
.oneTitle ul li{
 float:left;
 margin-left:80px;
}
.oneTitle ul li a{
  display:inline-block;
  height:51px;
  
}

.oneTitle ul li.searchWidth{
  margin-left:345px;
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