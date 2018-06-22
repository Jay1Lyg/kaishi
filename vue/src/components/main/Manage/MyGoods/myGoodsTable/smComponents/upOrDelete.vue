<template>
  <div class="rt">
    <el-button type="primary" @click="deleteThis">删除</el-button>
    <el-button type="primary" @click="shelves">{{ifonshelves?'下架':"上架"}}</el-button>
  </div>
</template>

<script>
/**
 * axio ajax 
 */
import { Message } from 'element-ui'

import service from '@/utils/require'

export default {
  name:'upOrDelete',
  data () {
    return {
      chooseProduct:[],//已选id组
    };
  },

  components: {},
  props:{
    ifonshelves:Boolean
  },
  methods: {
    /**
     * 删除商品
     */
    deleteThis:function(){
      this.hasChose_id();
      let that = this;
      that.checkIsHome(that.chooseProduct)
      .then((isCanDelete)=>{
        // console.log(isCanDelete)
        isCanDelete &&
          service.postMsg('deleteProduction',{
            'productionid':that.chooseProduct,
          }).then((res)=>{
            that.$parent.initFirstPage();
            that.setSion('Chopros2',[])
          })
      })
    },

    /**
    * 上架下架商品
    */
    shelves:function(){
      this.hasChose_id();
      //获取当前数据
      let that = this;
      // console.log(typeof(that.chooseProduct))
      // console.log(that.ifonshelves)
       that.checkIsHome(that.chooseProduct)
      .then((isCanDelete)=>{
        if(isCanDelete){
          service.postMsg('ShelfOrLowerGoods',{
            // 'production_id':that.chooseProduct,
            'production_id':that.chooseProduct,
            'ifonshelves':!that.ifonshelves
          }).then((res)=>{
            that.$parent.initFirstPage();
            that.setSion('Chopros2',[])
          })
        }
      })
    },

    /**
     * 获得已选商品_id数组
     */
    hasChose_id:function(){
      let arr=[];
      let Chopros2 = this.getSion('Chopros2') 
      Chopros2.forEach(val=>{
        arr.push(val.production_id)
      })
      this.chooseProduct=arr;
      console.log(this.chooseProduct)
    },
     /**
       * 检查是否为轮播和店长推荐商品
       */
      checkIsHome:function(chooseProduct){
          var that = this;
          let promise = new Promise ((resolve,reject)=>{
            service.postMsg('searchHomepageInfo',{
              "user_id": sessionStorage.getItem('user_id'),
            }).then((res)=>{
              var isCanDelete=true;
              that.totalMsg = res.data
              var carousel = res.data.carouselProduction
              console.log(chooseProduct)
              chooseProduct.forEach(item=>{
                /**
                 * 轮播商品
                 */
                carousel.forEach(val=>{
                  if(val.production_id===item){
                    //商品名字
                    isCanDelete=false
                    Message({
                      message: "亲，"+val.title+" 是轮播商品哦~要删除或下架请先去除轮播商品哦~",
                      type: 'error',
                      duration: 3 * 1000
                    })
                  }
                })
                /**
                 * 店长推荐
                 */
                res.data.hotSellGoods.forEach(val=>{
                  if(val.production_id===item){
                    isCanDelete=false
                    Message({
                      message: "亲，"+val.title+" 是店长推荐商品哦~要删除或下架请先去除店长推荐哦~",
                      type: 'error',
                      duration: 3 * 1000
                    })
                  }
                })
              })
              resolve(isCanDelete)
              
            })
          });
          return promise;
      },

        /**
        * set and get session about object
        */
      setSion:function(name,val){
        if(arguments.length!==2){
          console.error('请传入正确的参数，在setSion中');
        }else{
          typeof val  === 'object' &&
          typeof name === 'string' && 
          sessionStorage.setItem(name,JSON.stringify(val))
        }
      },
      
      getSion:function(name){
        if(arguments.length!==1){
          console.error('请在getSion中传入正确的参数个数')
        }
        var arr = sessionStorage.getItem(name)
        return (JSON.parse(arr)||[])
      },
  }
}
</script>
<style>
</style>