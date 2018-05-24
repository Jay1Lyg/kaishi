<template>
<div>
  <!-- 规格 -->
      <div class="ones_inp">
        <p class="label">&nbsp;规格</p>
        <div class="bigBd"  >
          <div class="one_col lf" v-for="item in tasets">
            <div class="one_taste">
              <p class="lf" style="margin-right:23px;">{{item.name}}:</p>
              <div class="one_cols" v-for="i in item.direcs">
                <p  class="one_col_1">{{i}}</p>
                <img class="cancel_one" src="../../../../../assets/cancel.png" alt="">
              </div>
            </div>
          </div>
          <div class="two_col lf">
              <table class="one_col_detail smBd">
                <thead class="thead ">
                  <th class="thBd" style="width:90px;">上传图片</th>
                  <th class="thBd" style="color:#bcbcbc;width:84px;">口味</th>
                  <th class="thBd" style="width:138px;">价格（元）</th>
                  <th class="th lf" style="width:138px;">库存（件）</th>
                </thead>
                <tbody v-for="item in tasets">
                  <tr class="tr"  v-for="i in item.direcs">
                    <td class="td"><img class="upImg" src="../../../../../assets/uppic.png" alt=""></td>
                    <td class="td">{{i}}</td>
                    <td class="td">
                      <div class="inp">
                        <input class="min_inp" type="text">
                      </div>
                    </td>
                    <td class="td">
                      <div class="inp">
                        <input class="min_inp" type="text">
                      </div>                        
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
      <!-- 商品参数 -->
      <div class="ones_inp parat">
        <p class="setElse setParat">添加参数</p>
        <p class="label"> 商品参数</p>
        <div class="parameters">
          <div  class="parameter">
            <div class="parat_in lf" style="width:100px">品牌品..</div>
            <el-select v-model="data.pin3" slot="prepend" style="width:120px;height:50px;margin-top:5px;" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </div>
          <div  class="parameter">
            <div class="parat_in lf" style="">品牌</div>
            <el-select v-model="data.pin2" slot="prepend" style="width:120px;height:50px;margin-top:5px;" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </div>
          <div  class="parameter">
            <div class="parat_in lf" style="">品牌</div>
            <el-select v-model="data.pin" slot="prepend" style="width:120px;height:50px;margin-top:5px;" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!--商品图片-->
      <div class="ones_inp clear" style="height:100%;">
        <p class="label"> <span class="redX">*</span>&nbsp;商品图片
          <br>
          <span style="font-size:12px;color:#949494;">(默认<span style="color:#4da2ad">第一张</span>图片为商品封面图)</span>
        </p>

        <div class="subImgs">
          <subImg sty="width:150px;" ></subImg>
          <subImg sty="width:150px;" ></subImg>
          <subImg sty="width:150px;" src=true></subImg>
          <subImg sty="width:150px;" src=true></subImg>
        </div>
          
      </div>
      <!-- 宝贝描述 -->
      <div class="ones_inp clear">
        <p class="label"> <span class="redX">*</span>&nbsp;宝贝描述
          <br>
          <span style="font-size:12px;color:#949494;">(请上传相应图片)</span>
        </p>
        <div class="SMdetail">
            <div class="lf"></div>
        </div>
        <div class="subImgs" style="height:100%;">
          <subImg sty="width:150px;" ></subImg>
          <subImg sty="width:150px;" ></subImg>
          <subImg sty="width:150px;" src=false></subImg>
          <subImg sty="width:150px;" src=false></subImg>
        </div>
      </div>
</div>

</template>

<script>
import subImg from '../../../scomponents/subImg'
export default {
  name:'Step2',
  data () {
    return {
      tasets:[
        {name:'口味',direcs:['五香','麻辣','番茄','五香','麻辣']},
        {name:'包装',direcs:['大','小','中']}
      ],
      data:{},
      dialogImageUrl: '',
      dialogVisible: false
    };
  },

  components: {
    subImg
  },

  methods: {}
}

</script>
<style>
 .parat_in{
    width:100px;
    line-height:54px;
    margin-left:20px;
    font-size:14px;
  }
  .subImgs{
    width:600px;
    min-height:200px;
    margin-left: 320px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
</style>