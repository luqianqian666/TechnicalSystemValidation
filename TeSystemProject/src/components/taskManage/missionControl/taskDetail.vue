<template>
    <div style="max-width: 1024px;text-align:center;margin:0 auto">

        <el-container>
                    <el-header><testCaseNavBar></testCaseNavBar> </el-header>
                        <br>
       
         <el-row >
              <div> 
           
                 <div class="panel panel-default">
                  <div class="panel-heading">
                    <div id="filter_box1" class="pull-right">
                        <span class="baseTitle">任务详情</span><br><br>
                        <br>
                </div> </div>
            </div>
           </div>
         </el-row>
        
        <br>
        <detailTable v-bind:tableData="testCases"></detailTable>
        <br>    
        <el-row type="flex">
            <el-col>
                <el-button type="danger" @click="deleteCase" size="medium">删除该任务</el-button>
                <el-button plain @click.native="gotoTestCaseEdit()">编辑任务</el-button>
                <el-button v-if="this.testCases.code  != '未填写' " plain @click.native="gotoTestRecord()">编辑任务明细</el-button>        
            </el-col>
        </el-row>
          </el-container>
    </div>
</template>

<script>

import detailTable from '@/components/taskManage/missionControl/detailTable'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
import {Message} from 'element-ui'

  export default {
    data() {
      return {
          caseId: null,
          testCases: [],      
          peo: []
          
         
      }
    },
    components: {testCaseNavBar,detailTable},
    // watch: {
    //     peo: function(newVal,oldVal){
    //         newVal&& this.saveCaseUser();
    //     }
    // },
    methods: {
        test() {
            console.log(this.peo)
        },

         gotoTestCaseEdit() {
            this.$router.push({name:'testCaseEdit', params:{testCase: this.testCases}})
        },
       

        deleteCase() {
            if(this.caseId == null) {
                Message.error({message: '未选择任务'})
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
                       // this.$router.push("/testCaseManage")
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
        getCaseInfo(id) {
            this.$axios.post('/case/getCaseInfoById', this.qs.stringify({id: id}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.caseInfo = resp.data.obj;
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
      
       
       
        gotoTestRecord() {
            var obj=this.testCases[0];
            if(obj.status === '未填写' || obj.status === '待审核') {
                Message.error({message: "该用例状态为" + obj.status + "，无法添加或查看记录"})
                return
            }
            this.$router.push({name:'testRecord', params:{testRecord: obj}})
        },
      
      
       
    },
    created() {
       // this.changeSelectStatus()
        if(this.$route.params.testCase != null) {
           
            this.testCases.push(this.$route.params.testCase);
            this.caseId = this.$route.params.testCase.code;
           // this.activityId = this.$store.state.activityId;
           
            this.getCaseInfo(this.caseId)
         
           
        }
        
      // console.log(this.$route.params)
    //   this.activityId = this.$store.state.activityId;
    //   if(this.$route.params.testCase != null) {
    //       this.caseId = this.$route.params.testCase.id;
    //       this.activityId = this.$route.params.testCase.activityId;
    //   }
    //   if(this.$route.params.confirmTestCase != null) {
    //       this.caseId = this.$route.params.confirmTestCase.id;
    //       if(this.$route.params.confirmTestCase.activityId !== undefined)
    //           this.activityId = this.$route.params.confirmTestCase.activityId;
    //       else
    //           this.activityId = this.$route.params.confirmTestCase.activity_id;
    //       this.confirm = true;
    //   }
    }
  }
</script>
<style scoped>
.baseTitle {
        font-size: x-large;
        font-weight: bold;
        float: left;
        margin:100px 0 0 100px；
    }

  .button-align{
      text-align: right;
      line-height: 200%;
  }
  
</style>