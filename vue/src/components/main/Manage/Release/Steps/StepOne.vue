<template>

<div>
  <div style="margin-top: 15px;">
</div>

  <!-- 商品类目 -->  
  <div class="ones_inp">
      <p class="label"> <span class="redX">*</span>&nbsp;商品列表</p>
    <el-select 
      v-model="data.totalclass_id"
      slot="prepend" style="margin-left:45px;width:492px;height:50px;" placeholder="请选择" @change="selectSecondClass">
      <el-option  v-for="item in totalClass" :key="item.totalclass_id" :label="item.name" :value="item.totalclass_id"></el-option>
    </el-select>
  </div>
    <!-- 标题 -->
  <div class="ones_inp">
    <p class="label"> <span class="redX">*</span>&nbsp;标题</p>
    <p class="smallBD">
      <el-input v-model="data.title" class="input_in" style="width:492px;"  placeholder="请填写标题"></el-input>
    </p>
  </div>
  <!-- 现价 原价 -->
  <div class="ones_inp">
    <p class="label"> <span class="redX">*</span>&nbsp;现价(元)</p>
    <p class="smallBD now_price" style="width:200px">
      <el-input type="number" v-model="data.present_price" class="input_in " style="width:200px;"  placeholder="请输入现价"></el-input>
    </p>
    <p class="smallBD now_price yet_price" >
      原价
    </p>
    <p  class="smallBD now_price" style="width:200px">
      <el-input type="number" v-model="data.original_price" class="input_in " style="width:200px;"  placeholder="请输入原价"></el-input>
    </p>
  </div>
  <!-- 运费 -->
  <div class="ones_inp">
    <p class="label"> <span class="redX">*</span>&nbsp;运费(元)</p>
    <!-- <p class="setElse">设置运费模板</p>       -->
     <p class="smallBD" style="width:200px">
      <el-input v-model="data.freight" type="number" class="input_in" style="width:200px;"  placeholder="请填写运费"></el-input>
    </p>
     <p class="smallBD now_price yet_price" >
      库存
    </p>
    <p  class="smallBD now_price" style="width:200px">
      <el-input type="number" v-model="data.totalInventory" class="input_in " style="width:200px;"  placeholder="请输入库存"></el-input>
    </p>
  </div>
  <!-- 选择分类 -->
  <div class="ones_inp chooseSmallClass">
    <p class="label"><span class="redX">*</span>&nbsp;选择分类</p>
    <router-link class="setElse" to="/Classify">添加分类</router-link>
    <el-cascader
      @focus="isFocus"
      expand-trigger="hover"
      :options="options"
      v-model="selectClasses"
      @change="chooseClass"
      :props="props"
      >
    </el-cascader>
  </div>
  
  <div class="release_btns" v-show="!doUpdate">
      <Btn class="release_btn" msg='下一步'  v-on:isClick="subMsg"></Btn>
  </div>
</div>
</template>

<script>
import { initClass } from '../methods_send/stepOne'
import { searchTotalClass , SearchPersonTotalClass , searchFirstCategory , searchSecondCategory ,searchCategoryUderTotalById}  from '@/components/searchUtils/search'
import Btn from '@/components/commonComponents/Btn'

