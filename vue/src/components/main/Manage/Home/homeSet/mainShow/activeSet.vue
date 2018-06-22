<template>
<div class="activeSet">
  <div class="ones_inp clear" style="height:100%;">
      <p class="label">
       活动设置&nbsp;&nbsp;
        <el-checkbox-group class="rt" v-model="isChecked">
          <el-checkbox></el-checkbox>
        </el-checkbox-group>
      </p>
       <div class="floor_one activeCeil" v-show="isChecked">
            <p>商品满</p>
            <el-input v-model="money" size="mini" style="width:100px; margin-top:10px;margin-left:-10px;"></el-input>
            <p>包邮</p>
        </div>
  </div>  
</div>
</template>

<script>
export default {
  name:'activeSet',
  data () {
    return {
      isChecked:'',
      money:""
    };
  },
  props:{
    activity_setting:Array
  },
  watch:{
    isChecked(nowVal,oldVal){
      console.log(nowVal)
      if(nowVal==true){
        
      }
    },
    activity_setting(nowVal,oldVal){
    console.log(nowVal)
      if(nowVal.length){
        this.isChecked=true;
        this.money=nowVal[0].freeShiping_num
      }
    },
      
  },
  mounted:function(){

  },
  components: {},

  methods: {}
}

</script>
<style>
.activeSet{
  margin-top:80px;
}

.activeCeil{
  border:1px solid #ccc;
  width:503px;
  margin-left: 320px;
}
</style>