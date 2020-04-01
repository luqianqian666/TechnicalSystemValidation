<template>
  <div>
    <p style="text-align:left">步骤</p>
        <el-table
            border
            :data="procedures"
           
            >
            <el-table-column
                type="expand"
            >
                <template slot-scope="props">
                    <el-row>
                        <el-col :span="2" class="add-col">步骤描述：</el-col>
                        <el-col :offset="11" :span="2" class="add-col">预期结果：</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-input
                                size="medium"
                                :rows="4"
                                type="textarea"
                                v-model="props.row.description"
                                resize="none"
                                maxlength="100"
                                show-word-limit
                            >
                            </el-input>
                        </el-col>
                        <el-col :offset="3" :span="10">
                            <el-input
                                size="medium"
                                :rows="4"
                                type="textarea"
                                v-model="props.row.expectedResult"
                                resize="none"
                                maxlength="100"
                                show-word-limit
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                    <!-- 普通步骤和脚本运行步骤 -->
                    <div v-if="props.row.type === '普通' || props.row.type === '脚本运行'">
                        <el-row >
                            <el-col :span="2" class="add-col">启动命令：</el-col>
                            <el-col :offset="11" :span="2" class="add-col">数据：</el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="10">
                                <el-input 
                                    :rows="1"
                                    type="textarea"
                                    maxlength="60"
                                    show-word-limit
                                    v-model="props.row.parameterFilePath">
                                </el-input>
                            </el-col>
                            <el-col :offset="3" :span="10">
                                <el-input
                                    size="medium"
                                    :rows="1"
                                    type="textarea"
                                    v-model="props.row.datasetId"
                                    resize="none"
                                    maxlength="100"
                                    show-word-limit
                                >
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="props.row.type === '环境模拟' || props.row.type === '接口数据模拟'">
                        <!-- Web并发模拟 -->
                        <div v-if="props.row.paramType === 0">
                            <br>
                            <span>Web并发访问模拟参数</span>
                            <br><br>
                            <el-row >
                                <el-col :span="3" class="webTitle">用户数量：</el-col>
                                <el-col :offset="3" :span="3"><div class="webTitle">执行次数：</div></el-col>
                                <el-col :offset="3" :span="3" class="webTitle"><div>请求方式：</div></el-col>
                                
                            </el-row>
                            <el-row>
                                <el-col :span="3"><div class="webTitle">{{props.row.children.userNumber}}</div></el-col>
                                <el-col :offset="3" :span="3"><div class="webTitle">{{props.row.children.execTimes}}</div></el-col>
                                <el-col :offset="3" :span="4"><div class="webTitle">
                                        <span v-if="props.row.children.methods === 0">POST</span>
                                        <span v-if="props.row.children.methods === 1">GET</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="4"><div class="webTitle">请求地址(IP)：</div></el-col>
                                <el-col :offset="2" :span="4"><div class="webTitle">端口：</div></el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="6"><div class="webTitle">{{props.row.children.ip}}</div></el-col>
                                <el-col :span="3"><div class="webTitle">{{props.row.children.port}}</div></el-col>
                            </el-row>
                        </div>
                        <!-- 数据并发下载模拟 -->
                        <div v-if="props.row.paramType === 1">
                            <br>
                            <span v-if="props.row.children.protocol === 0">FTP协议</span>
                            <span v-if="props.row.children.protocol === 1">TCP协议</span>
                            <span v-if="props.row.children.protocol === 2">HTTP协议</span>
                            <span>数据并发下载模拟参数</span>
                            <br><br>
                            <el-row >
                                <el-col :span="4"><div class="dataTitle">服务器地址IP：</div></el-col>
                                <el-col :span="7"><div class="dataTitle" >{{props.row.children.ip}}</div></el-col>
                                <el-col :span="4" :offset="2" v-if="props.row.children.protocol !== 2"><div class="dataTitle" >登录配置</div></el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="4"><div class="dataTitle">下载文件路径：</div></el-col>
                                <el-col :span="7"><div class="dataTitle" >{{props.row.children.targetFilePath}}</div></el-col>
                                <el-col :span="2" :offset="2" v-if="props.row.children.protocol !== 2"><div class="dataTitle">用户名：</div></el-col>
                                <el-col :span="6" v-if="props.row.children.protocol !== 2"><div class="dataTitle" >{{props.row.children.username}}</div></el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="4"><div class="dataTitle">目的存储路径：</div></el-col>
                                <el-col :span="7"><div class="dataTitle" >{{props.row.children.downloadToPath}}</div></el-col>
                                <el-col :span="2" :offset="2" v-if="props.row.children.protocol !== 2"><div class="dataTitle">密码：</div></el-col>
                                <el-col :span="6" v-if="props.row.children.protocol !== 2"><div class="dataTitle" >{{props.row.children.password}}</div></el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="4"><div class="dataTitle">用户数：</div></el-col>
                                <el-col :span="3"><div class="dataTitle" >{{props.row.children.userNumber}}</div></el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="4"><div class="dataTitle">下载数/并发数：</div></el-col>
                                <el-col :span="3"><div class="dataTitle" >{{props.row.children.concurrency}}</div></el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="4"><div class="dataTitle">端口：</div></el-col>
                                <el-col :span="3"><div class="dataTitle" >{{props.row.children.port}}</div></el-col>
                            </el-row>
                        </div>
                        <!-- 计算资源负载模拟 -->
                        <div v-if="props.row.paramType === 2">
                            <br>
                            <span>计算资源负载模拟参数</span>
                            <br><br>
                            <el-card>
                                <el-row >
                                    <el-col :span="4"><div class="caculateTitle">CPU占用率：</div></el-col>
                                    <el-col :span="4" :offset="1"><div class="caculateTitle">占用时间：</div></el-col>
                                    <el-col :span="5" :offset="2"><div class="caculateTitle">IP：</div></el-col>
                                    <el-col :span="3" :offset="2"><div class="caculateTitle">端口：</div></el-col>
                                    
                                </el-row>

                                <el-row >
                                    <el-col :span="4">
                                    <el-input v-model="props.row.children.occupation">
                                        <template slot="append">%</template>
                                    </el-input>
                                    </el-col>
                                    <el-col :offset="1" :span="4">
                                    <el-input v-model="props.row.children.duration">
                                        <template slot="append">秒</template>
                                    </el-input>
                                    </el-col>
                                    <el-col :span="5" :offset="2">
                                    <el-input v-model="props.row.children.ip"></el-input>
                                    </el-col>
                                    <el-col :span="3" :offset="2">
                                    <el-input v-model="props.row.children.port"></el-input>
                                    </el-col>
                                    
                                </el-row>
                                <el-row>
                                <el-col :span="4"><div class="caculateTitle">内存：</div></el-col>
                                <el-col :offset="7" :span="5"><div class="caculateTitle">用户名：</div></el-col>
                                <el-col :span="5"><div class="caculateTitle">密码：</div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4">
                                    <el-input v-model="props.row.children.memory"></el-input>
                                    </el-col>
                                    <el-col :offset="7" :span="5">
                                    <el-input v-model="props.row.children.username"></el-input>
                                    </el-col>
                                    <el-col :span="5">
                                    <el-input v-model="props.row.children.password"></el-input>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </div>
                        <!-- 网络负载模拟 -->
                        <div v-if="props.row.paramType === 3">
                            <br>
                            <span>网络负载模拟参数</span>
                            <br><br>
                            <el-row>
                                <el-col :span="5"><div class="internetTitle">起始IP：</div></el-col>
                                <el-col :span="5" :offset="1"><div class="internetTitle">结束IP：</div></el-col>
                                <el-col :offset="2" :span="4" class="internetTitle">带宽占用：</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5"><div class="internetTitle" ><el-input v-model="props.row.children.ipStart"></el-input></div></el-col>
                                <el-col :span="5" :offset="1"><div class="internetTitle" ><el-input v-model="props.row.children.ipEnd"></el-input></div></el-col>
                                <el-col :offset="2" :span="3">
                                    <!-- <el-input v-model="props.row.children.occupation"></el-input> -->
                                    {{props.row.children.occupation+props.row.children.unit}}
                                </el-col>
                                <!-- <el-col :span="3">
                                    <el-select v-model="props.row.children.unit" placeholder="请选择单位">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col> -->
                            </el-row>
                            <el-row>
                                <el-col :span="5"><div class="internetTitle">用户名：</div></el-col>
                                <el-col :span="5" :offset="1"><div class="internetTitle">用户名：</div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5"><div class="internetTitle" ><el-input v-model="props.row.children.usernameFirst"></el-input></div></el-col>
                                <el-col :span="5" :offset="1"><div class="internetTitle" ><el-input v-model="props.row.children.usernameSecond"></el-input></div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5"><div class="internetTitle">密码：</div></el-col>
                                <el-col :span="5" :offset="1"><div class="internetTitle">密码：</div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5"><div class="internetTitle" ><el-input v-model="props.row.children.passwordFirst"></el-input></div></el-col>
                                <el-col :span="5" :offset="1"><div class="internetTitle" ><el-input v-model="props.row.children.passwordSecond"></el-input></div></el-col>
                            </el-row>
                        </div>
                         <!-- 接口数据模拟 -->
                        <div v-if="props.row.paramType === 4">
                            <el-row>
                                <el-col :span="2" class="add-col">数据加工方</el-col>
                                <el-col :offset="7" :span="2" class="add-col">发送协议</el-col>
                                <el-col :offset="4" :span="2" class="add-col">数据类型</el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="7">
                                    <el-input v-model="props.row.children.dataProcessor"></el-input>
                                </el-col>
                                <el-col :offset="2" :span="4">
                                    <el-select v-model="props.row.children.protocol">
                                            <el-option
                                            v-for="item in protocolTypes"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :offset="2" :span="4">
                                    <el-select v-model="props.row.children.dataType">
                                            <el-option
                                                v-for="item in dataTypes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="4" class="add-col">数据源路径</el-col>
                                <el-col :offset="5" :span="4" class="add-col">加工服务路径</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="7"><el-input v-model="props.row.children.dataSourcePath"></el-input></el-col>
                                <el-col :offset="2" :span="7"><el-input v-model="props.row.children.processPath"></el-input></el-col>
                            </el-row>
                                
                            <el-row>
                                <el-col :span="4" class="add-col">目的方软件标识</el-col>
                                <el-col :offset="5" :span="5" class="add-col">目的方IP</el-col>
                                <el-col :span="3" class="add-col">端口号</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="7"><div ><el-input v-model="props.row.children.targetSoftwareCode"></el-input></div></el-col>
                                <el-col :offset="2" :span="5"><div ><el-input v-model="props.row.children.targetIp"></el-input></div></el-col>
                                <el-col :span="2"><div ><el-input v-model="props.row.children.port"></el-input></div></el-col>
                            </el-row>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="序号"
                type="index">
            </el-table-column>
            <el-table-column
                v-for="(item, index) in col"
                :key="`col_${index}`"
                :prop="col[index].prop"
                :label="item.label"
            >
            <template slot-scope="scope">
                <p>{{ scope.row[item.prop] }}</p>
            </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="150px"
            >
            <template slot-scope="scope">
                <el-button size="mini" plain type="danger" @click="deleteProcedure(scope.row.id)">
                    删除
                </el-button>
                <el-button size="mini" plain type="primary" v-if="scope.row.type !== '普通'" @click="confirmStart(scope.row.id)">
                    启动
                </el-button>
            </template>
            </el-table-column>

        </el-table>
        <br>

     
        <div v-for="(item,index) in newProcedure" :key="index" >
            <el-card class="box-card" :style="cardClass(item.caseStepInfo.type)">
                <el-row>
                     <el-col :span="1">{{item.caseStepInfo.serialNumber}}</el-col>
                    <el-col :span="3">{{item.caseStepInfo.type}}</el-col>

                    <!-- 普通 步骤特有 -->
                    <el-col v-if="item.caseStepInfo.type == '普通'" :offset="15" :span="4" class="text-align-right"> 
                        <el-dropdown>
                            <span class="operation-button">
                                <i class="el-icon-document">选择数据文件</i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action=""
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :http-request="uploadProcedureFile"
                                        :limit="1"
                                        >
                                        <el-button  slot="trigger" size="small" type="text" class="operation-button"><i class="el-icon-folder-opened">上传本地数据文件</i></el-button>
                                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                    </el-upload>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button size="small" type="text" class="operation-button" @click="viewDialog"><i class="el-icon-folder-opened">选择已有数据文件</i></el-button>
                                    <span v-if="newProcedure[0].caseStepInfo.datasetId !== ''">(已选择)<el-link :underline="false" @click="cancleChose" title="取消选择"><i class="el-icon-close"></i></el-link></span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dialog title="数据信息列表" style="text-align: left" width='70%' :visible.sync="dialogTableVisible">  
                            <el-row type="flex" :gutter="20">
                                <el-col :span="6">
                                    <div class="dataInfoSearchInfo">
                                        <el-input placeholder="请输入内容" v-model="searchString">
                                            <i class="el-icon-search el-input__icon" slot="suffix" @click="getDataset"></i>
                                        </el-input>
                                    </div>
                                </el-col>
                                <el-col :span="18">
                                    <div class="dataInfoSearchInfo search-type" style="line-height: 35px">
                                        <template>
                                            <el-radio v-model="searchByString" label="名称">按数据名称搜索</el-radio>
                                            <el-radio v-model="searchByString" label="编号">按数据编号搜索</el-radio>
                                            <el-radio v-model="searchByString" label="类型">按数据类型搜索</el-radio>
                                            <el-radio v-model="searchByString" label="卫星名称">按卫星名称搜索</el-radio>
                                        </template>
                                    </div>
                                </el-col>
                            </el-row> 
                            <el-table 
                                :data="dataset"  
                            >
                                <el-table-column property="code" label="数据编号" width="150"></el-table-column>
                                <el-table-column property="name" label="数据名称" width="250"></el-table-column>
                                <el-table-column property="type" label="数据类型" width="150"></el-table-column>
                                <el-table-column property="satelliteName" label="卫星名称" width="150"></el-table-column>
                                <el-table-column property="status" label="数据状态" width="150"></el-table-column>
                                <el-table-column label="选择" width="150">
                                    <template slot-scope="scope">
                                        <el-button size="small" class="operation-button" @click="chose(scope.row.id)">选择</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <span style="float: right;font-size: 18px" v-if="dataset.length !== 0">
                                <i class="el-icon-arrow-left" style="font-weight: bolder" @click="prePage"></i> 
                                    {{currentPage + 1}}/{{totalPage}} 
                                <i class="el-icon-arrow-right" style="font-weight: bolder" @click="nextPage"></i>
                            </span>
                        </el-dialog>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="add-col">步骤描述：</el-col>
                    <el-col :offset="11" :span="2" class="add-col">预期结果：</el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-input
                            size="medium"
                            :rows="4"
                            type="textarea"
                            placeholder="请输入步骤描述"
                            v-model="item.caseStepInfo.description"
                            resize="none"
                            maxlength="100"
                            show-word-limit
                        >
                        </el-input>
                    </el-col>
                    <el-col :offset="3" :span="10">
                        <el-input
                            size="medium"
                            :rows="4"
                            type="textarea"
                            placeholder="请输入预期结果"
                            v-model="item.caseStepInfo.expectedResult"
                            resize="none"
                            maxlength="100"
                            show-word-limit
                        >
                        </el-input>
                    </el-col>
                </el-row>
                <!-- 脚本运行 步骤特有 -->
                <div v-if="item.caseStepInfo.type == '脚本运行'">
                    <el-row >
                        <el-col :span="2" class="add-col">启动命令：</el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="10">
                            <el-input 
                                :rows="1"
                                type="textarea"
                                maxlength="60"
                                show-word-limit
                                v-model="item.caseStepInfo.parameterFilePath"
                                placeholder="请输入启动命令">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>

                <!-- 接口数据模拟 步骤特有 -->
                <div v-if="item.caseStepInfo.type == '接口数据模拟'">
                    <el-row>
                        <br>
                        <el-col :span="8"><div class="add-col">接口数据模拟参数填写</div></el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="2" class="add-col">数据加工方</el-col>
                        <el-col :offset="7" :span="2" class="add-col">发送协议</el-col>
                        <el-col :offset="4" :span="2" class="add-col">数据类型</el-col>
                    </el-row>

                    <el-row>
                         <el-col :span="7">
                             <el-input v-model="item.paramInterfaceInfo.dataProcessor"></el-input>
                         </el-col>
                         <el-col :offset="2" :span="4">
                            <el-select v-model="item.paramInterfaceInfo.protocol">
                                    <el-option
                                    v-for="item in protocolTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                            </el-select>
                         </el-col>
                         <el-col :offset="2" :span="4">
                            <el-select v-model="item.paramInterfaceInfo.dataType">
                                    <el-option
                                        v-for="item in dataTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                            </el-select>
                         </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="4" class="add-col">数据源路径</el-col>
                        <el-col :offset="5" :span="4" class="add-col">加工服务路径</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"><el-input v-model="item.paramInterfaceInfo.dataSourcePath"></el-input></el-col>
                        <el-col :offset="2" :span="7"><el-input v-model="item.paramInterfaceInfo.processPath"></el-input></el-col>
                    </el-row>
                        
                    <el-row>
                        <el-col :span="4" class="add-col">目的方软件标识</el-col>
                        <el-col :offset="5" :span="5" class="add-col">目的方IP</el-col>
                        <el-col :span="3" class="add-col">端口号</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"><div ><el-input v-model="item.paramInterfaceInfo.targetSoftwareCode"></el-input></div></el-col>
                        <el-col :offset="2" :span="5"><div ><el-input v-model="item.paramInterfaceInfo.targetIp"></el-input></div></el-col>
                        <el-col :span="2"><div ><el-input v-model="item.paramInterfaceInfo.port"></el-input></div></el-col>
                    </el-row>
                </div>

                <!-- 环境模拟 步骤特有 -->
                <div v-if="item.caseStepInfo.type == '环境模拟'">
                    <el-row>
                        <br>
                        <el-col :span="8"><div class="add-col">配置环境模拟参数(仅保存选中标签类型的模拟参数)</div></el-col>
                        <br>
                    </el-row>
                    <el-row>
                        <el-col :span="18">
                            <div style="text-align:left;">
                                <el-tabs v-model="activeName" type="border-card">
                                    <el-tab-pane label="Web并发访问模拟" name="0">
                                        <webSimulate ref="webSimulate">
                                        </webSimulate>
                                    </el-tab-pane>
                                    <el-tab-pane label="数据并发下载模拟" name="1">
                                        <dataSimulate ref="dataSimulate"></dataSimulate>
                                    </el-tab-pane>
                                    <el-tab-pane label="计算资源负载环境模拟" name="2">
                                        <caculateSimulate ref="caculateSimulate"></caculateSimulate>
                                    </el-tab-pane>
                                    <el-tab-pane label="网络负载环境模拟" name="3">
                                        <internetSimulate ref="internetSimulate"></internetSimulate>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <el-row>
                    <br>
                    <br>
                    <el-col :offset="20" :span="3">
                        <el-button size="small" plain type="primary" @click="saveCurrentProcedure" style="float:right;margin-left:8%">
                            保存
                        </el-button>
                        <el-button size="small"  @click="cancleAddProcedure" style="float:right">
                            取消
                        </el-button>
                        
                    </el-col>

                </el-row>
            </el-card>

       </div>
        
        <br><br>
        <el-row>
            <el-col :span="24">
                <div style="float:right">
                    <el-button plain @click="addProcedure"><span><i class="el-icon-edit"></i>新建普通步骤</span></el-button>
                    <el-button type="primary" plain @click="addShellProcedure"><span><i class="el-icon-edit"></i>新建脚本运行步骤</span></el-button>
                    <el-button type="danger" plain @click="addEnviromentProcedure"><span><i class="el-icon-edit"></i>新建运行环境模拟步骤</span></el-button>
                    <el-button type="warning" plain @click="addComponentProcedure"><span><i class="el-icon-edit"></i>新建接口数据模拟步骤</span></el-button>
                </div>
            </el-col>
        </el-row>
  </div>
