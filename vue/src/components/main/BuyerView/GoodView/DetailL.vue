<template>
	 <div>
	  <ul style="position:relative;">
        <li class="goodsMsg">
          <img src="../../../../assets/uppic.png" style="margin-left:10px;"/>
          <div style="margin-top:-40px;">
            <p>{{foodName}}</p>
            <p class="fontColor">口味：{{taste}}</p>
          </div>
        </li>
        <li>{{count}}</li>
        <li>{{money}}</li>
        <li class="waitPay rightLi">
          <div style="margin-top:37px;">
            <p class="bugColor">查看评价</p>
          </div>
        </li>
    </ul>	   
	</div>
</template>

<script>
export default {
  name:'DetailLeft',
  data () {
    return {
     foodName:"飞机对二号好地方几乎都是尽快发货",
     taste:"麻辣",
      count:"X1",
      money:"545.00"
    };
  },

  components: {},

  methods: {}
}

</script>
<style>
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
.goodsMsg img{
  width:40px;
  height:40px;
  margin:30px 10px 0 0;
}
.rightLi{
  position:absolute;
  right:-495px;
}

</style>