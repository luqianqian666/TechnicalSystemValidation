<template>
             <div  style="max-width: 1024px;text-align:center;margin:0 auto"> 
                 <el-container>
                <el-header><testCaseNavBar></testCaseNavBar> </el-header>
               <br>
               <div   style="max-width: 1024px;text-align:center;margin:0 auto">
                 <el-row>
                   <el-col :span="8">
                     <el-card class="box-card">
                      <span >选择类型</span>
                        <el-cascader :options="options"  v-model="value"  @change="handleChange"></el-cascader>
                      </el-card>
                   </el-col>

                   <el-col :span="8">

                     <el-card class="box-card">
                      <span class="demonstration">选择特征</span>
                        <el-cascader :options="options" :show-all-levels="false"></el-cascader>
                      </el-card>
                        </el-col>


                   <el-col :span="8">

                        <el-card class="box-card">
                       <span class="demonstration">选择指标</span>
                      <el-cascader :options="options" :show-all-levels="false"></el-cascader>
                    </el-card>
                   </el-col>

                 </el-row>
               </div>
            
              

            
              </el-container>
            </div>           
</template>


<script>
import {Message} from 'element-ui'
import logo from '@/components/logo'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
  export default {
    data() {
      return {

value: [],
        options:[
          {
          value: 'string',
          label: '字符串类型',
         },
         {
          value: 'file',
          label: '文件类型',
         },
        {
           value: 'section',
          label: '段类型',
        },
        {
           value: 'code',
          label: '枚举类型',
        }
        
        
        ]

      }
    },
    
    methods: {
        handleChange(value) {
        console.log(value);
      }
    },
    components: { logo,testCaseNavBar},
  };
</script>

<style>
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    height: 480px;
  }
</style>