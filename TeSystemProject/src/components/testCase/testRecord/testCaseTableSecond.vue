<template>
  <div>
      <el-table
        ref="filterTable"
        :data="tableData"
        border

    >
        <el-table-column
            fixed
            prop="code"
            label="用例编号"
            width="400" 
            align="left"
            header-align="center"
        >  
        </el-table-column>
        <el-table-column
            fixed
            prop="name"
            label="测试用例名称"
            align="left"
            header-align="center"
        >  
        </el-table-column>
        <el-table-column
            prop="software"
            label="被测软件编号"
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
            width="110" 
            align="center"
            :filters="[{text:'未填写',value:'未填写'},{text:'待审核',value:'待审核'},{text:'未执行',value:'未执行'},{text:'进行中',value:'进行中'},{text:'已执行',value:'已执行'},{text:'通过',value:'通过'},{text:'不通过',value:'不通过'},{text:'不具备测试条件',value:'不具备测试条件'}]"
            :filter-method="filterHandler"
        >
            
        </el-table-column>
        <el-table-column
            prop="type"
            label="用例类型"
            width="115" 
            align="center"
            :filters="[{text:'功能测试',value:'功能测试'},{text:'性能测试',value:'性能测试'},{text:'流程测试',value:'流程测试'},{text:'接口测试',value:'接口测试'}]"
            :filter-method="filterHandler"
        >  
        </el-table-column>
        <el-table-column
            prop="regressionMark"
            label="首次/回归"
            width="115" 
            align="center"
            :filters="[{text:'首次',value:0},{text:'第1次回归',value:1},{text:'第2次回归',value:2},{text:'第3次回归',value:3}]"
            :filter-method="filterHandler"
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
            width="80" 
            align="center"
        > 
            <template slot-scope="scope">
                <el-tag effect="dark" type="danger" v-if="scope.row.priority == '紧急'" >紧急</el-tag>
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
            width="95"
        > 
         <template slot-scope="scope">
                    <span style="color: #cccccc; font-size: 20px;">
                        <el-button type="text" @click="hideTable(scope.row)">
                            <span>查看</span>
                        </el-button>
                    </span>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>


<script>
  export default {
    data() {
      return {
          softwareCodeFilters: [],
          dateFilters: []
      }
    },
    props: ['tableData'],
    watch: {
        tableData: function(newVal,oldVal){
            // this.cData = newVal;  //newVal即是chartData
            newVal&& this.getSoftwareCodeFilters(this.tableData); //newVal存在的话执行drawChar函数
            newVal&& this.getDateFilters(this.tableData);
        }
    },
    methods: {
        formatSoftwareCode(code) {
            if(code == null || code == "")
                return "";
            var code = code.substring(0, code.lastIndexOf(','))
            var codeList = code.replace(/,/g, '\n')
            return codeList
            // return code
        },
        formatDate(date) {
            if(date == null || date == "")
                return ""
            return date.split('T')[0]
        },
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
        hideTable(code) {  
            this.$emit('func', code);

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
    }
  };
</script>

<style>

</style>