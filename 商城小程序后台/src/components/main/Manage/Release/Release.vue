<template>
  <div class="release">
      <successAlert v-show="alertSucc" showMsg="发步成功"></successAlert>
      
        <SetpHeader :step="step"></SetpHeader>
        <!-- 第一步 -->
        <Step1 v-show="step==1" ref='stepOne'></Step1>
        <!-- 第二步 -->
        <Step2  v-show="step==2"></Step2>
      
      <div class="release_btns">
          <Btn v-show="step>=2" class="release_btn" :msg="step!=1?'上一步':''" v-on:isClick="isReturn"  v-on:click="myclick"></Btn>
          <Btn class="release_btn" :msg="step==1?'下一步':'确认发布'" v-on:isClick="isClick"  v-on:click="myclick"></Btn>
      </div>
  </div>
</template>

<script>

import SetpHeader from './Steps/SetpHeader'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Btn from '../../scomponents/Btn'
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
      alertSucc:false
    };
  },

  components: {
    SetpHeader,Step1,Step2,Btn,successAlert
  },

  methods: {
    isReturn:function(data){

      this.step=this.step-1;
      console.log("返回上一步",data)
    },
    isClick:function(data){
      console.log(this.subData);
      if(this.step>=3){
        this.alertSucc=true        
        setTimeout(()=>{
          this.alertSucc=false        
        },1000)
      }else{
        this.step=this.step+1;
      }
      console.log("确认发步！",data)

    },
    
    myclick:function(){
      this.$refs.child.clickme()
    }
  }
}

</script>
<style>
.release .el-input--small .el-input__inner {
    height: 44px;
    line-height: 32px;
}
  .redX{
    color:red;
    display: inline-block;
    line-height: 44px;
    font-size:14px;
    margin-left:4px;
  }
  .release{
    width:1100px;
    background:#fff;
    margin-top:80px;
  }
 
  .bigBd{
    display: inline-block;
    margin-left:20px;
    width:490px;
    border-radius: 4px;
    border:1px solid #d7d7d7;
    position: relative;
  }
  .label{
    position: absolute;
    text-align: right;
    right:820px;
    /* padding-top:15px; */
    line-height: 44px;
  }
  .smThree{
    transform:rotate(0deg);
    width:10px;
    height:6px;
    position: absolute;
    right: 10px;
    top:19px;
  }

  .ones_inp>.yet_price{
    border:0;
    width:50px;
    height:45px;
    line-height: 45px;
    margin:0;
    text-align: right;
    position: relative;
    bottom:15px;
    left:15px;
  }

  .ones_inp{
    margin-top:20px;
    margin-bottom:20px;
    min-height:50px;
  }
  
  
  .input_in{
    border: 0px;outline:none;cursor: pointer;
    font-size:16px;
    width:450px;
    position: absolute;
    left:15px;
  }
  .setElse{
    color:#86bfc6;
    font-size:14px;
    width:120px;
    /* right:px; */
    position: absolute;
    text-align: right;
    text-align: left;
    left:830px;
    line-height: 44px;
  }
  .setElse:active,.setElse:hover{
    color:#4da2ad;
  }
  .setElse:focus{
    color:#4da2ad;      
  }
  .one_col{
    min-height:70px;
  }
  .one_col_1{
    display: inline-block;
    text-align: center;

    height:30px;
    min-width:60px;
    padding:0 5px;
    line-height:30px;
    font-size:14px;
    color:#4da2ad;
    border:1px solid #4da2ad;
    border-radius: 4px;
  }

  /* 规格 */
  .one_cols{
    float:left;
    margin-left:-16px;
  }

  .one_taste{
    margin-left:20px;
    text-align: left;
    line-height:70px;
    font-size:10px;
    margin-top:0;
    height:70px;
  }
  .cancel_one{
    position: relative;
    right:27px;
    top:10px;
  }

  /* 2规格 */
  .two_col{
    border-top:1px dashed #d7d7d7;
    text-align: center;
    width:100%;
    max-height:360px;
    overflow-y: auto;
  }
  .smBd{
    border:1px solid #d7d7d7;    
  }
  .thBd{
    border-right:1px solid #d7d7d7;
  }
  .one_col_detail{
    width:450px;
    margin-top:20px;
    margin-left:20px;
    margin-bottom:20px;
  }
  .one_col_detail>.tr{
    width:100%;
    height:40px;
  }
  .thead>th{
    line-height:40px;
    height:40px;
    color:#333;
    font-size:14px;
    font-weight: 400;
    background: #f2f2f2;
  }
  table{
    border-collapse:collapse;
    max-height:360px;
    /* overflow-y: auto; */
  }
  tbody>tr>.td{
    border:1px solid #d7d7d7;
    height:32px;
    line-height:32px;
  }
  .upImg{
    width:26px;
    margin-top:7px;
  }
  .min_inp{
    width:70px;
    height:25px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #d7d7d7;
    outline:none;
  }
  .parameters{
    display: inline-block;
    min-height:54px;
    border:1px solid #d7d7d7;
    width:490px;
  }
 
  .parameter{
    min-width: 130px;
    max-width:250px;
    height:100%;
    float:left;
  }

  .parat_inp_out{
    position:relative;
    width:118px;
    height:30px;
    line-height: 30px;
    margin-left:13px;
    margin-top:7px;
    border-radius:4px;
  }

  .parat_three{
    top:13px;
  }
  .setParat{
    line-height: 54px;
  }

  .release_btns{
    display:flex;
    justify-content:center;
    padding-bottom:40px;    
  }
 .release_btn{
    margin-left:30px;
 }
</style>