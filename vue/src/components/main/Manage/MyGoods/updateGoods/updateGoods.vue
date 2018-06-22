<template>
<div>
  <stepOne :production_id="production_id"  ref="stepT"></stepOne>
  <stepTwo :production_id="production_id"  isUpdate = "true"></stepTwo>
</div>
</template>

// <script>
import stepOne from './steps/stepOne'
import stepTwo from './steps/stepTwo'
import service from '@/utils/require'

export default {
  name:'updateGoods',
  data () {
    return {
      production_id:'',
      totalGoodsMsg:[],
    };
  },
  components: {
    stepOne,
    stepTwo
  },
  created:function(){
    var that = this;
     this.production_id=this.$route.params.productionid;
    
      // service.postMsg('searchProductionDetails',{
      //     "productionid": that.production_id
      // }).then((res)=>{
      //     console.log(res.data)
      //     that.totalGoodsMsg=res.data;
      // })
  },
  methods: {
    isNext:function(){
        this.$refs.stepT.subMsg();
    },
  }
}

</script>
<style>
  @import  './Release.css'
</style>