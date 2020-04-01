<template>
    <div class="testCaseManage">
        <span class="pageTitle">测试用例检索</span>
        <br><br>
        
        <!-- <el-tabs v-model="activeName">
            <el-tab-pane label="测试用例" name="first"> -->
                <el-row type="flex">
                    <el-col :span="6">
                        <div class="testCaseManageInfo">
                            <el-input placeholder="请输入内容" v-model.trim="searchString">
                                <i class="el-icon-search el-input__icon" slot="suffix" @click="getAllTestCases"></i>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="testCaseManageInfo padding-left-1">
                            <template>
                                <el-radio v-model="searchByString" label="名字">按用例名称搜索</el-radio>
                                <el-radio v-model="searchByString" label="编号">按用例编号搜索</el-radio>
                            </template>
                        </div>
                    </el-col>
                    <el-col :offset="6" :span="2" class="text-align-r vertical-center operation-button">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <i class="el-icon-circle-plus-outline operation-button"> 新建用例</i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="gotoAddTestCase">新建空白用例</el-dropdown-item>
                                <el-dropdown-item @click.native="gotoCaseHubSearch">从已有用例库中选择</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    
                    <el-col :span="4">
                        <el-row type="flex">
                            <el-col :offset="2" :span="22">
                                <div  class="operation-button vertical-center" style="text-align: right">
                                    
                                        <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            action=""
                                            :before-upload="beforeAvatarUpload"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList"
                                            :auto-upload="false"
                                            :limit="1"
                                            :http-request="uploadFile">
                                            <el-button slot="trigger" size="small" type="text" class="operation-button"><i class="el-icon-document">选取导入文件</i></el-button>
                                            <el-button style="margin-left: 6%;" size="small" type="text" @click="submitUpload" class="operation-button"><i class="el-icon-upload2">导入</i></el-button>
                                            <el-button style="margin-left: 6%;" size="small" type="text" class="operation-button"><i class="el-icon-download">导出</i></el-button>
                                            <!-- <el-button slot="trigger" type="primary">选取文件</el-button> -->
                                            <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload">导入文件</el-button> -->

                                        </el-upload>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                
                
                <testCaseDetailTable v-bind:testCases="testCases"></testCaseDetailTable>
                <span style="float: right;font-size: 18px" v-if="testCases.length !== 0">
                    <i class="el-icon-arrow-left" style="font-weight: bolder" @click="prePage"></i> 
                        {{currentPage + 1}}/{{totalPage}} 
                    <i class="el-icon-arrow-right" style="font-weight: bolder" @click="nextPage"></i>
                </span>
            <!-- </el-tab-pane>
            <el-tab-pane label="模板用例" name="second">
                <testCaseHubSearch></testCaseHubSearch>
            </el-tab-pane>
        </el-tabs> -->
    </div>
</template>

<script>
import testCaseDetailTable from '@/components/testCase/testCaseManage/testCaseDetailTable'
import testCaseHubSearch from '@/components/testCase/testCaseManage/testCaseHubSearch'
import {Message} from 'element-ui'
  export default {
    data() {
      return {
          searchByString: '名字',
          testCases: [],
          currentPage: 0,
          totalPage: null,
          searchString: '',
          dialogTableVisible: false,
          fileList: [],
          activeName: 'first'
      }
    },
    props: [],
    components: {testCaseDetailTable, testCaseHubSearch},
    created(){
        this.getAllTestCases()
    },
    methods: {
        beforeAvatarUpload(file) {
            // console.log(file.type)
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
            const isXLS = testmsg === 'xls'
            const isXlSX = testmsg === 'xlsx'
            const isLt2M = file.size / 1024 / 1024 <= 10;

            if (!isXLS && !isXlSX) {
                this.$message.error('只能上传xls/xlsx文件');
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 10MB!');
            }
            return (isXLS || isXlSX) && isLt2M;
        },
        uploadFile(file) {
            var formData = new window.FormData();
            formData.append('file', file.file);
            formData.append('activityId', this.$store.state.activityId)
              this.$axios.post('/excelImport/importCases', formData,
                {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
              },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.errMsg = resp.data.msg;
                        this.currentPage = 0;
                        this.getAllTestCases()
                        Message.success({message: '文件已完成导入，导入信息显示在表格下方'})
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
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        choseFile() {
            this.dialogTableVisible = true;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        prePage() {
            if(this.currentPage !== 0) {
                this.currentPage = this.currentPage - 1;
            }
            this.getAllTestCases()
        },
        nextPage() {
            if(this.currentPage !== this.totalPage - 1) {
                this.currentPage = this.currentPage + 1;
            }
            this.getAllTestCases()
        },
        getAllTestCases() {
            this.$axios.post('/case/allCase',
                this.qs.stringify({
                    activityId: this.$store.state.activityId, 
                    offset: this.currentPage,
                    searchString: this.searchString,
                    searchByString: this.searchByString
                }),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            }).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        // console.log(resp.data.obj)
                        this.testCases = resp.data.obj.page.content;
                        this.totalPage = resp.data.obj.page.totalPages;
                        this.currentPage = resp.data.obj.page.number ;
                        // console.log(this.testCases);
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
        gotoTestCaseEdit(obj) {
            this.$router.push({name:'testCaseEdit', params:{testCase: obj}})
        },
        gotoAddTestCase() {
            this.$router.push({name:'testCaseCreate'})
        },
        gotoCaseHubSearch() {
            this.$router.push({name:'testCaseHubSearch'})
        },
        gotoTestCaseRecordConfirm(obj) {
            if(obj.status === '未填写' || obj.status === '待审核') {
                Message.error({message: "该用例状态为" + obj.status + "，无法进行记录确认"})
                return
            }
            this.$router.push({name:'testRecord', params:{testCase: obj}})
        },
        gotoTestRecord(obj) {
            if(obj.status === '未填写' || obj.status === '待审核') {
                Message.error({message: "该用例状态为" + obj.status + "，无法添加或查看记录"})
                return
            }
            this.$router.push({name:'testRecord', params:{testRecord: obj}})
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
    .text-align-r{
        text-align: right
    }
    .vertical-center{
        line-height: 2.5;
    }
    .padding-left-1{
        padding-left: 1%;
    }
    .operation-button{
        vertical-align:middle;
        text-align: right;
        font-size:initial;
        color: #909399;
    }
    .testCaseManageInfo {
      min-height: 45px;
      height: 100%;
      text-align: left;
      line-height: 45px;
    }
    .el-tabs__nav-wrap {
        width:fit-content;
    }

</style>