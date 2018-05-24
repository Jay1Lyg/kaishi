<template>
<div>
  <p>this is BuyerView</p>
  <ul>
      <li>  <a href="#/WaitView"> WaitView</a></li>
      <li>  <a href="#/GoodView"> GoodView</a></li>
      <li>  <a href="#/MidView"> MidView</a></li>
      <li>  <a href="#/BadView"> BadView</a></li>
  </ul>
  <router-view/>
</div>

</template>

<script>
export default {
  name:'BuyerView',
  data () {
    return {
    };
  },

  components: {},

  methods: {}
}

</script>
<style>
</style>