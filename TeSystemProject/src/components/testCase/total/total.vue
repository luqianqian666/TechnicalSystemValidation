<template>
    <div v-if="activity !== null">
        <span class="PageTitle">测试活动总览</span><br><br><br><br>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-row>
                    <el-col :span="24"><div class="top" style="min-height: 100px">
                        <timeProcess v-bind:planStart="planStart" 
                          v-bind:realStart="realStart"
                          v-bind:complete="complete"
                          v-bind:planEnd="planEnd">
                        </timeProcess>
                    </div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                      <div>
                        <user v-bind:res='res' v-bind:users='users'></user>
                      </div>
                    </el-col>
                </el-row>
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <span>已执行用例数：</span>
                      <el-button type="text" class="status-content"><span>{{testCaseNums}}</span></el-button>
                      <span>/{{totalTestCaseNums}}</span>
                    </el-col>
                    <el-col :span="12">
                      <span>已经过时间：</span>
                      <el-button type="text" class="status-content"><span>{{sparedTime}}</span></el-button>
                      <span>/{{totalTime}}天</span>
                    </el-col>
                  </el-row>
                   <el-divider></el-divider>
                  <el-row>
                    <el-col :span="12">
                      <span>已解决问题数：</span>
                      <el-button type="text" class="status-content"><span>{{solvedProblems}}</span></el-button>
                      <span>/{{totalProblems}}</span>
                    </el-col>
                  </el-row>
                </el-card>
            </el-col>
            
            <el-col :span="4">
                <!-- <el-autocomplete
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect">
                    <i
                        class="el-icon-search el-input__icon"
                        slot="suffix"
                        @click="handleIconClick">
                    </i>
                </el-autocomplete> -->
           </el-col>
        </el-row><br><br>
        <testCaseTable v-bind:testCaseNums="testCaseNums" v-bind:totalTestCaseNums="totalTestCaseNums"></testCaseTable>
        <br><br>
        <problemTable v-bind:solvedNums="solvedProblems" v-bind:totalProblemNums="totalProblems"></problemTable>
    </div>
</template>

<script>
import user from '@/components/testCase/total/user'
import testCaseTable from '@/components/testCase/total/testCaseTable'
import problemTable from '@/components/testCase/total/problemTable'
import timeProcess from '@/components/testCase/total/timeProcess'

export default {
    data() {
        return {
            res: [
                {id: '1', name: '中科院电子学研究所'}
            ],
            users: [
                {id: '1', name: '中科院电子学研究所'},
                {id: '2', name: '中科院网络信息中心'}
            ],
            sparedTime: '3',
            totalTime: '150',
            solvedProblems: '',
            totalProblems: '',
            testCaseNums: '',
            totalTestCaseNums: '',
            planStart: '',
            realStart: '',
            complete: '07/30 30/50',
            planEnd: '',
            activity: null
        }
    },
    components: {user, testCaseTable, problemTable, timeProcess},
    created() {
      this.getActivity();
      this.getActivityTotalInfo();
    },
    methods: {
      getCurrentDate() {
        var newDate = new Date();
        var MM = newDate.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        var d = newDate.getDate();
        d = d < 10 ? ('0' + d) : d;
        return newDate.getFullYear() + '-' + MM + '-' + d;
      },
      getDaysByDateString(dateString1,dateString2){
            var  startDate=Date.parse(dateString1.replace('/-/g','/'));  
            var  endDate=Date.parse(dateString2.replace('/-/g','/')); 
            var diffDate=(endDate-startDate)+1*24*60*60*1000;  
            var days=Math.floor(diffDate/(1*24*60*60*1000));  
            return  days;  
        },
      getActivity() {
        this.$axios.post('/activity/getActivityById',this.qs.stringify({id: this.$store.state.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            }).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.activity = resp.data.obj;
                        var planStartingTime = this.activity.planStartingTime;
                        var startingTime = this.activity.startingTime;
                        var planEndTime = this.activity.planEndTime;
                        this.planStart = planStartingTime == null ? null:planStartingTime.split(" ")[0];
                        this.realStart = startingTime == null ? null:startingTime.split(" ")[0];
                        this.planEnd = planEndTime == null ? null:planEndTime.split(" ")[0];
                        var organization = this.activity.organization;
                        var member = this.activity.member;
                        this.res = organization.substring(0, organization.lastIndexOf('*')).split("*")
                        this.users = member.substring(0, member.lastIndexOf('*')).split("*")
                        if(planStartingTime != null && planEndTime != null) {
                            this.totalTime = this.getDaysByDateString(planStartingTime, planEndTime)
                            var date = this.getCurrentDate();
                            this.sparedTime = date <= planStartingTime ? 0:this.getDaysByDateString(planStartingTime, date)
                        }
                        // console.log(resp.data.obj)
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
      getActivityTotalInfo() {
          this.$axios.post('/activity/getActivityTotalInfo',this.qs.stringify({id: this.$store.state.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            }).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.solvedProblems = resp.data.obj.solvedProblems
                        this.totalProblems = resp.data.obj.totalProblems
                        this.testCaseNums = resp.data.obj.completeCase
                        this.totalTestCaseNums = resp.data.obj.totalCase
                        this.complete = this.getCurrentDate() + " " + this.testCaseNums + "/" + this.totalTestCaseNums;
                        // console.log(resp.data.obj)
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
<style scope>
    .PageTitle {
        font-size: x-large;
        font-weight: bold;
        float: left;
    }
    .status-content{
      font-size: medium;
    }
</style>