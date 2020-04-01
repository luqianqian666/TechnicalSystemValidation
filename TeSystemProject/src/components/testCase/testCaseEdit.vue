<template>
    <div>
        <el-row type="flex">
            <el-col :span="4">
                <div class="pageTitle">
                    <span>测试用例<span v-if="confirm == false">编辑</span>
                    <span v-else>确认</span></span>
                </div>
            </el-col>
            <el-col :span="17">
                <div v-if="caseAbout !== null">
                    <span style="float: left; font-size: small">{{caseAbout.code}}</span><br>
                    <span style="float: left; font-size: medium">{{caseAbout.name}}</span>
                </div>
            </el-col>
            <el-col :span="2"  class="button-align">
                <el-button clas type="pirmary" @click="changeCaseStatusForReview" v-if="caseId != null" size="medium">提交审核</el-button>
            </el-col>
            <el-col :span="2"  class="button-align">
                <el-button clas type="danger" @click="deleteCase" v-if="caseId != null" size="medium">删除该用例</el-button>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="editTabs">
            <el-tab-pane label="基本信息" name="first">
                <testCaseInfo v-bind:caseId="caseId" v-bind:activityId="activityId" @sendCaseId="getCaseId"></testCaseInfo>
            </el-tab-pane>
            <el-tab-pane label="参试软件及测试环境" name="second">
                <testSoftwareAndEnviroment v-bind:caseId="caseId"></testSoftwareAndEnviroment><br>
                <toolSoftware v-bind:caseId="caseId"></toolSoftware>
            </el-tab-pane>
            <el-tab-pane label="用例步骤" name="third"><br>
                <caseProcedure v-bind:caseId="caseId"></caseProcedure>
            </el-tab-pane>
        </el-tabs>
        <div v-if="confirm == true">
          <span>
            <i class="el-icon-check font" style="color:#67C23A" title="通过并启用" @click="confirmCase(caseId, '未执行')"></i>
            <i class="el-icon-close font margin-left" style="color:#F56C6C" title="不通过" @click="confirmCase(caseId, '未填写')"></i>
          </span>
        </div>
    </div>
</template>

<script>
import testCaseInfo from '@/components/testCase/testCaseInfo'
import testSoftwareAndEnviroment from '@/components/testCase/testSoftwareAndEnviroment'
import toolSoftware from '@/components/testCase/toolSoftware'
import caseProcedure from '@/components/testCase/caseProcedure'
import {Message} from 'element-ui'

  export default {
    data() {
      return {
          activeName: 'first',
          caseId: null,
          caseAbout:null,
          caseInfo:null,
          confirm: false, //用来区分新建用例和确认用例
          activityId: null
      }
    },
    components: {testCaseInfo, testSoftwareAndEnviroment, toolSoftware, caseProcedure},
    methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        getCaseId(data) {
          this.caseId = data;
        },
        confirmCase(id, msg) {
          this.$axios.post('/case/confirmCase', this.qs.stringify({caseId: id, status: msg, activityId: this.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        Message.success({message: resp.data.msg});
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
        },
        deleteCase() {
            if(this.caseId == null) {
                Message.error({message: '未选择用例'})
                return
            }
            this.$axios.post('/case/deleteCase', this.qs.stringify({id: this.caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.$router.push("/testCaseManage")
                        Message.success({message: resp.data.msg});
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
        },
        changeCaseStatusForReview() {
            if(this.caseId == null) {
                Message.error({message: '未选择用例'})
                return
            }
            this.$axios.post('/case/changeCaseStatusForReview', this.qs.stringify({id: this.caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.$router.push("/testCaseManage")
                        Message.success({message: resp.data.msg});
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
    },
    created() {
      // console.log(this.$route.params)
      this.activityId = this.$store.state.activityId;
      if(this.$route.params.testCase != null) {
          this.caseId = this.$route.params.testCase.id;
          this.caseAbout = this.$route.params.testCase;
          if(this.$route.params.caseInfo != null){
              this.caseInfo = this.$route.params.caseInfo;
          }
          this.activityId = this.$route.params.testCase.activityId;
      }
      if(this.$route.params.confirmTestCase != null) {
          this.caseId = this.$route.params.confirmTestCase.id;
          this.testCase = this.$route.params.confirmTestCase;
          if(this.$route.params.confirmTestCase.activityId !== undefined)
              this.activityId = this.$route.params.confirmTestCase.activityId;
          else
              this.activityId = this.$route.params.confirmTestCase.activity_id;
          this.confirm = true;
      }
    }
  }
</script>
<style scoped>
.pageTitle{
        font-size: x-large;
        font-weight: bold;
        float: left;
    }

  .button-align{
      text-align: right;
      line-height: 200%;
  }
  .font{
      font-size: xx-large
  }
  .margin-left{
      margin-left:6%
  }
</style>