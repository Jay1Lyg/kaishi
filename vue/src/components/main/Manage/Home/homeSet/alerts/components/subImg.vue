<template>
<div>
  <div class=" " :style="{sty}">
      <div class="uploadImg lf" v-bind:style="sty" @mouseenter="show=true;isHover=true;"  @mouseleave=" show=false;isHover=false;">
        <div class="outCover" v-show="(!srcs)&&isHover"></div>
        <div class="addCover" v-show="(!srcs)&&isHover" @click="clickMe">
              <p>添加</p>
        </div>
        <div class="cotrOut" >
          <img class="submit_img" v-show='!srcs&&!isHover' src='@/assets/submit_img.png' alt="">
          <img class="submit_img" v-show='srcs' :src='srcs' alt="">
          <div class="contrImg" v-show="srcs&&isHover" >
              <img class="deleteImg" @click="deleteImg" src="@/assets/deltet0.png" alt="">
              <img class="deleteImg1"  src="@/assets/deltet1.png" alt="">
              <img class="moveLf" src="@/assets/left0.png" alt="">
              <img class="moveLf1" src="@/assets/left1.png" alt="">
              <img class="moveRt" src="@/assets/right0.png" alt="">
              <img class="moveRt1" src="@/assets/right1.png" alt="">
          </div>
      </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
   directives: {
     focus: {
        update: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
  },
  name:'subImg',
  data () {
    return {
      srcs:'',
      show:false,
      isHover:false,
      subSrc:"@/assets/submit_img.png"
    };
  },
  props:{
    sty:String,
    src:String,
    sendType:String,
    index:Number
  },
  components: {},
  beforeMount:function(){
    var that = this;
    if(this.src){
        that.srcs=this.src
    }
  },
  methods: {
    clickMe:function(){
      if(this.sendType=="productions"){
          $('.subProductionImages').click()
      }else if(this.sendType=='detailImages'){
          $('.subDetailImages').click();
      }
    },
    deleteImg:function(){
      var that = this;
      var conf = confirm('确认删除吗？')
      if(conf){
        if(that.sendType=="productions"){
          that.$parent.deleteImage2(that.index)
          console.log(that.index)
        }else if(that.sendType=='detailImages'){
          that.$parent.deleteImage3(that.index)
        }
      }
    }
  }
}

</script>
<style>
/* 添加图片 */
.outCover{
  width:100%;
  height:100%;
  background: #000;
  opacity: .5;
}
.addCover{
  width: 98px;
  height: 40px;
  border:1px solid #fff;
  color:white;
  border-radius: 40px;
  line-height: 40px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

 /* .smallBD{
    display: inline-block;
    margin-left:20px;
    width:490px;
    height:44px;
    border-radius: 4px;
    border:1px solid #d7d7d7;
    position: relative;
  } */
   .upload_imgs{
    border:none;
  }
 
  .uploadImg{
    border-radius: 4px;
    width:150px;
    height:150px;
    margin-right:20px;
    margin-top:20px; 
    position: relative;   
    background:#f2f2f2;
    cursor:pointer;
  }
  .cotrOut{
    width:100%;
    height:100%;
    position: absolute;
  }
   .contrImg{
    position: absolute;
    bottom:0;
    width:100%;
    height:30px;
    background: black;
    opacity: .5;
  }
  .contrImg>img{
    width: 24px;
    height: 22px;
    margin-top:4px;
  }
  .deleteImg,.moveLf,.moveRt,.deleteImg1,.moveLf1,.moveRt1{
    position: absolute;
  }
  .deleteImg,.deleteImg1{
    left: 10px;
  }
  .moveLf,.moveLf1{
    right: 44px;
  }
  .moveRt,.moveRt1{
    right: 10px;
  }
  .deleteImg,.moveLf,.moveRt{
    z-index:1;
  }
  .deleteImg:hover,.moveLf:hover,.moveRt:hover{
    opacity: 0;
  }
  .submit_img{
      width:100%;
      height:100%;
  }
</style>