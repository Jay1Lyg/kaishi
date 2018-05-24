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
export default {
  name:'alertUpdate',
  data () {
    return {
      showAlert:false,
      changName:this.firtName
    }
  },
  props:['firtName','_id','disabled','formData','url','url2'],
  components: {},
  
  methods: {
    upName:function(){
      console.log('ss')
      var that = this;
      var formData=this.formData;
      console.log(that.changName)
      formData.delete('firstclass_name');
      formData.append('firstclass_name', that.changName);  
      if(this.disabled==true){
        console.log("没有")
      }else{
       that.$ajax.post(that.GLOBAL.host+that.url2,formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
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
      var formData=that.formData;
      formData.append('images_upload', e.target.files[0]);  
      console.log(e.target.files[0])
      that.submit(formData,that.url);
    },

    submit:function(formData,url){
      var that = this;
      console.log(url)
      that.$ajax.post(that.GLOBAL.host+url,formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
          console.log(res)
          if(res.data.index){
            console.log('添加成功')
            that.$parent.$parent.initk();
          }else{
            that.$parent.$parent.initk();
            console.log('添加失败！名字不可重复!')
          }
          that.$emit('colseAlert',false)
        }, function (res) {
          console.log('报了个错!')
            alert('添加失败！')
        });
        that.showAlert=false;
        console.log(that.showAlert)
    }
  }
}

</script>
<style>
</style>