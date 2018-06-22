<template>
  <div>
    <div class="search">
      <div class="searchInp">
        <input class="input" placeholder="请输入商品名称" v-model="msg" @focus="white=true" @blur="blur" type="text" @keyup.enter="searchMsg">
      </div>
      <div class="searchRt rt" :class="{white:white}" @click="searchMsg">
        搜索
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/utils/require'

export default {
  name:'search',
  data () {
    return {
      white:false,
      msg:""
    };
  },

  components: {},
  methods: {
    blur:function(){
      this.white=false;
      this.searchMsg() 
    },
    searchMsg:function(){
      var that = this ;
          this.$emit('getSearchMsg',that.msg)
    }
  }
}

</script>
<style>
.search{
  width:300px;
  height:40px;
  border:1px solid #4da2ad;
  border-radius: 40px;
}
.input{
   border: 0px;outline:none;
   cursor: text;
    font-size:14px;
    width:200px;
    height:30px;
    line-height: 30px;
    margin-top:5px;
    float: left;
    margin-left:20px;
    background: #f1f9f9;
}
.searchRt{
  width:56px;
  height:40px;
  background: #4da2ad;
  border-top-right-radius:40px;
  border-bottom-right-radius:40px;
  color:#e4e4e4;
  font-size:14px;
  line-height:40px;
}
.white{
  color:white;
}
</style>