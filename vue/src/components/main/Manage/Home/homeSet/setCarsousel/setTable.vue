<template>
<div class="setTable">
     <el-table
        ref="multipleTable"
        :data="thePageGoods"
        tooltip-effect="dark"
        style="width: 100%"
        @select="handleSelectionChange"
        @sort-change="sortFun"
        v-loading="loading">
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectable"
          >
        </el-table-column>
        <el-table-column
          prop="iconUrl"
          label=""
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
      <div class="leftChoi">
        <div class="theClass">
          <div class="cell1">
            所属类目
            <div class="smllSleck">

              <!-- expand-trigger="hover" 加到下面可以变hover触发-->
              <el-cascader
                  :options="options"
                  v-model="selectedClass"
                  change-on-select
                  @change="selectClass"
                >
              </el-cascader>
            </div>
          </div>
        </div>
        <div v-for="i in thePageGoods" class="theClass theClassIn">
            {{i.className}}
        </div>
      </div>
</div>

</template>

<script>
import service from '@/utils/require'

export default {
  name:'setTable',
  data () {
    return {
      thePageGoods:[],
      options:[],
      selectedClass:[],
      page:this.nowPage,
      production_id:[],
      choPro:[],
      loading:true,
      ifonshelves:true, //上架
      index:1, //升序1 降序2
      s:[],//已经是首页商品的商品
      orderUrl:''
    };
  },
  watch: {
    //监听pageg改变
    nowPage(newValue, oldValue) {
      var that = this;
      that.page=newValue; 
      if(that.orderUrl){
        that.orderGoods()
      }else if(that.searchMsg){
        that.$parent.getSearchMsg(that.searchMsg);
      }else{
        that.initFirstPage();
      }
    },
    hasChose(newValue , oldValue){
      
    }
  },
  props:{
    nowPage:Number,
    hasChose:Array,
    hadChose:Array,
    searchMsg:String
  },
  components: {},
  beforeMount:function(){
    var that = this;
    that.loading=true    
    that.initFirstPage();
    this.noRouter=true;
    $('.el-el-checkbox').hide()
    setTimeout(()=>{
      that.initChecked()
      that.loading=false
    },100)

   
  },
  methods: {
    /**
     * 查询排序 
     */
    orderGoods:function(){
      var that = this;
      that.thePageGoods=[]
      that.loading=true
      var data =   {
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
     * 无排序全部
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
        that.$parent.totalPages = res.data.totalPages
        setTimeout(()=>{
          that.initChecked()
          that.loading=false
        },500)
      })
      that.changeSelecClass()
    },
    /**
     * 禁用已选
     */
    selectable:function(row, index){
      let isAble=true
      this.s.forEach((item)=>{
        item==index &&
        (isAble=false)
      })
      return isAble
    },
    /**
     * 默认选中
     */
    initChecked:function(){
      var that = this;
      that.s=[]
      that.thePageGoods.forEach((item,k)=>{
        that.hadChose.forEach((val,index)=>{
          if(item.production_id===val.production_id){
            that.s.push(k)
            that.$refs.multipleTable.toggleRowSelection(that.thePageGoods[k],true);
          }
        })
        that.hasChose.forEach(
        (val,index)=>{
          item.production_id===val.production_id &&
          that.$refs.multipleTable.toggleRowSelection(that.thePageGoods[k],true);
        })
      })
    },
    /**
     * 选中时
     */
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

      var isAdd; //单击是曾还是减
      val.forEach( row =>{
        row.production_id===rowHas.production_id && (isAdd=true)
      })
      /**
       * 超出上限
       */
      if(this.$parent.checkIsOver()){
        if(isAdd){
          that.$refs.multipleTable.toggleRowSelection((val[val.length-1]),false);
          that.$refs.multipleTable.toggleRowSelection((val[val.length-2]),true);
        }else{
          that.$parent.getHasChoPro(rowHas,isAdd)
        }
      }else{
        /**
         * 未超出上限
         */
        isAdd ?
          that.$parent.getHasChoPro(rowHas,isAdd):
          that.$parent.getHasChoPro(rowHas,isAdd)

      }
      that.choPro=val;
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
     * 
     */
    changeSelecClass:function(){
      var that = this;
        console.log('重置类目的所属分类')
      
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
     * 选择分类
     */
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
              that.$parent.totalPages = res.data.totalPages;

              // that.initFirstPage();
            })
    }
  }
}

</script>
<style>
.el-table th .el-checkbox{
  display:none;
}
.setTable{
  margin-top:100px;
}
.theClass{
  width:120px; 
  height: 53px;
  border-bottom:1px solid #ebeef5;
  line-height: 60px;
  font-weight: bold;
  font-size:14px;
  color:#909399;
}
.theClassIn{
  height:73px;
  line-height: 73px;
}
.theClass .cell1{
 line-height:50px;
}
.smllSleck{
  height:0px;
  width:0px;
  border:none;
  position:relative;
  bottom:49px;
  left:108px;
}
.smllSleck .el-cascader{
  width:15px;
  height:15px;
}
.smllSleck .el-input__inner{
  border:none;
  width:0;
}
.leftChoi{
  width:120px;
  position:absolute;
  right:200px;
  top:163px;
}
.smllSleck .el-cascader__label{
  opacity:0;  
}
</style>