<template>
  <!-- 轮播 -->
  <div class="Carousel">
    <div class="ones_inp clear" style="height:100%;">
        <p class="label"> <span class="redX">*</span>&nbsp;轮播展示商品
          <br>
          <span style="font-size:12px;color:#949494;">(默认<span style="color:#4da2ad">第一张</span>图片为商品封面图)</span>
        </p>
        <div class="subImgs"  v-for="item in carouselProduction" :key="item.carousel_id">
          <ShowSubImg sty="width:418px;height:220px;" :src="item.images" :_id="item.carousel_id" sendType="HomeOutImg"></ShowSubImg>
        </div>
        <div class="subImgs" v-show="isShow()">
          <ShowSubImg sty="width:418px;height:220px;" v-show="isShow()" sendType="HomeOutImg"></ShowSubImg>
        </div>
      </div>
  </div>
</template>

<script>

import ShowSubImg from '@/components/commonComponents/ShowSubImg'
import service from '@/utils/require'

export default {
  name:'Broadcast',
  data () {
    return {
    };
  },
  props:{
    carouselProduction:Array
  },
  components: {
    ShowSubImg,//图片
  },

  methods: {
    jumpTo:function(){
      let arr = JSON.stringify(this.carouselProduction)
      this.$router.push({path:'/setCarousel',query:{prama:arr}})
    },

    /**
     * 删除轮播图片
     */
    deleteHomeImg:function(carouselImage_id){
      let that = this;
        that.$confirm('即将删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var loading = this.$loading()
          console.log(1111111)
          service.postMsg("deleteCarouselProduction",{
            "carouselImage_id":carouselImage_id
          }).then((res)=>{
           
            setTimeout(() => {
              loading.close();
              that.$parent.searchAllMsg()
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            }, 700);
          })

        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },

    isShow:function(){
      if(typeof this.carouselProduction == 'object')
        return (this.carouselProduction.length<6)
      else
        return true
    }
  }
}

</script>
<style>
</style>