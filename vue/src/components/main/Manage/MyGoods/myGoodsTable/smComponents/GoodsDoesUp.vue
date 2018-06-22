<template>
   <div class="myGoodsHeader el-col el-col-24">
        <el-tabs @tab-click="handleClick">
            <el-tab-pane label="上架商品" name="first"></el-tab-pane>
            <el-tab-pane label="下架商品" name="second" ></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  name:'GoodsDoesUp',
  data () {
    return {
    };
  },

  components: {},

  methods: {
     handleClick(tab, event) {
        var that=this;
        /**
         * 是否为上架
         */
        that.$parent.ifonshelves=(tab.index==0?true:false)

        setTimeout(()=>{
          tab.index!=1||
            $('.el-tabs__active-bar').css({
              transform: "translateX(300px)"
            })
        },20)
      },
  }
}

</script>
<style>
</style>