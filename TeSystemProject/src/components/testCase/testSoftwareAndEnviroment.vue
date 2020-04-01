<template>
  <div v-if="checked != null">
    <tree-transfer 
      :title="title" 
      :from_data='fromData' 
      :to_data='toData'
      :defaultProps="{label:'label'}" 
      @addBtn='add' 
      @removeBtn='remove'
      :defaultCheckedKeys='checked'
      :defaultTransfer=true
      openAll
      :mode='mode' 
      height='270px' filter>
    </tree-transfer><br>
    <el-button type="primary" @click="saveSoftwareUnderTest" style="float:right">确定</el-button><br>
    <el-divider></el-divider>
   </div>
</template>  

<script>
import treeTransfer from 'el-tree-transfer' // 引入
import {Message} from 'element-ui'
  export default {
    data(){
      return {         
        mode: "transfer",
        fromData:[],
        toData:[],
        title: ['被测软件','已选被测软件'],
        checked: null,
        checkedData: null
      }
    },
    props: ['caseId'],
    created() {
      this.getSoftwareTree();
      if(this.caseId != null) {
          this.getSoftwareByCase()
      } else {
          this.checked = []
      }
    },
    methods:{
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
         if (this.mode == "transfer") {
            this.mode = "addressList";
         } else {
            this.mode = "transfer";
         }
       },
      // 监听穿梭框组件添加
      add(fromData,toData,obj){
       // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
       // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表  
        this.checkedData=toData
      },
      // 监听穿梭框组件移除
      remove(fromData,toData,obj){          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
         // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      },
      getSoftwareByCase() {
          this.$axios.post('/case/getSoftwareByCase', this.qs.stringify({caseId: this.caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.checked = resp.data.obj;
                        // console.log(this.checked)
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
      saveSoftwareUnderTest() {
        if(this.caseId == null) {
            Message.error({message: '未添加用例'})
            return
        }
        var matchCaseSoftwareComponentList = []
        matchCaseSoftwareComponentList.push({caseId: this.caseId})
        for(var i = 0; i < this.checkedData[0].children.length; i ++) {
            var subSystem = this.checkedData[0].children[i];
            for(var j = 0; j < subSystem.children.length; j ++){
                var software = subSystem.children[j];
                if(software.children.length == 0 || software.children == undefined) {
                    var strs = software.id.split("-");
                    var matchCaseSoftwareComponent = {
                        caseId: this.caseId,
                        softwareId: strs[2]
                    }
                    matchCaseSoftwareComponentList.push(matchCaseSoftwareComponent)
                } else {
                    for(var k = 0; k < software.children.length; k ++) {
                      var strs = software.children[k].id.split("-");
                      var matchCaseSoftwareComponent = {
                          caseId: this.caseId,
                          softwareId: strs[2],
                          componentId: strs[3]
                      }
                      matchCaseSoftwareComponentList.push(matchCaseSoftwareComponent)
                    }
                }
            }
        }
        this.saveMatchCaseSoftwareComponent(matchCaseSoftwareComponentList)
      },
      saveMatchCaseSoftwareComponent(list) {
          this.$axios.post('/case/saveMatchCaseSoftwareComponent',list).then(resp => {                   //请求成功后的处理函数   
              if (resp && resp.status == 200) {
                  var data = resp.data;
                  if(resp.data.status == 200){
                      this.getSoftwareByCase()
                      Message.success({message: resp.data.msg})
                      // console.log(this.fromData)
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
      getSoftwareTree() {
          this.$axios.post('/software/getSoftwareTree').then(resp => {                   //请求成功后的处理函数   
              if (resp && resp.status == 200) {
                  var data = resp.data;
                  if(resp.data.status == 200){
                      this.fromData = resp.data.obj;
                    //   console.log(this.fromData)
                      // console.log(this.fromData)
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
   },
    components:{ treeTransfer } // 注册
  }
</script>
 
