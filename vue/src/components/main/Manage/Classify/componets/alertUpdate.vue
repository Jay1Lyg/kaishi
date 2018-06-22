<template>
    <el-dialog :title="firtName" :visible.sync="showAlert">
      <el-form>
        <el-input v-model="changName" :disabled='disabled'></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  :v-if="disabled" @click="upName">确 认</el-button>
        <el-button  @click="uploadSecImg" >修改图片</el-button>
      </div>
    <input type="file"   :id="_id+1"  ref="file" name="" @change="subImg3" v-show="false"/>
  </el-dialog>
</template>

<script>
import service from '@/utils/require'

export default {
  name:'alertUpdate',
  data () {
    return {
      showAlert:false,
      changName:this.firtName
    }
  },
  props:{
    firtName:String,
    _id:String,
    disabled:Boolean,
    formData:FormData,
    url:String,
    url2:String
  },
  components: {},
  
  methods: {
    upName:function(){
      var that = this;
      var formData=new FormData();
      formData.append('firstclass_id',that._id);
      formData.append('firstclass_name', that.changName);  
      if(this.disabled==true){
          console.log("没有")
          that.showAlert=false;
      }else{
       service.post(that.GLOBAL.api.editFirstCategory,formData)
       .then(function (res) {
          that.showAlert=false;
          that.$emit('colseAlert',false)
          that.$parent.$parent.showSecondClass();
          that.$parent.$parent.showSecondClass();
        }, function (res) {
          console.log('报了个错!')
          that.$emit('colseAlert',false)
          that.showAlert=false;          
        });
      }
    },
    
    open:function(){
      this.showAlert=true;
    },

       //单击file input
    uploadSecImg:function(){
        $("#"+this._id+1).click();
    },

      //修改图片
    subImg3:function(e){
      var that = this;
      that.upName();
      that.submit(e.target.files[0]);
    },

    submit:function(src){
      var that = this;
      var formData =  new FormData();
      formData.append('firstclass_id',that._id)
      formData.append('images_upload',src);  
      service.post(that.GLOBAL.api.uploadfirstclassImage,formData).then(function (res) {
          console.log(res)
          that.$parent.$parent.showSecondClass();
          that.$parent.$parent.showSecondClass();
          that.$emit('colseAlert',false)
        }, function (res) {
            alert('添加失败！')
        });
        that.showAlert=false;
    }
  }
}

</script>
<style>
</style>