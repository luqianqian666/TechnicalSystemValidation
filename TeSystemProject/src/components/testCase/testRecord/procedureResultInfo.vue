<template>
  <div>
    <span style="color: #cccccc; font-size: 20px; float: left">详情</span><br><br>
    <div style="border: 1px solid #797979;padding: 5px">
        <el-row >
            <el-col :span="4"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">用例编号</div></el-col>
            <el-col :span="12"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">用例名称</div></el-col>
            <el-col :span="4"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">用例类型</div></el-col>
            <el-col :span="4"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">优先级</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="procedureTitle" style="background-color: #232323;border: 0"></div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="procedureTitle" style="border: 0;border-bottom: 1px solid #797979;font-size: 15px;text-align: left">
                    各步骤测试记录
                </div>
            </el-col>
        </el-row><br>
        <el-row type="flex" align="bottom" :gutter="20">
            <el-col :span="15"><div class="procedureTitle" style="text-align: left; border: 0"></div></el-col>
            <el-col :span="3"><div class="procedureTitle" style="min-height: 30px; font-size: 12px">普通步骤</div></el-col>
            <el-col :span="3"><div class="procedureTitle" style="min-height: 30px; border-color: #a95e5e;font-size: 12px">接口数据<br>模拟步骤</div></el-col>
            <el-col :span="3"><div class="procedureTitle" style="min-height: 30px; border-color: #fc0000;font-size: 12px">环境模拟<br>步骤</div></el-col>
        </el-row><br>
        <div style="border: 1px solid #797979">
            <el-row>
                <el-col :span="2"><div class="tableHead" style="background-color: #232323">步骤序号</div></el-col>
                <el-col :span="13"><div class="tableHead" style="background-color: #232323">步骤描述</div></el-col>
                <el-col :span="9"><div class="tableHead" style="background-color: #232323">预期结果</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="3"><div class="tableHead" style="background-color: #000; font-size: 10px;">最后一次测试记录修改人</div></el-col>
                <el-col :span="10"><div class="tableHead" style="background-color: #000">测试记录</div></el-col>
                <el-col :span="8"><div class="tableHead" style="background-color: #000">测试记录附件</div></el-col>
                <el-col :span="3"><div class="tableHead" style="background-color: #000">测试结论</div></el-col>
            </el-row>
        </div>
    </div><br>
    <div style="border: 1px solid #797979;padding: 5px">
        <el-row>
            <el-col :span="5"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">用例编号</div></el-col>
            <el-col :span="14"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">用例名称</div></el-col>
            <el-col :span="3"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">用例类型</div></el-col>
            <el-col :span="2"><div class="procedureTitle" style="text-align: left; border: 0;font-size: 15px">优先级</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="5"><div class="procedureTitle" style="text-align: left;background-color: #232323;border: 0;font-size: 15px;min-height: 42px;">DZJC_KX09_WT_009</div></el-col>
            <el-col :span="14"><div class="procedureTitle" style="text-align: left;background-color: #232323;border: 0;font-size: 15px;min-height: 42px;">KX09卫星实时数传数据接收、传输、实时处理、入库流程</div></el-col>
            <el-col :span="3"><div class="procedureTitle" style="text-align: left;background-color: #232323;border: 0;font-size: 15px;min-height: 42px;">功能</div></el-col>
            <el-col :span="2"><div class="procedureTitle" style="text-align: left;background-color: #232323;border: 0;font-size: 15px;min-height: 42px;">高</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="procedureTitle" style="border: 0;border-bottom: 1px solid #797979;font-size: 15px;text-align: left">
                    各步骤测试记录
                </div>
            </el-col>
        </el-row><br><br>
        <div class="procedureTestRecord">
            <div v-for="(item, index) in procedures" :key="index" calss="procedure" :style="rowClass(item.type)">
            <el-row type="flex">
                    <el-col :span="2"><div class="tableHead" style="background-color: #232323;font-size:15px;height:100%">{{item.order}}</div></el-col>
                    <el-col :span="13">
                        <div class="tableHead" style="background-color: #232323;text-align: left;font-size:15px;height:100%">
                            {{item.description}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="tableHead" style="background-color: #232323;text-align: left;font-size:15px;height:100%">
                            {{item.expectedResult}}
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="tableHead" style="background-color: #232323;text-align: left;font-size:15px;height:100%">
                            <span style="float: right">
                                <el-button class="footerBtn" style="height: 40px;background-color: #242429" >
                                    <span style="font-size: 17px">...</span>
                                </el-button>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            <el-row type="flex" v-for="(record, index) in item.testRecord" :key="index">
                <el-col :span="3">
                    <div class="tableHead" style="background-color: #000; font-size: 15px;height:98%">
                        {{record.user}}
                    </div>
                </el-col>
                    <el-col :span="10">
                        <div class="tableHead" style="background-color: #000; font-size: 15px;height:98%;text-align: left;">
                            {{record.testResult}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="tableHead" style="background-color: #000; font-size: 15px;height:98%;text-align: left;">
                            {{record.testDoc}}
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="tableHead" style="background-color: #000; font-size: 15px;height:98%;">
                            <span v-if="record.testConclusion=='通过'"><i class="el-icon-success" style="color: #68bb8d"></i>{{record.testConclusion}}</span>
                            <span v-if="record.testConclusion=='不通过'"><i class="el-icon-error" style="color: #fd6b6d"></i>{{record.testConclusion}}</span>
                            <span v-if="record.testConclusion=='不具备测试条件'"><i class="el-icon-warning"></i>{{record.testConclusion}}</span>
                        </div>
                    </el-col>
            </el-row>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import webSimulate from '@/components/testCase/webSimulate'
import dataSimulate from '@/components/testCase/dataSimulate'
import caculateSimulate from '@/components/testCase/caculateSimulate'
import internetSimulate from '@/components/testCase/internetSimulate'


  export default {
      data() {
          return {
              activeName: 'first',
              showHelpTip1: false,
              procedureType: '',
              procedures: [
                  {order: '1', 
                   description: '模拟科学用一用光学站发送系统K20上行科学数据',
                   expectedResult: '任务运行分系统成功接收到文件并及时进行数据处理和妆发处理行动', 
                   parameter: '科学数据参数文件', 
                   type: '环境',
                   testRecord: [{user: '王静一', testResult: '成功接收文件', testDoc: '测试记录附件', testConclusion: '通过'}]
                   },
                  {order: '2', 
                  description: '系统管理和调度软件将K20上行数据转发至有效荷载控制管理软件，勇士法师那个数据处理与管理分系统', 
                  expectedResult: '任务运行分系统成功接收到文件', 
                  parameter: '科学数据参数文件', 
                  type: '接口数据',
                  testRecord: [{user: '王静一', testResult: '成功接收文件', testDoc: '测试记录附件', testConclusion: '通过'}]
                  },
                  {order: '3', 
                  description: '系统管理和调度软件将K20上行数据转发至有效荷载控制管理软件，勇士法师那个数据处理与管理分系统勇士法师那个数据处理与管理分系统勇士法师那个数据处理与管理分系统勇士法师那个数据处理与管理分系统', 
                  expectedResult: '任务运行分系统成功接收到文件', 
                  parameter: '科学数据参数文件', 
                  type: '普通',
                  testRecord: [
                      {user: '王静一', testResult: '成功接收文件', testDoc: '测试记录附件', testConclusion: '通过'},
                      {user: '王静一', testResult: '成功接收文件', testDoc: '测试记录附件', testConclusion: '通过'}
                      ]
                  }
              ],
          }
      },
      methods: {

        rowClass(type) {
            if(type == '普通')
                return 'background: #000000; color: #cccccc; font-size: 18px; border:1px solid #797979;margin-top:5px;padding-bottom: 1px';
            else if(type == '接口数据')
                return 'background: #000000; color: #cccccc; font-size: 18px; border:1px solid #a95e5e;margin-top:5px;padding-bottom: 1px';
            else if(type == '环境')
                return 'background: #000000; color: #cccccc; font-size: 18px; border:1px solid #fc0000;margin-top:5px;padding-bottom: 1px';
        },
      },
      components: {}
    }
</script>

<style>
    
</style>