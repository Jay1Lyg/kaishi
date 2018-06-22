<template>
<div>
  <div class="myGoodsBody">
      <el-table
        ref="multipleTable"
        :data="thePageGoods"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="chroChange"
        @sort-change="sortFun"
        v-loading="loading">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="iconUrl"
          label=" "
          width="100">
            <template slot-scope="scope">
              <img  :src="scope.row.iconUrl" alt="" style="width: 50px;height: 50px">
            </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="400">
        </el-table-column>
        <el-table-column
          prop="present_price"
          label="价格"
          sortable="custom"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sale_num"
          label="销量"
          sortable="custom"      
          width="120">
        </el-table-column>
      </el-table>
      <div class="letfTwo">
        <div class="theClass">
          <div class="cell1">
            所属类目
            <div class="smllSleck">
              <el-cascader
                  :options="options"
                  change-on-select
                  @change="selectClass"
                >
              </el-cascader>
            </div>
          </div>
        </div>
        <div v-for="i in thePageGoods" class="theClass theClassIn" :key="i.production_id">
            {{i.className}}
        </div>
      </div>
      <div></div>
    </div>
    
    <div class="letfTwo leftUpdate">
          <div class="theClass">
            <div class="cell1">
                操作
               <div class="smllSleck">
               </div>
            </div>
          </div>
          <div class="theClass theClassIn"  v-for="i in thePageGoods" :key="i.production_id">
             <!-- <img src="@/assets/update.png" @click="alertUpdate(item.productionid)" alt=""  style="width: 20px;height: 20px"> -->
             <updateImg  :productionid="i.production_id"></updateImg>
          </div>
          <!-- <button @click="initChecked">test</button> -->
    </div>
</div>
</template>

<script>
/**
 * 最右侧操作图片
 */
import updateImg from '@/components/main/Manage/MyGoods/updateGoods/updateImg'

import service from '@/utils/require'

export default {
  name:'GoodsShowTable',
  data () {
    return {
      options:[],
      ChoPros:[],          //当前已选 
      theChoi:[],           //当前页面已选
    };
  },
  props:{
    thePageGoods:Array,   //当前商品信息
    loading:Boolean,
    hasChose:Array,
    page:Number
  },
  watch:{
    thePageGoods (newVal,oldVal){
      let that = this ;
      // if(newVal.length) that.initChecked();
    }
  },
  components: {
    updateImg
  },
  beforeMount:function(){
    this.changeOptions()
    // this.initChecked()    //默认选中 
    this.setSion('Chopros2',[])
  },
  updated:function(){
    this.initChecked();
  },
  methods: {
       /**
       * 修改options 类目格式
       */
      changeOptions:function(){
        var that = this;
        service.postMsg("searchallCategoryCreateByUser",{
          "user_id":sessionStorage.getItem('user_id')
        }).then((res)=>{
          var str = JSON.stringify(res.data)
          str=str.replace(/(secondclass_id)|(personaltotalclass_id)|(firstclass_id)/g,'value');

          str=str.replace(/(secondclassName)|(personaltotalclass_name)|(firstclassName)/g,'label');

          str=str.replace(/(secondclass)|(firstclass)/g,'children');

          var atr = JSON.parse(str);
          that.options=atr
        })
      },

       /**
       * 默认选中
       */
      initChecked:function(){
        let that = this;
        let hasChose = that.getSion('Chopros2');
        hasChose &&
        that.thePageGoods.forEach((item,k)=>{
          hasChose.forEach(
          (val,index)=>{
            item.production_id===val.production_id &&
            // console.log(item)
            that.$refs.multipleTable.toggleRowSelection(item);
          })
        })
        // that.theChoi=[];
      },

      /**
       * 所选值改变
       */
      chroChange:function(val){
        /**
         * 得到一个数组 保存所有已选数据
         * 1、增 减判断
         *  1、比较当前页面已选 和 val
         */
        let that = this ;
        let hasChose = that.theChoi;
        let ii = 0 ;  //相等数目
        let Chopros2 = that.getSion('Chopros2')
        
        hasChose.forEach( item => {
          val.forEach( k => {
            if(k.production_id==item.production_id){
              ii++
            }
          })
        })
        
        let a = hasChose.length //已选商品数
        let isAdd = ii<val.length
        if(isAdd){
          /**
           * 2、增加时
           *  1、确定增加了哪些数据
           *  2、添加进总的
           */     
          Chopros2=that.operateChro(Chopros2,val,true)
          // console.log(that.ChoPros)
        }else{
          /**
           * 3、确定减少了哪些
           * 4、从总的中去除
           */
          console.log('减少')
          let subAtr=[];            
          hasChose.forEach( item =>{
            let isDeleItem, //要删除的单个元素
            isIn=false;  //是否为当前页面元素
            that.thePageGoods.forEach(value=>{
              if(item.production_id == value.production_id)
              {
                isIn = true; //在当前页面
              }
            })
            if(isIn){
              isDeleItem=item; 
              
              val.forEach(k=>{
                if(item.production_id == k.production_id)
                {
                  isDeleItem=''; 
                }
              })

              isDeleItem&&subAtr.push(isDeleItem)
            }
          })
          console.log(hasChose)
          Chopros2=that.operateChro(Chopros2,subAtr,false)
        }
        // console.log(Chopros2)
        that.theChoi=val;
        that.setSion('Chopros2',Chopros2)
      },

      /**
       * 第一个数组会根据第三个参数决定如何操作
       * true 循环 将atr中和arr不同的添加进atr并返回
       * false 第一个数组删除第二数组中的所有元素
       */
      operateChro:function(arr,atr,isAdd){
        let operateArr=arr;
        if(isAdd){
          if(!operateArr.length){
            atr.forEach(item=>{
              operateArr.push(item)
            })
          }else{            
            atr.forEach( item1 =>{
              let noIn=true
              operateArr.forEach( item2 =>{
                if(item1.production_id==item2.production_id){
                  noIn=false;
                }
              })
              noIn && operateArr.push(item1)
            })
          }
        }else{
          let i = atr.length;
          while(i--){
            let isIn=-1;
            operateArr.forEach((item,index)=>{
              if(item.production_id==atr[i].production_id){
                isIn=index;
              }
            })
            if(isIn!=-1) operateArr.splice(isIn,1)
          }
        }
        return operateArr;
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
        * 上架下架
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

        that.$parent.classArr=atr;
      },

      /**
        * 排序方式变化
        */
      sortFun:function(val){
        var that = this;
        that.$parent.index = (val.order=="ascending"?1:2);

        if(val.prop=="present_price"){
          that.$parent.orderUrl='sortProductionByPrice'
        }else if(val.prop=="sale_num"){
          that.$parent.orderUrl='sortProductionBySales'
        }
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