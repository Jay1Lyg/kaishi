<template>
<div>
   <i class="updateImg2 update" @click="alertUpdate(productionid)" @mouseenter="hover=true" @mouseleave="hover=false"><i  v-bind:class="{updateImg2:hover,changeColor:hover}"  class="update"></i></i>
</div>
</template>

<script>
export default {
  name:'updateImg',
  data () {
    return {
        hover:false,
    };
  },

  props:{
    productionid:String
  },
  components: {},

  methods: {
   //修改数据
      alertUpdate:function(index, row){
          // this.updateGoods=true
          // this.chooseGoodsId = row.production_id ;
          // console.log(this.productionid)
          // this.$parent.noRouter=false;
          console.log('click')
          this.$router.push(
            {
              name:'updateGoods', 
              params: {productionid:this.productionid}
            }
          );
          // router.push({ name: 'user', params: { userId: 123 }})
      },
      
    
  }
}

</script>
<style>
  .updateImg2{
    overflow: hidden;
    display: inline-block;
    margin:8px;
    margin-top:18px;  
    width:25px;
    height:25px;
    background:  url(../../../../../assets/four.png) no-repeat border-box;
  }
  /* .updateImg>.update{
    background-position: 3px 2px;
  } */
  .changeColor{
      color:#86bfc6;
      overflow: hidden;
      position: relative;
      left: -36px;
      top:-18px;  
      border-right: 0px solid transparent;
      -webkit-filter: drop-shadow(28px 0);
      filter: drop-shadow(28px 0); 
      z-index: 10;
  }
</style>