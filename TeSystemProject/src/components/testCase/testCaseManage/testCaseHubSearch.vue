<template>
    <div>
        <span class="pageTitle">模板用例检索</span>
        <br><br>
        <el-row type="flex">
            <el-col :span="6">
                <div class="testCaseManageInfo">
                    <el-input placeholder="请输入内容" v-model.trim="searchString">
                        <i class="el-icon-search el-input__icon" slot="suffix" @click="getAllTestCaseHub"></i>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="testCaseManageInfo">
                    <template>
                        <el-radio v-model="searchByString" label="名字">按用例名称搜索</el-radio>
                        <el-radio v-model="searchByString" label="编号">按用例编号搜索</el-radio>
                    </template>
                </div>
            </el-col>
            <el-col :span="12"><div class="testCaseManageInfo"></div></el-col>
        </el-row><br>
        <el-table
            :data="testCases"
            border
            ref="filterTable"
            max-height="800"
            >
            <el-table-column
                prop="caseCode"
                label="用例编号"
                width="260" 
                align="left"
                header-align="center"
            >  
            </el-table-column>
            <el-table-column
                prop="caseName"
                label="测试用例名称"
                width="380" 
                align="left"
                header-align="center"
            >  
            </el-table-column>
            <el-table-column
                prop="caseType"
                label="用例类型"
                width="120" 
                align="center"
                :filters="[{text:'功能测试',value:'功能测试'},{text:'性能测试',value:'性能测试'},{text:'流程测试',value:'流程测试'},{text:'接口测试',value:'接口测试'}]"
                :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                prop="activityName"
                label="活动名称"
                align="left"
                header-align="center"
            >
            </el-table-column>
            <el-table-column
                label="选择"
                align="left"
                width="80" 
                header-align="center"
            >
                <template slot-scope="scope"> 
                    <el-link type="primary" :underline="false" @click="addCaseByCaseHub(scope.row.id)">选择使用</el-link>
                </template>    
            </el-table-column>
        </el-table>
        <span style="float: right;font-size: 18px" v-if="testCases.length !== 0">
            <i class="el-icon-arrow-left" style="font-weight: bolder" @click="prePage"></i> 
                {{currentPage + 1}}/{{totalPage}} 
            <i class="el-icon-arrow-right" style="font-weight: bolder" @click="nextPage"></i>
        </span>
    </div>
</template>
<script>
import {Message} from 'element-ui'
  export default {
    data() {
      return {
          searchByString: '名字',
          testCases: [],
          currentPage: 0,
          totalPage: null,
          searchString: '',
      }
    },
    props: [],
    components: {},
    created(){
        this.getAllTestCaseHub();
    },
    methods: {
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        prePage() {
            if(this.currentPage !== 0) {
                this.currentPage = this.currentPage - 1;
            }
            this.getAllTestCaseHub()
        },
        nextPage() {
            if(this.currentPage !== this.totalPage - 1) {
                this.currentPage = this.currentPage + 1;
            }
            this.getAllTestCaseHub()
        },
        getAllTestCaseHub() {
            this.$axios.post('/case/showCaseHub',
                this.qs.stringify({ 
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
                        this.testCases = resp.data.obj.content;
                        this.totalPage = resp.data.obj.totalPages;
                        this.currentPage = resp.data.obj.number ;
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
        addCaseByCaseHub(caseId) {
            this.$axios.post('/case/addCaseByCaseHub', this.qs.stringify({caseHubId: caseId, activityId: this.$store.state.activityId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.$router.push({name:'testCaseEdit', params:{testCase: resp.data.obj}})
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
  }
</script>
<style scoped>
  .testCaseManageInfo {
    min-height: 45px;
    height: 100%;
    text-align: left;
    line-height: 45px;
    padding-left: 5px;
  }
  .pageTitle{
    font-size: x-large;
    font-weight: bold;
    float: left;
  }
</style>