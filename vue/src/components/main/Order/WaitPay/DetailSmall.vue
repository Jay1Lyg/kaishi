<template>
	 
      <ul class="detailMsgs">
        <li>
            <div class="msgTop">
                <ul class="msgTopFloat">
                  <li class="msgTopWidth">
                    <img src="../../../../assets/uppic.png"/>
                    <div>
                      <p>fadfasfadsfdfadfdfadsfasdfads</p>
                      <p class="fontColor">口味：麻辣</p>
                    </div>
                  </li>
                  <li style="line-height:100px">X2</li>
                  <li style="line-height:100px">45.00</li>
                </ul>
            </div>
        </li>
      </ul>
  
</template>
<script>
export default {
  name:'DetailSmall',
  data () {
    return {
    
    };
  },
  components: {},

  methods: {}
}

</script>
<style>
.detailTwos .detailMsgs{
  width:551px;
}

.msgTop{
  width:550px;
  height:100px;
}
.msgTop{
  border-bottom:1px solid #ddd;
}
.msgTopFloat .msgTopWidth{
  width:305px;
}
.msgTopFloat li{
  float:left;
  width:122px;
}

.msgTopWidth{
  overflow:hidden;
}
.msgTopWidth img,
.msgTopWidth div{
  float:left;
}

.msgTopWidth img{
  margin:25px 10px 0 0;
}
.msgTopWidth div{
  margin:-35px 0 0 45px;
  line-height:30px;
}
</style>