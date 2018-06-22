<template>
<div>
  <!-- 规格 -->
    <div class="ones_inp">
      <p class="label">&nbsp;规格</p>
      <div class="bigBd"  >
        <div class="one_col lf" >
          <div class="one_taste">
            <p class="lf" style="margin-right:23px;">口味:</p>
            <div class="one_cols" v-for="i in tasets" >
              <p  class="one_col_1">{{i.taste_name}}</p>
              <!-- <img class="cancel_one" src="@/assets/cancel.png" alt=""> -->
            </div>
            <a href="javascript:;" class="setElse" style="lineHeight:70px;float:right;margin-left:15px;margin-right:15px;position:static;" @click="isShowAlert">添加</a>
          </div>
        </div>
        <div class="two_col lf">
            <table class="one_col_detail smBd">
              <thead class="thead ">
                <th class="thBd" style="width:90px;">图片</th>
                <th class="thBd" style="color:#bcbcbc;width:84px;">口味</th>
                <th class="thBd" style="width:138px;">价格（元）</th>
                <th class="th lf" style="width:138px;">库存（件）</th>
              </thead>
              <tbody>
                <tr class="tr" v-for="item in tasets">
                  <td class="td"><img class="upImg" :src="item.iconUrl" alt=""></td>
                  <td class="td">{{item.taste_name}}</td>
                  <td class="td">
                    <div class="inp">
                      <input class="min_inp" disabled :value="item.price" type="text">
                    </div>
                  </td>
                  <td class="td">
                    <div class="inp">
                      <input class="min_inp" disabled :value="item.inventory" type="text">
                    </div>                        
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="ones_inp parat">
        <a href="javascript:;" class="setElse setParat" @click="isShowAlertCan">添加参数</a>
      <p class="label"> <span class="redX">*</span>&nbsp; 商品参数</p>
      <div class="parameters">
        <div  class="parameter" v-for="item in parameter">
          <div class="parameter_in" style="">{{item.parameterName}}:{{item.parameterContent}}</div>
        </div>
      </div>
    </div>

    <!--商品图片-->
    <div class="ones_inp clear" style="height:100%;">
      <p class="label"> <span class="redX">*</span>&nbsp;商品图片
        <br>
        <span style="font-size:12px;color:#949494;">(默认<span style="color:#4da2ad">第一张</span>图片为商品封面图)</span>
      </p>
      <div class="subImgs" >
        <ShowSubImg class="lf" sendType="productions" v-for="(item,index) in productionImages" :index="index" sty="width:150px;" :src="item"></ShowSubImg>
      </div>
    </div>
    
    <!-- 宝贝描述 -->
    <div class="ones_inp clear">
      <p class="label"> <span class="redX">*</span>&nbsp;宝贝描述
        <br>
        <span style="font-size:12px;color:#949494;">(请上传相应图片)</span>
      </p>
      <div class="SMdetail">
          <div class="lf"></div>
      </div>
      <div class="subImgs" style="height:100%;">
        <ShowSubImg class="lf" sendType="detailImages" v-for="(item,index) in detailImages"  :index="index" sty="width:150px;" :src="item"></ShowSubImg>
      </div>
    </div>
    <alertUpdate :_id='_id' ref='alertUpdate'></alertUpdate>
    <alertUpdateCan :_id='_id' ref='alertUpdateCan'></alertUpdateCan>
    <input type="file"   class="subProductionImages"  ref="file"   @change="subImg2" v-show="false"/>
    <input type="file"   class="subDetailImages"  ref="file"   @change="subImg3" v-show="false"/>
    <div class="release_btns" v-show="!doUpdate">
      <Btn class="release_btn" v-on:isClick="querenSub" msg='确认发布'></Btn>
    </div>
</div>

</template>
<script>
import alertUpdate from '../methods_send/alertUpdate'
import alertUpdateCan from '../methods_send/alertUpdateCan'
import ShowSubImg from '@/components/commonComponents/ShowSubImg'
import {searchAllSpecifications , searchAllgoodsparameters , searchproductionImage , searchdescribeImage} from '@/components/searchUtils/search'
import { uploadproductionImage , uploaddescribeImage , deleteproductionImage , deletedescribeImage , confirmPublishProduction } from '@/components/searchUtils/submsg'
import { Message , Loading} from 'element-ui'
import Btn from '@/components/commonComponents/Btn'



