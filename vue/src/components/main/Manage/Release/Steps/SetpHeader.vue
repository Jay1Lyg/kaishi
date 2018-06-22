<template>
<div class="textCenter">
  <div class="StepHeader">
    <img class="setHeadImg"  v-bind:class="{show:step==1}" src="../../../../../assets/step_one.png" alt="">
    <img class="setHeadImg"  v-bind:class="{show:step==2}" src="../../../../../assets/step_two.png" alt="">
    <img class="setHeadImg"  v-bind:class="{show:step==3}" src="../../../../../assets/step_three.png" alt="">
  </div>
</div>
</template>

<script>
export default {
  name:'SetpHeader',
  data () {
    return {
      src:'../../../../../assets/',
    };
  },
  props:{
    step:Number
  },
  components: {},

  methods: {}
}

</script>
<style>
.show{
  z-index: 100;
}
.textCenter{
  width:100%;
  margin-left: auto;
  margin-right: auto;
}
  .StepHeader{
    display: inline-block;
    width:822px;
    height:100px;
    margin-top:20px;
    margin-bottom:80px;
    position:relative;
  }
  .setHeadImg{
    position:absolute;
    left:0;
  }
</style>