import { Message } from 'element-ui'
import service from '@/utils/require'
import  gloable  from '@/gloable'

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
  name:'StepOne',
  data () {
    return {
      props: {
        label:'label',
        value: 'value',
        children: 'children',
        disabled:'disabled'
      },
      options:[],
      
      totalClass:[],
      personTotalClass:[],
      firstClass:[],
      testPseronTotalClass:[],

      data:{
        totalclass_id:'',
        personaltotalclass_id:'',
        title:'',
        present_price:'',
        original_price:'',
        freight:'',
        firstclass_id:'',
        secondclass_id:'',
        totalInventory:'',
      }, 

      totalclass_id:'',
      personaltotalclass_id:'',
      title:'',

      present_price:'',
      original_price:'',
      freight:'',
      selectClasses:[],
      firstclass_id:'',
      secondclass_id:'',
      doUpdate:false,

      totalInventory:'',       //库存
    };
  },
  props:['value',"isUpdate"],
  
  created:function(){
      if(this.isUpdate){
        this.doUpdate=true;
      }

      let that = this;
      searchTotalClass (that).then((res)=>{
        that.totalClass=res;
      })

      SearchPersonTotalClass(that).then((res)=>{
          let options = that.options;
          that.testPseronTotalClass=res;
          console.log(res);
          for(let a in that.personTotalClass){
              searchFirstCategory(that,that.personTotalClass[a].personaltotalclass_id).then((res)=>{
              for(let k in res){
                  for(let i in res){
                    options[i]=[];
                    options[i].label = res[i].totalclass_Name
                    options[i].value = res[i].totalclass_id
                }
                searchSecondCategory(res[k].firstclass_id)
                .then((data)=>{
                  // console.log(data)
                })
              }
            })
          }
      })
      initClass(this)
  },
  components: {Btn},
  methods: {
    chooseClass:function(value){
      this.data.firstclass_id=value[0]
      this.data.secondclass_id=value[1]
    },

    selectSecondClass:function(){
      let that = this;
      that.personaltotalclass_id='';
      for(let item of that.testPseronTotalClass){
          if(item.totalclass_id==that.data.totalclass_id){
             that.personaltotalclass_id=item.personaltotalclass_id;
             that.data.personaltotalclass_id=item.personaltotalclass_id
          }
      }

      if(!that.personaltotalclass_id){
         Message({
            message: '您尚未创建该类别，请移步分类管理中创建',
            type: 'error',
            duration: 3 * 1000
        })
      }

      searchCategoryUderTotalById(that.data.totalclass_id)
      .then((res)=>{
          that.options=res;
          let options = [];
          for(let i in res){
            options[i]=[]
            options[i].label=res[i].firstclassName
            options[i].value=res[i].firstclass_id
            let second = res[i].secondclass
            let children = [];
            for(let k in second){
              children[k]=[];
              children[k].label= second[k].secondclassName;
              children[k].value= second[k].secondclass_id;
            }
            options[i].children=children;
          }
          that.options=options;
      })
    },

    subMsg:function(){
      let isCan = this.checkIsNull()
      let that = this;
      if(isCan){
        //整合数据 跳转页面 发送数据
        let data = that.data;
        console.log(data)
        data.user_id=sessionStorage.getItem('user_id');
        service.postMsg('saveproductionbasicinfo',data)
          .then((res)=>{
            that.$emit('setponedata',data,2,res.data)
          },(res)=>{
           Message({
            message: '上传失败了，请检查您的网络',
            type: 'error',
            duration: 3 * 1000
          })
        })  

        // service.post(gloable.api.saveproductionbasicinfo,params).then(function (res) {
        //   that.$emit('setponedata',data,2,res.data)
        // }, function (res) {
        //    Message({
        //     message: '上传失败了，请检查您的网络',
        //     type: 'error',
        //     duration: 3 * 1000
        //   })
        // });
      }
    },
    /**
     * 检查数据
     */
    checkIsNull:function(){
      let that = this;
      let isNull = false;
      let data = that.data;
      for(let val in data){
        if(data[val]==false){
          Message({
            message: '您有必要的信息没有填写哦',
            type: 'error',
            duration: 3 * 1000
          })
          isNull = false;
        }else{
          isNull = true;          
        }
      }
      // if(!that.totalclass_id){
      //      Message({
      //       message: '商品列表不能为空',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else if(!that.title){
      //     Message({
      //       message: '标题不能为空',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else if(!that.present_price){
      //     Message({
      //       message: '现价不能为空',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else if(!that.original_price){
      //     Message({
      //       message: '原价不能为空',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else if(!that.freight){
      //     Message({
      //       message: '运费不能为空',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else if(that.selectClasses==false){
      //     Message({
      //       message: '请选择分类',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else if(that.totalInventory==""){
      //     Message({
      //       message: '请输入库存',
      //       type: 'error',
      //       duration: 3 * 1000
      //     })
      // }else{
      //     isNull = true
      // }
      return isNull
    },

    isFocus:function(){
      let that = this;
      if(that.totalclass_id&&(!that.options[0])){
          Message({
            message: '您尚未创建该类别，请先移步添加分类',
            type: 'error',
            duration: 3 * 1000
          })
      }
    }
  }
}

</script>
<style>
  .now_price{
    width:200px;
  }
   .smallBD{
    display: inline-block;
    margin-left:20px;
    width:490px;
    height:44px;
    position: relative;
  }
  .el-cascader__label{
    top:7px;
  }
  .chooseSmallClass .el-cascader{
    margin-left:-195px;
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