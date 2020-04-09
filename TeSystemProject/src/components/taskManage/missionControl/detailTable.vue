                <template>
                            <div style="max-width: 1024px;text-align:center;margin:0 auto">
                                <el-table
                                    :data="tableData"
                                    border
                                    max-height="550"
                                    width="1024"
                                        >
                                      <el-table-column
                                          prop="code"
                                          label="任务编号"
                                          min-width="100"
                                          align="center"
                                          header-align="center"
                                      >  
                                      </el-table-column>
                                      <el-table-column
                                          prop="name"
                                          label="任务名称"
                                          min-width="220" 
                                          align="center"
                                          header-align="center"
                                      >  
                                      </el-table-column>
                                      <el-table-column
                                          prop="peried"
                                          label="验证阶段"
                                          class="ccc"
                                          align="center"
                                         min-width="200"
                                          header-align="center"
                                        
                                      >
                                       <!--   <template slot-scope="scope">
                                              <div style="white-space: pre-line;">
                                                  <span>{{formatSoftwareCode(scope.row.software)}}</span>
                                              </div>
                                          </template>-->
                                      </el-table-column>
                                      <el-table-column
                                          prop="status"
                                          label="状态"
                                          min-width="200" 
                                          align="center"
                                        
                                      >
                                           
                                      </el-table-column>
                                    
                                      
                                      <el-table-column
                                          sortable
                                          prop="startingTime"
                                          label="开始时间"
                                          min-width="150" 
                                          align="center"
                                         
                                            >
                                          <template slot-scope="scope">
                                              {{formatDate(scope.row.startingTime)}}
                                          </template>
                                      </el-table-column>

                                      
                                      <el-table-column
                                          sortable
                                          prop="endtingTime"
                                          label="结束时间"
                                          min-width="150" 
                                          align="center"
                                        
                                      >
                                          <template slot-scope="scope">
                                              {{formatDate(scope.row.startingTime)}}
                                          </template>
                                      </el-table-column>
                                      
                                  </el-table>
  </div>
</template>


<script>
  export default {
    data() {
      return {

      }
    },
    props: ['tableData'],
    methods: {
        formatDate(date) {
            if(date == null || date == "")
                return ""
            return date.split('T')[0]
        },
    }
  };
</script>

<style>
.el-table {
    font-size:initial;
}
</style>