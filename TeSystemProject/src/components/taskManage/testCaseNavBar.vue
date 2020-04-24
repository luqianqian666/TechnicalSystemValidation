<template>
 <div >
  
     <el-menu
      class="el-menu-demo"
      mode="horizontal"
      font-weight="bold"
      background-color="#F2F6FC"
      :default-active="this.$route.path"
      router
      @select="handleSelect"
      >
       <el-menu-item index="/standardsManageInfo" >
          待测软件管理
      </el-menu-item>
      <el-menu-item index="/"  >
          验证执行
      </el-menu-item>
      <el-menu-item index="/missionControlInfo" >
          验证任务监控
      </el-menu-item>
      <el-menu-item index="/taskResultsManage" >
          验证结果管理
      </el-menu-item>
      <el-menu-item index="4" > 
          验证配置
      </el-menu-item>
      <el-menu-item index="5" >
          验证床管理
      </el-menu-item>
    </el-menu>
  
 </div>

</template>

<script>
import logo from '@/components/logo'
import {Message} from 'element-ui'

export default {
  name: 'App',
  data() {
      return {
          searchString:'',
          activeIndex:'1'
      }
  },
  created () {      
             this.getTaskNameList();
            
        },
  components: {logo},
 
  methods: {

    getTaskNameList()
    {

    },
        handleSelect(key, keyPath) {
       
      
        console.log(key, keyPath);
      },

    }
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

