<template>
<div>
  <div v-show="imgSrc" class="imgUpload" @mouseenter="hover=true"
      @mouseleave="hover=false">
    <div class="outCoverHome" v-show="hover"  @click="subImgs(production_id)">
      重新上传
    </div>
    <img class="imgHome" :src="imgSrc" alt="加载失败">
  </div>

  <a v-show="!imgSrc" href="javascript:;" class="cliSubImg" @click="subImgs(production_id)">上传图片</a>
</div>
</template>

<script>
export default {
  name:'showImg',
  props:{
    imgSrc:String,
    production_id:String,
    k:Number
  },
  data () {
    return {
      hover:false,
    };
  },

  components: {},
  methods: {
    subImgs(production_id){
      console.log(production_id)
      this.$parent.production_id=production_id;
      this.$parent.k=this.k;
      $('.subImgHome').click()
    },
  }
}

</script>
<style>
.imgUpload{
  width:75px;
  height:40px;
  float: left;
  /* display: inline-block; */
  margin-left:20px;
}
.imgHome{
  max-width:75px;
  max-height:40px;
  margin:0 auto;
}
.outCoverHome{
  width:75px;
  height:40px;
  position: absolute;
  background:#000;
  opacity: .3;
  color:#fff;
  line-height: 40px;
  cursor: pointer;
}
</style>