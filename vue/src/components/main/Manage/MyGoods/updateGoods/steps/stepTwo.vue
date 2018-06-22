<template>
<div>
    <!-- 规格 -->
    <div class="ones_inp">
      <a href="javascript:;" class="setElse" @click="isShowAlert">添加规格</a>
      <p class="label">&nbsp;规格</p>
      <div class="bigBd"  >
        <div class="one_col lf" >
          <div class="one_taste">
            <p class="lf" style="margin-right:23px;">口味:</p>
            <div class="one_cols" v-for="i in tasets">
              <p  class="one_col_1">{{i.taste_name}}</p>
              <img class="cancel_one" src="@/assets/cancel.png" @click="deleteSpec(i.specification_id)" alt="">
            </div>
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
                <tr class="tr" v-for="(item,index) in tasets">
                  <td class="td" >
                    <img class="upImg"
                     @click="changeTasetsImg(item.specification_id)"
                      :src="item.iconUrl"  alt="图片加载失败啦">
                  </td>
                  <td class="td">{{item.taste_name}}</td>
                  <td class="td">
                    <div class="inp">
                      <input class="min_inp" 
                      v-model.lazy="item.price"
                      @change="changePrice"
                       type="text">
                    </div>
                  </td>
                  <td class="td">
                    <div class="inp">
                      <input class="min_inp"
                        v-model.lazy="item.inventory"
                         type="text">
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
          <div class="parameter_in">
            <span class="cursor" @click="isShowAlertPart(item)">
              {{item.parameterName}}:{{item.parameterContent}}
            </span>
          </div>
          <img class="cancel_one2" src="@/assets/cancel2.png" @click="deletePart(item)" alt="">
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
        <subImg class="lf" sendType="productions" v-for="(item,index) in productionImages" :index="index" sty="width:150px;" :src="item"></subImg>
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
    <alertUpdate :_id='production_id' ref='alertUpdate'></alertUpdate>
    <alertUpdateCan :_id='production_id' ref='alertUpdateCan'></alertUpdateCan>

    <updatePart :_id='production_id' :updatePart="updatePart" ref='alertUpdatePart'></updatePart>

    <input type="file"   class="subProductionImages"  ref="file"   @change="subImg2" v-show="false"/>
    <input type="file"   class="subDetailImages"  ref="file"   @change="subImg3" v-show="false"/>
    <input type="file"   class="changeDescImg"  ref="file"   @change="subImg4" v-show="false"/>
    
    <div class="release_btns" v-show="!doUpdate">
      <Btn class="release_btn" v-on:isClick="querenSub" msg='确认修改'></Btn>
    </div>
</div>
</template>
<script>

import alertUpdate from './alertUpdate'
import alertUpdateCan from './alertUpdateCan'
import updatePart from './updatePart/updatePart'
import ShowSubImg from '@/components/commonComponents/ShowSubImg'
import {searchAllSpecifications , searchAllgoodsparameters , searchproductionImage , searchdescribeImage} from '@/components/searchUtils/search'
import { uploadproductionImage , uploaddescribeImage , deleteproductionImage , deletedescribeImage , confirmPublishProduction } from '@/components/searchUtils/submsg'
import { Message , Loading} from 'element-ui'
import Btn from '@/components/commonComponents/Btn'

import service from '@/utils/require'

