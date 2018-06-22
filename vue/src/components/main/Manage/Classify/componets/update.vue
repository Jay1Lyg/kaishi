<template>
<div class="updates" >
  <!--   @mouseenter="mouserEnter(1)"    @mouseenter="mouserEnter(2)" 上下移动的先去掉-->
    <i class="updateImg move_top" @click="clickCoin(1)"  @mouseleave="mouseout(1)"><i v-bind:class="{updateImg:h1,changeColor:h1}"  
      class=" move_top"></i></i>
    <i class="updateImg move_bottom" @click="clickCoin(2)"  @mouseleave="mouseout(2)"><i v-bind:class="{updateImg:h2, changeColor:h2}" class=" move_bottom"></i></i>
    <i class="updateImg update" @click="clickCoin(3)" @mouseenter="mouserEnter(3)" @mouseleave="mouseout(3)"><i  v-bind:class="{updateImg:h3,changeColor:h3}"  class="update"></i></i>
    <i class="updateImg delete" @click="clickCoin(4)" @mouseenter="mouserEnter(4)"  @mouseleave="mouseout(4)"><i  v-bind:class="{updateImg:h4,changeColor:h4}"  class="delete "></i></i>
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
    move_top:function(e,index){
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
.updateImg{
  overflow: hidden;
  display: inline-block;
  margin:8px;
  margin-top:18px;  
  width:28px;
  height:28px;
  background:  url(../../../../../assets/four.png) no-repeat border-box;
}
.updates .move_top{
  background-position: -48px 0px;
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

.updates>.move_top{
  transform: rotate(180deg);
}

.changeColor{
    color:#86bfc6;
    overflow: hidden;
    position: relative;
    left: -36px;
    top:-18px;  
    border-right: 0px solid transparent;
    -webkit-filter: drop-shadow(28px 0);
    filter: drop-shadow(28px 0); 
    z-index: 10;
}
</style>