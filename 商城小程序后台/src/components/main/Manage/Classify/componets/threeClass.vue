<template>
<div>
    <el-row class="tbd smallest">
      <el-col :span="8">
        <div class="smallest_left">
            <el-input disabled v-model="changName"></el-input>
        </div>
      </el-col>
      <el-col :span="6" style="line-height:20px;">
        <img src="" class="theImgOfSub" alt="">
      </el-col>
      <el-col :span="10">
        <update @updateFirst='updateFirst'></update>
      </el-col>
    </el-row>

    <el-dialog :title="changName" :visible.sync="showAlert">
        <el-form>
          <el-input v-model="changName" ></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="upName">确 认</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import alertUpdate from './alertUpdate'

import update from './update'
export default {
  name:'threeClass',
  data () {
    return {
        rota:false,
        twoClass:[],
        isShowSecond:false,
        addThirdClassName:'',
        update3:false,
        changName:'',
        showAlert:false
    };
  },
  props:['secondclassName','secondclass_id'],
  components: {update,alertUpdate},
  beforeMount:function(){
    this.changName=this.secondclassName;
  },
  methods: {
    upName:function(){
      var that = this;
      var formData = new FormData();

      formData.append('secondclass_id', that.secondclass_id);
      formData.append('secondclass_name', that.secondclassName);  
      console.log(that.secondclass_id)
      console.log(that.secondclassName)

       that.$ajax.post(that.GLOBAL.host+that.GLOBAL.editSecondCategory,formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
          that.$emit('colseAlert',false)
          // that.$parent.$parent.showSecondClass();
          // that.$parent.$parent.showSecondClass();
        }, function (res) {
          that.$emit('colseAlert',false)
        });
        this.showAlert=false;
    },
    closeAlert:function(){
      this.update3=false;
    },
    addSecond:function(){
      console.log('点击了添加')
    },
    //上传第三级标签
    uploadsmallest:function(){
      var that = this;
      var addThirdClassName = this.addThirdClassName;
      console.log(addThirdClassName)
        var formData = new FormData();
        formData.append('name',that.addThirdClassName);

        formData.append('firstclass_id', that.firstclass_id);

         this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.addSecondCategory,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
              
            console.log(res)
            if(res.data.index){
              console.log('添加成功')
              that.init(that);
            }else{
              console.log('添加失败！名字不可重复!')
            }
            that.isShowSecond = false;
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

          that.showAlert=true;
          // that.$refs.alertUpdate.open();
          break;
        default:
          that.deleteSecondClass();
      }
    },
    deleteSecondClass:function(){
      var that=this;
        var formData = new FormData();
        formData.append('secondclass_id',that.secondclass_id);
        this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.deleteSecondCategory,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
              console.log(res)
              alert('删除成功!')
              that.$parent.showSecondClass();
              that.$parent.showSecondClass();
          }, function (res) {

          });
    },
  }
}

</script>
<style>
.smallest_left{
  width:300px;
  height: 53px;
}
.smallest .el-input  {
  width:200px;
  float:left;
  margin-left:55px; 
  margin-top:9px;
}

.smallest .el-input--small .el-input__inner {
    height: 44px;
    line-height: 32px;
}

.tbd{
  background:#fff;
  height:63px;
  border-bottom:1px solid #d7d7d7;
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