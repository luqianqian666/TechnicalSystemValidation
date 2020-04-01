<template>
  <div>
      <el-tabs v-model="activeName" v-if="testCase == null">
            <el-tab-pane label="未录入" name="first">
                <testCaseTableSecond v-bind:tableData="noRecordCases" @func="getTestCaseCode"></testCaseTableSecond>
                <span style="float: right; font-size: 18px" v-if="noRecordCases.length !== 0">
                    <i class="el-icon-arrow-left" style="font-weight: bolder" @click="prePageFirst"></i> 
                        {{currentPageFirst}}/{{totalPageFirst}} 
                    <i class="el-icon-arrow-right" style="font-weight: bolder" @click="nextPageFirst"></i>
                </span>
            </el-tab-pane>
            <el-tab-pane label="已录入" name="second">
                <testCaseTableSecond v-bind:tableData="hasRecordCases" @func="getTestCaseCode"></testCaseTableSecond>
                <span style="float: right; font-size: 18px" v-if="hasRecordCases.length !== 0">
                    <i class="el-icon-arrow-left" style="font-weight: bolder" @click="prePageSecond"></i> 
                        {{currentPageSecond}}/{{totalPageSecond}} 
                    <i class="el-icon-arrow-right" style="font-weight: bolder" @click="nextPageSecond"></i>
                </span>
            </el-tab-pane>
      </el-tabs>
      <editRecord v-if="testCase != null" v-bind:procedures="proceduresGet" v-bind:testCase="testCase" @cancleToAll="hideRecord" @getNewStepRecord="getNewStepRecord"></editRecord>
  </div>
</template>


<script>
import testCaseTableSecond from '@/components/testCase/testRecord/testCaseTableSecond'
import editRecord from '@/components/testCase/testRecord/editRecord'
import {Message} from 'element-ui'


  export default {
    data() {
      return {
        activeName: 'first',
        noRecordCases: [],
        hasRecordCases: [],
        testCase: null,
        proceduresGet: [],
        currentPageFirst: 1,
        totalPageFirst: 1,
        currentPageSecond: 1,
        totalPageSecond: 1,
      }
    },
    props: ['testCaseGet'],
    components: {testCaseTableSecond, editRecord},
    created() {
        this.getHasRecordCase();
        this.getNoRecordCase();
        if(this.testCaseGet !== null) {
            this.getTestCaseCode(this.testCaseGet);
        }
    },
    methods: {
        getTestCaseCode(data) {
            //通过id向后台请求数据
            this.$axios.post('/case/findCaseStepRecord', this.qs.stringify({caseId: data.id}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.proceduresGet = resp.data.obj;
                        // Message.success({message: resp.data.msg});
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
            // this.proceduresGet = this.procedures; 
            this.testCase = data;
        },
        getNewStepRecord(data) {
            this.getTestCaseCode(data);
        },
        hideRecord() {
            this.testCase = null;
        },
        getNoRecordCase() {
            this.$axios.post('/case/getNoRecordCase', this.qs.stringify({activityId: this.$store.state.activityId, offset: this.currentPageFirst - 1}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.noRecordCases = resp.data.obj.content;
                        this.totalPageFirst = resp.data.obj.totalPages;
                        this.currentPageFirst = resp.data.obj.number + 1;
                        // Message.success({message: resp.data.msg});
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
        getHasRecordCase() {
            this.$axios.post('/case/getHasRecordCase', this.qs.stringify({activityId: this.$store.state.activityId, offset: this.currentPageSecond - 1}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    if(resp.data.status == 200){
                        this.hasRecordCases = resp.data.obj.content;
                        this.totalPageSecond = resp.data.obj.totalPages;
                        this.currentPageSecond = resp.data.obj.number + 1;
                        // Message.success({message: resp.data.msg});
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
        prePageFirst() {
            if(this.currentPageFirst !== 1) {
                this.currentPageFirst = this.currentPageFirst - 1;
            }
            this.getNoRecordCase()
        },
        nextPageFirst() {
            if(this.currentPageFirst !== this.totalPageFirst) {
                this.currentPageFirst = this.currentPageFirst + 1;
            }
            this.getNoRecordCase()
        },
        prePageSecond() {
            if(this.currentPageSecond !== 1) {
                this.currentPageSecond = this.currentPageSecond - 1;
            }
            this.getHasRecordCase()
        },
        nextPageSecond() {
            if(this.currentPageSecond !== this.totalPageSecond) {
                this.currentPageSecond = this.currentPageSecond + 1;
            }
            this.getHasRecordCase()
        },
    }
  };
</script>