export default {
  name:'stepTwo',
  data () {
    return {
      tasets:[],
      tasets2:[],//规格缓存提交

      data:{},
      dialogImageUrl: '',
      dialogVisible: false,
      parameter:[],
      productionImages:[],
      detailImages:[],
      doUpdate:false,
      specification_id:'', //重新上传的规格id
      updatePart:[]//缓存要修改的规格
    };
  },
  props:{production_id:String},
  components: {
    ShowSubImg,
    alertUpdate,
    alertUpdateCan,
    Btn,
    updatePart
  },
  created:function(){
    if(this.isUpdate){
      this.doUpdate=true;
    }
  },
  beforeMount:function(){
    var that = this;

    /**
     * 备份 暂时无用
     */
    searchAllSpecifications(this.production_id)
    .then((res)=>{
      that.tasets2=res[0].result;
    })

    /**
     * 刷新
     */
    this.refresh();
    this.loadImg();
  },

  methods: {
    /**
     * 打开添加规格弹窗
     */
    isShowAlert:function(){
      this.$refs.alertUpdate.open();
    },
    /**
     * 打开添加参数弹窗
     */
    isShowAlertCan:function(){
      this.$refs.alertUpdateCan.open();
    },
    /**
     * 打开修改
     */
    isShowAlertPart:function(item){
      console.log('点击了PartShow')
      this.updatePart=item;
      this.$refs.alertUpdatePart.open();
    },

    subImgNow:function(){
      console.log('我被点击了')
    },

    /**
     * 刷新
     */
    refresh:function(){
      var that = this;
       service.postMsg('searchProductionDetails',{
        "productionid": that.production_id
          }).then((res)=>{
              // console.log(res.data)
          })
          
      /**
       * 查询商品规格 并缓存tasets2中的价格和库存 只保证刷新图片和标题 
       */
      searchAllSpecifications(this.production_id).then((res)=>{
        var data = res[0].result ,
        that = this;
        that.tasets=data;
        var v = that.tasets2;
        console.log(data)
        for(var i in data){
          v[i].iconUrl = data[i].iconUrl
          v[i].specification_id = data[i].specification_id
          v[i].taste_name = data[i].taste_name
        }
        that.tasets2=v;
      })

      //查询参数
       searchAllgoodsparameters(this.production_id).then((res)=>{
          console.log(res)
          this.parameter=res.data
       })
    },
    loadImg:function(){
      var that = this;
          that.productionImages=[]
          that.detailImages=[]      
      //查询商品图片
      searchproductionImage(that.production_id).then((res)=>{
            var arr = res.data;
          if(arr.length<5){
              arr.push('')
          }
          that.productionImages=arr          
      })

      //查询描述图片
       searchdescribeImage(that.production_id)
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
          uploadproductionImage(this.production_id ,e.target.files[0])
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
        uploaddescribeImage(this.production_id,e.target.files[0])
        .then((data)=>{
           setTimeout(()=>{
                 console.log(data)
                that.loadImg()
                loadingInstance.close();
            },300)
        })
    },
    /**
     * 重新上传商品图片
     */
    subImg4:function(e){
      var that = this;
      // this.specification_id;
      console.log(that.specification_id)
      service.postMsg('reuploadSpecificationImage',{
      "specification_id": that.specification_id,
      "images_upload": e.target.files[0]
        }).then((res)=>{
          console.log(res)
          that.refresh();
      })
    },

    deleteImage2:function(index){
        let loadingInstance = Loading.service();
        var that = this;      
        deleteproductionImage(this.production_id,index)
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
        deletedescribeImage(this.production_id,index)
        .then((data)=>{
           setTimeout(()=>{
                loadingInstance.close();
            },300)
          console.log(data)
            that.loadImg()
        })
    },
    /**
     * 确认修改
     */
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
        confirmPublishProduction(that.production_id).then((res)=>{
          let loadingInstance = Loading.service();      
            setTimeout(()=>{
              loadingInstance.close();
              that.$parent.isNext()
            },300)
          console.log('发布')
          })
      }
    },

    /**
     * 删除规格 
     */
    deleteSpec:function(specifications_id){
      console.log(specifications_id)
      var that = this;
        service.postMsg('deleteSpecification',{
      "specifications_id": specifications_id
        }).then((res)=>{
          console.log(res.data)
          that.refresh();
        })
    },
    changePrice:function(){
      console.log()
    },
    /**
     * 删除商品参数
     */
    deletePart:function(item){
        console.log(item)
        var that = this;
         service.postMsg('deleteGoodsparameter',{
        "goodsParameters_id": item.parameter_id
          }).then((res)=>{
            console.log(res.data)
            that.refresh();
          })
    },
    /**
     * 修改商品规格图片
     */
    changeTasetsImg(_id){
      console.log(_id)
      this.specification_id=_id;

      $('.changeDescImg').click()
    },
    /**
     * 修改商品参数
     */
    changePart:function(item){

      
      // 14.编辑商品参数
      //   接口：/program/editgoodsparameters（post）
      //   请求参数：parameter_id;
      //             parameterName;
      //             parameterContent;

        console.log(item)
    }
  }
}

</script>
<style>

  .parameter_in{
      line-height:30px;
      height:30px;
      border:1px solid #d7d7d7;
      margin:5px;
      padding:5px;
      /* cursor: pointer; */
  }
  .cursor{
    cursor:pointer;
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
  .cancel_one{
    cursor: pointer;
  }

  .cancel_one2{
      position: relative;
      right: -50px;
      top: -25px;
      cursor: pointer;
  }
</style>