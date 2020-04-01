<template> 
<div id="logo">
  <span>
    <img src="../assets/logobackground.png" width="100%" height="100%" align="left">
    <h1 >技术体制验证软件</h1>
    </span>
  
    <span class="user" style="float: right">
      <el-dropdown>
          <span class="el-dropdown-link">
              <i class="el-icon-user" style="font-size: xx-large"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="gotoMainPage">首页</el-dropdown-item>
              <el-dropdown-item @click.native="gotoUserInfoEdit">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="gotoFocusedSoftware">关注软件</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <span v-if="user != null" class="username">
        <span>{{user.username}},您好！</span>
        &nbsp;&nbsp;
        <el-link type="info">退出</el-link>
      </span>
      <span v-else class="username">
        <span>未登录</span>
      </span>
    </span>
</div> 
</template> 
<script>
import {Message} from 'element-ui' 
export default {
  data() {
    return {
        user: null
        
    }
  },
  created:function() {
      this.getUser();
  },
  methods: {
    getUser() {
       
        this.user = this.$store.state.user;
    },
 
    gotoUserInfoEdit(user) {
        this.$axios.post('/user/getCurrentUser').then(resp => {                   //请求成功后的处理函数   
            if (resp && resp.status == 200) {
                var data = resp.data;
                if(resp.data.status == 200){
                    this.$router.push({name:'userInfoEdit',params:{userInfo: resp.data.obj}})
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
  }
}
</script> 
<style>
  h1 {
    font-size: x-large;
    color: #ffffff;
    position:absolute;
    top:8px;
    left:25px;
  }
  .user {
    position: absolute;
    top:25px;
    right: 100px;
    color: #ccc;
  }
  .username {
    font-size: x-large;
    line-height: 50px;
  }
  #logo {
    margin-top: 0;
    position:relative;
    width: 100%;
    height: 90px;
  }
</style>