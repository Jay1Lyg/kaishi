<template>

<div>
  <div style="margin-top: 15px;">

</div>

  <!-- 商品类目 -->
  <div class="ones_inp">
      <p class="label"> <span class="redX">*</span>&nbsp;商品列表</p>
    <el-select
      v-model="totalclass_id"
      slot="prepend" style="margin-left:45px;width:492px;height:50px;" placeholder="请选择" @change="chooseFirst">
      <el-option  v-for="item in totalClass" :label="item.name" :value="item.totalclass_id"></el-option>
    </el-select>
  </div>
    <!-- 标题 -->
  <div class="ones_inp">
    <p class="label"> <span class="redX">*</span>&nbsp;标题</p>
    <p class="smallBD">
      <el-input v-model="title" class="input_in " style="width:492px;"  placeholder="请填写标题"></el-input>
    </p>
  </div>
  <!-- 现价 原价 -->
  <div class="ones_inp">
    <p class="label"> <span class="redX">*</span>&nbsp;现价</p>
    <p class="smallBD now_price" style="width:200px">
      <el-input v-model="present_price" class="input_in " style="width:200px;"  placeholder="请输入现价"></el-input>
    </p>
    <p class="smallBD now_price yet_price" >
      原价
    </p>
    <p  class="smallBD now_price" style="width:200px">
      <el-input v-model="original_price" class="input_in " style="width:200px;"  placeholder="请输入原价"></el-input>
    </p>
  </div>
  <!-- 运费 -->
  <div class="ones_inp">
    <p class="label"> <span class="redX">*</span>&nbsp;运费(元)</p>
    <!-- <p class="setElse">设置运费模板</p>       -->

     <p class="smallBD">
      <el-input v-model="freight" type="number" class="input_in" style="width:492px;"  placeholder="请填写运费"></el-input>
    </p>
   <!-- <el-select v-model="data.model" slot="prepend" style="margin-left:45px;width:492px;height:50px;" placeholder="请选择">
      <el-option label="哈哈" value="1"></el-option>
      <el-option label="哈哈哈哈" value="2"></el-option>
      <el-option label="哈哈哈" value="3"></el-option>
    </el-select> -->
  </div>
  <!-- 选择分类 -->
  <div class="ones_inp">
    <p class="label"><span class="redX">*</span>&nbsp;选择分类</p>

    <p class="setElse">添加分类</p>
    <el-cascader
      expand-trigger="hover"
      :options="totalClass"
      v-model="selectedClass2"
      @change="chooseClass"
      @active-item-change="handleItemChange"
      :props="props"
      >
    </el-cascader>
  </div>
</div>
</template>

<script>
export default {
  name:'Step1',
  data () {
    return {
      props: {
        value: 'name',
        children: 'cities'
      },

      data:{},
      totalclass_id:'',
      title:'',
      present_price:'',
      original_price:'',
      freight:'',
      totalClass:[],
      selectedClass2:[],
    };
  },
  props:['value'],

  beforeMount:function(){
      var that = this;
      var params = new URLSearchParams();
      params.append('user_id', sessionStorage.getItem('user_id'));
      that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchCategory,params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
            console.log(res.data)
            that.totalClass=res.data;
            for(var i in res.data){
                console.log(res.data[i].totalclass_id)

              }
        }, function (res) {
        });

        that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchallTotalCategory
          ,params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(function (res) {
            that.firstClasses=res.data;
            console.log(res.data)
            for(var i in res.data){
              var personaltotalclass_id=res.data[i].personaltotalclass_id;

               var formData = new FormData();
                formData.append('personaltotalclass_id', personaltotalclass_id);
                that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchFirstCategory,formData,
                  {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                  }).then(function (res) {
                    console.log(res.data);
                      for(var k in res.data){
                        var formData = new FormData();
                        formData.append('firstclass_id', res.data[k].firstclass_id);
                        that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchSecondCategory,formData,
                          {
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                            },
                          }).then(function (res) {
                            that.twoClass=res.data;


                          }, function (res) {

                          });
                      }
                  }, function (res) {

                  });
            }
            }, function (res) {
            alert("请检查你的网络！")
          });
  },
  beforeDestroy:function(){
    console.log(this.totalclass_id)
  },
  components: {},
  methods: {
    chooseClass:function(value){
      console.log(value)
    },
    chooseFirst(value){

      var that=this;


      var formData = new FormData();
      formData.append('personaltotalclass_id', value);
      that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchFirstCategory,formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(function (res) {
        console.log(res);
//        for(var k in res.data){
//          var formData = new FormData();
//          formData.append('firstclass_id', res.data[k].firstclass_id);
//          that.$ajax.post(that.GLOBAL.host+that.GLOBAL.api.searchSecondCategory,formData,
//            {
//              headers: {
//                'Content-Type': 'application/x-www-form-urlencoded',
//              },
//            }).then(function (res) {
//            that.twoClass=res.data;
//            console.log(res.data)
//
//          }, function (res) {
//
//          });
//        }
      }, function (res) {

      });
    },
    handleItemChange(val) {
      console.log('active item:', val);

    }
  }
}

</script>
<style>
.now_price{
    width:200px;
  }
   .smallBD{
    display: inline-block;
    margin-left:20px;
    width:490px;
    height:44px;
    position: relative;
  }
</style>
