<template>
  <div class="testRecord">
      <span class="pageTitle">测试记录</span><br><br>
      <el-tabs v-model="activeName">
            <el-tab-pane label="录入测试记录" name="first">
                <enterTestRecord v-bind:testCaseGet="testCaseGet"></enterTestRecord>
            </el-tab-pane>

            <el-tab-pane label="测试用例执行结果审核" name="second">

                <testCaseTable @getTestCase="getTestCase" v-bind:testCase="testCase"></testCaseTable>
                <br><br>
                <procedureTable v-bind:procedures="procedures" v-bind:spanArr="spanArr" @getNewProcedureRecord="getNewProcedureRecord"></procedureTable>
                <el-row v-if="this.case != null">
                  <el-col :span="13">
                      <span style="float:left">测试用例结论：
                        <el-button size="medium" type="success" plain @click="checkCaseConclusion('通过')">通过</el-button>
                        <el-button size="medium" type="danger" plain @click="checkCaseConclusion('不通过')">不通过</el-button>
                        <el-button size="medium" type="info" plain @click="checkCaseConclusion('不具备测试条件')">不具备测试条件</el-button>
                      </span>
                  </el-col>
                  <el-col :offset="2" :span="4">
                      <span style="float:right">
                          <el-button @click="gotoCreateProblem"><span><i class="el-icon-edit"></i>新建问题</span></el-button>&nbsp;
                      </span>
                  </el-col>
                  <el-col  :span="5">
                      <span style="float:right">
                          <el-button @click="createRegressionCase"><i class="el-icon-close"></i>创建回归测试用例</el-button>&nbsp;
                      </span>
                  </el-col>
                </el-row>
            </el-tab-pane>
      </el-tabs>
  </div>
</template>


<script>
import testCaseTable from '@/components/testCase/testRecord/testCaseTable'
import procedureTable from '@/components/testCase/testRecord/procedureTable'
import procedureResultInfo from '@/components/testCase/testRecord/procedureResultInfo'
import enterTestRecord from '@/components/testCase/testRecord/enterTestRecord'
import {Message} from 'element-ui'

  export default {
    data() {
      return {
        activeName: 'first',
        procedures: [],
        spanArr: [],
        pos: null,
        testCase: null,
        testCaseGet: null,
        case: null
      }
    },
    props: [],
    components: {testCaseTable, procedureTable, procedureResultInfo, enterTestRecord},
    created() {
      if(this.$route.params.testCase != null) {
          this.activeName = 'second';
          this.testCase = this.$route.params.testCase;
      }
      if(this.$route.params.testRecord != null) {
          this.testCaseGet = this.$route.params.testRecord;
      }
    },
    methods: {
       //检查用例的结论
      checkCaseConclusion(status){
          if(this.case.status == '未执行' || this.case.status == '进行中'){
            this.$confirm('该用例存在未录入/待确认测试记录的测试步骤，是否仍然修改用例的结论？','提示',{
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
            this.updateCaseConclusion(status)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            });          
          });
          }else{
            this.updateCaseConclusion(status)
          }

      },
      //修改测试用例结论
      updateCaseConclusion(status){
          console.log(this.case);
          this.$axios.post('/case/updateCaseConclusion',this.qs.stringify({caseId:this.case.id,targetStatus:status,activityId:this.$store.state.activityId}),
                    {
                      header: {
                          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                      }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        Message.success({message: resp.data.msg})
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
      getTestCase(data) {
          this.case = data;
          this.spanArr=[];
          this.pos = null;
          this.$axios.post('/case/findCaseStepRecord',this.qs.stringify({caseId: data.id}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            }).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.procedures = resp.data.obj;
                        this.getSpanArr(this.procedures)
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
      //用于表格合并行
        getSpanArr(data) {　
            for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0
                    } else {
                    // 判断当前元素与上一个元素是否相同
                if (data[i].caseStepInfo.id === data[i - 1].caseStepInfo.id) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
              }
            
          },
      getNewProcedureRecord(data) {
          var obj={
            id:data
          }
          this.getTestCase(this.case);
      },
      gotoCreateProblem() {
        if(this.case != null) {
            this.$router.push({name:'testProblemEdit', params:{case: this.case}})
        } else {
            Message.error({message: '请先选择测试用例'})
        }
      },
        createRegressionCase(){
          var caseId;

          if(this.case != null) {
            caseId=this.case.id
            console.log(caseId)
        } else {
            Message.error({message: '请先选择测试用例'})
            return;
        }
            this.$axios.post('/case/addRegressionCase', this.qs.stringify({caseId: caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.$router.push({name:'testCaseEdit', params:{testCase: data.obj.caseAbout,caseInfo: data.obj.caseInfo}})
                        Message.success({message: resp.data.msg})
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
  };
</script>

<style>
  .pageTitle{
    font-size: x-large;
    font-weight: bold;
    float: left;
  }
  .testRecordTitle {
    font-size: small;
  }
  .testRecord /deep/ .el-tabs__nav-wrap {
    width: fit-content;
  }

</style>