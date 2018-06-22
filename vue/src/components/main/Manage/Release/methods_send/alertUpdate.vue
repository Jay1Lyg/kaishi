<template>
    <el-dialog title="上传规格" :visible.sync="showAlert">
      <el-form>
        <el-input v-model="taste_name" placeholder="规格名称"></el-input>
        <el-input v-model="price" style="margin-top:15px;" type="number" placeholder="价格(元)"></el-input>
        <el-input v-model="inventory" style="margin-top:15px;" type="number" placeholder="库存(件)"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="showAlert=false">取消</el-button>
        <el-button  @click="uploadSecImg" >上传图片</el-button>
      </div>
    <input type="file"   :id="_id+1"  ref="file" name="" @change="subImg3" v-show="false"/>
  </el-dialog>
</template>
<script>
import service from '@/utils/require'
import gloable from '@/gloable'
export default {
  name:'alertUpdate',
  data () {
    return {
      showAlert:false,
      taste_name:'',//口味名称
      price:0,//价格
      inventory:0,//库存
    }
  },
  props:{
    _id:String
  },
  components: {},
  methods: {
    open:function(){
      this.showAlert=true;
    },
       //单击file input
    uploadSecImg:function(){
        $("#"+this._id+1).click();
    },

      //上传图片
    subImg3:function(e){
      var that = this;
      var formData = new FormData();
      formData.append('taste_name', that.taste_name);  
      formData.append('production_id', that._id);  
      formData.append('price', that.price);  
      formData.append('inventory', that.inventory);  
      formData.append('images_upload', e.target.files[0]);  
      that.submit(formData);
    },

    submit:function(formData){
      var that = this;
      service.post(gloable.api.saveSpecifications,formData).then(function (res) {
          console.log(res)
          that.$parent.refresh()
      }, function (res) {
          console.log('报了个错!')
          alert('添加失败！')
      });
      that.showAlert=false;


    }
  }
}
</script>
<style>
</style>