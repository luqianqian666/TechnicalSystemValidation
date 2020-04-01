<template> 
<div id="headBar">
    <div id="navBar">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#3a3a3a"
            text-color="#fff"
            active-text-color="#ffffff">
        <el-submenu index="1">
            <template slot="title">测试活动总览</template>
            <router-link to="/testActivity"><el-menu-item index="1-1">当前测试活动</el-menu-item></router-link>
            <router-link to="/first"><el-menu-item index="1-2">测试结果分析</el-menu-item></router-link>
            <router-link to="/first"><el-menu-item index="1-3">系统效益展示</el-menu-item></router-link>
        </el-submenu>
        </el-menu>
    </div>
    <!-- <el-select v-model="value" value-key="id">
          <el-option
            v-for="item in options"
            :label="item.label"
            :key="item.id"
            :value="item">
          </el-option>
        </el-select> -->
   
</div> 
</template> 

<script> 
export default { 
  data() {
   return {
   };
  },
  methods: {
   handleSelect(key, keyPath) {
    console.log(key, keyPath);
   }
  }
}
</script> 

<style scoped>
  /* h1 {
    font-size:35px;
    color: #ffffff;
  }
  #headBar {
    background-color: #3a3a3a;
    height: 80px;
    width: 100%;
  }
  #navBar {
    height: 100%;
    width: 30%;
    color: #000000;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 20px;
    width: 300px;
  }
  .el-menu--horizontal .el-menu .el-menu-item {
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 17px;
    width: 300px;
  }
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
      border-bottom: 0;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  } */
</style>