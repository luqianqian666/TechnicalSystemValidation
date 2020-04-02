<template>
 
<div  style="max-width: 1024px;text-align:center;margin:0 auto">   
  <el-container>
            <el-header><testCaseNavBar></testCaseNavBar> </el-header>
            <br>
    <!--<el-button type="text" @click="table = true">验证结果管理</el-button>-->
    <el-button type="text" @click="dialog = true">验证日志管理</el-button>
        <div>
        <el-radio-group v-model="direction">
        <el-radio label="btt" class="baseTitle" >验证结果管理


        </el-radio>
        <el-radio label="ttb"  @change="table = true" class="baseTitle">验证日志管理</el-radio>
        </el-radio-group>
      </div>
      <br>
                               <div >                            
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
                                  
                                  <el-button type="primary" size="mini"
                                        @click="overview_panels();charting();">加载数据
                                  </el-button>
                             </div>
                          <div>
                            
                          <el-collapse   v-model="activeNames" @change="handleChange"> 
                           <el-collapse-item  name="1" title="任务列表" style="background-color: rgb(240,222,237); ">
                           <el-row type="flex" :gutter="50" >
                           <el-col >
                           <div class="panel anel-danger" style="background-color: rgb(240,222,237); ">
                            <div class="panel-heading" style="text-align: center">任务列表</div>
                            <div class="panel-body">
                               <el-table max-height="300"   :data="servicesInfos"   @selection-change="handleSelectionChange"  ref="multipleTable" >                               
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  :reserver-selection="true"> </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="code"  min-width="200" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="describe" label="任务名称" min-width="550" align="center" show-overflow-tooltip="true"></el-table-column>
                               <el-table-column label="操作" min-width="100" align="center" >
                                <template slot-scope="scope">                               
                                     <span style="font-size: medium;">
                                       <el-link icon="el-icon-edit"  style="font-size: 12px" @click="viewMore(scope.row.code)">详细</el-link>&nbsp;                                    
                                    </span>
                                 </template>
                              </el-table-column>
                             </el-table>
                            </div>
                            </div>
                            </el-col>
                            </el-row >
                            </el-collapse-item>                          
                           </el-collapse>
      </div>
              
                    <el-drawer  style="max-width: 1024px;text-align:center;margin:0 auto"
                            title="验证日志管理!"
                            :visible.sync="table"
                            direction="btt"
                            size="82%" >
                              <el-table max-height="550"   :data="servicesInfos"   @selection-change="handleSelectionChange"  ref="multipleTable" >
                                  
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  :reserver-selection="true"> </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="code"  min-width="200" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="describe" label="特征描述" min-width="550" align="center" show-overflow-tooltip="true"></el-table-column>
                               <el-table-column label="操作" min-width="100" align="center" >
                                <template slot-scope="scope">
                                
                                     <span style="font-size: medium;">
                                       <el-link icon="el-icon-download"  style="font-size: 12px" @click="viewMore(scope.row.code)">导出</el-link>&nbsp;
                                     
                                    </span>

                                 </template>


                                </el-table-column>
                             </el-table>    
                             <br>       
                             <span style="float: right">
                             <el-button @click="upClick">
                              <i class="el-icon-edit"></i>批量导出
                              </el-button>
                              </span><br><br>            
                        </el-drawer>
  </el-container>
</div>
</template>

<script>
import logo from '@/components/logo'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
import leftBar from '@/components/leftBar'
import {Message} from 'element-ui'
import echarts from 'echarts'
import echartsLiquidfill from 'echarts-liquidfill'

  export default
   {
    data() {
      return {
        servicesInfos: [],
         tasknameSearch:'',
         multipleSelection:[],
        start_time:'',
        end_time:'',
        time_type:'',
        table: false,
        dialog: false,
        loading: false,
        formLabelWidth: '80px',
        timer: null,
        direction: 'btt',
        activeNames: ['1'],//折叠框默认展开1
          unstart: 40,
          pass: 10,
          fail: 20,
          block: 10,
          jump: 10,
          charts: '',
          checkingTestcases: ["54", "45", "32", "42", "25", "48", "40"],
          passingTestcases: ["18", "25", "12", "15", "17", "16", "20"],
          confirmingTestcases: ["5", "3", "0", "0", "2", "1", "0"],
          testingRequirements: ["80", "78", "73", "70", "69", "67", "66"],
          testCasePassRate: 0.5,
          testCoverRate: 0.25,
          oncePassRate: 0.75,
          backPassRate: 0.88



     };
       
      
    },
     mounted() {//用来向后端发起请求拿到数据以后做一些业务处理
     
   
      this.loadAllProjects();
    },

     created() {
       //初始化数据
       servicesInfos=[];
       
      this.loadAllProjects();  
      this.sevenTurnover();
      },

     methods: {
        handleChange(val) {
        console.log(val);
      },
      handleSelectionChange(val) {
        this.multipleSelection=val;
     
      },
      viewMore(){},
         getTaskNameList(){
         
       },
        loadAllProjects() {
                    
                           this.$axios.get('../static/descFile_0330.json')
                          .then(res =>{
                        
                            for(var i=0;i<res.data.module.length;i++)
                            {
                                 
                                if (res.data.module[i].name=="服务命名符合性验证"){
                                 // alert("okbb"+res.data.module[i].name);
                                  let categoryList= res.data.module[i].categoryList;
                               
                                  for(let j=0;j<categoryList.length;j++){
                                     
                                     let indicatorList= categoryList[j].indicatorList;
                                      
                                       for(let l=0;l<indicatorList.length;l++){
                                         let characteristicsList=indicatorList[l].characteristicsList;
                                         for(let m=0;m<characteristicsList.length;m++){
                                            console.log("characteristicsList[m].id"+characteristicsList[m].id);                                           
                                             this.servicesInfos.push({code:characteristicsList[m].id,describe:characteristicsList[m].desc});
                                            
                                          }       
                                       }                                    
                                  }                                  
                                }
                            }
                              console.log(this.servicesInfos);
                          })
                          .catch(err=>{console.log("error is"+err)}
                          )
                                              
     
                },
     
       upClick(){},

              
                
    
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
   
      
    },
     
     components: { logo,testCaseNavBar},
  }
</script>
<style scoped>
.activity-name{
 line-height: 100%;
 text-align:left;
 font-size:initial;
 font-family: inherit;
 vertical-align: middle;
 white-space: pre-line; 
}
/* 导航栏选择测试活动必须样式 */
.el-menu-demo /deep/  {
  background-color: inherit;
  border: 0;
}
/*.el-menu-item{
padding:0 20px 0 0px;
}*/
.baseTitle {
        font-size: x-large;
        font-weight: bold;
        float: center;
        
    }
.el-menu-demo .el-input {
  font-size: large;
  font-weight: bold;
  width: 30em;
  left: 0;
  
}
.el-menu.el-menu--horizontal {
  border: 0;
}
 .resultInfo{
    text-align: center;
    /* padding-left: 1%; */
    font-size: large;
   /* font-weight: bold;*/
    
}
  .testResultLine {
    /* border-bottom: 3px solid #ccc; */
    margin-bottom: -3px;
    display: inline-block;
    /* margin-left: -2px; */
    /* margin-right: -2px; */
    /* height: 50px; */
    /* font-size: 15px; */
    text-align: center;
    /* line-height: 20px; */
  }
  .testResultChart {
      font-size: medium;
      min-height: 300px;
      text-align: left;
      /* line-height: 45px; */
      padding-left: 1%;
  }

</style>
