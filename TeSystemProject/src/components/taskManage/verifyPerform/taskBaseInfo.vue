<template>
    <div style="max-width: 1024px;text-align:center;margin:0 auto">
        <el-container>
            <el-header><testCaseNavBar></testCaseNavBar> </el-header>
            <br>
             <el-row>
              <div  >
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div id="filter_box1" class="pull-right">
                        <span class="baseTitle">基本信息</span><br><br>
                        <br>
                        <el-row >
                          <el-col :span="3">
                          <div class="taskName" >
                           验证任务名称：
                          </div>
                          </el-col>
                          <el-col :span="21">   
                            <div class="requirementSearchInfo" >
                             <el-input placeholder="请输入内容" v-model="taskInfo.taskName"   > 
                               <i  slot="suffix" ></i>
                            </el-input>
                            </div>
                            
                         </el-col>
                        </el-row>
                       
                         <br>
                         <el-row >
                          <el-col :span="3">
                          <div class="taskName" >
                           被测软件:
                          </div>
                          </el-col>
                          <el-col :span="21">   
                            <div class="requirementSearchInfo" style="width:200px">
                              <el-select v-model="value" placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </div>
                            
                         </el-col>
                        </el-row>
                         <br>
                    </div>
                      <div id="filter_box" class="pull-right">
                        <span class="baseTitle">验证项选择</span><br><br>
                        <br>

                        <div style="margin-bottom: 30px; ">
                         <div label="特征项选择" name="first">
                           <br>
                           <el-collapse   v-model="activeNames" @change="handleChange">
                            <el-collapse-item title="服务命名特征 " name="1"  >
                            <el-row type="flex" :gutter="50" >
                              <el-col >
                              <div class="panel panel-danger" style="background-color: rgb(240,222,237); ">
                              <div class="panel-heading" style="text-align: center">服务命名特征选择</div>
                              <div class="panel-body">
                               <el-table max-height="300"   :data="servicesInfos"   @selection-change="handleSelectionChange"  ref="multipleTable" >
                                  
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  :reserver-selection="true"> </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="code"  min-width="200" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="describe" label="特征描述" min-width="550" align="center" :show-overflow-tooltip="true"></el-table-column>
                               <el-table-column label="操作" min-width="100" align="center" >
                                <template slot-scope="scope">
                                  <!--<el-button :icon="el_icon_star=scope.row.star?'el-icon-star-on':'el-icon-star-off'"
                                   circle :type="scope.row.star?'success':''" plain
                                  @click="payAttentionTo(scope.row.projectName,scope.row.star)">
                                  </el-button>
                                  <el-button icon="el-icon-setting" circle plain
                                  @click="getRepositoryOf(scope.row.projectName);dialogTableVisible = true">
                                  </el-button>
                                    -->
                                     <span style="font-size: medium;">
                                       <el-link icon="el-icon-edit"  style="font-size: 12px" @click="viewMore(scope.row.code)">详细</el-link>&nbsp;
                                     
                                    </span>

                                 </template>


                              </el-table-column>
                             </el-table>
                             <!-- <el-pagination style="text-align: center"
                                     :current-page.sync="curPage"
                                     :page-size="pagesize"
                                     :pager-count="17"
                                     :total="fuzzy.length"
                                     background
                                     layout="total, prev, pager, next, jumper">
                               </el-pagination>-->
                               
                            </div>
                            </div>
                            </el-col>
                            
                            </el-row>
                           </el-collapse-item >
                           <br>
                           <el-collapse-item title="服务元数据特征 " name="2">
                            <el-row type="flex" :gutter="50" >
                            
                              <el-col>   
                              <div class="panel panel-danger" style="background-color: rgb(240,222,237);">
                              <div class="panel-heading" style="text-align: center">元数据特征选择</div>
                              <div class="panel-body">
                              <el-table max-height="300"   :data="datasInfos"   @selection-change="handleSelectionChange1"   >
                                  
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  :reserver-selection="true"> </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="code"  min-width="200" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="describe" label="特征描述" min-width="550" align="center" :show-overflow-tooltip="true"></el-table-column>
                               <el-table-column label="操作" min-width="100" align="center" >
                                <template slot-scope="scope">
                                  <!--<el-button :icon="el_icon_star=scope.row.star?'el-icon-star-on':'el-icon-star-off'"
                                   circle :type="scope.row.star?'success':''" plain
                                  @click="payAttentionTo(scope.row.projectName,scope.row.star)">
                                  </el-button>
                                  <el-button icon="el-icon-setting" circle plain
                                  @click="getRepositoryOf(scope.row.projectName);dialogTableVisible = true">
                                  </el-button>
                                    -->
                                     <span style="font-size: medium;">
                                       <el-link icon="el-icon-edit"  style="font-size: 12px" @click="viewMore(scope.row.code)">详细</el-link>&nbsp;
                                     
                                    </span>

                                 </template>


                              </el-table-column>
                             </el-table>
                          <!--   <el-pagination style="text-align: center"
                                     :current-page.sync="curPage"
                                     :page-size="pagesize"
                                     :pager-count="17"
                                     :total="fuzzyd.length"
                                     background
                                     layout="total, prev, pager, next, jumper">
                               </el-pagination> -->
                              </div>
                            </div>
                            </el-col>
                        </el-row> 
                        </el-collapse-item >
                          <br>
                     </el-collapse>
  
                            <span style="float: right">
                             <el-button @click="nextClick">
                              <i class="el-icon-edit"></i>下一步
                              </el-button>
                              </span><br><br>
                       </div>                            
                      </div>    
                    </div>
              
                      <!--第二个面板-->

                        <div id="filter_box_file" class="pull-right" style="display:none" >
                          <span class="baseTitle">验证文件选择</span><br><br>
                            <br> 
                           <el-row type="flex" :gutter="50" >
                            <el-col :span="8">
                         <!--  <div class="panel panel-danger" style="background-color: rgb(240,222,237);border:2px solid rgb(240,222,237); height:300px " >-->
                           <div class="panel panel-danger" style="border:3px solid rgb(240,222,237); height:200px " >
                            <div class="panel-body">
                              <div class="requirementSearchInfo">
                                                   <!-- 文件上传 -->    
                                                       <el-upload
                                                           class="upload-demo"
                                                            ref="upload1" 
                                                           action=""
                                                           :on-preview="handlePreview"
                                                           :on-remove="handleRemove"
                                                           :before-upload="beforeAvatarUpload"
                                                           :before-remove="beforeRemove"
                                                           :on-change="handleChangeInter"
                                                           :on-error="uploadOnError"
                                                            accept=".xml"
                                                            multiple
                                                            :limit="1" 
                                                            :on-exceed="handleExceed"
                                                            :file-list2="fileList"
                                                            :show-file-list="true"                                        
                                                            :auto-upload="false"     
                                                            :http-request="uploadFile"                                                                                                       
                                                            v-model="taskInfo.descFile.interfaceFile">
                                                             <el-button size="small" class="el-icon-folder-opened" slot="trigger" type="primary"> 接口文件</el-button>
                                                             <span style=" font-size:12px">  只能上传xml文件  </span>
                                                           </el-upload>                                    

                              </div>
                            </div>
                           </div>
                         
                            </el-col>
                             <el-col :span="8">
                           <div class="panel panel-danger" style="border:3px solid rgb(240,222,237); height:200px  ">
                            
                            <div class="panel-body">
                              <div class="requirementSearchInfo">
                                                   <!-- 文件上传 -->    
                                                       <el-upload
                                                           class="upload-demo"
                                                           action=" "
                                                           :on-preview="handlePreview"
                                                          :before-upload="beforeAvatarUpload"
                                                           :on-remove="handleRemove"
                                                           :before-remove="beforeRemove"
                                                            :on-change="handleChangeSec"
                                                            :on-error="uploadOnError"
                                                            accept=".xml"
                                                             multiple
                                                            :limit="1"
                                                            :on-exceed="handleExceed"
                                                            :file-list2="fileList"
                                                            :http-request="uploadFile"
                                                            :show-file-list="true"
                                                            ref="upload2"
                                                            :auto-upload="false"
                                                             v-model="taskInfo.descFile.sectionFile">
                                                             <el-button size="small" class="el-icon-folder-opened" slot="trigger" type="primary">段文件</el-button>
                                                             <span style=" font-size:12px">  只能上传xml文件  </span>
                                                             <br>                       
                                                      </el-upload>                                    
                            </div>
                           </div>
                          </div>
                            </el-col>
                             <el-col :span="8">
                           <div class="panel panel-danger" style="border:3px solid rgb(240,222,237); height:200px  ">
                         <!--   <div class="taskName">注册文件：-->
                            <div class="panel-body">
                              <div class="requirementSearchInfo">
                                                   <!-- 文件上传 -->    
                                                       <el-upload
                                                           class="upload-demo"
                                                           action="https://jsonplaceholder.typicode.com/posts/"
                                                           :on-preview="handlePreview"
                                                            :before-upload="beforeAvatarUpload"
                                                           :on-remove="handleRemove"
                                                           :before-remove="beforeRemove"
                                                            :on-change="handleChangeReg"
                                                            :on-error="uploadOnError"
                                                            accept=".xml"
                                                             multiple
                                                            :limit="1"
                                                            :on-exceed="handleExceed"
                                                            :file-list2="fileList"
                                                            :show-file-list="true"
                                                            :http-request="uploadFile"
                                                             ref="upload"
                                                            :auto-upload="false"
                                                             v-model="taskInfo.descFile.registerFile">
                                                             <el-button size="small" class="el-icon-folder-opened" slot="trigger" type="primary">注册文件</el-button>
                                                             <span style=" font-size:12px">  只能上传xml文件  </span>
                                                             <br>         
                                                      </el-upload>                                    

                              </div>
                            </div>
                           </div>
                          <!--</div>-->
                            </el-col>
                        </el-row> <br>

                                    <el-row type="flex" :gutter="50">                                  
                                      <el-col :span="24">   
                                       <span style="float: right">
                                        <el-button @click="cancelClick">
                                          <i class="el-icon-edit"></i>取消
                                          </el-button>
                                          </span>

                                          <span style="float: right">
                                          <el-button @click="taskCreat">
                                          <i class="el-icon-edit"></i>任务创建
                                          </el-button>
                                          </span>  

                                          <span style="float: right">
                                          <el-button @click="perClick">
                                          <i class="el-icon-edit"></i>上一步
                                          </el-button>
                                          </span> 
                                      </el-col>
                                     </el-row> 

