<template>
  <!-- 优惠券 -->
  <div>
    <div class="ones_inp clear" style="height:100%;">
      <p class="label">优惠券设置</p>
        <div class="Coupon" 
         style="margin-top:10px;" 
         v-for="item in coupon"
         :key="item.coupon_id"
         >
          <div class="floor_one">
            <p >满</p>
            <el-input v-model="item.full_money" disabled size="mini" style="width:100px; margin-top:10px;margin-left:-10px;"></el-input>
            <p style="width:60px;">减</p>
            <el-input v-model="item.reduce_money" disabled size="mini" style="width:100px; margin-top:10px;margin-left:-30px;"></el-input>
          </div>
          <div class="floor_two">
          <div class="parameters">
            <div  class="parameter lf">
              <div class="parat_in lf" style="width:64px">起始日期</div>
                <el-date-picker size="mini" style="width:150px;margin:10px;"
                  v-model="item.start_time"
                  disabled
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            <div  class="parameter lf">
              <div class="parat_in lf" style="width:35px">限用</div>
                <el-date-picker size="mini" style="width:150px;margin:10px;"
                   v-model="item.end_time"
                  disabled
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          <a href="javascript:;" class="setElse" style="left:844px;lineHeight:20px;" @click="deleteCoupon(item.coupon_id)">删除</a>
          </div>
        </div>
      </div>
      <div>
        <span class="setCoupon">(以设置<span style="color:#4da2ad;">{{coupon?coupon.length:0}}张</span>优惠券信息)</span>
        <a href="javascript:;" class="setElse" style="left:780px;lineHeight:30px;" @click="addCoupon">添加</a>
        <alertAdd ref="alertAdd"></alertAdd>
      </div>
    </div>
  </div>
</template>

<script>
import alertAdd from './cuponComponents/alertAdd'

import service from '@/utils/require'

export default {
  name:'coupon',
  data () {
    return {
      data:{}
    };
  },
  props:{
    coupon:Array
  },
  components: {
    alertAdd
  },

  methods: {
    deleteCoupon:function(couponId){
      var that = this;
      // 8.删除优惠券
      //   接口：/program/deleteCoupon（post）
      //   请求参数：coupon_id
      that.$confirm('即将去除该店长推荐, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var loading = this.$loading()
          service.postMsg('deleteCoupon',{
            "coupon_id": couponId,
          }).then((res)=>{
            console.log(res)
            setTimeout(() => {
              loading.close();
              that.$parent.searchAllMsg()
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            }, 700);
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addCoupon:function(){
      this.$refs.alertAdd.isShow=true;
    }
  }
}

</script>
<style>
.setCoupon{
    color: #666;
    font-size: 14px;
    position: absolute;
    text-align: right;
    text-align: left;
    left: 620px;
    line-height: 30px;
}
.Coupon{
  border:1px solid #ccc;
}

</style>