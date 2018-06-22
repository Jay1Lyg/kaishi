<template>
<div>
      <el-row class="tbd threeClass">
        <el-dialog title="添加分类" :visible.sync="isShowSecond">
          <el-form>
            <el-input v-model="addThirdClassName" placeholder="请输入分类名称"></el-input>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button  @click="isShowSecond = false">取 消</el-button>
            <el-button  @click="uploadThreeClass">确定</el-button>
          </div>
        </el-dialog>
      <el-col :span="8">
        <div class="threeClass_left">
          <i class='el-icon-arrow-right my_icon' :class="{rotate:rota}" @click="showSecondClass"></i>
            <el-input disabled v-model="firstclassName" ></el-input>
            <a href="javascript:;" style="lineHeight:70px;" @click="isShowSecond = true">添加</a>
        </div>
      </el-col>
      <el-col :span="6" style="line-height:20px;">
        <img :src="iconUrl||'../../../../../assets/uppic.png'" class="theImgOfSub" alt="">
      </el-col>
      <!-- <el-col :span="5">
        <p class="look">查看</p>
      </el-col> -->
      <el-col :span="10">
        <update @updateFirst='updateFirst'></update>
      </el-col>
    </el-row>
    <div v-show='rota' v-for="item in twoClass">
      <threeClass :secondclassName="item.secondclassName" :secondclass_id="item.secondclass_id"></threeClass>
    </div>

    <alertUpdate  ref='alertUpdate' :disabled="false" @closeAlert='closeAlert' :firtName='firstclassName' :_id='_id' :url2="url2" :formData='formData'></alertUpdate>
</div>
</template>

<script>
import threeClass from './threeClass'
import update from './update'
import alertUpdate from './alertUpdate'
import {searchSecondCategory} from '../../../../searchUtils/search'

export default {
  name:'twoClass',
  data () {
    return {
        rota:false,
        twoClass:[],
        value3: '',
        value:'',
        h:false,
        isShowSecond:false,
        secondClassName:'',
        addThirdClassName:'',
        update3:false,
    }; 
  },
  props:{
    firstclassName:String,
    _id:String,
    iconUrl:String
  },
  components: {threeClass,update,alertUpdate},
  beforeMount:function(){
    var formData = new FormData();
    formData.append('firstclass_id', this._id);

    this.formData=formData;
    var url=this.GLOBAL.api.editFirstCategory
    this.url2=url;
  },
  methods: {
    closeAlert:function(){
      this.update3=false;
    },

    showSecondClass:function(){
      var that = this;
      that.rota=!this.rota;
      if(that.rota){  
        searchSecondCategory(that._id).then((res)=>{
            that.twoClass=res;
        });
      }else{
        that.twoClass=[];
      }
    },

    updateFirst:function(index){
      var that = this;
       switch(index)
      {
        case 1:

          break;
        case 2:

          break;
        case 3:
          that.update3=true;
          that.$refs.alertUpdate.open();
          break;
        default:
          that.deleteSecondClass();
      }
    },

     deleteSecondClass:function(){
      var that=this;
        var formData = new FormData();
        formData.append('firstclass_id',that._id);

        this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.deleteFirstCategory,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
              console.log(res)
              alert('删除成功!')
              that.showSecondClass();
              that.showSecondClass();
              that.$parent.showSecondClass();
              that.$parent.showSecondClass();
          }, function (res) {

          });
    },

    addSecond:function(){
      console.log('点击了添加')
    },

    //上传第3级
    uploadThreeClass:function(){
      var that = this;
      var addThirdClassName = that.addThirdClassName;
      console.log(addThirdClassName)
        var formData = new FormData();
        formData.append('name',that.addThirdClassName);
        formData.append('firstclass_id', that._id);
        that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.addSecondCategory,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
              
            console.log(res)
            if(res.data.index){
              console.log('添加成功')
            }else{
              alert('添加失败！名字不可重复!')
            }
            that.isShowSecond = false;
            that.showSecondClass();
            that.showSecondClass();
            that.addThirdClassName='';
            // that.showSecondClass();
          }, function (res) {
            console.log('报了个错!')
          });
    },
 
  }
}

</script>
<style>
.threeClass_left{
  width:300px;
  height: 53px;
}
.threeClass .el-input  {
  width:200px;
  float:left;
  margin-left:10px; 
  margin-top:9px;
}

.threeClass .el-input--small .el-input__inner {
    height: 44px;
    line-height: 32px;
}

.tbd{
  background:#fff;
  height:63px;
  border-bottom:1px solid #d7d7d7;
}
.threeClass .my_icon{
  transition: all .2s;  
  width:10px;
  margin-left:20px;
  margin-top:24px;
  float:left;
}

.rotate{
  transform:rotate(90deg);
  -ms-transform:rotate(90deg); 	/* IE 9 */
  -moz-transform:rotate(90deg); 	/* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg); 
}

.theImgOfSub{
  margin-top:17px;
  width:30px;
}
.look{
  font-size:14px;
  line-height:63px;
  color:#86bfc6;
}
.look:hover{
  color:#4da2ad;
  cursor:pointer;
}

/* 四个小图标 */
.updates{
  display:flex;
  justify-content: center;
}
.updateImg{
  overflow: hidden;
  display: inline-block;
  margin:8px;
  margin-top:18px;  
  width:28px;
  height:28px;
  background:  url(../../../../../assets/four.png) no-repeat border-box;
}
.updates .move_top{
  background-position: -48px 0px;
}

.updates .move_bottom{
  background-position: -48px 2px;
}
.updates .update{
  background-position: 3px 2px;
}

.updates .delete{
  background-position: -22px 2px;
}

.updates>.move_top{
  transform: rotate(180deg);
}

.changeColor{
    color:#86bfc6;
    overflow: hidden;
    position: relative;
    left: -36px;
    top:-18px;  
    border-right: 0px solid transparent;
    -webkit-filter: drop-shadow(28px 0);
    filter: drop-shadow(28px 0); 
    z-index: 10;
}

.dis{
  color:#bacbac;
}
</style>