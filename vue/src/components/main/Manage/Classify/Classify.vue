<template>
  <div>
    <div class="addClass" @click="dialogFormVisible = true">
      <Btn msg="添加分类"></Btn>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="分类名称" label-width="120px">
            <el-select v-model="chooseTotalClass" placeholder="总分类">
                <el-option
                  v-for="item in totalClass"
                  :key="item.totalclass_id"
                  :label="item.name"
                  :value="item.totalclass_id"
                  :disabled="!item.statue">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="dialogFormVisible = false">取 消</el-button>
        <el-button  @click="uploadImg" >上传图片</el-button>
      </div>
    </el-dialog>
    <div class="classTable">
      <el-row class="tabHead">
        <el-col :span="8">分类名称</el-col>
        <el-col :span="6" style="line-height:20px;">
            <span style="color:red;">*</span>类目图片<br>
            <span style="color:#4da2ad;">(建议图片不超过2M，用于首页分类展示)</span>
        </el-col>
        <!-- <el-col :span="10">类目下商品</el-col> -->
        <el-col :span="10">操作</el-col>
      </el-row>
      <div v-for="item in personTotalClass">
        <oneClass :firstClass="totalClass" :firtName="item.totalclass_Name" :personaltotalclass_id="item.personaltotalclass_id" :_id="item.totalclass_id" :iconUrl="item.iconUrl" ></oneClass>
      </div>
    </div>
    <input type="file" ref="file" name="" id="subImg" @change="subImg" v-show="false"/>
  </div>
</template>

<script>
import Btn from '@/components/commonComponents/Btn'
import oneClass from './componets/oneClass'
import {  subImgData } from './methods_send/Classify'
import { searchTotalClass , SearchPersonTotalClass} from '../../../searchUtils/search'

export default {
  name:'Classify',
  data () {
    return {
      personTotalClass:[],
      totalClass:[],
      dialogFormVisible:false,
      chooseTotalClass:'',
    };
  },
  components: {
    Btn,oneClass
  },
  beforeCreate:function(){
      searchTotalClass(this)
      SearchPersonTotalClass(this)
  },
  methods: {
    initk:function(){
        searchTotalClass(this)
        SearchPersonTotalClass(this)
    },
    //单击file input
    uploadImg:function(){
        if(this.chooseTotalClass){
            $("#subImg").click();
        }else{
            alert('先选择分类')
        }
    },
    /**
     * 上传图片
     */
    subImg:function(e){
      subImgData(this.chooseTotalClass,this,e.target.files[0])//图片上传
    }
  }
}
</script>
<style>
.addClass{
  margin-top:90px;
}
.classTable{
  text-align: center;
  font-size:14px;
}
.tabHead{
  font-size:16px;
  line-height:40px;
}
.chooseImg{
  display: inline-block;
  width:300px;
  height: 50px;
  z-index: 1000;
  background: red;
}
</style>