<!--
                                  <el-row >
                                     <el-col :span="2">
                                     <div class="taskName" >
                                     接口文件：
                                          </div>
                                      </el-col>
                                    <el-col :span="22">   
                                              <div class="requirementSearchInfo">
                                                     
                                                       <el-upload
                                                           class="upload-demo"
                                                           action="https://jsonplaceholder.typicode.com/posts/"
                                                           :on-preview="handlePreview"
                                                           :on-remove="handleRemove"
                                                           :before-remove="beforeRemove"
                                                             multiple
                                                            :limit="10"
                                                            :on-exceed="handleExceed"
                                                            :file-list="fileList"
                                                            :show-file-list="true"
                                                            v-model="descFile.interfaceFile">
                                                             <el-button size="small" class="el-icon-folder-opened" slot="trigger" type="primary"></el-button>
                                                             <br>
                                                                    
                                                             </el-upload>   
                                              </div>
                                    </el-col>
                                         
                                  </el-row>
                                      <br>
                                   <el-row >
                                     <el-col :span="2">
                                     <div class="taskName" >
                                     段文件:
                                          </div>
                                      </el-col>
                                       <el-col :span="22">   
                                       <div class="requirementSearchInfo">
                                          <el-input placeholder="文件路径" v-model="descFile.sectionFile">
                                          <template slot="append">  
                                                                    <el-upload 
                                                                    :action="uploadActionUrl"
                                                                     multiple
                                                                    :limit="3"
                                                                    :on-exceed="handleExceed"    
                                                                    :on-error="uploadError"
                                                                    :on-success="uploadSuccess"
                                                                    :on-remove="onRemoveTxt"
                                                                    :before-upload="onBeforeUpload"
                                                                    :file-list="files"
                                                                    :show-file-list="false">
                                                                    <i class="el-icon-folder-opened" slot="trigger" @click="getFiles" style="font-size: 20px;" ></i>  
                                                                  
                                                                  </el-upload>           
                                                                    </template>
                                            </el-input>
                                        </div>
                                     </el-col>
                                    </el-row>
                                              <br>
                                     <el-row >
                                      <el-col :span="2">
                                      <div class="taskName" >
                                      注册文件:
                                          </div>
                                        </el-col>
                                      <el-col :span="22">   
                                       <div class="requirementSearchInfo">
                                          <el-input placeholder="文件路径" v-model="descFile.registerFile">
                                                   <template slot="append">  
                                                           <el-upload  :action="uploadActionUrl"  :show-file-list="false" >
                                                                    <i class="el-icon-folder-opened" slot="trigger" @click="getFiles" style="font-size: 20px;" ></i>  
                                                            </el-upload>           
                                                    </template>
                                            </el-input>
                                        </div>
                                      </el-col>
                                     </el-row>
                                      <br>
                                    <el-row type="flex" :gutter="50">                                  
                                      <el-col :span="24">   
                                       <span style="float: right">
                                        <el-button @click="cancelClick">
                                          <i class="el-icon-edit"></i>取消
                                          </el-button>
                                          </span>

                                          <span style="float: right">
                                          <el-button @click="taskCreat">
                                          <i class="el-icon-edit"></i>任务创建
                                          </el-button>
                                          </span>  

                                          <span style="float: right">
                                          <el-button @click="perClick">
                                          <i class="el-icon-edit"></i>上一步
                                          </el-button>
                                          </span> 
                                      </el-col>
                                     </el-row> 
                         
                          -->
                          </div>

                  </div>
                </div>
              </div> 
            </el-row>
          </el-container>    
      </div>
