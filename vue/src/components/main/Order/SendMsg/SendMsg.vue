<template>
<p @click='diyfun'> SendMsg </p>
</template>

<script>
import {myfun} from '../../../../assets/js/KDNWidget.js'
export default {
  name:'SendMsg',
  data () {
    return {
    };
  },

  components: {},

  methods: {
  	diyfun:function(){
  		//KDNWidget.run({
	        //"serviceType": "C",
	   // });
	   myfun();
  		
  	}
  }
}

</script>
<style scoped>
@import "../../../../assets/css/KDNWidget.css"
</style>