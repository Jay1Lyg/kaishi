<template>
  <div class="myGoodsFooter">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="1"
      layout="prev, pager, next, jumper"
      :total="totalPages">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'paging',
  data () {
    return {
      page:1,
    };
  },
  props:{totalPages:Number},
  
  components: {},

  methods: {
          //分页
    handleCurrentChange:function(val){
      // this.initFirstPage();
      this.$parent.transPage(val)
    },
  }
}

</script>
<style>
.myGoodsFooter{
  margin-top:50px;
}
</style>