<template>
	 <div>
	  <ul>
        <li class="goodsMsg">
          <img src="../../../../assets/uppic.png" style="margin-left:10px;"/>
          <div style="margin-top:-40px;">
            <p>{{foodName}}</p>
            <p class="fontColor">口味：{{taste}}</p>
          </div>
        </li>
        <li>{{count}}</li>
        <li>{{money}}</li>
        <li>{{freight}}</li>
        <li>{{amount}}</li>
        <li class="location">
          <LocationAlert/>
        </li>
        <li class="waitPay">
          <div style="margin-top:37px;">
            <p class="bugColor">查看评价</p>
          </div>
        </li>
    </ul>	   
	</div>
</template>

<script>
import LocationAlert from '../../Order/WaitPay/LocationAlert.vue'
export default {
  name:'DetailLeft',
  data () {
    return {
    count:"X1",
    money:"545.00",
    freight:"0.00",
    amount:"54455.00",
    foodName:"飞机对二号好地方几乎都是尽快发货",
    taste:"麻辣"
    };
  },

  components: {LocationAlert},

  methods: {}
}

</script>
<style>
.fontColor{
  font-size:14px;
  color:#bcbcbc;
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
.location .locationImg{
  width:26px;
  height:27px;
  margin:90px auto;
  background:url(../../../../assets/Bugmsg.png) no-repeat;
  background-size:100%;
}
.location .locationImg:hover{
  background:url(../../../../assets/hoverbug.png) no-repeat;
  background-size:100%;
}
</style>