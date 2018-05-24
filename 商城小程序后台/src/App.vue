<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 	SimHei,'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
}
.lf{
  float:left;
}
.rt{
  float:right;
}
.bd{
  border:1px solid red;
}
.logo{
    width:150px;
    height:54px;
    position: relative;
    margin-top:15px;
}
ul,li,p{
    padding:0;
    margin:0;
    list-style:none;
}
a{
   text-decoration: none;
   color:#6b6b6b;
   font-size:14px;
}
a:hover{
  color:#86bfc6;
}

a:focus{
  color:#4da2ad;
}
</style>