</template>

<script>
import logo from '@/components/logo'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
import leftBar from '@/components/leftBar'
import {Message} from 'element-ui'

export default 
  {
     name: "ProjectList",
     data: function () {
      return {
        show:false,
         taskInfo: 
            {
              taskName: '',     
              descFile:
              {
                interfaceFile:null,
                sectionFile:null,
                registerFile:null
              } ,
              characteristic:[]  
            },     
          servicesInfos: [],//服务命名特征
          datasInfos: [],//服务数据列表
         activeNames: ['1'],//折叠框默认展开1

        
        value:'',    
        options:[],
        loading_top: null,
        //所有任务的数组
        project_list: [],
        multipleSelection:[],//服务特征列表
        multipleSelectiondata:[],//元数据特征
        fileList: [],//接收el-upload返回的file-list
        loading_bottom: null,
        pagesize: 5,
        curPage: 1,
       // search: '',
        // 项目对应的多个任务的对话框，内置了表格
        dialogTableVisible: false,
       
      
      }
    }, 
     mounted() {//用来向后端发起请求拿到数据以后做一些业务处理
      //this.loadStarProjects();
      this.loadAllProjects();
    },
     created() {
       //初始化数据
       this.taskInfo = 
           {
              taskName: '',  
              descFile:
              {
              interfaceFile:null,
              sectionFile:null,
              registerFile:null
              }, 
              characteristic:[]               
            },
              
              servicesInfos=[];
              datasInfos=[];
       
     this.loadAllProjects();  
   // this.$refs.multipleTable.toggleAllSelection();//默认全选
     this.fileList=[];
     
      },
    computed: //赋值
    {
        global_url() {
        return config.getTaskUrl();
      },
     /* 
      // 模糊搜索
   /*   fuzzy() {
        const search = this.search;
        if (search) {
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
              return String(data[key]).indexOf(search) > -1
            })
          })
        }
        return this.servicesInfos;
      },*/

    
    },
    methods: 
    {


          
      toggleSelection(rows) {
        if (rows) {
           rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      handleSelectionChange(val) {
        this.multipleSelection=val;
     
      },
        
        handleSelectionChange1(val) {
          this.multipleSelectiondata=val;
    
       
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

        beforeAvatarUpload(file) {

           var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)   
                    const isxml = testmsg === 'xml'     
              if (!isxml) {
                  this.$message.error('上传文件只能是 xml 格式!');
              }
        
            return isxml;
      },
     
     
     handleChangeInter(file, fileList) {
     
     
       this.fileList=fileList;
      
       this.taskInfo.descFile.interfaceFile=file.raw;
     
       this.fileList=[];
     
      },


       handleChangeSec(file, fileList) {
          this.fileList=fileList;
      
           this.taskInfo.descFile.sectionFile=file.raw;
        this.fileList=[];
       
      },
       handleChangeReg(file, fileList) {
        this.fileList=fileList;
          // let formData = new window.FormData();
          // formData.append('file', file);
       this.taskInfo.descFile.registerFile=file.raw;
       // this.taskInfo.descFile.registerFile=fileList.slice(-3)[0].name;;
      
        this.fileList=[];
       
      },
      uploadOnError(){
       this.$message.warning("文件上传失败,请重新操作");
      },
       
      uploadFile(file) {

        this.file = file.file;
        console.log(file.file.name+"+++")
         
        },
                    /*加载所有元数据*/
                    loadAllProjects() {
                     
                         this.$axios.get('../static/descFile_0330.json')
                          .then(res =>{
                        
                            for(var i=0;i<res.data.module.length;i++)
                            {
                                
                                if (res.data.module[i].name=="服务命名符合性验证"){
                                
                                  let categoryList= res.data.module[i].categoryList;
                               
                                  for(let j=0;j<categoryList.length;j++){
                                     
                                     let indicatorList= categoryList[j].indicatorList;
                                      
                                       for(let l=0;l<indicatorList.length;l++){
                                         let characteristicsList=indicatorList[l].characteristicsList;
                                         for(let m=0;m<characteristicsList.length;m++){                                           
                                             this.servicesInfos.push({code:characteristicsList[m].id,describe:characteristicsList[m].desc});
                                            // console.log("characteristicsList[m].id"+characteristicsList[m].id);
                                          }       
                                       }                                    
                                  }                                  
                                }else if(res.data.module[i].name=="服务元数据符合性验证"){
                                   
                                  let categoryList= res.data.module[i].categoryList;
                                
                                  for(let j=0;j<categoryList.length;j++){
                                     
                                     let indicatorList= categoryList[j].indicatorList;
                                      console.log(indicatorList);
                                       for(let l=0;l<indicatorList.length;l++){
                                         let characteristicsList=indicatorList[l].characteristicsList;
                                         for(let m=0;m<characteristicsList.length;m++){                                           
                                             this.datasInfos.push({code:characteristicsList[m].id,describe:characteristicsList[m].desc});
                                            // console.log("characteristicsList[m].id"+characteristicsList[m].id);
                                          }       
                                       }                                    
                                  }    

                                }
                            }
                              
                          })
                          .catch(err=>{console.log("error is"+err)}
                          )
                                              
              },

            nextClick() //下一步
            {
              /*切换div */
                document.getElementById("filter_box").style.display="none";
                document.getElementById("filter_box_file").style.display="";
            },
             perClick() //上一步
            {
              /*切换div */
                document.getElementById("filter_box").style.display="";
                document.getElementById("filter_box_file").style.display="none";
            },
             taskCreat() //创建任务
            {
              this.taskInfo.characteristic=[];
              var namenn=this.taskInfo.taskName;//任务名称
            
              if(this.taskInfo.taskName=="undefined" || this.taskInfo.taskName=='' || this.taskInfo.taskName==null)//判断任务名称是否为空
              {
             
                return  Message.error({message: "任务名称不能为空"});
              }
              else //执行请求
              {  
               
               for( var i=0;i<this.multipleSelection.length;i++){
                    this.taskInfo.characteristic.push(this.multipleSelection[i].code);//添加命名特征列表id
                }
                for( var i=0;i<this.multipleSelectiondata.length;i++){
                    this.taskInfo.characteristic.push(this.multipleSelectiondata[i].code);//添加元数据列表id
                }

                
               // var finalObj = JSON.stringify(this.taskInfo);//封装成json传输到后台
                console.log("finalObj="+this.taskInfo);
                this.$refs.upload1.submit();
                  this.$refs.upload2.submit();
                    this.$refs.upload.submit();
                const formData = new FormData();
                formData.append("data",JSON.stringify(this.taskInfo));
                formData.append("interfaceFile",this.taskInfo.descFile.interfaceFile);
                formData.append("sectionFile",this.taskInfo.descFile.sectionFile);
                formData.append("registerFile",this.taskInfo.descFile.registerFile);
             
                /*执行请求*/
               this.$axios.post(this.global_url,formData,
                {
                    header: {
                         'Content-Type': 'multipart/form-data'
                    }
                 }).then(resp => { 
                   console.log("aaaaaaaa="+resp);                  //请求成功后的处理函数   
                 if (resp && resp.data){
                  if ("success" == resp.data.result) {
                   console.log("resp.data.result="+resp.data.result);
                    this.$message.warning("验证成功");
                    
                   } else {
                    if("Invaild File" == resp.data.reason){ 

                       this.$alert('文件格式错误', '提示', {
                     dangerouslyUseHTMLString: true
                      });
                  
                    }else{
                        Message.error({message: "验证失败"})
                    }
                    }
                    }else{
                     this.$alert('服务器返回错误', '提示', {
                     dangerouslyUseHTMLString: true
                      });
                    }
                  }).catch(err => {                 //请求失败后的处理函数   
                      console.log(err)
                })

              

              }
             
             //清空文件列表
                this.fileList= []; 
              /*  this.taskInfo = 
                {
                  taskName: '',  
                  descFile:
                  {
                  interfaceFile:null ,
                  sectionFile:null,
                  registerFile:null
                  }, 
                  characteristic:[]               
                }*/
              
            },
             cancelClick() //取消
            {            
                console.log("adsasda");                         
            },         
            deleteDataInfo(code) {
            //删除数据信息，提交至后台，以id作为参数
            this.$axios.post(this.global_url,this.qs.stringify({id: code}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
                 }).then(resp => { 
                   console.log("aaaaaaaa="+resp);                  //请求成功后的处理函数   
                 if (resp && resp.data){
                    if ("success" == resp.data.result) {
                    console.log("resp.data.result="+resp.data.result);
                    this.$message.warning("验证成功");
                    
                   } else {
                     if("Invaild File" == resp.data.reason){ 

                         this.$alert('文件格式错误', '提示', {
                        dangerouslyUseHTMLString: true
                      });
                  
                      }else{
                        Message.error({message: "验证失败"})
                      }
                    }
                  }else{
                      this.$alert('服务器返回错误', '提示', {
                     dangerouslyUseHTMLString: true
                      });
                    }
                  }).catch(err => {                 //请求失败后的处理函数   
                      console.log(err)
                })

        },
        
        viewMore(dataset) {
            //查看数据的详细信息
             console.log(dataset+"*****")
            //this.$router.push({name: "dataInfoImport", params: {datasetAbout: dataset}});
        },
        handleChange(val) {
          5749+2210
          26+10+2.8
        console.log(val);
      },

            
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
 .img{opacity:0;}      
   .imgs{border:1px solid #78C3F3;background: #AADFFD;color: #1E88C7;border-radius: 4px;text-align:center;cursor: pointer;            padding:10px;}

    
</style>