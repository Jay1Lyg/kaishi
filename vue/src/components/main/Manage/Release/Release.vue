<template>
  <div class="release">
      <successAlert v-show="alertSucc" showMsg="发步成功"></successAlert>
        <SetpHeader :step="step"></SetpHeader>
        <!-- 第一步 -->
        <stepOne v-if="step==1" @setponedata='getStepOne' ref='stepOne'></stepOne>
        <!-- 第二步 -->
        <StepTwo  v-if="step==2" :_id="production_id"></StepTwo>
        <!-- <div class="release_btns"> -->
            <!-- <Btn v-show="step>=2" class="release_btn" :msg="step!=1?'上一步':''" v-on:isClick="isReturn"  v-on:click="myclick"></Btn>
            <Btn class="release_btn" :msg="step==1?'下一步':'确认发布'" v-on:isClick="stepOneSub"  v-on:click="myclick"></Btn> -->
        <!-- </div> -->
        <div v-if="step==3">
            <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
              <span>亲，您以成功发布该商品，继续添加请确定？</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false;step=1">确 定</el-button>
              </span>
            </el-dialog>
        </div>
  </div>
</template>

<script>
import SetpHeader from './Steps/SetpHeader'
import stepOne from './Steps/stepOne'
import StepTwo from './Steps/StepTwo'
import Btn from '@/components/commonComponents/Btn'

import successAlert from '../../scomponents/successAlert'
export default {
  directives: {
     focus: {
        update: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
  },
  name:'Release',
  data () {
    return {
      subData:{},
      step:1,
      alertSucc:false,
      production_id:'',
      centerDialogVisible: true
    };
  },
  components: {
    SetpHeader,stepOne,StepTwo,Btn,successAlert
  },
  beforeMount:function(){

  },
  methods: {
    isNext:function(data){
      this.step=this.step+1;
      this.centerDialogVisible=true;
    },

    stepOneSub:function(data){
      // if(this.step==1){
      // }
      // console.log(this.subData);
      // if(this.step>=3){
      //   this.alertSucc=true        
      //   setTimeout(()=>{
      //     this.alertSucc=false        
      //   },1000)
      // }else{
      //   this.step=this.step+1;
      // }
      // console.log("确认发步！",data)
    },
    
    myclick:function(){
      this.$refs.child.clickme()
    },

    getStepOne:function(...data){
      console.log(data)
      this.step=data[1]
      console.log(data[2])
      this.production_id=data[2].production_id;
    }
  }
}

</script>
<style>
  @import  './Release.css'
</style>