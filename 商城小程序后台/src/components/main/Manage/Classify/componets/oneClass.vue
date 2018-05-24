<template>
<div> 
    <el-row class="tbd oneClass">
        <el-dialog title="添加分类" :visible.sync="isShowSecond">
          <el-form>
            <el-input v-model="secondClassName" placeholder="请输入分类名称"></el-input>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button  @click="isShowSecond = false">取 消</el-button>
            <el-button  @click="uploadSecImg">上传图片</el-button>
          </div>
        </el-dialog>
      <el-col :span="8">
        <div class="oneClass_left">
          <i class='el-icon-arrow-right my_icon' :class="{rotate:rota}" @click="showSecondClass"></i>
          <el-input disabled v-model="firtName" ></el-input>
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
      <twoClass :firstclassName="item.firstclassName" :_id="item.firstclass_id" :iconUrl="item.iconUrl" ></twoClass>
    </div>

    <!-- input files -->
    <input type="file"   class="subImg2"  ref="file" name="" @change="subImg2" v-show="false"/>
     <!-- 弹出框 -->
    <alertUpdate  ref='alertUpdate' :disabled="true" @closeAlert='closeAlert' :formData='formData' :firtName='firtName' :_id='_id' :url='url'></alertUpdate>
    
</div>
</template>

<script>
import twoClass from './twoClass'
import update from './update'
import alertUpdate from './alertUpdate'
export default {
  name:'oneClass',
  data () {
    return {
        rota:false,
        twoClass:[],
        value3: '',
        value:'',
        h:false,
        isShowSecond:false,
        secondClassName:'',
        update3:false,
        formData:{},
        url:'',
    }; 
  },
  
  props:['firstClass','firtName','personaltotalclass_id','iconUrl','_id'],
  components: {
    twoClass,update,alertUpdate
  },

  beforeMount:function(){
      var formData = new FormData();
      formData.append('userid', sessionStorage.getItem('user_id'));
      formData.append('totalclass_id', this._id);
      this.formData=formData;
      var url=this.GLOBAL.api.uploadTotalclassImage
      this.url=url;
  },

  methods: {
    closeAlert:function(){
      this.update3=false;
      this.$parent.initk();
    },

    showSecondClass:function(){
      var that = this;
      that.rota=!this.rota;
      if(that.rota){  
        console.log('三角点击！');
        var formData = new FormData();
        formData.append('personaltotalclass_id', that.personaltotalclass_id);
        this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchFirstCategory,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
            that.twoClass=res.data;
          }, function (res) {

          });
      }else{
        that.twoClass=[];
      }
    },

    uploadSecImg:function(){
      // var inp=document.createElement("input");
        console.log(this.secondClassName)
        // if(this.secondClassName){
        $(".subImg2").click();
        // }else{
        //   alert('请填写类别名称!')
        // }
    },

    //上传图片
    subImg2:function(e){
      var that = this;
      var formData = new FormData();
      formData.append('name',that.secondClassName);
      console.log(that.secondClassName)
      that.secondClassName='';
      formData.append('personaltotalclass_id', that.personaltotalclass_id);
      formData.append('images_upload', e.target.files[0]);
      this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.addFirstCategory,formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
        console.log(res)
        if(res.data.index){
          alert('添加成功')
        }else{
          alert('添加失败！名字不可重复!')
        }
        that.isShowSecond = false;
        that.showSecondClass();
        that.showSecondClass();
      }, function (res) {
        console.log('报了个错!')
      });
     
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
          //删除
          that.deleteFirstClass();
          that.$parent.initk();
          
      }
    },

    deleteFirstClass:function(){
      var that=this;
        var formData = new FormData();
        formData.append('personaltotalclass_id',that.personaltotalclass_id);

        this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.deleteTotalCategory,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
              console.log(res)
          }, function (res) {

          });
    }
  }
}

</script>
<style>
.oneClass_left{
  width:300px;
  height: 53px;
}
.oneClass .el-input  {
  width:200px;
  float:left;
  margin-left:10px; 
  margin-top:9px;
}

.oneClass .el-input--small .el-input__inner {
    height: 44px;
    line-height: 32px;
}

.tbd{
  background:#fff;
  height:63px;
  border-bottom:1px solid #d7d7d7;
}
.my_icon{
  transition: all .2s;  
  width:10px;
  margin-left:10px;
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

.dis{
  color:#bacbac;
}
</style>