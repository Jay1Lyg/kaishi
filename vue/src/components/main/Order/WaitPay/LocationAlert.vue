<template>
	<ul>
		 <li class="location">
          <div class="locationImg" @mouseover="onMouseOver" @mouseout="onMouseOut" ></div> 
          <div class="showLocation" v-if="isShowing">
            <b></b>
            <div style="line-height:20px;">
              <p>{{address}}</p>
              <p style="margin-top:10px;">{{userName}}<span style="margin-left:40px;">{{userTel}}</span></p>
            </div>
          </div>
        </li>
    </ul>
</template>

<script>
export default {
  name:'LocationAlert',
  data () {
    return {
      address:"北京市朝阳区 朝阳北路 定福庄 金星小区6号楼6单元600",
      userName:"唐小鸭",
      userTel:"151515151515",
      isShowing:false
    };
  },

  components: {},
  mounted(){
  
  },
  methods: {
	  onMouseOver:function(){
      this.isShowing=true;
    },
    onMouseOut:function(){
      this.isShowing=false;
    }
  }
}

</script>
<style>
.showLocation{
  width:310px;
  z-index:30;
  height:200px;
  position:absolute;
  top:85px;
  left:-186px;
}
body .showLocation b{
  width:0px;
  height:0px;
  display:block;
  position:absolute;
  top:-33px;
  right:39px;
  z-index:200;
  border:22px solid transparent;
  border-bottom: 22px solid #fff;
}
body .showLocation div{
 width:290px;
 position:absolute;
 text-align:left;
 padding:10px;
 box-sizing:border-box;
 border-radius:4px;
 background:#fff;
 box-shadow:#4da2ad 0px 0px 30px 5px;
}
</style>