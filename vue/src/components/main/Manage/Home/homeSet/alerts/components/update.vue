<template>
<div class="updates" style="">
  <!--       上下移动的先去掉-->
    <i class="updateImg_home move_top_home"
      @click="clickCoin(1)"
      @mouseenter="mouserEnter(1)"
      @mouseleave="mouseout(1)">
      <i 
        v-bind:class="{updateImg_home:h1,changeColor_home:h1}"  
        class=" move_top_home"
      ></i>
    </i>
    <i class="updateImg_home move_bottom"
      @click="clickCoin(2)" 
      @mouseenter="mouserEnter(2)"
      @mouseleave="mouseout(2)">
      <i
        v-bind:class="{updateImg_home:h2, changeColor_home:h2}"
        class="move_bottom">
      </i>
    </i>
</div>
</template>

<script>
export default {
  name:'update',
  data () {
    return {
        h1:false,
        h2:false,
        h3:false,
        h4:false
    };
  },

  components: {},

  methods: {
    move_top_home:function(e,index){
      console.log(e.target)
      console.log(index)
    },
    mouserEnter:function(index){
     switch(index)
      {
        case 1:this.h1=true
          break;
        case 2:this.h2=true
          break;
        case 3:this.h3=true
          break;
        default:this.h4=true
      }
    },
    mouseout:function(index){
     switch(index)
      {
        case 1:this.h1=false
          break;
        case 2:this.h2=false
          break;
        case 3:this.h3=false
          break;
        default:this.h4=false
      }
    },
    
    //单击事件
    clickCoin:function(index){
      var that = this;
       switch(index)
      {
        case 1:
          that.$emit('updateFirst',1);                  
          break;
        case 2:
          that.$emit('updateFirst',2);          
          break;
        case 3:
          that.$emit('updateFirst',3);
          break;
        default:
          that.$emit('updateFirst',4);        
      }
    }
  }
}

</script>
<style>
/* 四个小图标 */
.updates{
  display:flex;
  justify-content: center;
}
.updateImg_home{
  overflow: hidden;
  display: inline-block;
  margin:8px;
  margin-top:10px;  
  width:28px;
  height:27px;
  background:  url(../../../../../../../assets/four.png) no-repeat border-box;
}
.updates .move_top_home{
  background-position: -48px 1px;
}

.updates .move_bottom{
  background-position: -48px 2px;
}
.updates .update{
  background-position: 3px 2px;
}

.updates .delete{
  background-position: -22px 2px;
}

.updates>.move_top_home{
  transform: rotate(180deg);
}

.changeColor_home{
    color:#86bfc6;
    overflow: hidden;
    position: relative;
    left: -35px;
    top:-10px;  
    border-right: 0px solid transparent;
    -webkit-filter: drop-shadow(28px 0);
    filter: drop-shadow(28px 0); 
    z-index: 10;
}
</style>