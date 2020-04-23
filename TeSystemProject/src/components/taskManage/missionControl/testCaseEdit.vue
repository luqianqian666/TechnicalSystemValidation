<template>
    <div style="max-width: 1024px;text-align:center;margin:0 auto">
       
        <el-tabs v-model="activeName" @tab-click="handleClick" class="editTabs">
            <el-tab-pane label="基本信息" name="first">
                 <div id="caseInfo">
        <el-row>
        <el-col :span="3" class="col-style"><span>任务编号</span></el-col>
                <el-col :span="21"><el-input v-model="caseAbout.code"  placeholder="任务编号不可修改" disabled></el-input></el-col>

        </el-row>
                <br>

    <el-row>
        <el-col :span="3">
             <el-col ><div class="col-style"><span>任务名称</span></div></el-col>
        </el-col>
        <el-col :span="21">
            <div class="grid-content bg-purple">
                <el-input v-model="caseAbout.name" placeholder="请输入测试用例名称"></el-input>
            </div>
        </el-col>
 </el-row>
        <br>
 <el-row>
         <el-col :span="3">
             <el-col ><div class="col-style"><span>任务阶段</span></div></el-col>
        </el-col>
        <el-col :span="21">
            <div class="grid-content bg-purple">
                <el-input v-model="caseAbout.peried" placeholder="请输入任务所处阶段"></el-input>
            </div>
        </el-col>

         <br>
    </el-row>
     <br>


    <el-row >
      
        <el-col :span="3" ><div class="col-style" ><span>任务状态</span></div></el-col>
       
        <el-col :span="5">
            <el-select v-model="caseAbout.status"  style="width: 224px;">
                <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>

         <el-col :span="3" class="col-style">开始时间</el-col>
            <el-col :span="5">
                <el-date-picker
                    v-model="caseAbout.startingTime"
                    type="datetime"
                    style="width: 100%"
                    value-format="yyyy-MM-ddTHH:mm:ss"
                    placeholder="选择开始时间">
                </el-date-picker>
            </el-col>
            <el-col :span="3"  class="col-style">结束时间</el-col>
            <el-col :span="5">
                <!-- <el-input v-model="caseInfo.endTime" placeholder="测试目的"></el-input> -->
                <el-date-picker
                    v-model="caseAbout.enddingTime"
                    type="datetime"
                    style="width: 100%"
                    value-format="yyyy-MM-ddTHH:mm:ss"
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-col>
    </el-row>
    <br>
    <span style="float: right">
        <el-button @click="saveCaseBaseInfo">
            <i class="el-icon-edit"></i>保存
        </el-button>
    </span><br><br>
    </div>
            </el-tab-pane>
           
        </el-tabs>
      
    </div>
</template>

<script>
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'

import {Message} from 'element-ui'

  export default {
    data() {
      return {
          activeName: 'first',
          caseId: null,
          caseAbout:[],
          status:'InterfaceContractInfo.InterfaceContractName',
          activityId: null,
           statusList: [
            {label: "框架验证", value: "框架验证"},
            {label: "元数据验证", value: "元数据验证"},
            {label: "接口验证", value: "接口验证"}
          
        ],
      }
    },
    components: {testCaseNavBar},
    methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },


        saveCaseBaseInfo() {
            this.caseAbout.activityId = this.activityId;
            this.caseInfo.code = this.caseAbout.code;
            var cases = {
                caseAbout: this.caseAbout,
                caseInfo: this.caseInfo,
                requirementIdList: this.requirementList
            };
            this.$axios.post('/case/addCase', cases).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.caseAbout = resp.data.obj.caseAbout;
                        this.caseInfo = resp.data.obj.caseInfo;
                        this.requirementList = resp.data.obj.requirementIdList;
                        this.$emit('sendCaseId', this.caseAbout.id);
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
     
      if(this.$route.params.testCase != null) {
        
          this.caseId = this.$route.params.testCase[0].code;
        
          this.caseAbout = this.$route.params.testCase[0];
        
          console.log( this.caseAbout );
         
      }
     
    }
  }
</script>
<style scoped>


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

 .el-row {
    margin-bottom: 10px;
    margin-top: 10px;
   
  }

.col-style{
    line-height: 40px;
}
</style>