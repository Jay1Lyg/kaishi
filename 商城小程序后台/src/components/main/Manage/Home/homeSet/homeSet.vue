<template>
<div style="text-align:center;">
  <search class="rt search_shop"></search>
  
 <el-table 
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="tableData" height="400"
     
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称" 
        width="505">
      </el-table-column>
      <el-table-column
        prop="soles"
        label="库存" sortable
        width="109"
       >
      </el-table-column>
      <el-table-column
        prop="prices"
        label="价格" sortable
        width="109">
      </el-table-column>
       <el-table-column
        prop="sole" sortable
        label="销售" width="109">
      </el-table-column>
       <el-table-column
        prop="class" 
        label="所属类目" width="109"
        >
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="homeSetFooter">
      <Btn class="nextTab" sm v-on:isClick="isClick" msg="下一步"></Btn>
         <el-pagination class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10,15,17,20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
    </div>
</div>
    
</template>

<script>
import Btn from '../../../scomponents/Btn'
import search from '../../../scomponents/search'

export default {
  name:'homeSet',
  data () {
    return {
       tableData: [{
            name: '只够一个三岁女孩吃的糖',
            soles: '1000',
            prices: '5001.00',
            sole:'12122',
            class:'糖'
          }, {
            name: '只够一个三岁女孩吃的糖',
            soles: '1001',
            prices: '5002.00',
            sole:'121',
            class:'糖'
          }, {
            name: '只够一个三岁女孩吃的糖',
            soles: '1002',
            prices: '5003.00',
            sole:'1013',
            class:'糖'
          }, {
            name: '只够一个三岁女孩吃的糖',
            soles: '1003',
            prices: '5004.00',
            sole:'1004',
            class:'糖'
          }
       ],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 500
    };
  },
  props:['showDetail'],
  components: {
    Btn,search
  },

  methods: {
    handleSelectionChange:function(val){
      console.log(val)
    },

    formatter(row, column) {
        return row.address;
        console.log(row)
    },

    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    isClick:function(){
      var showDetail = this.showDetail;
      for(var i in showDetail){
        showDetail[i]=false;
      }
      showDetail.main=true
      this.$emit("showDetail",showDetail)  
      console.log("触发了点击事件")  
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
  margin-top:10px;
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