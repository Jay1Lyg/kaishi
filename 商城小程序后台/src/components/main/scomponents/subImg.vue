<template>
<div>
  <div class=" " :style="{sty}">
      <div class="uploadImg lf" v-bind:style="sty" @mouseenter="mouseenter"  @mouseleave="mouseLeave" @click="">
        <div class="outCover" v-show="(!src)&&isHover"></div>
        <div class="addCover" v-show="(!src)&&isHover">
              <p>添加</p>
        </div> 
        <div class="cotrOut" >
          <img class="submit_img" v-show="!isHover" src="../../../assets/submit_img.png" alt="">
        <div class="contrImg" v-show="src&&isHover" >
            <img class="deleteImg" src="../../../assets/deltet0.png" alt="">
            <img class="deleteImg1" src="../../../assets/deltet1.png" alt="">
            <img class="moveLf" src="../../../assets/left0.png" alt="">
            <img class="moveLf1" src="../../../assets/left1.png" alt="">
            <img class="moveRt" src="../../../assets/right0.png" alt="">
            <img class="moveRt1" src="../../../assets/right1.png" alt="">
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
      show:false,
      isHover:false,
    };
  },
  props:['sty','src'],
  components: {},
  methods: {
    mouseenter:function(){
      this.show=true;
      this.isHover=true;
      console.log(1)
    },
    mouseLeave:function(){
      this.show=false;
      this.isHover=false;
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

      width:112px;
      height:115px;
  }
</style>