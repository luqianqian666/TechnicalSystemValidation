<template>
    <div style="max-width: 1024px;text-align:center;margin:0 auto">
            <el-container>
                    <el-header><testCaseNavBar></testCaseNavBar> </el-header>
                        <br>
                     <el-row>
                        
                        <div  >
                        <div >
                          
                            <h3 class="panel-title"></h3>
                              <div id="filter_box" class="testCaseManageInfo">
                                 <!--<el-col :span="6">
                                    <el-input  placeholder="请输入任务名称" v-model="tasknameSearch" style="height:30px;line-height:30px ;width:420px" >
                                    <i class="el-icon-search el-input__icon" slot="suffix" @click="getTaskNameList"></i>
                                    </el-input> 
                                  </el-col>-->
                                  <label>任务名称：
                                   <el-input  size="mini" placeholder="请输入任务名称" v-model="tasknameSearch" style=" width:180px" >
                                    <i class="el-icon-search el-input__icon" slot="suffix" @click="getTaskNameList"></i>
                                    </el-input>
                                 </label>
                                  <label>开始时间：
                                    <el-date-picker
                                      v-model="start_time" type="date" placeholder="选择开始日期"
                                      format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
                                      size="mini">
                                    </el-date-picker>
                                  </label>
                                   <label>结束时间：
                                      <el-date-picker
                                      v-model="end_time" type="date" placeholder="选择结束日期"
                                      format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
                                      size="mini">
                                      </el-date-picker>
                                    </label>
                                    <label>状态：
                                     <el-select
                                      v-model="time_type" 
                                      slot="prepend"
                                      size="mini">
                                      <el-option key="2" label="已完成" value="2"></el-option>
                                      <el-option key="1" label="未完成" value="1"></el-option>
                                    </el-select>
                                   </label>
                                <el-button type="primary" size="mini"
                                        @click="overview_panels();charting();">加载数据
                                </el-button>
                            </div>
                            </div>
                            <div class="panel-body chart">
                              <el-table
                                     :data="fuzzy.slice((curPage-1)*pagesize,curPage*pagesize)"
                                      border
                                      ref="multipleTable"
                                       max-height="650" 
                                      >
                                     <!-- <el-table-column prop="index" label="序号"  align="center">
                                       <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                      </template>
                                      </el-table-column>-->
                                      <el-table-column
                                          prop="code"
                                          label="任务编号"
                                          width="100" 
                                          align="center"
                                          header-align="center"
                                      >  
                                      </el-table-column>
                                      <el-table-column
                                          prop="name"
                                          label="任务名称"
                                          align="center"
                                          header-align="center"
                                      >  
                                      </el-table-column>
                                     
                                      <el-table-column
                                          prop="status"
                                          label="状态"
                                          width="150" 
                                          align="center"
                                        
                                      >
                                           
                                      </el-table-column>
                                    
                                      
                                      <el-table-column
                                          sortable
                                          prop="startingTime"
                                          label="开始时间"
                                          width="180" 
                                          align="center"
                                          :filters="dateFilters"
                                          :filter-method="filterSoftwareCodeHandler"
                                            >
                                          <template slot-scope="scope">
                                              {{formatDate(scope.row.startingTime)}}
                                          </template>
                                      </el-table-column>

                                      
                                      <el-table-column
                                          sortable
                                          prop="endtingTime"
                                          label="更新时间"
                                          width="180" 
                                          align="center"
                                          :filters="dateFilters"
                                          :filter-method="filterSoftwareCodeHandler"
                                      >
                                          <template slot-scope="scope">
                                              {{formatDate(scope.row.endtingTime)}}
                                          </template>
                                      </el-table-column>
                                      <el-table-column
                                          label="详情"
                                          align="center"
                                          width="80"
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
                                               <el-link icon="el-icon-edit"  style="font-size: 12px" @click="viewMore(scope.row)">详细</el-link>&nbsp;
                                           <!--   <el-link @click="viewTestCase(scope.row)" :underline="false" >查看</el-link>-->
                                          </template>    
                                      </el-table-column>
                                  </el-table>
                                    <el-pagination
                                            :current-page.sync="curPage"
                                            :page-size="pagesize"
                                            :pager-count="17"
                                            :total="fuzzy.length"
                                            background
                                            layout="total, prev, pager, next, jumper">
                                      </el-pagination>
                            </div>
                        </div>
                       
                    </el-row>
            </el-container>
    </div>
