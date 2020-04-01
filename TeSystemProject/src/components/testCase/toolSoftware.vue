<template>
<div>
  <p class="PageSubTitle">工具软件</p>
  <br>
  <div class="transfer">
    <el-transfer
      filterable
      :filter-method="filterMethod"
      :titles="['工具软件', '已选工具软件']"
      filter-placeholder="请输入软件名（不区分大小写）"
      v-model="value"
      :data="data">
    </el-transfer>
    <br>
    
  </div>
  <el-button type="primary" @click="saveSoftwareUnderTest" style="float:right">确定</el-button>
</div>
</template>

<script>
import {Message} from 'element-ui'
  export default {
    data() {
      return {
        data: [],
        value: [],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        }

      };
    },
    props: ['caseId'],
    created() {
      this.getAllSoftwareTool()
      if(this.caseId != null) {
          this.getSoftwareToolByCase()
      }
    },
    methods:{
      saveSoftwareUnderTest() {
        if(this.caseId == null) {
            Message.error({message: '未添加用例'})
            return
        }
        var matchCaseSoftwareToolList = [];
        matchCaseSoftwareToolList.push({caseId: this.caseId})
        for(var i = 0; i < this.value.length; i ++) {
            var matchCaseSoftwareTool = {
                caseId: this.caseId,
                toolId: this.value[i]
            }
            matchCaseSoftwareToolList.push(matchCaseSoftwareTool);
        }
        this.$axios.post('/case/saveMatchCaseSoftwareTool',matchCaseSoftwareToolList).then(resp => {                   //请求成功后的处理函数   
              if (resp && resp.status == 200) {
                  var data = resp.data;
                  if(resp.data.status == 200){
                      Message.success({message: resp.data.msg})
                      this.getSoftwareToolByCase()
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
      getAllSoftwareTool() {
          this.$axios.post('/toolSoftware/getAll').then(resp => {                   //请求成功后的处理函数   
              if (resp && resp.status == 200) {
                  if(resp.data.status == 200){
                      resp.data.obj.forEach((tool, index) => {
                      this.data.push({
                        label: tool.name + tool.version,
                        key: tool.id
                      });
                    });
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
      getSoftwareToolByCase() {
          this.$axios.post('/case/getSoftwareToolByCase', this.qs.stringify({caseId: this.caseId}),
                {
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    }
            },).then(resp => {                   //请求成功后的处理函数   
                if (resp && resp.status == 200) {
                    var data = resp.data;
                    if(resp.data.status == 200){
                        this.value = resp.data.obj;
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
  };
</script>

<style scope>
.PageSubTitle{
  font-size: medium;
  text-align: left;
}
.transfer{
  text-align:initial;
  /* 以下需要html5支持 */
  display: -webkit-flex;  
   -webkit-justify-content: center;  
   -webkit-align-items: center;  
}
.transfer /deep/.el-transfer-panel{
  width: 400px;
}
</style>