<template>
    <el-table
        :data="testCases"
        border
        ref="filterTable"

        >
        <el-table-column
            prop="code"
            label="用例编号"
            width="400" 
            align="left"
            header-align="center"
        >  
        </el-table-column>
        <el-table-column
            prop="name"
            label="测试用例名称"
            align="left"
            header-align="center"
        >  
        </el-table-column>
        <el-table-column
            prop="software"
            label="被测软件编号"
            class="ccc"
            width="200" 
            align="left"
            header-align="center"
            :filters="softwareCodeFilters"
            :filter-method="filterSoftwareCodeHandler"
        >
            <template slot-scope="scope">
                <div style="white-space: pre-line;">
                    <span>{{formatSoftwareCode(scope.row.software)}}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="用例状态"
            width="120" 
            align="center"
            :filters="[{text:'未填写',value:'未填写'},{text:'待审核',value:'待审核'},{text:'未执行',value:'未执行'},{text:'进行中',value:'进行中'},{text:'已执行',value:'已执行'},{text:'通过',value:'通过'},{text:'不通过',value:'不通过'},{text:'不具备测试条件',value:'不具备测试条件'}]"
            :filter-method="filterHandler"
        >
            <template slot-scope="scope">
                <el-tag type="warning" effect="plain" v-if="scope.row.status == '未填写' ">未填写</el-tag>
                <el-tag type="warning" effect="light" v-else-if="scope.row.status == '待审核' ">待审核</el-tag>
                <el-tag type="info" effect="light" v-else-if="scope.row.status == '未执行' ">未执行</el-tag>
                <el-tag type="primary" effect="light" v-else-if="scope.row.status == '进行中' ">进行中</el-tag>
                <el-tag type="info" effect="plain" v-else-if="scope.row.status == '不具备测试条件' ">不具备测试条件</el-tag>
                <el-tag type="primary" effect="dark" v-else-if="scope.row.status == '已执行' ">已执行</el-tag>
                <el-tag type="success" effect="plain" v-else-if="scope.row.status == '通过' ">通过</el-tag>
                <el-tag type="danger" effect="dark" v-else-if="scope.row.status == '不通过' ">不通过</el-tag>
                <el-tag type="warning" effect="dark" v-else-if="scope.row.status == '待回归' ">待回归</el-tag>
                <el-tag type="success" effect="light" v-else-if="scope.row.status == '已回归' ">已回归</el-tag>
            </template>  
        </el-table-column>
        <el-table-column
            prop="type"
            label="用例类型"
            width="120" 
            align="center"
            :filters="[{text:'功能测试',value:'功能测试'},{text:'性能测试',value:'性能测试'},{text:'流程测试',value:'流程测试'},{text:'接口测试',value:'接口测试'}]"
            :filter-method="filterHandler"
        >  
        </el-table-column>
        <el-table-column
            prop="regressionMark"
            label="首次/回归"
            :filters="[{text:'首次',value:0},{text:'第1次回归',value:1},{text:'第2次回归',value:2},{text:'第3次回归',value:3}]"
            :filter-method="filterHandler"
            width="120" 
            align="center"
        > 
            <template slot-scope="scope">
                <el-tag type="info" effect="plain" v-if="scope.row.regressionMark == 0" >首次</el-tag>
                <el-tag type="warning" effect="plain" v-if="scope.row.regressionMark == 1">第1次回归</el-tag>
                <el-tag type="danger" effect="plain" v-if="scope.row.regressionMark == 2">第2次回归</el-tag>
                <el-tag type="danger" effect="dark" v-if="scope.row.regressionMark == 3">第3次回归</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="startingTime"
            label="日期"
            width="120" 
            align="center"
            :filters="dateFilters"
            :filter-method="filterSoftwareCodeHandler"
        >
            <template slot-scope="scope">
                {{formatDate(scope.row.startingTime)}}
            </template>
        </el-table-column>
        <el-table-column
            prop="priority"
            label="优先级"
            width="90" 
            align="center"
            :filters="[{text:'紧急',value:'紧急'},{text:'高',value:'高'},{text:'中',value:'中'},{text:'低',value:'低'}]"
            :filter-method="filterHandler"> 
            <template slot-scope="scope">
                    <el-tag effect="dark" type="danger"  v-if="scope.row.priority == '紧急'" >紧急</el-tag>
                    <el-tag effect="plain" type="danger" v-if="scope.row.priority == '高'">高</el-tag>
                    <el-tag effect="plain" type="warning" v-if="scope.row.priority == '中'">中</el-tag>
                    <el-tag effect="plain" type="info" v-if="scope.row.priority == '低'">低</el-tag>
            </template> 
        </el-table-column>
        <el-table-column
            prop="principal"
            label="负责人"
            width="90" 
            align="center"> 
            <template slot-scope="scope">
                <div style="white-space: pre-line;">
                    <span>{{formatSoftwareCode(scope.row.principal)}}</span>
                </div>
            </template> 
        </el-table-column>
        <el-table-column
            label="详情"
            align="center"
            width="90"
        > 
            <template slot-scope="scope"> 
                <!-- <el-dropdown>
                    <span class="el-dropdown-link">
                        详情<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="gotoTestCaseEdit(scope.row)">用例详情</el-dropdown-item>
                        <el-dropdown-item @click.native="gotoTestCaseConfirm(scope.row)">审核详情</el-dropdown-item>
                        <el-dropdown-item @click.native="gotoTestCaseRecordConfirm(scope.row)">确认详情</el-dropdown-item>
                        <el-dropdown-item @click.native="gotoTestRecord(scope.row)">记录详情</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
                <el-link @click="viewTestCase(scope.row)" :underline="false" >查看</el-link>
            </template>    
        </el-table-column>
    </el-table>
