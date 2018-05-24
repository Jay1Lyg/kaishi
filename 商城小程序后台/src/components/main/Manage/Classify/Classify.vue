<template>
<div>
  <div class="addClass" @click="dialogFormVisible = true">
    <Btn msg="添加分类"></Btn>
  </div>
  <!-- 弹出框 -->
  <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item label="分类名称" label-width="120px">
          <el-select v-model="firstClassName" placeholder="一级分类">
              <el-option
                v-for="item in firstClass"
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
    <div v-for="item in firstClasses">
      <oneClass :firstClass="firstClass" :firtName="item.totalclass_Name" :personaltotalclass_id="item.personaltotalclass_id" :_id="item.totalclass_id" :iconUrl="item.iconUrl" ></oneClass>
    </div>
  </div>
  <input type="file" ref="file" name="" id="subImg" @change="subImg" v-show="false"/>
</div>
</template>

<script>
import Btn from '../../scomponents/Btn'
import oneClass from './componets/oneClass'
export default {
  name:'Classify',
  data () {
    return {
      firstClasses:[],
      activeNames: ['1'],
      firstClass:[],
      dialogFormVisible:false,
      firstClassName:'',
      url:'',
      user_id:''
    };
  },

  components: {
    Btn,oneClass
  },
  beforeCreate:function(){
      var that = this;
   
      that.$options.methods.init(that);
  },
  // beforeUpdate:function(){
  //   this.init(this);
  // },
  methods: {
    initk:function(){
      this.init(this);
    },
    //初始化
      init:function(that){
        var params = new URLSearchParams();
        params.append('user_id', sessionStorage.getItem('user_id'));
        
          that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchCategory,params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
            that.firstClass=res.data;
            that.url=that.GLOBAL.host+that.GLOBAL.api.uploadTotalclassImage
        }, function (res) {
          alert("请检查你的网络！")
        });

        that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchallTotalCategory,params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
            that.firstClasses=res.data;
            console.log(res.data)
          }, function (res) {
            // // 这里是处理错误的回调
            // console.log(response);
            alert("请检查你的网络！")
          });
        },
    //单击file input
      uploadImg:function(){
        var inp=document.createElement("input");
        if(this.firstClassName){
          $("#subImg").click();
        }else{
          alert('先选择分类')
        }
      },
    //上传图片
      subImg:function(e){
        var that = this;
        var formData = new FormData();
        formData.append('userid',  sessionStorage.getItem('user_id'));
        formData.append('totalclass_id', that.firstClassName);
        formData.append('images_upload', e.target.files[0]);
        this.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.uploadTotalclassImage,formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
          console.log(res)
          that.dialogFormVisible = false;

          that.init(that);

        }, function (res) {

        });
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
