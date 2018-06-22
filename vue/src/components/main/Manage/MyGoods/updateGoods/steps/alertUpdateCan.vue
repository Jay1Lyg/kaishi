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
  name:'alertUpdateCan',
  data () {
    return {
      showAlert:false,
      parameterName:'',//参数名称
      parameterContent:'',//参数内容
    }
  },
  props:{
    _id:String
  },
  components: {},
  beforeMount:function(){
    this.parameterName='';
    this.parameterContent='';
  },
  methods: {
    open:function(){
      this.showAlert=true;
    },
    
    uploadSecImg:function(){
      var that = this;
          var params = new FormData();
          params.append('production_id', that._id);
          params.append('parameterName', that.parameterName);
          params.append('parameterContent', that.parameterContent);
          service.post(gloable.api.savegoodsparameters,params).then(function (res) {
            console.log(res)
            that.showAlert=false;    
            that.$parent.refresh();
          }, function (res) {
             Message({
                message: '请检查你得网络设置！',
                type: 'error',
                duration: 3 * 1000
            })
            that.showAlert=false;
          });
    }
  }
}
</script>
<style>
</style>