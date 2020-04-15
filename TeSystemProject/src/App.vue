<template>
  <div id="app">
    <logo></logo>
    <!--<headBar></headBar>  -->
    <!-- <p>{{message}}</p>
    <input v-model="message">
    <firstcomponent></firstcomponent> -->
    <!-- <router-link to="/first">dinji1</router-link>
    <router-link to="/second">dinji2</router-link> -->
    <router-view class="view"></router-view> 
  </div>

  
</template>

<script>

import logo from '@/components/logo'
import headBar from '@/components/headBar'


export default {
  name: 'App',
  data() {
    return{
      message: 'ceshi'
    }
  },
  components: { logo,headBar}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2e2e2e; */
  margin-top: 0;
  width: 100%;
  height: 100%;
}
/* html,body{
  height: 100
} */
</style>
