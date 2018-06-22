<template>
<div>
   <el-table
        ref="multipleTable"
        :data="thatPageMsg"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortFun"
        >
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
        <!-- <el-table-column 
          prop="className"
          label="所属类别" 
          width="120"
          :filters="[{ text: '家1', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterHandler">
        </el-table-column> -->

        <!-- <el-table-column
          label="操作"
          width="120">
            <template slot-scope="scope">
                <img src="@/assets/update.png" @click="alertUpdate(scope.$index, scope.row)" alt=""  style="width: 20px;height: 20px">
            </template>
        </el-table-column> -->
      </el-table>
</div>
</template>

<script>
export default {
  name:'elTable',
  data () {
    return {
      thatPageMsg:this.thePageGoods,
    };
  },
  props:{
    thePageGoods:Array
  },
  components: {},

  methods: {
     handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
        var chooseProduct=[];
        for(let i in val){
          chooseProduct.push(val[i].production_id)
        }
        this.chooseProduct=chooseProduct;
      },
      sortFun:function(val){
        var that = this;
        // console.log(val.prop)
          var index = (val.order=="ascending"?1:2)
        if(val.prop=="present_price"){
          that.orderGoods(index,'sortProductionByPrice')
        }else if(val.prop=="sale_num"){
          that.orderGoods(index,'sortProductionBySales')
        }
        console.log(val.order)
      },

  }
}

</script>
<style>
</style>