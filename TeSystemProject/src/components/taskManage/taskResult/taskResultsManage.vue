<template>
<div>       
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" @click="validationPerformed" >验证执行</el-menu-item>
   <el-menu-item index="2" @click="missionControl" >验证任务监控</el-menu-item>
  <el-menu-item index="3" @click="gotoTaskResultList">验证结果管理</el-menu-item>
  <el-menu-item index="4"  @click="gotoTaskConfig">验证配置</el-menu-item>
   <el-menu-item index="5" @click="gotoTaskManage"> 验证床管理</el-menu-item>
</el-menu>
 
</div>
</template>

<script>
import logo from '@/components/logo'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
import leftBar from '@/components/leftBar'
import {Message} from 'element-ui'
  export default {
    data() {
      return {
        activeIndex: '1',
       
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      validationPerformed() {
          alert("ok");
          this.$router.push("/taskBaseInfo");
      
   
      },
      missionControl() {  
        let vm=this;   
        vm.$router.push("/missionControlInfo");
      },
       gotoTaskResultList() {
         
        
        this.$router.push("/taskResultsManage")
       
      },
         gotoTaskConfig() {
          this.$store.state.activityId=5;
        this.$router.push("/logo")
       
      },
      gotoTaskManage() {
        
       
      },
    },
     
     components: { logo,testCaseNavBar},
  }
</script>
<style scoped>
.activity-name{
 line-height: 100%;
 text-align:left;
 font-size:initial;
 font-family: inherit;
 vertical-align: middle;
 white-space: pre-line; 
}
/* 导航栏选择测试活动必须样式 */
.el-menu-demo /deep/  {
  background-color: inherit;
  border: 0;
}
/*.el-menu-item{
padding:0 20px 0 0px;
}*/

.el-menu-demo .el-input {
  font-size: large;
  font-weight: bold;
  width: 30em;
  left: 0;
  
}
.el-menu.el-menu--horizontal {
  border: 0;
}


</style>
