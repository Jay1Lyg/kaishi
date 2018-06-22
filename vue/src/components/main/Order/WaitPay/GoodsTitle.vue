<template>
  <div>
      <ul v-for="tmp in twoTitleArr">
        <li ref="firstWidth">{{tmp}}</li>
      </ul>
  </div>
</template>
<script>
export default {
  name:'GoodsTitle',
  data () {
    return {
      twoTitleArr:["商品信息","数量","金额","运费","共计","订单类型","买家信息"],
    };
  },

  components: {},
  mounted () {  
    this.init();  
    this.create();
  }, 
  props:['operate'],
  created:function(){
    
  },
  methods: {
  init() {  
        const self = this;  
        this.$refs.firstWidth[0].style.width = '366px';    
      } ,
  create(){
    console.log(this._props.operate);
    if(this._props.operate=="操作"){
      this.$refs.firstWidth[5].innerHTML="买家信息";
      this.$refs.firstWidth[6].innerHTML="操作";
    }
  }
  },
    
}
</script>
<style>
.firstliWidth{
  width:366px;
}
.twoTitle{
  width:100%;
  height:60px;
  line-height:60px;
  background:#e4e4e4;
  overflow:hidden;
  margin-top:20px;
  border-radius:2px;
}
.twoTitle ul li{
  width:124px;
  float:left;
  text-align:center;
}
</style>