</template>
<script>
import {Message} from 'element-ui'
  export default {
    data() {
      return {
          searchFilters: '名字',
          softwareCodeFilters: [],
          dateFilters: []
      }
    },
    props: ['testCases'],
    watch: {
        testCases: function(newVal,oldVal){
            newVal&& this.getSoftwareCodeFilters(this.testCases); //newVal存在的话执行函数
            newVal&& this.getDateFilters(this.testCases);
        }
    },
    components: {},
    methods: {
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        filterSoftwareCodeHandler(value, row, column) {
            const property = column['property'];
            if(row[property] != null)
                return row[property].indexOf(value) > -1;
            return 0;
        },
        formatDate(date) {
            if(date == null || date == "")
                return ""
            return date.split('T')[0]
        },
        formatSoftwareCode(code) {
            if(code == null || code == "")
                return "";
            var code = code.substring(0, code.lastIndexOf(','))
            var codeList = code.replace(/,/g, '\n')
            return codeList
            // return code
        },
        getDateFilters(cases) {
            this.dateFilters = [];
            for(var i = 0; i < cases.length; i ++) {
                if(cases[i].startingTime !== null && cases[i].startingTime !== "") {
                    var dateFilter = {
                            text: cases[i].startingTime.split('T')[0],
                            value: cases[i].startingTime.split('T')[0]
                        }
                    if(JSON.stringify(this.dateFilters).indexOf(JSON.stringify(dateFilter))==-1) {
                        this.dateFilters.push(dateFilter)
                    }
                }
            }
        },
        getSoftwareCodeFilters(cases) {
            this.softwareCodeFilters = [];
            for(var i = 0; i < cases.length; i ++) {
                if(cases[i].software !== null && cases[i].software !== "") {
                    var code = cases[i].software.substring(0, cases[i].software.lastIndexOf(','));
                    var codeList = code.split(",");
                    for(var j = 0; j < codeList.length; j ++) {
                        var codeFilter = {
                            text: codeList[j],
                            value: codeList[j]
                        }
                        
                        if(JSON.stringify(this.softwareCodeFilters).indexOf(JSON.stringify(codeFilter))==-1) {
                            this.softwareCodeFilters.push(codeFilter)
                        }
                    }
                }
            }
        },
        viewTestCase(obj) {
            this.$router.push({name:'testCaseSummary', params:{testCase: obj}})
        },
        gotoTestCaseEdit(obj) {
            this.$router.push({name:'testCaseEdit', params:{testCase: obj}})
        },
        gotoTestCaseConfirm(obj) {
            this.$router.push({name:'testCaseEdit', params:{confirmTestCase: obj}})
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
        },
        setCaseHub(id) {
            this.$axios.post('/case/addCaseHub',this.qs.stringify({caseId: id }),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            }).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        Message.success({message: resp.data.msg})
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
        getCode(index) {
            var code = ''
            for(var i = 0; i < this.code[index].length; i ++)
                code += this.code[index][i]+"\n"
            return code
        }
    }
  }
</script>
<style scoped>
    .ccc{
        white-space: pre-line;
    }
</style>