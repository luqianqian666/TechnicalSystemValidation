<template>
 
<div  style="max-width: 1024px;text-align:center;margin:0 auto">   
  <el-container>
            <el-header><testCaseNavBar></testCaseNavBar> </el-header>
            <br>
    <!--<el-button type="text" @click="table = true">验证结果管理</el-button>
    <el-button type="text" @click="dialog = true">验证日志管理</el-button>-->
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
                               <el-table max-height="300"   :data="fuzzy.slice((curPage-1)*pagesize,curPage*pagesize)"  @selection-change="handleSelectionChange"  ref="multipleTable" >                               
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  :reserver-selection="true"> </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="code"  min-width="100" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="describe" label="任务名称" min-width="200" align="center" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="status" label="验证结果" min-width="100" align="center" :show-overflow-tooltip="true"></el-table-column>
                               <el-table-column label="操作" min-width="100" align="center" >
                                <template slot-scope="scope">                               
                                     <span style="font-size: medium;">
                                       <el-link icon="el-icon-download"  style="font-size: 12px" @click="download(scope.row.code)">导出</el-link>&nbsp;                                    
                                    </span>
                                 </template>
                              </el-table-column>
                             </el-table>
                              
                            </div>
                            </div>
                            </el-col>
                            </el-row >
                            <br>       
                             <span style="float: right">
                             <el-button @click="downloadforlist">
                              <i class="el-icon-download"></i>批量导出
                              </el-button>
                              </span>
                            </el-collapse-item>     
                
                           </el-collapse>

                   </div>
              <div >
               <br>
                <div class="resultInfo">近七日任务执行情况</div>
                  <br><br>
               <div style="width: 100%; border-bottom: 3px solid #ccc; text-align: left; margin-left: 0px;display: flex">
                  <div class="testResultLine" :style="getLineStyle(unstart, 'unstart')">
                    未执行:{{unstart}}
                </div>
                <div class="testResultLine" :style="getLineStyle(pass, 'pass')">
                    通过:{{pass}}
                </div>
                <div class="testResultLine" :style="getLineStyle(fail, 'fail')">
                    失败:{{fail}}
                </div>
                <div class="testResultLine" :style="getLineStyle(block, 'block')">
                    阻塞:{{block}}
                </div>
                <div class="testResultLine" :style="getLineStyle(jump, 'jump')">
                    跳过:{{jump}}
                </div>
               </div>
              </div>


        <div style="width: 100%; margin-top: 30px">
         
            <el-row >
                <el-col :span="12">
                    <div class="testResultChart" style="width: 500px; height: 350px" id="testCasePassRate">
                        
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="testResultChart" style="width: 500px; height: 350px" id="testingRequirements">
                        
                    </div>
                </el-col>
            </el-row>
          
        </div>

                    <el-drawer  style="max-width: 1024px;text-align:center;margin:0 auto"
                            title="验证日志管理"
                            :visible.sync="table"
                            direction="btt"
                            :before-close="handleClose"
                            size="82%" >
                              <el-table max-height="550"   :data="servicesInfos"   @selection-change="handleSelectionChange"  ref="multipleTable" >
                                  
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  :reserver-selection="true"> </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="code"  min-width="200" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="describe" label="日志名称" min-width="550" align="center" :show-overflow-tooltip="true"></el-table-column>
                               <el-table-column label="操作" min-width="100" align="center" >
                                <template slot-scope="scope">
                                
                                     <span style="font-size: medium;">
                                       <el-link icon="el-icon-edit"  style="font-size: 12px" @click="viewMore(scope.row.code)">详细</el-link>&nbsp;
                                     
                                    </span>

                                 </template>


                                </el-table-column>
                             </el-table>    
                             <br>       
                             <span style="float: right">
                             <el-button @click="downloadforlist">
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
        show:false,
        servicesInfos: [],
         tasknameSearch:'',
         multipleSelection:[],
        start_time:'',
        end_time:'',
        time_type:'',
        pagesize: 15,
        curPage: 1,
        search: '',
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
          testingRequirements: ["80", "78", "73", "70", "69", "67", "66"],
          testCasePassRate: ["100", "78", "73", "50", "69", "67", "66"],
         // testCasePassRate: 0.5,
        



     };
       
      
    },

       computed: {
        global_url() {

        return config.getTaskMission();

      },
      // 模糊搜索
      fuzzy() {
        const tasknameSearch = this.tasknameSearch;
       
        if (tasknameSearch) {
          // if (start_time) {
           
          // filter() 方法创建一个新的数组，
          // 新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.servicesInfos.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).indexOf(tasknameSearch) > -1
            })
          })
        }
        return this.servicesInfos
      },
    },
     mounted() {//用来向后端发起请求拿到数据以后做一些业务处理
     
   
     
      this.$nextTick(function() {
           
            this.drawLine('testingRequirements');
            this.drawBar('testCasePassRate');
           // this.drawWaterBall('testCasePassRate');
          
        })
    },

     created() {
       //初始化数据
      // servicesInfos=[];
       
      this.loadAllProjects();  
    
      },

     methods: {
        handleChange(val) {
        console.log(val);
      },
      handleSelectionChange(val) {
        this.multipleSelection=val;
     
      },

      download(obj){
       
          this.exportRecord(obj);
         
      },
      downloadforlist(){
        for(var i = 0; i < this.multipleSelection.length; i ++) {
                this.exportRecord( this.multipleSelection[i].code)
            }
      },
      exportRecord(testcase) {

                let url = window.URL.createObjectURL(new Blob(["aaaaaaaaaaaaaa"]))
                let a = document.createElement('a')
                a.setAttribute("download",testcase+".doc")
                a.href = url
                a.click();

              /*  this.$axios.post('/testReport/download',
                this.qs.stringify({
                    caseId: testcase
                }),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            }).then(resp => {                   //请求成功后的处理函数   
                let url = window.URL.createObjectURL(new Blob([resp.data]))
                let a = document.createElement('a')
                a.setAttribute("download",testcase+".doc")
                a.href = url
                a.click();
            }).catch(err => {                 //请求失败后的处理函数   
                console.log(err)
            })*/
        },

      viewMore(){},
         getTaskNameList(){
         
       },
      getLineStyle(num, str) {
            var total = this.unstart + this.pass + this.fail + this.block + this.jump;
            var width = num/total*100;
            if(str == "unstart")
                return "border-bottom: 3px solid #1b8fff;color: #1b8fff;width:" + width + "%";
            else if(str == "pass")
                return "border-bottom: 3px solid #48a902;;color: #48a902;width:" + width + "%";
            else if(str == "fail")
                return "border-bottom: 3px solid #ec3200;color: #ec3200;width:" + width + "%";
            else if(str == "block")
                return "border-bottom: 3px solid #E6A23C;color: #E6A23C;width:" + width + "%";
            else
                return "color: #ccc;width:" + width + "%";
        },
        /*加载所有任务*/
      loadAllProjects() 
      {
          this.$axios.get(this.global_url,this.qs.stringify({page:this.curPage,size:this.pagesize }))
                          .then(resp =>{
                                   //请求成功后的处理函数   
                    if (resp && resp.data){
                        console.log(resp.data.content);
                        var contents=resp.data.content;
                         for(var m=0;m<contents.length;m++){
                            if(contents[m].updateTime==null){
                                    var currenttime= "";
                            }else{
                                var currenttime= this.getDateStr(contents[m].updateTime);
                            }
                             if(contents[m].createTime==null){
                                    var currentcreat= "";
                            }else{
                               var currentcreat= this.getDateStr(contents[m].createTime);
                            }
                        this.servicesInfos.push({code:contents[m].task.id,describe:contents[m].task.name,status:"验证成功"});                                
                        }
                        this.totalcount = resp.data.totalElements;
                     
                   
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
     
       upClick(){},

          drawWaterBall(id) {
            var chartTitle = '';
            var chartValue;
            if(id == "testCasePassRate") {
                chartTitle = '近七日验证通过率';
                chartValue = this.testCasePassRate;
            }
           
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption({
                title: {// 标题
                    text: chartTitle,
                    textStyle: {// 标题的样式
                        // color: '#ccc', // 字体颜色
                        // fontSize: 15,
                        align: 'center', // 文字的水平方式
                        baseline: 'middle',
                        position: 'inside',
                          fontWeight:'normal',    //粗细
                        verticalAlign: 'middle'// 文字的垂直方式
                    },
                left: 'center', // 定位
                top: '0%'
            },
            series: [{
                type: 'liquidFill',
                radius: '60%',
                waveAnimation: true,
                data: [{
                    value: chartValue,
                    direction: 'left',
                    itemStyle: {
                        normal: {
                            color: '#1890ff'
                        }
                    }
                }],
                outline: {
                    show: false , //是否显示轮廓 布尔值
                },
                itemStyle: {
                    opacity: 0.9, // 波浪的透明度
                    shadowBlur: 0 // 波浪的阴影范围
                },
                backgroundStyle: {
                    color: '#00c888' // 图表的背景颜色
                },
                label: { // 数据展示样式
                    show: true,
                    // color: '#000',
                    // insideColor: '#fff',
                    fontSize: 30, //百分比数字的字号大小
                    fontWeight: 400,
                    align: 'center',
                    baseline: 'middle',
                    position: 'inside'
                }
          }]
        })
        },
       //绘制折线图
        drawLine(id) {
            var yValue = [];
            var lineColor = '#1fadfd';
            var chartTitle = '';
             if(id == "testingRequirements") {
                yValue = this.testingRequirements;
                lineColor = '#ad2908';
                chartTitle = '剩余待验证项数';
            }
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption({
                title: {
                     text: chartTitle,
                     textStyle: {// 标题的样式
                        // color: '#ccc', // 字体颜色
                        // fontSize: 15,
                        align: 'center', // 文字的水平方式
                        baseline: 'middle',
                        position: 'inside',
                         fontWeight:'normal',    //粗细
                        verticalAlign: 'middle'// 文字的垂直方式
                    },
                      left: 'center', // 定位
                      top: '0%'
                   
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['近七日收益'],
                    show: false
                },
                grid: {
                    top: '30%',
                    left: '4%',
                    right: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    },
                    show: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ["TASK1","TASK2","TASK3","TASK4","TASK5","TASK6","TASK7"],
                    axisLabel: {
                        show: true,
                        // textStyle: {
                        //     color: '#CCC',  //更改坐标轴文字颜色
                        //     fontSize : 13      //更改坐标轴文字大小
                        // }
                    },
                    axisTick: {show: false},
                    boundaryGap: true
                },
                yAxis: {
                    type: 'value',
                    splitNumber: 6,
                    // axisLine: {
                    //     lineStyle: {
                    //         // 设置y轴颜色
                    //         color: '#ccc',
                    //         fontSize: '50px',
                    //     }
                    // },
                    axisLabel: {
                        show: true,
                        // textStyle: {
                        //     color: '#CCC',  //更改坐标轴文字颜色
                        //     fontSize : 13      //更改坐标轴文字大小
                        // }
                    },
                    axisTick: {show: false},
                    splitLine:{show: false},
                },
                series: [{
                    name: '数量',
                    type: 'line',
                    stack: '总量',
                    data: yValue,
                    itemStyle:{
                        normal:{
                            // 拐点上显示数值
                             label : {
                                show: true,
                                color: '#fff'
                            },
                            borderColor: lineColor,  // 拐点边框颜色
                            lineStyle:{                 
                                width: 2,  // 设置线宽
                                type: 'solid',  //'dotted'虚线 'solid'实线
                                color: lineColor
                            }
                        }
                    }
                }]
            })
        },
  
  
          drawBar(id) {
            var yValue = [];
            var lineColor = '#1fadfd';
            var chartTitle = '';
             if(id == "testCasePassRate") {
                yValue = this.testCasePassRate;
                lineColor = '#ad2908';
                chartTitle = '验证通过项数';
            }
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption({
                title: {
                     text: chartTitle,
                     textStyle: {// 标题的样式
                        // color: '#ccc', // 字体颜色
                        // fontSize: 15,
                        align: 'center', // 文字的水平方式
                        baseline: 'middle',
                        position: 'inside',
                         fontWeight:'normal',    //粗细
                        verticalAlign: 'middle'// 文字的垂直方式
                    },
                      left: 'center', // 定位
                      top: '0%'
                   
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['8888888'],
                    show: false
                },
                grid: {
                    top: '30%',
                    left: '4%',
                    right: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    },
                    show: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ["TASK1","TASK2","TASK3","TASK4","TASK5","TASK6","TASK7"],
                    axisLabel: {
                        show: true,
                        // textStyle: {
                        //     color: '#CCC',  //更改坐标轴文字颜色
                        //     fontSize : 13      //更改坐标轴文字大小
                        // }
                    },
                    axisTick: {show: false},
                    boundaryGap: true
                },
                yAxis: {
                    type: 'value',
                    splitNumber: 6,
                    axisLabel: {
                        show: true,
                        // textStyle: {
                        //     color: '#CCC',  //更改坐标轴文字颜色
                        //     fontSize : 13      //更改坐标轴文字大小
                        // }
                    },
                    axisTick: {show: false},
                    splitLine:{show: false},
                },
                series: [{
                    name: '数量',
                    type: 'bar',
                    stack: '总量',
                    data: yValue,
                    itemStyle:{
                        normal:{
                            // 拐点上显示数值
                             label : {
                                show: true,
                                color: '#fff'
                            },
                            borderColor: lineColor,  // 拐点边框颜色
                            lineStyle:{                 
                                width: 2,  // 设置线宽
                                type: 'solid',  //'dotted'虚线 'solid'实线
                                color: lineColor
                            }
                        }
                    }
                }]
            })
        },
        
              
                
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
              this.direction='btt';
          })
          .catch(_ => {});
      }
    
   
      
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
       font-weight: normal;
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
      text-align: center;
      /* line-height: 45px; */
      
  }

</style>
