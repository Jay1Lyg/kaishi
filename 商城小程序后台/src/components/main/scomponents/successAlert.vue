<template>
<div>
    <div class="cover_out">
    </div>
    <div class="out_height">
      <div class="success_alert">
        <img class="success_png" src="../.././../assets/success.png" alt="">
        <p>{{showMsg}}</p>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name:'successAlert',
  data () {
    return {

    };
  },
  props:["showMsg"],
  components: {},
  methods: {}
}

</script>
<style>
.cover_out{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background: #000;
  opacity: .2;
  z-index: 1000;
}
.out_height{
  position: fixed;
  top:340px;
  width:100%;
  text-align:center;
  height:500px;
   z-index:9999;
  
}
.success_alert{
   display: inline-block;
   z-index:9999;
   position: relative;
   left:0;
   right:0;
   width:400px;
   height:236px;
   background:#fff;
   border-radius:4px;
   box-shadow: 4px 4px 50px #4da2ad;
   color:#333;
   font-size: 18px;
   text-align:center;
}
.success_png{
  margin-top:68px;
}
.success_alert p{
  margin-top:20px;
}
</style>