<template>
    <div>
        <div style="text-align:left"> 
            <span>已执行用例数：</span>
                        <el-button type="text" class="status-content"><span>{{testCaseNums}}</span></el-button>
            <span>/{{totalTestCaseNums}}</span>
        </div>
        <el-table
            :data="testCases"
            border
            ref="filterTable"
            max-height="800"
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
                prop="softwarecode"
                label="被测软件编号"
                width="110" 
                align="left"
                header-align="center"
            >  
            </el-table-column>
            <el-table-column
                prop="status"
                label="用例状态"
                width="90" 
                align="center"
                :filters="[{text:'未填写',value:'未填写'},{text:'待审核',value:'待审核'},{text:'未执行',value:'未执行'},{text:'进行中',value:'进行中'},{text:'已执行',value:'已执行'},{text:'通过',value:'通过'},{text:'不通过',value:'不通过'},{text:'不具备测试条件',value:'不具备测试条件'}]"
                :filter-method="filterHandler"
            >  
            </el-table-column>
            <el-table-column
                prop="type"
                label="用例类型"
                width="90" 
                align="center"
                :filters="[{text:'功能测试',value:'功能测试'},{text:'性能测试',value:'性能测试'},{text:'流程测试',value:'流程测试'},{text:'接口测试',value:'接口测试'}]"
                :filter-method="filterHandler"
            >  
            </el-table-column>
            <el-table-column
                prop="regressionMark"
                label="首次/回归"
                width="85" 
                align="center"
            > 
            <template slot-scope="scope">
                <el-button disabled type="text" size="mini"  v-if="scope.row.regressionMark == 0" >首次</el-button>
                <span v-if="scope.row.regressionMark == 1">第1次回归</span>
                <span v-if="scope.row.regressionMark == 2">第2次回归</span>
                <span v-if="scope.row.regressionMark == 3">第3次回归</span>
            </template>
            </el-table-column>
            <el-table-column
                sortable
                prop="date"
                label="日期"
                width="75" 
                align="center"
            >  
            </el-table-column>
            <el-table-column
                prop="priority"
                label="优先级"
                width="70" 
                align="center"
            > 
                <template slot-scope="scope">
                        <el-button type="text" size="mini" style="color:#F56C6C" v-if="scope.row.priority == '紧急'" >紧急</el-button>
                        <el-button plain type="danger" size="mini" v-if="scope.row.priority == '高'">高</el-button>
                        <el-button plain type="warning" size="mini" v-if="scope.row.priority == '中'">中</el-button>
                        <el-button plain type="info" size="mini" v-if="scope.row.priority == '低'">低</el-button>
                </template> 
            </el-table-column>
            <el-table-column
                label="详情"
                align="center"
                width="95"
            > 
            <template slot-scope="scope"> 
            <el-dropdown>
                    <span class="el-dropdown-link">
                        详情<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="gotoTestCaseEdit(scope.row)">用例详情</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
export default {
    data() {
      return {
          testCases: [],
          currentPage: 0,
          totalPage: null,
      }
    },
    props: ['testCaseNums', 'totalTestCaseNums'],
    components: {},
    created(){
        this.getAllTestCases()
    },
    methods: {
        // 筛选用
        clearFilter() {
        this.$refs.filterTable.clearFilter();
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
      //获取初始数据
        getAllTestCases() {
            this.$axios.post('/activity/getCompleteCaseByActivity',this.qs.stringify({id: this.$store.state.activityId, offset: this.currentPage}),
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
        gotoTestCaseEdit(obj) {
            this.$router.push({name:'testCaseEdit', params:{testCase: obj}})
        },
        gotoTestProblem(testCaseId){
            //未完成,需判断有无相关问题
            
        },
        gotoTestRecord(obj){
            //未完成
        // this.$router.push({name:'testRecord', params:{testCase: obj}})
        }
    }
  }
</script>

<style>
  /* 下拉菜单必备样式 */
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 10px;
  }
</style>