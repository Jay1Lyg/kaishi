<template>
<div class="content" id="myGoods">
  <router-view/>
</div>
</template>

<script>
// import GoodsTable from './GoodsTable/GoodsTable'
//查询上下架商品  
import { searchAllShelfOrLowerGoods } from  '@/components/searchUtils/search'
import  gloable  from '@/gloable'

import updateImg from './updateGoods/updateImg'
import { Message } from 'element-ui'


export default {
  name:'MyGoods',
  data () {
    return {
        activeName: 'first',

        // changeTrans:"",    //tab

        ifonshelves:true,  //是否上架
        
        thePageGoods:[],   //所有商品信息

        page:1,           //当前页
        totalPages:1,     //总页数

        selectedClass:[], //绑定的已选择的类别

        options:[],       //类别展示包装

        ChoPros:[],       //已选商品
        chooseProduct:[],   //已选商品id组
        
        loading:true,     //是否显示加载
        orderUrl:'',       //排序方式

        totalMsg:[]        //主页商品信息
    };
  },

  components: {
    // GoodsTable,
    updateImg,
  },
  watch:{
    // page (newVal,oldVal){
    //   var that = this;
    //     this.initFirstPage()
    //     setTimeout(()=>{
    //       that.initChecked()
    //       that.loading=false
    //   },100)
    // },

    // ChoPros(newVal,oldVal){
    //   var arr = []
    //   newVal.forEach( item =>{
    //     arr.push(item.production_id)
    //   })
    //   this.chooseProduct=arr;
    // }
  },
  beforeMount:function(){
    // var that = this;
    // // that.test();
    // that.initFirstPage();
    // console.log('mygoods 已经挂载')
    // this.noRouter=true;
  },

  methods: {
      /**
       * 默认选中
       */
      initChecked:function(){
        var that = this;
        that.s=[]
        that.thePageGoods.forEach((item,k)=>{
          that.ChoPros.forEach(
          (val,index)=>{
            item.production_id===val.production_id &&
            that.$refs.multipleTable.toggleRowSelection(that.thePageGoods[k],true);
          })
        })
      },

      chroChange:function(val,rowHas){
        var that = this;
        var totalLen = that.thePageGoods.length,  //当前页面商品个数
          nowLen = val.length,                     //已选个数  
          sionLen = that.ChoPros.length            //缓存商品个数
        if(nowLen===0){
          that.thePageGoods.forEach(item=>{
            that.getHasChoPro(item,false)
          })
        }

         if(nowLen===totalLen){
          if(sionLen!==totalLen){
            val.forEach(item=>{
              that.getHasChoPro(item,true)
            })
          }
        }
      },
      /**
        * 选中时
        * */
      handleSelectionChange(val,rowHas) {
        var that = this;
        var ii=0
        val.forEach((row,index)=>{
          if(!row){
            val.splice(index,1)
          }
          row.production_id===rowHas.production_id
          && ii++
        })

        ii > 2 && val.pop()

        var isAdd=false; //单击是曾还是减
        val.forEach( row =>{
          row.production_id===rowHas.production_id && (isAdd=true)
        })
        
        that.getHasChoPro(rowHas,isAdd)
      },

      /**
        * 得到已选中商品
        * */
      getHasChoPro:function(v,isAdd){
        var k=false,that = this;
        var arr = that.getSion('Chopros2')
        
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
        
        that.setSion('ChoPros2',that.ChoPros)
      },
     
      /**
        * 查询排序 
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
                  that.initChecked()
                  that.loading=false
            },500)
          })      
      },  

      

      /**
        * 上架切换
        */
      handleClick(tab, event) {
        var that=this;
        that.ifonshelves=
          (tab.index==0?true:false)
        setTimeout(()=>{
          tab.index!=1||
            $('.el-tabs__active-bar').css({
              transform: "translateX(300px)"
            })
        },20)
        that.initFirstPage();
      },

        /**
          * 上架下架商品
          */
        shelves:function(){
          //获取当前数据
          let that = this;
          console.log(typeof(that.chooseProduct))
          console.log(that.ifonshelves)
          service.postMsg('ShelfOrLowerGoods',{
            // 'production_id':that.chooseProduct,
            'production_id':that.chooseProduct,
            'ifonshelves':!that.ifonshelves
          }).then((res)=>{
            console.log(res)
            that.initFirstPage();
          })
        },

        /**
         * 检查是否为轮播和店长推荐商品
         */
        checkIsHome:function(){
            var that = this;
            let promise = new Promise ((resolve,reject)=>{
              service.postMsg('searchHomepageInfo',{
                "user_id": sessionStorage.getItem('user_id'),
              }).then((res)=>{
                var isCanDelete=true;
                that.totalMsg = res.data
                var carousel = res.data.carouselProduction
                console.log(that.chooseProduct)
                that.chooseProduct.forEach(item=>{
                  /**
                   * 轮播商品
                   */
                  carousel.forEach(val=>{
                    if(val.production_id===item){
                      //商品名字
                      isCanDelete=false
                      
                      Message({
                        message: "亲，"+val.title+" 是轮播商品哦~要删除请先去除轮播商品哦~",
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
                        message: "亲，"+val.title+" 是店长推荐商品哦~要删除请先去除店长推荐哦~",
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
         * 删除商品
         */
        deleteThis:function(){
          let that = this;
          that.checkIsHome()
          .then((isCanDelete)=>{
            console.log(isCanDelete)
            isCanDelete &&
             service.postMsg('deleteProduction',{
                'productionid':that.chooseProduct,
              }).then((res)=>{
                that.initFirstPage();
              })
          })
        },

        /**
         * 选择分类
         * */
        selectClass:function(val){
          var that = this;
          var _id=val[val.length-1];
          var atr = {
            'userid':sessionStorage.getItem('user_id'),
            'ifonshelves':that.ifonshelves,
            'page':that.page
          }
          val.length===1 ?
            atr.personaltotalclass_id=_id :
              ( val.length===2?atr.firstclass_id=_id:
                atr.secondclass_id=_id )
          
          console.log(atr)
          service.postMsg('sortProductionByCategory',atr).
            then((res)=>{
              console.log(res)
              that.thePageGoods = res.data.results;
              that.totalPages = res.data.totalPages;
              // that.initFirstPage();
            })
        },
        /**
         * 排序查询
         */
        sortFun:function(val){
          var that = this;
          that.index = (val.order=="ascending"?1:2);
          if(val.prop=="present_price"){
            that.orderUrl='sortProductionByPrice'
            that.orderGoods()
          }else if(val.prop=="sale_num"){
            that.orderUrl='sortProductionBySales'
            that.orderGoods()
          }
        },
        /**
         * 打开网页
         */
        open:function(){
          this.noRouter=true;
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