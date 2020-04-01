<template>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @open="handleOpen"
      @close="handleClose"
      font-weight="bold"
      background-color="#F2F6FC">

      <el-menu-item index="1" id="activityNameinNav">
        <el-cascader
          v-model="value"
          :options="options"
          :show-all-levels="false"
          @change="handleChange"></el-cascader>
      </el-menu-item>

      <el-menu-item index="2" @click="gotoTaskList">
          我的任务
      </el-menu-item>

      <el-submenu index="4">
        <template slot="title">
          测试需求
        </template>
        <el-menu-item index="4-1" @click="gotoRequirementSearch">需求项检索</el-menu-item>
        <el-menu-item index="4-2" @click="gotoRequirementEdit">需求项录入</el-menu-item>
        <el-menu-item index="4-3" @click="gotoRequirementTrace">需求追踪</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          测试过程
        </template>
        <el-menu-item index="5-1" @click="gotoTestCaseManage">测试用例</el-menu-item>
        <el-menu-item index="5-2" @click="gotoTestCaseRecord">测试记录</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          测试结果
        </template>
        <el-menu-item index="6-1" @click="gotoTestProblemView">测试问题</el-menu-item>
        <el-menu-item index="6-2" @click="gotoTestReport">测试报告</el-menu-item>
        <el-menu-item index="6-3" @click="gotoSoftwareChange">软件变更</el-menu-item>
      </el-submenu>
      
      <el-submenu index="7">
        <template slot="title">
          信息管理
        </template>
        <el-menu-item index="7-1" @click="gotoHardwareInfoManage">硬件信息管理</el-menu-item>
        <el-menu-item index="7-2" @click="gotoSoftwareInfoManage">软件信息管理</el-menu-item>
        <el-menu-item index="7-3" @click="gotoDataInfoSearch">数据信息管理</el-menu-item>
        <el-menu-item index="7-4" @click="gotoUserInfoSearch">用户信息管理</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          测试活动
        </template>
        <el-menu-item index="3-1" @click="gotoTestActivityManage">测试活动树</el-menu-item>
        <!-- <el-menu-item index="3-2" @click="gotoTotal">测试活动总览</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="8" @click="gotoDataSimulation">
        数传数据模拟
      </el-menu-item>

      <el-menu-item index="9" @click="gotoEnvironmentSimulation">
        运行环境模拟
      </el-menu-item>

      <el-menu-item index="10">
        系统效益展示
      </el-menu-item>

    </el-menu>
</template>

<script>
import logo from '@/components/logo'
import {Message} from 'element-ui'
export default {
  name: 'App',
  data() {
      return {
          value: [],
          options: [],
      }
  },
  components: {logo},
  created() {
    this.getActivityTree();
    this.value.push(this.$store.state.satellite)
    this.value.push(this.$store.state.activityId+'*'+this.$store.state.activityName)
  },
  methods: {
      handleChange(value) {
        // console.log(value[0]);
        var idName=value[1].split('*')
        value[1]=idName[0];
        value[2]=idName[1];
        console.log(value[1]);
        console.log(value[2]);
        this.$store.commit('changeActivity', value);
        this.$router.go(0)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      gotoTestPlanAndManage() {
        this.$router.push("/testPlanAndManage")
      },
      gotoTestCaseEdit() {
        this.$router.push("/testCaseEdit")
        // this.$router.replace("/testCaseEdit")
      },
      gotoTotal() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/total")
      },
      gotoTestCaseRecord() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/testRecord")
      },
      gotoEditTestPlan() {
        this.$router.push("/editTestPlan")
      },
      gotoRequirementSearch() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/requirementSearch")
      },
      gotoRequirementEdit() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/requirementEdit")
      },
      gotoTestProblemView() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/testProblemView")
      },
      gotoTaskList() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/taskList")
      },
      gotoSoftwareChange() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/softwareChange")
      },
      gotoTestReport() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/testReport")
      },
      gotoTestCaseManage() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/testCaseManage")
      },
      gotoTestActivityManage() {
        this.$router.push("/testActivityManage")
      },
      gotoHardwareInfoManage() {
        this.$router.push("/hardwareInfoList")
      },
      gotoSoftwareInfoManage() {
        this.$router.push("/softwareInfoManage")
      },
      gotoDataInfoSearch() {
        this.$router.push("/dataInfoSearch");
      },
      gotoUserInfoSearch() {
        this.$router.push("/userInfoSearch");
      },
      gotoRequirementTrace() {
        if(this.$store.state.activityId == null) {
          Message.error({message: "请先选择测试活动"})
          return
        }
        this.$router.push("/requirementTrace");
      },
      gotoEnvironmentSimulation() {
        this.$router.push("/environmentSimulation");
      },
      gotoDataSimulation() {
        this.$router.push("/dataSimulation");
      },
      // gotoSoftwareInfoManage() {
      //   this.$router.push("/softwareSearch");
      // },
      getActivityTree() {
        this.$axios.post('/activity/getActivityTreeCascade').then(resp => {                   //请求成功后的处理函数   
            if (resp && resp.status == 200) {
                if(resp.data.status == 200){
                    this.options = resp.data.obj;
                    // Message.success({message: resp.data.msg})
                } else {
                    Message.error({message: resp.data.msg})
                }
            } else {
                console.log(resp.data);
                Message.error({message: resp.data.msg})
            }
        }).catch(err => {                 //请求失败后的处理函数   
            console.log(err)
        })
      }
    }
}
</script>

<style>
.activity-name{
 line-height: 100%;
 text-align:left;
 font-size:initial;
 font-family: inherit;
 vertical-align: middle;
 white-space: pre-line; 
}
/* 导航栏选择测试活动必须样式 */
.el-menu-demo /deep/ .el-input__inner {
  background-color: inherit;
  border: 0;
}
.el-menu-demo .el-input {
  font-size: large;
  font-weight: bold;
  width: 18em;
}

</style>
<style scoped>
.el-menu.el-menu--horizontal {
  border: 0;
}
</style>
