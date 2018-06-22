<template>
	  <ul class="price">
      <li style="line-height:220px;">0.00</li>
        <li style="line-height:220px;">54455.00</li>
        <li class="twoWaitPay">
          <div>
            <p>{{titleMsg}}</p>
            <p class="bugColor">买家留言</p>
          </div>
        </li>
        <li class="location" style="margin-top:50px;">
          <LocationAlert/>
        </li>
      </ul>
</template>
<script>
import LocationAlert from './LocationAlert.vue'
export default {
  name:'Price',
  data () {
    return {
      address:"北京市朝阳区 朝阳北路 定福庄 金星小区6号楼6单元600",
      userName:"唐小鸭",
      userTel:"151515151515",
      isShowing:false,
    };
  },
  props:['titleMsg'],
  components: {LocationAlert},

  mounted:function(){},
  methods: {
    onMouseOver:function(){
      this.isShowing=true;
      console.log("鼠标移入了");
    },
    onMouseOut:function(){
      this.isShowing=false;
    },
   
  }
}

</script>
<style>
.detailTwos .price{
  width:496px;
}
.detailMsgs,
.price{
  float:left;
}
.detailTwos .price li{
  width:124px;
  float:left;
  height:220px;
}
.twoWaitPay div{
  width:124px;
  line-height:30px;
  margin-top:67px;
}
</style>