</template>   
<script>
import logo from '@/components/logo'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
import {Message} from 'element-ui'
export default {
    name: "MissionList",
     data: function () {
      return {
        tasknameSearch:'',
        testCases:[],
        start_time:'',
        end_time:'',
        time_type:'',
        pagesize: 15,
        curPage: 1,
        search: '',
        dateFilters:[]
      }
    }, 
   /* props: ['testCases'],
    watch: {
        testCases: function(newVal,oldVal){
            newVal&& this.getSoftwareCodeFilters(this.testCases); //newVal存在的话执行函数
            newVal&& this.getDateFilters(this.testCases);
        }
    },
*/
    created(){
       this.time_type = '2';//默认状态按照已完成查询
        // this.tasknameSearch='';
         this.getTaskNameList();
         this.loadAllProjects();
    },
    mounted() {
     // this.time_type = '2';//默认状态按照已完成查询
      
    },
    computed: {
      global_url() {

        return config.getTaskMission();

      },
      // 模糊搜索
      fuzzy() {
        const tasknameSearch = this.tasknameSearch;
        const start_time=this.start_time;
        const end_time=this.end_time;
        const time_type=this.time_type
        if (tasknameSearch||start_time||end_time||time_type) {
        
          // filter() 方法创建一个新的数组，
          // 新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.testCases.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).indexOf(tasknameSearch||start_time||end_time||time_type) > -1
            })
          })
        }
        return this.testCases
      },
    },
  
    methods: 
    {
      /*加载所有项目*/
      loadAllProjects() 
      {
          this.$axios.get(this.global_url)
                          .then(resp =>{
                                   //请求成功后的处理函数   
                    if (resp && resp.data){
                        console.log(resp.data.content);
                        var contents=resp.data.content;
                        for(var m=0;m<contents.length;m++){
                        var currenttime= this.getDateStr(contents[m].updateTime);
                        var currentcreat= this.getDateStr(contents[m].createTime);
                        this.testCases.push({code:contents[m].task.id,name:contents[m].task.name,status:contents[m].testStatus,startingTime:currentcreat,endtingTime:currenttime});                                
                        }
                   
                    }else{
                     this.$alert('服务器返回错误', '提示', {
                     dangerouslyUseHTMLString: true
                      });
                         this.isAble=false;
                     }
  
                              
                          })
                          .catch(err=>{console.log("error is"+err)}
                          )
      },
      
      getDateStr(seconds) {
        var date = new Date(seconds)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var currentTime = year + "-" + month + "-" + day +"   "+ hour + ":" + minute + ":" + second;
        return currentTime
      },

       
         viewMore(obj) {
            //alert("obj="+obj);
            console.log(obj);
            this.$router.push({name:'taskDetail', params:{testCase: obj}})
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
        },
       getTaskNameList(){
         
       }
      
    },    
    components: { logo,testCaseNavBar},
  }
</script>


<style scope>
  
    /* 顶栏防止element自带高度覆盖 */
.el-header{
        padding: 0;
        height: 10% !important;
    }

.requirementSearchInfo {
      font-size: 17px;
      min-height: 45px;
      height: 100%;
      width: 100%;
      text-align: left;
      line-height: 45px;
      padding-left: 5px;
  }
    .baseTitle {
        font-size: x-large;
        font-weight: bold;
        float: left;
        margin:100px 0 0 100px；
    }
   
     .taskName {
        min-height: 45px;
        height: 100%;
        text-align: left;
        line-height: 45px;
    }
     /*筛选框利用相对定位进行微调*/
  #filter_box {
    position: relative;
    top: -23px;
    text-align: left;
  }

  /*时间选择框的宽度*/
  .el-date-editor.el-input {
    width: 167px;
  }
  .el-input.el-input__inner{
    height: 30px;
    line-height: 30px;
    left: 20px;
  }

  /*按月和按年的select宽度*/
  .el-select {
    width: 100px;
  }

  /*中间图表的样式*/
  #overview_chart_box {
    height: 400px;
    width: 100%;
    background-color: aliceblue;
  }

  /*左边表格时间选择按钮组位置微调*/
  .el-radio-group {
    position: relative;
    top: 6px;
  }
  .input-style{
    line-height: 30px;
    width: 300px;
    }
 .el-input.el-input__inner /deep/
  {
  	  line-height: 30px!important;
       height: 30px!important;
      width: 300px!important;      
  } 
  .testCaseManageInfo {
    max-height: 25px;

    text-align: left;
    line-height: 25px;
    padding-left: 5px;
  }
 
    
</style>