</template>

<style>
    .text-align-right{
        text-align: right;
    }
    .PageSubTile{
    text-align:left;
    font-size: medium;
    }
    .box-card{
        text-align: left;
    }
    .add-col{
        font-size: small;
    }
    .operation-button{
        vertical-align:middle;
        font-size:initial;
        color: #909399;
    }
 
</style>
<script>
import Sortable from 'sortablejs';
// import draggable from "vuedraggable";
import webSimulate from '@/components/testCase/webSimulate'
import dataSimulate from '@/components/testCase/dataSimulate'
import caculateSimulate from '@/components/testCase/caculateSimulate'
import internetSimulate from '@/components/testCase/internetSimulate'
import {Message} from 'element-ui'


  export default {
      data() {
          return {
              col: [
                {
                    label: '步骤描述',
                    prop: 'description'
                },
                {
                    label: '预期结果',
                    prop: 'expectedResult'
                }
            ],
              activeName: '0',
              procedures: [],
              newProcedure: [],
              dataTypes: [
                  {value: '0', label: '数传'},
                  {value: '1', label: '模拟'},
                  {value: '2', label: '真实'}
              ],
              protocolTypes: [
                  {value: '0', label: 'TCP'},
                  {value: '1', label: 'UDP'},
                  {value: '2', label: 'FTP'}
              ],
            //   dataType: '',
            //   protocolType: '',
              datasetList: [],
              paramWebInfo: null,
              paramDownloadInfo: null,
              paramComputingInfo: null,
              paramNetworkLoadInfo: null,
              dialogTableVisible: false,
              dataset: [],
              searchString: '',
              searchByString: '名称',
              currentPage: 0,
              totalPage: 0,
          }
      },
       created () {
            // this.dataType = this.dataTypes[0].value;
            // this.protocolType = this.protocolTypes[0].value;
            if(this.caseId != null) {
                this.getProcedureByCaseId(this.caseId);
            }
            this.getDataset();
          },
      mounted() {
            this.rowDrop()
        },
      methods: {
        dataExpand(row) {
            // console.log(row.serialNumber+"***********")
            // console.log(expandedRows+"---------------")
            if(row.type === '环境模拟' || row.type === '接口数据模拟') {
                if(row.paramType !== null && row.paramType !== '') {
                    if(row.paramId !== null && row.paramId !== '') {
                        this.$axios.post('/case/getCaseStepParam', this.qs.stringify({paramType: row.paramType, paramId: row.paramId}),
                            {
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                                }
                        },).then(resp => {                   //请求成功后的处理函数   
                            if (resp && resp.status == 200) {
                                if(resp.data.status == 200){
                                    row.children = resp.data.obj;
                                    // console.log(typeof(row.children.methods))
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
        },
        getStepParam(paramType, paramId) {
            
        },
        confirmStart(id) {
            this.$confirm('是否确定启动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.startSimulate(id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        startSimulate(id) {
            this.$axios.post('/case/startSimulate', this.qs.stringify({stepId: id}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
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
        },
        chose(id) {
            this.newProcedure[0].caseStepInfo.datasetId = id;
            this.dialogTableVisible = false;
        },
        cancleChose() {
            this.newProcedure[0].caseStepInfo.datasetId = '';
        },
        prePage() {
            if(this.currentPage !== 0) {
                this.currentPage = this.currentPage - 1;
            }
            this.getDataset()
        },
        nextPage() {
            if(this.currentPage !== this.totalPage - 1) {
                this.currentPage = this.currentPage + 1;
            }
            this.getDataset()
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            this.deleteProcedureFile(this.newProcedure[0].caseStepInfo.parameterFilePath);
            this.newProcedure[0].caseStepInfo.parameterFilePath = ""
        },
        handlePreview(file) {
            // console.log(file);
        },
        // handleExceed(files, fileList) {
        //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        // },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        uploadProcedureFile(file) {
            var formData = new window.FormData();
            formData.append('file', file.file);
              this.$axios.post('/case/saveProcedureDataFile', formData,
                {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
              },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.newProcedure[0].caseStepInfo.parameterFilePath = resp.data.obj;
                        Message.success({message: '文件已上传'})
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
        viewDialog() {
            this.dialogTableVisible = true;
        },
        showIndex(){
            console.log(this.procedures)
        },
        rowDrop() {
            var that=this
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            Sortable.create(tbody,{
                filter: '.el-table__expanded-cell',
                onEnd: function(evt){ //拖拽完毕之后发生该事件
                
                    that.procedures.splice(evt.newIndex, 0, that.procedures.splice(evt.oldIndex, 1)[0]);
                    var newArray = that.procedures.slice(0);
                    that.procedures = [];
                    that.$nextTick(function () {
                        that.procedures = newArray;
                        for(var a=0;a<that.procedures.length;a++){
                            that.procedures[a].serialNumber = a + 1;
                        }
                        //顺序调整后，保存至数据库
                        this.$axios.post('/case/changeCaseProcedure', that.procedures).then(resp => {                   //请求成功后的处理函数   
                            if (resp && resp.status == 200) {
                                var data = resp.data;
                                if(resp.data.status == 200){
                                    that.procedures=resp.data.obj;
                                    that.procedures.forEach(item => {
                                        this.dataExpand(item)
                                    })
                                    Message.success({message: resp.data.msg});
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
                    })
                }
            })
        },
        getDataset() {
            this.$axios.post('/dataset/getDatasetForStep', this.qs.stringify({offset: this.currentPage, searchString: this.searchString, searchByString: this.searchByString}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.dataset = resp.data.obj.content;
                        this.totalPage = resp.data.obj.totalPages;
                        this.currentPage = resp.data.obj.number;
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
        getProcedureByCaseId(id) {
            this.$axios.post('/case/getProceduresByCaseId', this.qs.stringify({caseId: id}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.procedures = resp.data.obj;
                        this.procedures.forEach(item => {
                            this.dataExpand(item)
                        })
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
        cardClass(type) {
            if(type == '普通')
                return ;
            else if(type == '接口数据模拟')
                return 'border:1px solid #E6A23C;margin-top:5px;';
            else if(type == '环境模拟')
                return 'border:1px solid #F56C6C;margin-top:5px;';
            else if(type == '脚本运行')
                return 'border:1px solid #9AC7F4;margin-top:5px;';
        },
        addProcedure() {
            this.newProcedure = [];
            var obj = {
                caseStepInfo: {
                    id: null,
                    caseId: null,
                    serialNumber: this.procedures.length + 1,
                    type: '普通',
                    description: '',
                    expectedResult: '',
                    parameterFilePath: '',
                    datasetId: '',
                    status: '',
                    availability: 0,
                    stepLock: 0,
                    paramId: null,
                    paramType: null
                },
                enviromentSimulateParameter: null,
                paramInterfaceInfo: null
            };
            this.newProcedure.push(obj);
        },
        addShellProcedure() {
            this.newProcedure = [];
            var obj = {
                caseStepInfo: {
                    id: null,
                    caseId: null,
                    serialNumber: this.procedures.length + 1,
                    type: '脚本运行',
                    description: '',
                    expectedResult: '',
                    parameterFilePath: '',
                    datasetId: '',
                    status: '',
                    availability: 0,
                    stepLock: 0,
                    paramId: null,
                    paramType: null
                },
                enviromentSimulateParameter: null,
                paramInterfaceInfo: null
            };
            this.newProcedure.push(obj);
        },
        addEnviromentProcedure() {
            this.newProcedure = [];
            var obj = {
                caseStepInfo: {
                    id: null,
                    caseId: null,
                    serialNumber: this.procedures.length + 1,
                    type: '环境模拟',
                    description: '',
                    expectedResult: '',
                    parameterFilePath: '',
                    datasetId: '',
                    status: '',
                    availability: 0,
                    stepLock: 0,
                    paramId: null,
                    paramType: null
                },
                enviromentSimulateParameter: {
                    paramWebInfo: null,
                    paramDownloadInfo: null,
                    paramComputingInfo: null,
                    paramNetworkLoadInfo: null
                },
                paramInterfaceInfo: null
            };
            this.newProcedure.push(obj);
        },
        addComponentProcedure() {
            this.newProcedure = [];
            var obj = {
                caseStepInfo: {
                    id: null,
                    caseId: null,
                    serialNumber: this.procedures.length + 1,
                    type: '接口数据模拟',
                    description: '',
                    expectedResult: '',
                    parameterFilePath: '',
                    datasetId: '',
                    status: '',
                    availability: 0,
                    stepLock: 0,
                    paramId: null,
                    paramType: 4
                },
                enviromentSimulateParameter: null,
                paramInterfaceInfo: {
                    dataProcessor: '',
                    dataSourcePath: '',
                    targetSoftwareCode: '',
                    protocol: '0',
                    processPath: '',
                    targetIp: '',
                    port: '',
                    dataType: '0'
                }
            };
            this.newProcedure.push(obj);
        },
        saveCurrentProcedure() {
            if(this.caseId == null) {
                Message.error({message: '请先添加测试用例'});
                return
            }
            this.newProcedure[0].caseStepInfo.caseId = this.caseId;
            if(this.newProcedure[0].caseStepInfo.type == "环境模拟") {
                this.newProcedure[0].caseStepInfo.paramType = this.activeName;
                if(this.activeName === '0')
                    this.newProcedure[0].enviromentSimulateParameter.paramWebInfo = this.$refs.webSimulate[0].sendWebSimulate();
                else if(this.activeName === '1')
                    this.newProcedure[0].enviromentSimulateParameter.paramDownloadInfo = this.$refs.dataSimulate[0].sendDataSimulate();
                else if(this.activeName === '2')
                    this.newProcedure[0].enviromentSimulateParameter.paramComputingInfo = this.$refs.caculateSimulate[0].sendCaculateSimulate();
                else if(this.activeName === '3')
                    this.newProcedure[0].enviromentSimulateParameter.paramNetworkLoadInfo = this.$refs.internetSimulate[0].sendInternetSimulate();
                // console.log(this.newProcedure[0].enviromentSimulateParameter.paramWebInfo)
            } else if(this.newProcedure[0].caseStepInfo.type == "接口数据模拟") {
                this.newProcedure[0].caseStepInfo.paramType = '4';
            }
            // this.procedures.push(this.newProcedure[0]);
            this.$axios.post('/case/addCaseProcedure', this.newProcedure[0]).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        var pro = resp.data.obj;
                        this.dataExpand(pro);
                        this.procedures.push(pro);
                        this.activeName = '0'
                        Message.success({message: resp.data.msg});
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
            this.newProcedure = [];
        },
        cancleAddProcedure() {
            if(this.newProcedure[0].caseStepInfo.type === "普通" && this.newProcedure[0].caseStepInfo.parameterFilePath !== '')
                this.deleteProcedureFile(this.newProcedure[0].caseStepInfo.parameterFilePath);
            this.newProcedure = [];
            this.activeName === '0';
        },
        deleteProcedureFile(path) {
            this.$axios.post('/case/deleteProcedureDataFile', this.qs.stringify({filePath: path}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    
                } else {
                    console.log(resp.data);
                    Message.error({message: resp.data.msg})
                }
                }).catch(err => {                 //请求失败后的处理函数   
                    console.log(err)
                })
        },
        deleteProcedure(caseId) {
            this.$axios.post('/case/deleteCaseProcedure', this.qs.stringify({id: caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.procedures = resp.data.obj;
                        this.procedures.forEach(item => {
                            this.dataExpand(item)
                        })
                        Message.success({message: resp.data.msg});
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
            if(this.newProcedure.length != 0) {
                this.newProcedure[0].order = this.procedures.length + 1;
            }
        },
        //提交至后台
        saveProcedures() {

        },
        //从子组件获取数据
        getWebSimulate(data) {
            this.paramWebInfo = data;
        },
        getDataSimulate(data) {
            this.paramDownloadInfo = data;
        },
        getCaculateSimulate(data) {
            this.paramComputingInfo = data;
        },
        getInternetSimulate(data) {
            this.paramNetworkLoadInfo = data;
        }
      },
      components: { webSimulate, dataSimulate, caculateSimulate, internetSimulate,Sortable},
    //   draggable,
      props: ['caseId']
    }
</script>