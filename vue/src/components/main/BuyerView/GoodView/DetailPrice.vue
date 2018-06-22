<template>
	 <div>
	  <ul>
        <li>{{freight}}</li>
        <li>{{amount}}</li>
        <li class="location">
         <LocationAlert/>   
        </li>
    </ul>	   
	</div>
</template>

<script>
import LocationAlert from '../../Order/WaitPay/LocationAlert.vue'
export default {
  name:'DetailPrice',
  data () {
    return {
      freight:"0.00",
      amount:"54455.00"
    }
  },

  components: {LocationAlert},

  methods: {
  }
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
  width:80px;
  margin:8px auto;
  border:1px solid #4da2ad;
  border-radius:4px;
}
.detailH .goodsMsg{
  width:366px;
}
.goodsMsg{
  overflow:hidden;
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
body .location{
  position:relative;
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
  margin:37px auto;
  background:url(../../../../assets/Bugmsg.png) no-repeat;
  background-size:100%;
}
.location .locationImg:hover{
  background:url(../../../../assets/hoverbug.png) no-repeat;
  background-size:100%;
}
</style>