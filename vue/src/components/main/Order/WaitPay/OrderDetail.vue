<template>
	 
      <ul>
        <li class="goodsMsg">
          <input type="checkbox" class="checkbox"/>
          <img src="../../../../assets/uppic.png"/>
          <div>
            <p>{{foodName}}</p>
            <p class="fontColor">口味：{{taste}}</p>
          </div>
        </li>
        <li>{{count}}</li>
        <li>{{money}}</li>
        <li>{{freight}}</li>
        <li>{{amount}}</li>
        <li class="waitPay">
          <div>
            <p>{{titleMsg}}</p>
            <p class="bugColor">买家留言</p>
          </div>
        </li>
        <li class="location">
          <LocationAlert/>
        </li>
      </ul>
  
</template>
<script>
import LocationAlert from './LocationAlert.vue'
export default {
  name:'OrderDetail',
  data () {
    return {
    foodName:"fasdfhdsjkfdsjfhdjfdasfdsf",
    taste:"麻辣",
    count:"X1",
    money:"45.00",
    freight:"0.00",
    amount:"54455.00"
    };
  },
  props:['titleMsg'],  
  components: {LocationAlert},

  methods: {}
}

</script>
<style>
.fontColor{
  font-size:14px;
  color:#bcbcbc;
}
.bugColor{
  font-size:14px;
  color:#86bfc6;
}
.detailH{
  width:100%;
  height:100px;
  line-height:100px;
  background:#fff;
  border-radius:2px;
}
.detailH ul li{
  width:124px;
  float:left;
  height:100px;
  text-align:center;
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
.waitPay div{
  line-height:32px;
  height:60px;
  margin-top:22px;
  amrgin-left:46px;
}
.goodsMsg img{
  width:40px;
  height:40px;
  margin:30px 10px 0 0;
}
.goodsMsg .checkbox,
.detailTwos .checkbox{
  width:20px;
  height:20px;
  background:none;
  float:left;
  margin:40px 20px;
  border:1px solid #d7d7d7;
  border-radius:4px;
}
</style>