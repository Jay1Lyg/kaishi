<template>
<div>
    <GoodsDoesUp :hasChose="ChoPros" :page="page"></GoodsDoesUp>
    <GoodsShowTable :thePageGoods="thePageGoods"></GoodsShowTable>
    <div class="myGoodsFooter">
        <paging :totalPages="totalPages"></paging>
        <upOrDelete :ifonshelves="ifonshelves"></upOrDelete>
    </div>
      <!-- <button @click="checkIsHome">test</button> -->
  </div>
</template>

<script>
/**
 * 上架或下架
 */
import GoodsDoesUp from './smComponents/GoodsDoesUp'
/**
 * 我的商品展示列表
 */
import GoodsShowTable from './smComponents/GoodsShowTable'
/**
 * 分页
 */
import paging from './smComponents/paging'
/**
 * axio ajax 
 */
import service from '@/utils/require'
/**
 * 删除或上架
 */
import upOrDelete from './smComponents/upOrDelete'

export default {
  name:'myGoodsTable',
  data () {
    return {
      thePageGoods:[],   //当前商品信息
      ifonshelves:true,  //是否上架  

      page:1,            //当前页
      totalPages:1,      //总页数
      
      selectedClass:[],  //绑定的已选择的类别

      options:[],        //类别展示包装

      ChoPros:[],        //已选商品

      chooseProduct:[],  //已选商品id组
      
      loading:true,      //是否显示加载
      orderUrl:'',       //排序方式
      index:1,           //传给后端 升或降

      classArr:{},        //已选择classArr

      totalMsg:[]        //主页商品信息
    };
  },
  watch:{
    ifonshelves () {
      this.initFirstPage();
    },
    ChoPros (newVal,oldVal){
    
    },
    page (){
      this.orderUrl?
      this.orderGoods():
      this.initFirstPage();    
      var Chopros2 = this.getSion('Chopros2')  
      // console.log(Chopros2)
    },

    orderUrl (){
      this.orderGoods();
    },
    index (){
      this.orderGoods();      
    },
    classArr (){
      this.orderByClass();
    },

  },
  components: {
    GoodsDoesUp,      //上架或下架
    GoodsShowTable,   //商品的展示table
    paging,           //分页
    upOrDelete,       //删除或上架按钮
  },

  beforeMount:function(){
    let that = this;
    that.initFirstPage()
  },
  methods: {
    /**
     * 各种刷新 汇聚数据
     */

      /**
       * 将paging值赋给当前页面 
       * */
      transPage:function(val){
        this.page=val
      },

       /**
        * 无特点查询排序
        */
      initFirstPage:function(){
        var that = this;
        that.thePageGoods=[]   
        that.loading=true;

        service.postMsg('searchAllShelfOrLowerGoods',{
          "userid": sessionStorage.getItem('user_id'),
          'ifonshelves':that.ifonshelves,
          'page':that.page
        }).then((res)=>{
          that.thePageGoods=res.data.results;
          that.totalPages = res.data.totalPages
          setTimeout(()=>{
            // that.initChecked()
            that.loading=false
          },500)
        })
      },

      /**
      *  有特点查询排序 
      */
      orderGoods:function(){
        var that = this;
        that.thePageGoods=[]
        that.loading=true
        var data =  {
          "userid": sessionStorage.getItem('user_id'),
          'ifonshelves':that.ifonshelves,
          'page':that.page,
          "index":that.index
        }
        service.postMsg(that.orderUrl,data)
          .then((res)=>{
            that.thePageGoods=res.data.results;
            setTimeout(()=>{
                  // that.initChecked()
                  that.loading=false
            },500)
          })      
      },  

      /**
       * 分类查询排序
       */
      orderByClass:function(){
        let that = this;
        service.postMsg('sortProductionByCategory',that.classArr).
          then((res)=>{
            console.log(res)
            that.thePageGoods = res.data.results;
            that.totalPages = res.data.totalPages;
          })
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
@import './myGoodsTable.css'
</style>