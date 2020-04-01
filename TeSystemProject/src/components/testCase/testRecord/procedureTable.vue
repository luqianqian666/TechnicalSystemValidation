<template>
    <div>
        <div class="pageSubTitle">
            <span>详情</span>
            <br>
        </div>
        <br>
        <div v-for="(item, index) in procedures" :key="index">
            <el-card :style="cardClass(item.caseStepInfo.type)">
                <el-row class="colTitle">
                    <el-col :span="1">
                        {{item.caseStepInfo.serialNumber}}
                    </el-col>
                    <el-col :span="10">
                        步骤描述
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical"></el-divider>
                    </el-col>
                    <el-col :span="9">
                        预期结果
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical"></el-divider>
                    </el-col>
                    <el-col :span="2" class="text-align-center">
                        测试步骤结论
                    </el-col>
                </el-row>

                <el-row class="step-content">
                    <el-col :offset="1" :span="10">
                        {{item.caseStepInfo.description}}
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical"></el-divider>
                    </el-col>
                    <el-col :span="9">
                        <div class="grid-content">{{item.caseStepInfo.expectedResult}}</div>
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical"></el-divider>
                    </el-col>
                    <el-col :span="2"  class="text-align-center">
                    <span v-if="item.caseStepInfo.status=='通过'"><i class="el-icon-success" style="color: #68bb8d"></i>{{item.caseStepInfo.status}}</span>
                    <span v-else-if="item.caseStepInfo.status=='不通过'"><i class="el-icon-error" style="color: #fd6b6d"></i>{{item.caseStepInfo.status}}</span>
                    <span v-else-if="item.caseStepInfo.status=='不具备测试条件'"><i class="el-icon-warning"></i>{{item.caseStepInfo.status}}</span>
                    <span v-else style="font-size: 18px">
                        <el-button type="success" size="mini"
                                icon="el-icon-check" circle  title="通过"
                                @click="changeStepStatus(item.caseStepInfo.id, '通过')">
                            </el-button>
                            <el-button type="danger" size="mini" 
                            icon="el-icon-close" circle title="不通过"
                             @click="changeStepStatus(item.caseStepInfo.id, '不通过')"></el-button>
                            <el-button type="info" size="mini" 
                            icon="el-icon-warning-outline" circle title="不具备测试条件"
                             @click="changeStepStatus(item.caseStepInfo.id, '不具备测试条件')"></el-button>
                    </span>
                    </el-col>
                </el-row>

                <el-divider v-if="item.stepRecordAndUserList != null"
                    content-position="left"
                >
                    测试记录
                </el-divider>
                
                <el-row type="flex" v-for="(record, index) in item.stepRecordAndUserList" :key="index">
                        <el-col :span="2">
                            <div  >
                                {{record.userName}}
                            </div>
                        </el-col>

                        <el-col :span="13">
                            <div >
                                {{record.caseStepRecordInfo.record}}
                            </div>
                        </el-col>

                        <el-col :span="1" v-if="record.caseStepRecordInfo.firstAttachmentPath!=null">
                                <el-link type="info" @click="viewFile(record.caseStepRecordInfo.firstAttachmentPath)" >附件<i class="el-icon-link"></i></el-link>
                        </el-col>
                        <el-col :span="1" v-if="record.caseStepRecordInfo.secondAttachmentPath!=null">
                                <el-link type="info" @click="viewFile(record.caseStepRecordInfo.secondAttachmentPath)" >附件<i class="el-icon-link"></i></el-link>
                        </el-col>
                        <el-col :span="1" v-if="record.caseStepRecordInfo.thirdAttachmentPath!=null">
                                <el-link type="info" @click="viewFile(record.caseStepRecordInfo.thirdAttachmentPath)" >附件<i class="el-icon-link"></i></el-link>
                        </el-col>
                        
                        <!-- <template slot-scope="scope">
                            <span v-if="scope.row.caseStepRecordInfo.status === '待确认'">
                                <i class="el-icon-check" title="通过" style="font-size: 18px" @click="changeRecordStatus(scope.row.caseStepRecordInfo.id, '已确认')"></i>&nbsp;
                                <i class="el-icon-close" title="不通过" style="font-size: 18px" @click="changeRecordStatus(scope.row.caseStepRecordInfo.id, '待修改')"></i>
                            </span>
                            <span v-else-if="scope.row.caseStepRecordInfo.status === '已确认'">
                                <i class="el-icon-check" title="已确认" style="font-size: 18px; color: #68bb8d"></i>
                            </span>
                            <span v-else-if="scope.row.caseStepRecordInfo.status === '待修改'">
                                <i class="el-icon-check" title="待修改" style="font-size: 18px; color: #fd6b6d"></i>
                            </span>
                        </template> -->
                        <el-col :span="2" v-if="record.caseStepRecordInfo.status=='已确认'">
                            <el-button plain disabled size="mini" type="success">{{record.caseStepRecordInfo.status}}</el-button>
                        </el-col>
                        <el-col :span="2" v-if="record.caseStepRecordInfo.status=='待修改'">
                            <el-button plain disabled size="mini" type="danger">{{record.caseStepRecordInfo.status}}</el-button>
                        </el-col>
                        <el-col :span="2" v-if="record.caseStepRecordInfo.status=='待确认'">
                            <el-button type="success" size="mini"
                                icon="el-icon-check" circle  title="通过"
                                @click="changeRecordStatus(record.caseStepRecordInfo.id, '已确认')">
                            </el-button>
                            <el-button type="danger" size="mini" 
                            icon="el-icon-close" circle title="不通过"
                             @click="changeRecordStatus(record.caseStepRecordInfo.id, '待修改')"></el-button>
