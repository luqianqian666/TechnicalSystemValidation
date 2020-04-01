<template>

<div>
    <el-page-header @back="hideRecord">
    </el-page-header>
    <br>
    <el-row class="case-info-col-title">
        <el-col :span="2">用例编号</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="7">用例名称</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2">用例类型</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2">用例状态</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2">首次/回归</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2"></el-col>
    </el-row>
    <br>
    <el-row class="case-info-col-title">
        <el-col :span="2">{{testCase.code}}</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="7">{{testCase.name}}</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2">{{testCase.type}}</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2">{{testCase.status}}</el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2">
            <el-button  v-if="testCase.regressionMark == 0" disabled type="text" size="mini">首次</el-button>
            <span v-if="testCase.regressionMark == 1">第1次回归</span>
            <span v-if="testCase.regressionMark == 2">第2次回归</span>
            <span v-if="testCase.regressionMark == 3">第3次回归</span>
        </el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="2"></el-col>

        
    </el-row>

        <br>
        <el-row class="pageSubTitle">
            
                    各步骤测试记录
        </el-row>
        <br>
        
        <div v-for="(item, index) in procedures" :key="index">
            <el-card :style="cardClass(item.caseStepInfo.type)">
                <el-row class="colTitle">
                    <el-col :span="1">
                        {{item.caseStepInfo.serialNumber}}
                    </el-col>
                    <el-col :span="11">
                        步骤描述
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical"></el-divider>
                    </el-col>
                    <el-col :span="10">
                        预期结果
                    </el-col>
                    <el-col :span="1">
                        <el-button size="mini" type="text" @click="editProcedureRecord(item)">添加记录</el-button>
                    </el-col>
                </el-row>

                <el-row class="step-content">
                    <el-col :offset="1" :span="11">
                        {{item.caseStepInfo.description}}
                    </el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical"></el-divider>
                    </el-col>
                    <el-col :span="11">
                        {{item.caseStepInfo.expectedResult}}
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

                        <el-col :span="2" v-if="record.caseStepRecordInfo.status=='已确认'">
                            <el-button plain disabled size="mini" type="success">{{record.caseStepRecordInfo.status}}</el-button>
                        </el-col>
                        <el-col :span="2" v-if="record.caseStepRecordInfo.status=='待修改'">
                            <el-button plain disabled size="mini" type="danger">{{record.caseStepRecordInfo.status}}</el-button>
                        </el-col>
                        <el-col :span="2" v-if="record.caseStepRecordInfo.status=='待确认'">
                            <el-button plain disabled size="mini" type="warning">{{record.caseStepRecordInfo.status}}</el-button>
                        </el-col>

                        <el-col :span="1">
                            <el-button size="mini" type="text" @click="deleteRecord(record.caseStepRecordInfo.id)">删除</el-button>
                        </el-col>
                        <el-col :span="1">
                            <el-button size="mini" type="text" @click="editOriginRecord(item.caseStepInfo, record.caseStepRecordInfo)" v-if="record.caseStepRecordInfo.status=='待修改'">编辑</el-button>
                        </el-col>

                        <br>
                </el-row>
            </el-card>
            <br>
        </div>

        <el-drawer
        title="编辑"
        :visible.sync="drawer"
        direction="ttb"
        :with-header="withHeader">
                <div v-if="procedure != null">
                    <!-- :with-header="withHeader" -->
                    <header class="drawer-header">正在编辑步骤 {{procedure.caseStepInfo.serialNumber}} 的测试记录</header>
                    <el-form label-position="left" :model="procedure.procedureRecord">
            <el-row>
                    <el-col :offset="1" :span="11">
                        <div>
                            <el-form-item>
                            <el-input
                                :rows="7"
                                type="textarea"
                                placeholder="请输入记录内容"
                                v-model="procedure.procedureRecord.record"
                                resize="none"
                                maxlength="100"
                                show-word-limit
                            >
                            </el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <div>
                            <el-form-item>
                                <p><span v-if="procedure.procedureRecord.firstAttachmentPath != null"><el-link type="info" @click="viewFile(procedure.procedureRecord.firstAttachmentPath)" >附件<i class="el-icon-link"></i></el-link> <i class="el-icon-close" @click="deleteFile(procedure.procedureRecord.id, procedure.procedureRecord.firstAttachmentPath, 'first')"></i></span>
                                <input type="file" v-else class="fileUpload" @change="handleFileChange($event, 'first')"></p>
                                <p><span v-if="procedure.procedureRecord.secondAttachmentPath != null"><el-link type="info" @click="viewFile(procedure.procedureRecord.secondAttachmentPath)" >附件<i class="el-icon-link"></i></el-link> <i class="el-icon-close" @click="deleteFile(procedure.procedureRecord.id, procedure.procedureRecord.secondAttachmentPath, 'second')"></i></span>
                                <input type="file" v-else class="fileUpload" @change="handleFileChange($event, 'second')"></p>
                                <p><span v-if="procedure.procedureRecord.thirdAttachmentPath != null"><el-link type="info" @click="viewFile(procedure.procedureRecord.thirdAttachmentPath)" >附件<i class="el-icon-link"></i></el-link> <i class="el-icon-close" @click="deleteFile(procedure.procedureRecord.id, procedure.procedureRecord.thirdAttachmentPath, 'third')"></i></span>
                                <input type="file" v-else class="fileUpload" @change="handleFileChange($event, 'third')"></p>
                            </el-form-item>
                        </div>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="23">
                    <div>
                        <span style="float: right">
                            <el-button plain size="small" @click="cancleEditProcedureRecord">
                                <span>取消</span>
                            </el-button>
                            <el-button plain type="primary" size="small" @click="saveProcedureRecord">
                                <span>保存</span>
                            </el-button>
                        </span>
                    </div>
                </el-col>
            </el-row>
            </el-form>
                </div>
        </el-drawer>


        <!-- editing test record of a step -->
        <!-- <div v-if="procedure != null">
            <el-row class="pageSubTitle">正在添加/编辑 步骤{{procedure.caseStepInfo.serialNumber}} 的测试记录</el-row>
            <br>
            <el-form label-position="left" :model="procedure.procedureRecord">
            <el-row>
                    <el-col :span="11">
                        <div>
                            <el-form-item>
                            <el-input
                                :rows="7"
                                type="textarea"
                                placeholder="请输入记录内容"
                                v-model="procedure.procedureRecord.record"
                                resize="none"
                                maxlength="100"
                                show-word-limit
                            >
                            </el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <div>
                            <el-form-item>
                                <p><span v-if="procedure.procedureRecord.firstAttachmentPath != null"><el-link type="info" @click="viewFile(procedure.procedureRecord.firstAttachmentPath)" >附件<i class="el-icon-link"></i></el-link> <i class="el-icon-close" @click="deleteFile(procedure.procedureRecord.id, procedure.procedureRecord.firstAttachmentPath, 'first')"></i></span>
                                <input type="file" v-else class="fileUpload" @change="handleFileChange($event, 'first')"></p>
                                <p><span v-if="procedure.procedureRecord.secondAttachmentPath != null"><el-link type="info" @click="viewFile(procedure.procedureRecord.secondAttachmentPath)" >附件<i class="el-icon-link"></i></el-link> <i class="el-icon-close" @click="deleteFile(procedure.procedureRecord.id, procedure.procedureRecord.secondAttachmentPath, 'second')"></i></span>
                                <input type="file" v-else class="fileUpload" @change="handleFileChange($event, 'second')"></p>
                                <p><span v-if="procedure.procedureRecord.thirdAttachmentPath != null"><el-link type="info" @click="viewFile(procedure.procedureRecord.thirdAttachmentPath)" >附件<i class="el-icon-link"></i></el-link> <i class="el-icon-close" @click="deleteFile(procedure.procedureRecord.id, procedure.procedureRecord.thirdAttachmentPath, 'third')"></i></span>
                                <input type="file" v-else class="fileUpload" @change="handleFileChange($event, 'third')"></p>
                            </el-form-item>
                        </div>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <span style="float: right">
                            <el-button plain size="small" @click="cancleEditProcedureRecord">
                                <span>取消</span>
                            </el-button>
                            <el-button plain type="primary" size="small" @click="saveProcedureRecord">
                                <span>保存</span>
                            </el-button>
                        </span>
                    </div>
                </el-col>
            </el-row>
            </el-form>
        </div> -->
