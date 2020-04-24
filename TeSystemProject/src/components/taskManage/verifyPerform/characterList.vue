<template>

                    <div style="margin-bottom: 30px;" name="">
                         <br>
                        <br>
                         <div  label="特征项选择" name="first" >
                           <br>
                           <el-collapse  v-model="activeNames" > 
                             <div id="servicesdiv" >
                            <el-collapse-item   :title="ListName" name="1"   > 
                            <el-row type="flex" :gutter="50" >
                              <el-col >
                              <div class="panel panel-danger" style="background-color: rgb(240,222,237); ">
                              <div class="panel-heading" style="text-align: center">{{ListName}}表</div>
                              <div class="panel-body">
                               <el-table max-height="300"     :data="tableData"       @selection-change="handleSelectionChange"   ref="multipleTable">
                                  
                               <el-table-column label="操作" min-width="100" align="center"   type="selection"  > </el-table-column>
                               <el-table-column prop="index" label="序号"  align="center">
                                    <template slot-scope="scope">
                                        {{scope.$index+1}} 
                                  </template>
                                </el-table-column>
                               <el-table-column label="编号"   prop="id"  min-width="200" align="center" v-if="show"></el-table-column>
                               <el-table-column prop="desc" label="特征描述" min-width="550" align="center" :show-overflow-tooltip="true"></el-table-column>
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
                            
                            </el-row>
                           </el-collapse-item >
                             </div>
                          
                           </el-collapse>
                        
                       </div>                            
                      </div>    
                   
</template>

<script>
  export default {
     name:"charactervue",
     props: ['tableData','ListName'],
     data: function () {
      return {     
        show:false,   
        activeNames: ['1'],//折叠框默认展开1
        newProcedure:[],     
        multipleSelection:[],//服务特征列表
        multipLists:[],
        characteristic:[],
      }
    }, 
    mounted () {
      console.log(this.tableData)
    },
    
     created() {
       //初始化数据
   
             this.multipleSelection=[];  
     
      },
    methods: 
    {
          handleSelectionChange(val) {  
             
           this.multipleSelection=val;
           console.log(val)
           this.$emit('transferChri',this.multipleSelection);
      
         // this.$emit('transferChri',this.multipleSelection);
          
      },
      // perClick(){
      //    this.$emit('transferChri',this.multipleSelection);
      //    this.multipleSelection=[];
      // }
    },
  };
</script>

<style>
.el-table {
    font-size:initial;
}
</style>