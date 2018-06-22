<template>
    <el-dialog title="上传规格" :visible.sync="showAlert">
      <el-form>
        <el-input v-model="parameterName" placeholder="参数名称"></el-input>
        <el-input v-model="parameterContent" style="margin-top:15px;"  placeholder="参数内容"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="showAlert=false">取消</el-button>
        <el-button  @click="uploadSecImg" >确认</el-button>
      </div>
  </el-dialog>
</template>
<script>
import service from '@/utils/require'
import gloable from '@/gloable'
export default {
  name:'updatePart',
  data () {
    return {
      showAlert:false,
      parameterName:'',//参数名称
      parameterContent:'',//参数内容
    }
  },
  props:{
    _id:String,
    updatePart:Object
  },
  components: {},
  
  beforeMount:function(){
    console.log(this.updatePart)
 
  },
  methods: {
    open:function(){
      this.parameterName=this.updatePart.parameterName;
      this.parameterContent=this.updatePart.parameterContent;
      this.showAlert=true;
    },
    
    uploadSecImg:function(){
      var that = this;
      //     14.编辑商品参数
      // 接口：/program/editgoodsparameters（post）
      // 请求参数：
      // parameter_id;
      //           parameterName;
      //           parameterContent;
     service.postMsg('editgoodsparameters',{
          'parameter_id':that.updatePart.parameter_id,
          'parameterName':that.parameterName,
          'parameterContent':that.parameterContent
        }).then((res)=>{
            console.log(res.data)
            that.showAlert=false;
            that.$parent.refresh();
        })
    }
  }
}
</script>
<style>
</style>