</div>
</template>


<script>
import {Message} from 'element-ui'
  export default {
    data() {
        return {
            drawer: false,
            withHeader: false,
            procedure: null,
            fileList: []
        }
      },
    props: ['procedures', 'testCase'],
    components: {},
    methods: {
        handleFileChange (event, msg) {
            var file = event.target.files[0];
            if(file != null) {
                if(file.size <= 10000*1024) {
                    if(msg == "first")
                        this.procedure.firstFile = file;
                    else if(msg == "second")
                        this.procedure.secondFile = file;
                    else if(msg == "third")
                        this.procedure.thirdFile = file;
                } else {
                    Message.error({message: '文件大小超出限制'})
                }
            }
            
        },
        deleteFile(recordId, filePath, name) {
            this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/case/deleteRecordFile', this.qs.stringify({recordId: recordId, filePath: filePath, name: name}),
                    {
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                        }
                },).then(resp => {                   //请求成功后的处理函数   
                    if (resp && resp.status == 200) {
                        if(resp.data.status == 200){
                            Message.success({message: resp.data.msg});
                            this.procedure.procedureRecord = resp.data.obj;
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        },
        cardClass(type) {
            if(type == '普通')
                return ;
            else if(type == '接口数据模拟')
                return 'border:1px solid #E6A23C;margin-top:5px;';
            else if(type == '环境模拟')
                return 'border:1px solid #F56C6C;margin-top:5px;';
            else if(type == '脚本运行')
                return 'border:1px solid #9AC7F4;margin-top:5px;';
        },
        hideRecord() {
            //传递到父组件，由父组件设置隐藏
            this.$emit('cancleToAll');
        },
        editProcedureRecord(item) {
            //点击详情按钮，显示对应步骤的信息并进行新增测试记录
            this.procedure = {
                caseStepInfo: item.caseStepInfo,
                procedureRecord: {
                    id: null,
                    userId: null,
                    lastUpdateTime: null,
                    record: '',
                    firstAttachmentPath: null,
                    secondAttachmentPath: null,
                    thirdAttachmentPath: null,
                    status: '待审核',
                    stepId: item.caseStepInfo.id
                },
                firstFile: null,
                secondFile: null,
                thirdFile: null
            }
            this.drawer = true //打开编辑记录弹出框
        },
        //编辑已有的测试记录
        editOriginRecord(step, record) {
            this.procedure = {
                caseStepInfo: step,
                procedureRecord: record,
                firstFile: null,
                secondFile: null,
                thirdFile: null
            }
            this.drawer = true //打开编辑记录弹出框
        },
        saveProcedureRecord() {
            // console.log(this.fileList)
            var formData = new window.FormData();
            if(this.procedure.procedureRecord.id != null)
                formData.append('recordId', this.procedure.procedureRecord.id);
            formData.append('record', this.procedure.procedureRecord.record);
            formData.append('firstFile', this.procedure.firstFile);
            formData.append('secondFile', this.procedure.secondFile);
            formData.append('thirdFile', this.procedure.thirdFile);
            formData.append('stepId', this.procedure.procedureRecord.stepId);
             console.log(this.procedure.procedureRecord.stepId+"*-*-*-*-*-*-*-*-")
            //保存测试记录，提交到后台，同时拉取最新数据
            this.$axios.post('/case/addCaseStepRecordInfo', formData,
                {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.$emit('getNewStepRecord', this.testCase);
                        Message.success({message: resp.data.msg});
                        this.drawer = false;
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
            console.log(this.procedure);
            this.procedure = null;
        },
        deleteRecord(recordId) {
            this.$axios.post('/case/deleteCaseRecord', this.qs.stringify({recordId: recordId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.$emit('getNewStepRecord', this.testCase);
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
        cancleEditProcedureRecord() {
            //取消对测试记录的编辑，数据不提交到后台，同时从后台拉取最新数据
            this.procedure = null;
            this.drawer = false;
        },
        //点击链接进行文件查看或者下载
        viewFile(path) {
            var url = '/api/' + path
            window.open(url, '_blanck')
        }
    }
  };
</script>

<style>
    .case-info-col-title{
        font-size: small
    }
    .pageSubTitle{
        text-align: left;
        font-size: medium
    }
    .colTitle{
        text-align: left;
        font-size: small;
    }
    .step-content{
        text-align: left;
        font-size: small;
    }
    .drawer-header{
        text-align: left;
        padding: 1%;
        color:#72767b
    }
</style>