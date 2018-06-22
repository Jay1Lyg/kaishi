<template>
  <!-- 轮播 -->
  <div class="Carousel">
    <div class="ones_inp clear" style="height:100%;">
        <p class="label"> <span class="redX">*</span>&nbsp;店长推荐商品
          <br>
          <span style="font-size:12px;color:#949494;">(默认<span style="color:#4da2ad">第一张</span>图片为商品封面图)</span>
        </p>
        <div class="subImgs"  >
          <ShowSubImg v-for="item in hotSellGoods" :key="item.carousel_id" sty="width:150px;height:150px;" :src="item.iconUrl" :_id="item.production_id
" sendType="hotSellGoods"></ShowSubImg>
          <ShowSubImg v-show="isShow()" sty="width:150px;height:150px;" sendType="hotSellGoods"></ShowSubImg> 
        </div>
      </div>
  </div>
</template>

<script>

import ShowSubImg from '@/components/commonComponents/ShowSubImg'

import service from '@/utils/require'

export default {
  name:'recommend',
  data () {
    return {
    };
  },
  props:{
    hotSellGoods:Array
  },
  components: {
    ShowSubImg,//图片
  },
  // mounted:function(){
  //   console.log(this.hotSellGoods)
  // },
  methods: {
    jumpTo:function(){
      let arr = JSON.stringify(this.hotSellGoods)
      this.$router.push({path:'/setCarousel',query:{prama:arr,type:'hotSellGoods'}})
    },
    /**
     * 删除店长推荐
     */
    deleteHomeImg:function(carouselImage_id){
      let that = this;
        that.$confirm('即将去除该店长推荐, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var loading = this.$loading()
          service.postMsg("deleteRecommendGood",{
            "production_id":carouselImage_id
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
      if(typeof this.hotSellGoods == 'object')
        return (this.hotSellGoods.length<6)
      else
        return true
    }
  }
}

</script>
<style>
</style>