export default {
  name:'StepTwo',
  data () {
    return {
      tasets:[],
      data:{},
      dialogImageUrl: '',
      dialogVisible: false,
      production_id:'',
      parameter:[],
      productionImages:[],
      detailImages:[],
      doUpdate:false,
    };
  },
  props:{
    _id:String,
    isUpdate:Boolean
  },
  components: {
    ShowSubImg,alertUpdate,alertUpdateCan,Btn
  },
  created:function(){
    if(this.isUpdate){
      this.doUpdate=true;
    }
  },
  beforeMount:function(){
    this.refresh();
    this.loadImg();
  },

  methods: {
    isShowAlert:function(){
      this.$refs.alertUpdate.open();
    },
    isShowAlertCan:function(){
      this.$refs.alertUpdateCan.open();
    },
    subImgNow:function(){
      console.log('我被点击了')
    },
    refresh:function(){
      //查询规格
       searchAllSpecifications(this._id).then((res)=>{
          this.tasets=res[0].result;
          console.log(res[0].result)
       })

      //查询参数
       searchAllgoodsparameters(this._id).then((res)=>{
          console.log(res)
          this.parameter=res.data
       })
    },
    loadImg:function(){
      var that = this;
          that.productionImages=[]
          that.detailImages=[]      
      //查询商品图片
      searchproductionImage(that._id).then((res)=>{
            var arr = res.data;
          if(arr.length<5){
              arr.push('')
          }
          that.productionImages=arr          
      })

      //查询描述图片
       searchdescribeImage(that._id)
       .then((res)=>{
          // console.log(res.data)
          var arr = res.data;
          arr.push('')
          that.detailImages=arr;
      })
    },
    subImg2:function(e){
        let loadingInstance = Loading.service();
        var that = this;
        if(that.productionImages.length<=5){
          uploadproductionImage(this._id ,e.target.files[0])
          .then((data)=>{
            setTimeout(()=>{
                 console.log(data)
                that.loadImg()
                loadingInstance.close();
            },300)
          })
        }else{
          Message({
              message: '最多上传八张上平图片！',
              type: 'error',
              duration: 3 * 1000
          })
        }
    },
    subImg3:function(e){
        let loadingInstance = Loading.service();
        var that = this;      
        uploaddescribeImage(this._id,e.target.files[0])
        .then((data)=>{
           setTimeout(()=>{
                 console.log(data)
                that.loadImg()
                loadingInstance.close();
            },300)
        })
    },
    deleteImage2:function(index){
        let loadingInstance = Loading.service();
        var that = this;      
        deleteproductionImage(this._id,index)
        .then((data)=>{
          setTimeout(()=>{
                loadingInstance.close();
            },300)
          console.log(data)
            that.loadImg()
        })
    },
    deleteImage3:function(index){
        let loadingInstance = Loading.service();      
        var that = this;         
        deletedescribeImage(this._id,index)
        .then((data)=>{
           setTimeout(()=>{
                loadingInstance.close();
            },300)
          console.log(data)
            that.loadImg()
        })
    },
    querenSub:function(){
      var that = this;
      var proLen = that.productionImages
      var detLen = that.detailImages
      var parameter = that.parameter
      if(parameter.length==0){
          Message({
              message: '亲，您的商品参数还没有填写哦',
              type: 'error',
              duration: 3 * 1000
          })
      }else if(proLen[0]==''){
          Message({
              message: '亲，请至少上传一张商品图片哦',
              type: 'error',
              duration: 3 * 1000
          })
      }else if(detLen[0]==''){
          Message({
              message: '亲，请至少上传一张详情图片哦',
              type: 'error',
              duration: 3 * 1000
          })
      }else{
        confirmPublishProduction(that._id).then((res)=>{
          let loadingInstance = Loading.service();      
            setTimeout(()=>{
              loadingInstance.close();
              that.$parent.isNext()
            },300)
          console.log('发布')
          })
      }
    }
  },
}

</script>
<style>

  .parameter_in{
      line-height:30px;
      height:30px;
      border:1px solid #d7d7d7;
      margin:5px;
      padding:5px;
  }
 .parat_in{
    width:100px;
    line-height:54px;
    margin-left:20px;
    font-size:14px;
  }
  .subImgs{
    width:600px;
    min-height:200px;
    margin-left: 320px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
</style>