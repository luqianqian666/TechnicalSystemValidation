<template>
    <div id="caseInfo">
    <el-row>
        <el-col :span="3">
             <el-col ><div class="col-style"><span>用例名称</span></div></el-col>
        </el-col>
        <el-col :span="15">
            <div class="grid-content bg-purple">
                <el-input v-model="caseAbout.name" placeholder="请输入测试用例名称"></el-input>
            </div>
        </el-col>
        <el-col :span="1">
            <div class="bg-purple">
                <div style="font-size: 10px;height: 20px;text-align:center">
                    {{date}}
                </div>
                <div style="font-size: 10px;height: 20px;text-align:center">
                    {{time}}
                </div>
            </div>
        </el-col>
        <el-col :span="2" style="text-align:center;line-height:40px"><span>优先级:</span></el-col>
        <el-col :span="3" style="float:right">
            <div class="grid-content bg-purple" >
                <el-select 
                v-model="caseAbout.priority" 
                style="width:100%">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </el-col>

    </el-row>
    <el-row :gutter="5">
        <el-col :span="3" class="col-style"><span>用例编号</span></el-col>
        <el-col :span="14"><el-input v-model="caseAbout.code"  placeholder="用例编号在保存后自动生成" disabled></el-input></el-col>
        <el-col :span="2" style="text-align:right;line-height:40px"><span>用例类型:</span></el-col>
        <el-col :span="2" style="text-align:center;line-height:40px">
            <el-tag type="info" effect="plain" v-if="caseAbout.regressionMark == 0" >首次</el-tag>
            <el-tag type="warning" effect="plain" v-if="caseAbout.regressionMark == 1">第1次回归</el-tag>
            <el-tag type="danger" effect="plain" v-if="caseAbout.regressionMark == 2">第2次回归</el-tag>
            <el-tag type="danger" effect="dark" v-if="caseAbout.regressionMark == 3">第3次回归</el-tag>
        </el-col>
        <el-col :span="3">
            <el-select v-model="caseAbout.type" style="float: right">
                <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>
    </el-row>

    <el-row :gutter="5">
            <el-col :span="3" class="col-style">开始时间</el-col>
            <el-col :span="8">
                <!-- <el-input v-model="caseInfo.startingTime" placeholder="测试目的"></el-input> -->
                <el-date-picker
                    v-model="caseAbout.startingTime"
                    type="datetime"
                    style="width: 100%"
                    value-format="yyyy-MM-ddTHH:mm:ss"
                    placeholder="选择开始时间">
                </el-date-picker>
            </el-col>
            <el-col :span="3" :offset="2" class="col-style">结束时间</el-col>
            <el-col :span="8">
                <!-- <el-input v-model="caseInfo.endTime" placeholder="测试目的"></el-input> -->
                <el-date-picker
                    v-model="caseAbout.endTime"
                    type="datetime"
                    style="width: 100%"
                    value-format="yyyy-MM-ddTHH:mm:ss"
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-col>
    </el-row>

    <el-row :gutter="5">
            <el-col :span="3" class="col-style">测试目的</el-col>
            <el-col :span="21"><el-input v-model="caseInfo.purpose" placeholder="测试目的"></el-input></el-col>
    </el-row>

    <el-row :gutter="5">
            <el-col :span="3" class="col-style">先决条件</el-col>
            <el-col :span="21"><el-input v-model="caseInfo.prerequisite" placeholder="先决条件"></el-input></el-col>
    </el-row>

    <el-row :gutter="5">
        <el-col :span="3" class="col-style">评价结果准则</el-col>
        <el-col :span="21"><el-input v-model="caseInfo.evaluation" class="inputBox" placeholder="评价结果准则"></el-input></el-col>
    </el-row>

    <el-row :gutter="5">
        <el-col :span="3" class="col-style">假设和约束</el-col>
        <el-col :span="21"><el-input v-model="caseInfo.assumptionAndConstraint" class="inputBox" placeholder="假设和约束"></el-input></el-col>
    </el-row>

    <el-row :gutter="5">
        <el-col :span="3" class="col-style">关联需求</el-col>
        <el-col :span="21" style="float:left">
            <div>
                <el-select v-model="requirementList" multiple filterable collapse-tags style="width:100%">
                    <el-option
                        v-for="item in requirementOptions"
                        :key="item.id"
                        :label="item.content"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </el-col>
    </el-row>

    <span style="float: right">
        <el-button @click="saveCaseBaseInfo">
            <i class="el-icon-edit"></i>保存
        </el-button>
    </span><br><br>
    </div>
</template>

<script>
import {Message} from 'element-ui'
  export default {
    data() {
      return {
          caseAbout: {
              id: null,
              activityId: null,
              code: '',
              name: '',
              software: '',
              startingTime: '',
              endTime: '',
              type: '',
              regressionMark: 0,
              priority: '',
              status: '待审核',
              originCaseId: null
          },
          caseInfo: {
              id: null,
              code: '',
              lastUpdateTime: '',
              purpose: '',
              prerequisite: '',
              evaluation: '',
              assumptionAndConstraint: ''
          },
          requirementList: [],
          options: [{
            value: '紧急',
            label: '紧急'
            }, {
            value: '高',
            label: '高'
            }, {
            value: '中',
            label: '中'
            }, {
            value: '低',
            label: '低'
            }
        ],
        requirementOptions: [
        ],
        typeList: [
            {label: "性能测试", value: "性能测试"},
            {label: "功能测试", value: "功能测试"},
            {label: "接口测试", value: "接口测试"},
            {label: "流程测试", value: "流程测试"}
        ],
        toData:[],
      }
    },
    props: ['caseId', 'activityId'],
    created() {
        this.getDate();
        this.getAllRequirement();
        if(this.caseId != null) {
            this.getCaseAboutAndCaseInfo(this.caseId);
        }
    },
    methods: {
        getChecked() {
            console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
        },
        getDate() {
            var newDate = new Date();
            var MM = newDate.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            var d = newDate.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = newDate.getHours();
            h = h < 10 ? ('0' + h) : h;
            var m = newDate.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            this.date = MM + '/' + d;
            this.time = h + ':' + m;
            this.caseInfo.lastUpdateTime = newDate.getFullYear() + '-' + MM + '-' + d + 'T' + h + ':' + m + ':00';
        },
        getCaseAboutAndCaseInfo(caseId) {
            this.$axios.post('/case/getCaseById', this.qs.stringify({id: caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.caseAbout = resp.data.obj.caseAbout;
                        this.caseInfo = resp.data.obj.caseInfo;
                        this.requirementList = resp.data.obj.requirementIdList;
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
        getAllRequirement() {
            this.$axios.post('/requirement/getAllRequirement', this.qs.stringify({activityId: this.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.requirementOptions = resp.data.obj;
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
    }
  }
</script>
<style>
#caseInfo .el-row {
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: left;
  }

.col-style{
    line-height: 40px;
}

</style>