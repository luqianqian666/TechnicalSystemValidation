<template>
    <div id="testActivity">
    <logo></logo>
    <div id="testActivityBody">
        <testCaseNavBar></testCaseNavBar>
        <div style=" width: 90%;display:inline-block;text-align: center">
            <br><br>
            <div style="width: 100%;">
                <router-view></router-view>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import logo from '@/components/logo'
import testCaseNavBar from '@/components/taskManage/testCaseNavBar'
import leftBar from '@/components/leftBar'
import {Message} from 'element-ui'
  export default {
    data() {
      return {
      }
    },
    components: { testCaseNavBar},
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

    #testActivityBody {
    width: 100%;
    min-height: 1000px;
    /* background-color: #000; */
    text-align: center;
}

</style>
