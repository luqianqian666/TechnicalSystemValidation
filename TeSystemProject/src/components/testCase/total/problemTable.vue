<template>
    <div class="testCaseTable" style="text-align: left">
        <span >
            已解决问题数量：<span style="color: #1fa7fd">{{solvedNums}}</span>/{{totalProblemNums}}
        </span>
        <br><br>
        <el-table
            :data="problems"
            style="width: 100%"
            border
            :max-height="350"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
                prop="code"
                label="问题编号"
                width="140"
                align="center">
            </el-table-column>
            <el-table-column
                prop="caseCode"
                label="用例编号"
                width="400"
                align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="问题名称">
            </el-table-column>
            <el-table-column
                prop="type"
                label="问题类型"
                width="95"
                align="center">
            </el-table-column>
            <el-table-column
                prop="level"
                label="严重性"
                width="90"
                align="center"
                :filters="[{text: '致命', value: '致命'}, {text: '严重', value: '严重'}, {text: '建议', value: '建议'}, {text: '一般', value: '一般'}, {text: '轻微', value: '轻微'}]"
                :filter-method="filterHandler">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" v-if="scope.row.level == '致命'">致命</el-button>
                    <el-button type="danger" size="mini" plain v-if="scope.row.level == '严重'">严重</el-button>
                    <el-button type="warning" size="mini" plain v-if="scope.row.level == '建议'">建议</el-button>
                    <el-button size="mini" disabled v-if="scope.row.level == '一般'">一般</el-button>
                    <el-button type="text" size="mini" disabled v-if="scope.row.level == '轻微'">轻微</el-button>
                </template>
            </el-table-column>
             <el-table-column
                prop="status"
                label="状态"
                width="110"
                align="center">
            </el-table-column>
            <el-table-column
                prop="lastUpdateTime"
                label="最后更新日期"
                width="140"
                align="center">
                <template slot-scope="scope">
                    {{getDate(scope.row.lastUpdateTime)}}
                </template>
            </el-table-column>
            <el-table-column
                prop="reporter"
                label="提出人"
                width="92"
                align="center">
            </el-table-column>
            <el-table-column
                label="编辑"
                width="90"
                align="center">
                <template slot-scope="scope">
                    <i class="el-icon-edit" style="font-size: 25px" @click="editTestProblem(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
        <span style="float: right" v-if="problems.length !== 0">
            <i class="el-icon-arrow-left" style="font-weight: bolder" @click="prePage"></i> 
                {{currentPage + 1}}/{{totalPage}} 
            <i class="el-icon-arrow-right" style="font-weight: bolder" @click="nextPage"></i>
        </span>
    </div>

</template>

<script>
  export default {
    data() {
      return {
          problems: [],
          currentPage: 0,
          totalPage: null
      }
    },
    props: ['solvedNums', 'totalProblemNums'],
    created() {
        this.getProblemByActivityId();
    },
    methods: {
        clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
        filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getDate(date) {
          return date == null ? null:date.split(" ")[0]
      },
      editTestProblem(testProblem) {
        //向父组件传递要进行编辑的问题
        // this.$emit('sendTestProblem', testProblem);
            this.$router.push({name:'testProblemEdit', params:{testProblem: testProblem}})
      },
      getProblemByActivityId() {
            this.$axios.post('/activity/getSolvedProblemsByActivity',
            this.qs.stringify(
                {
                    id: this.$store.state.activityId, 
                    offset: this.currentPage,
                }),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            }).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.problems = resp.data.obj.content;
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
        prePage() {
            if(this.currentPage !== 0) {
                this.currentPage = this.currentPage - 1;
            }
            this.getProblemByActivityId()
        },
        nextPage() {
            if(this.currentPage !== this.totalPage - 1) {
                this.currentPage = this.currentPage + 1;
            }
            this.getProblemByActivityId()
        }
    }
  }
</script>
<style>
.tinyHead {
    font-size: 10px;
}
</style>