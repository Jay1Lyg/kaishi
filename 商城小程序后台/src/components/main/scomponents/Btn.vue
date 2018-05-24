<template>
      <div class="submit">
            <a  class="btn_login" :class="{sm:(!sm)}" @click.prevent="submitMsg($event)">{{msg}}</a>
        </div>
</template>

<script>
export default {
  directives: {
     focus: {
        update: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
  },
  props:["msg",'sm'],
  name:'Btn',
  data () {
    return {
      sm1:false
    };
  },

  components: {},

  methods: {
    submitMsg:function(){
      this.$emit('isClick', "你好");
    },
    myclick:function(){
      console.log("clickis Me")
    }
  }
}

</script>
<style>
    
  .btn_login{
      display: block;
      width:282px;
      height:54px;
      background: #70b6bc;
      color:white;
      line-height: 54px;
      font-size:22px;
      margin-top:40px;
      border-radius: 4px; 
    }

    .btn_login:active,.btn_login:hover{
      background: #4da2ad;
      color:white;
    }
    .btn_login:focus{
      color:white;      
    }
    .sm{
      width:114px;
    }
</style>