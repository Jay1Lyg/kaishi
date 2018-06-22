<template>
<div v-show="isShow">
  <!-- 遮罩 -->
  <div class="outDiv" @scroll.prevent></div>
  <div class="centerMain">
      <div class="cenHeader">
        <div class="headLeft">
          <p>设置轮播商品封面</p>
        </div>
        <div class="headRtPoi" @click="closeShow">
          <div class="headRt"></div>
        </div>
      </div>
      <div class="cenBody">
        <div class="cenDetail">
          <span>
            您已选择{{chosMsg.length}}款商品为首页轮播图，请分别为商品上传相应的轮播封面图！轮播图片的尺寸为750px*400px，请上传相应尺寸的图片
          </span>
        </div>
        <div class="showMsg">
          <div class="oneCeil" v-for="(item,index) in chosMsg" :key="item.production_id">
            <div class="ceilLeft">
              <img :src="item.iconUrl" alt="无" class="nowImg lf">
              <p class="proTitle lf">{{item.title}}</p>
            </div>
            <div>
                <showImg :imgSrc="showNowImg[index]" :production_id="item.production_id" :k="index"></showImg>
                <update></update>
            </div>
          </div>
        </div>
        <Btn class="successSub" sm v-on:isClick="successSub" msg="确认发布"></Btn>
      </div>
      <input type="file" v-show="false" class="subImgHome" accept="image/jpeg,image/x-png,image/gif" @change="subImgHome">
  </div>
</div>
</template>

<script>
import showImg from './components/showImg'
import Btn from '@/components/commonComponents/Btn'


import update from './components/update'
import service from '@/utils/require'

export default {
  name:'setOutImg',
  data () {
    return {
        isShow:false,
        production_id:'',
        showNowImg:["","","","","",""],
        k:0,
    };
  },
  props:{
    chosMsg : Array
  },
  watch:{
    isShow(curVal,oldVal){
      if(curVal){
        stop();
      }else{
        move();
      }
      function stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      }
      /***取消滑动限制***/
       function move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      }
    },
  },
  components: {
    update,//上下移箭头
    Btn,
    showImg,//展示图片
  },
  methods: {
    /**
     * 打开弹窗
     */
    openShow(){
      var that = this;
      var productionIdArray = [];
      
      that.chosMsg.forEach(item=>{
        productionIdArray.push(item.production_id)
      })
    
      service.postMsg('searchCarouselImages',
        {'productionIdArray':productionIdArray})
        .then((res)=>{
          that.showNowImg=[]          
            res.data.forEach(item=>{
              that.showNowImg.push(item.images)
            })
            console.log(that.showNowImg)
            that.isShow=true;
          console.log(res.data)
        })
    },
    /**
     * 关闭弹窗
     */
    closeShow(){
      this.isShow=false; 
      move()
      /**
       *取消滑动限制
       **/
      function move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      }
    },
    
    /**
     * 上传封面照片
     */
    subImgHome:function(e){
      var that = this;
          that.closeShow();
      var loading = this.$loading()
      
      var file = e.target.files[0];
      var data =  {
        "user_id": sessionStorage.getItem('user_id'),
        'production_id':that.production_id,
        "images_upload": file
      }
      service.postMsg('setCarouselImage',data)
        .then((res)=>{
          var reader = new FileReader();
          reader.readAsDataURL(file); // 读出 base64
          reader.onloadend = function () {
            var dataURL = reader.result;
            res.data.index===true &&
            (that.showNowImg[that.k]=dataURL)

            setTimeout(() => {
              loading.close()
              setTimeout(()=>{
                that.openShow();
              },280)
            },700);
            
          };
        })
    },
    /**
     * 查询以设置商品信息
     */
    searchAllMsg:function(){
      var that = this;
      var data =  {
        "user_id": sessionStorage.getItem('user_id'),
      }
      service.postMsg('searchHomepageInfo',data)
      .then((res)=>{
        console.log(res.data)
      })
    },
    /**
     * 发步成功
     */
    successSub:function(){
      var arr = []
      var that = this;
      that.chosMsg.forEach((item,index)=>{
        arr.push(item.production_id)
      })

      var data = {
        'productionIdArray':arr
      }

      service.postMsg('confirmPublishCarouselProduction',data)
        .then((res)=>{
          console.log(res)
          if(res.data==="success"){
            that.isShow=false
              that.$notify({
                title: '成功',
                message: '发步成功',
                type: 'success'
              });
              setTimeout(()=>{
                that.$router.push('/Home')
              },200)
          }

          })

    },
    computeSrc:function(production_id){

    }
  }
}

</script>
<style>
 @import './setOutImg' 
</style>