<!--                             
                            
                            <el-dropdown size="medium" trigger="click" >
                                <span class="el-dropdown-link">{{record.caseStepRecordInfo.status}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="changeRecordStatus(record.caseStepRecordInfo.id, '已确认')">
                                            <el-button type="text">
                                                <i class="el-icon-success" style="color: #68bb8d" title="通过" >通过</i>
                                            </el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="changeRecordStatus(record.caseStepRecordInfo.id, '待修改')">
                                            <el-button type="text">
                                                <i class="el-icon-error" style="color: #fd6b6d" title="不通过" >不通过</i>
                                            </el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                        
                        <br>
                </el-row>
            </el-card>
            <br>
        </div>
  </div>
</template>


<script>
import {Message} from 'element-ui'
  export default {
    data() {
      return {
      }
    },
    props: ['procedures', 'spanArr'],
    methods: {
        
        //合并表格中的列序号与步骤描述
        formatterName(row, column) {
            var msg = row.caseStepInfo.serialNumber + '   ' + row.caseStepInfo.description;
            return msg;
        },
        //用于表格合并行
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(columnIndex === 0 || columnIndex === 4) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                  rowspan: _row,
                  colspan: _col
                }
            }
        },
        //点击链接进行文件查看或者下载
        viewFile(path) {
            var url = '/api/' + path
            console.log(url)
            window.open(url, '_blanck')
        },
        //测试记录确认
        changeRecordStatus(recordId, status) {
            this.$axios.post('/case/confirmRecord', this.qs.stringify({recordId: recordId, status: status, activityId: this.$store.state.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.$emit('getNewProcedureRecord', resp.data.obj)
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
        //测试步骤确认
        changeStepStatus(stepId, status) {
            this.$axios.post('/case/confirmCaseProcedure', this.qs.stringify({stepId: stepId, status: status, activityId: this.$store.state.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.$emit('getNewProcedureRecord', resp.data.obj)
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
        // 不同种类步骤样式不一
        cardClass(type) {
            if(type == '普通')
                return ;
            else if(type == '接口数据模拟')
                return 'border:1px solid #E6A23C;margin-top:5px;';
            else if(type == '环境模拟')
                return 'border:1px solid #F56C6C;margin-top:5px;';
            else if(type == '脚本运行')
                return 'border:1px solid #9AC7F4;margin-top:5px;';
        }
       
    }
  };
</script>

<style>
    .grid-content{
        /* 无内容时撑开宽度用 */
        min-height:12px
    }
    .pageSubTitle{
        text-align: left;
        font-size: medium;
        font-weight: bold;
    }
    /* 步骤卡片中的样式 */
    .colTitle{
        text-align: left;
        font-size: small;
    }
    .step-content{
        text-align: left;
        font-size: small;
    }
    .text-align-center{
        text-align: center;
    }
</style>