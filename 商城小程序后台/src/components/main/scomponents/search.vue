<template>
  <div>
    <div class="search">
      <div class="searchInp">
        <input class="input" placeholder="请输入商品名称" v-model="msg" @focus="focus()" @blur="out()" type="text" @keyup.enter="sendMsg">
      </div>
      <div class="searchRt rt" :class="{white:white}" @click="sendMsg">
        搜索
      </div>
    </div>
  </div>
</template>

<script>
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
    focus:function(){
      console.log('focus')
      this.white=true;
    },
    out:function(){
      console.log('out')
      this.white=false;
    },
    sendMsg:function(){
      console.log("寻找关键词"+this.msg+'中')
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
   border: 0px;outline:none;cursor: pointer;
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