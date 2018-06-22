<template>
  <div style="text-align:center;">
    <search class="rt search_shop" :page="page" @getSearchMsg="getSearchMsg"></search>
    <setTable ref='setTable' :nowPage="page" :hasChose="ChoPros" :hadChose="hadChoPro" :searchMsg="searchMsg"></setTable>
    <!-- 分页 -->
    <div class="homeSetFooter">
      <Btn class="nextTab" v-show="!isHotSellGoods" sm v-on:isClick="isClick" msg="下一步"></Btn>
      <Btn class="nextTab" v-show="isHotSellGoods" sm v-on:isClick="curentFabu" msg="确认发布"></Btn>
      <paging :totalPages="totalPages"></paging>
    </div>
    <!-- 弹窗组 -->
    <!-- 1、设置轮播 -->
    <setOutImg ref='setOutImg' :chosMsg="ChoPros"></setOutImg>
  </div>
</template>

<script>
//组件
import Btn from '@/components/commonComponents/Btn'

import search from '../../../scomponents/search'
import setTable from './setCarsousel/setTable'
import paging from './setCarsousel/paging'

//弹框 
import setOutImg from './alerts/setOutImg'

//提示信息
import { Message } from 'element-ui'
import service from '@/utils/require'

export default {
  name:'setCarousel',
  data () {
    return {
      page:1,
      ChoPros:[],
      totalPages:1,
      hadChoPro:[],
      isHotSellGoods:false,
      searchMsg:''
    };
  },
  watch:{
    totalPages(newVal,oldVal){
      console.log('页数被改变成了:前'+oldVal)
      
      console.log('页数被改变成了:现在'+newVal)
    }
  },
  props:{
    showDetail:Array
  },
  components: {
    Btn,//按钮
    search,//搜索条
    setTable,//商品展示表格
    paging,  //分页条
    setOutImg,//设置轮播图片
  },
  beforeMount:function(){
    var that = this;
    var type = that.$route.query.type
    if(type=='hotSellGoods'){
      that.isHotSellGoods=true;
    }
    var atr = that.$route.query.prama
    atr = JSON.parse(atr)
    that.hadChoPro=atr;
    console.log(atr)
  },
  methods: {
    /**
     * 首页商品确认发布
     */
    isClick:function(){
      var that = this;
      if(that.ChoPros.length>0){
        that.$refs.setOutImg.openShow();
      }else{
        Message({
          message: '亲~您还未选择商品哦~',
          // type: 'error',
          duration: 3 * 1000
        })
      }
    },
    
    /**
     * 店长推荐确认发布
     */
    curentFabu:function(){
       var that = this;
      if(that.ChoPros.length>0){
        var loading = this.$loading(), _ids=[]

        that.ChoPros.forEach((item)=>{
          _ids.push(item.production_id)
        })
        service.postMsg("setRecommendGood",{
          "production_id":_ids
        }).then((res)=>{
          console.log(res)
          setTimeout(() => {
            loading.close();
            that.$message({
              type: 'success',
              message: '发布成功!'
            });
            that.$router.push('/Home')
          }, 700);
        })
      }else{
        Message({
          message: '亲~您还未选择商品哦~',
          // type: 'error',
          duration: 3 * 1000
        })
      }
    },
    /**
     * 接受页面数
     */
    transPage:function(val){
      this.page=val
    },

    /** 
     * 得到已选中的商品
     * */
    getHasChoPro:function(v,isAdd){
      var k=false,that = this;
      var arr = that.getSion('Chopros')
      
      if(arr.length!=0){
        console.log(arr)
        that.ChoPros=arr;
      }
    
      that.ChoPros.forEach((row,index)=>{
        if(row.production_id==v.production_id){
          k=index;
        }
      })

      isAdd ?  
        (!k && that.ChoPros.push(v)) :
        (that.ChoPros.splice(k,1))
      
      that.setSion('ChoPros',that.ChoPros)
    },

    /**
     * 检查是否超出个数
     */
    checkIsOver:function(){
      var isOut = (this.ChoPros.length+this.$refs.setTable.hadChose.length>=6)
      isOut && 
        Message({
          message: '亲~最多只能选6个商品哦',
          type: 'error',
          duration: 3 * 1000
        })
      return isOut
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

    /**
     * 获得文件数据
     */
    getSearchMsg:function(msg){
      var that = this;
      that.searchMsg = msg ;
      
      var arr = {
          "user_id": sessionStorage.getItem('user_id'),
          'name':msg,
          'page':that.page
        }

      service.postMsg('searchProductionByName',arr).then((res)=>{
          var msg = res.data
          console.log(msg)
          that.totalPages = msg.totalPages;
          that.$refs.setTable.thePageGoods = msg.results;
        })
    }
  }
}

</script>
<style>

.cell{
  text-align: center;
}
.homeSetFooter{
  display:flex;
  justify-content: space-around;
}
.search_shop{
  margin-top:0px;
  margin-bottom:25px;
  margin-right:20px;
}
.nextTab{
  margin-top:100px; 
}
.paging{
    margin-left:20px;
   margin-top:150px; 
}
</style>

