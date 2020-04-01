<template>
  <div>
     <h4><i class="fa fa-list-alt fa-lg"></i> </h4>
       <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="rgb(50, 50, 58)"
        text-color="rgb(255, 255, 255)"
        @open="handleOpen"
        @close="handleClose"
      >
       
        <el-menu-item index="/demo" @click="goTo('/demo')">
          <i class="el-icon-menu"></i>
          <span slot="title" >标准管理</span>
        </el-menu-item>
        <el-menu-item index="/index" @click="goTo('/index')">
          <i class="el-icon-setting"></i>
          <span slot="title">验证任务管理</span>
        </el-menu-item>
        <el-menu-item index="/index" @click="goTo('/index')">
          <i class="el-icon-setting"></i>
          <span slot="title">验证结果查看</span>
        </el-menu-item>
        <el-menu-item index="/index" @click="goTo('/index')">
          <i class="el-icon-setting"></i>
          <span slot="title">验证报告管理</span>
        </el-menu-item>
        <el-menu-item index="/index" @click="goTo('/index')">
          <i class="el-icon-setting"></i>
          <span slot="title">用户信息管理</span>
        </el-menu-item>
         <el-menu-item index="/index" @click="goTo('/index')">
          <i class="el-icon-setting"></i>
          <span slot="title">评价管理</span>
        </el-menu-item>
      </el-menu>

<!--
    <ul class="nav nav-pills nav-stacked">
      <li class="active">
        <a href="#overview" data-toggle="tab" id="overview_btn"><i class="fa fa-eye fa-fw"></i> 标准管理</a>
      </li>
      <li>
        <a href="#project-list" data-toggle="tab"><i class="fa fa-list-ol fa-fw"></i> 验证任务管理</a>
      </li>
      <li>
        <a href="#code-repository" data-toggle="tab" id="code_repository_btn"><i class="fa fa-floppy-o fa-fw"></i>验证结果查看</a>
      </li>
      <li>
        <a href="#code-build" data-toggle="tab" id="code_build_btn"><i class="fa fa-wrench fa-fw"></i> 验证报告管理</a>
      </li>
      <li>
        <a href="#code-quality" data-toggle="tab" id="code_quality_btn"><i class="fa fa-child fa-fw"></i> 用户信息管理</a>
      </li>
      <li>
        <a href="#code-deploy" data-toggle="tab"><i class="fa fa-truck fa-fw"></i> 评价管理</a>
      </li>
    </ul>-->
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    mounted() {
      let nav = document.getElementById('navigation-bars');
      let nav_btn = nav.getElementsByTagName('li')
      nav_btn[0].onclick = function () {
        document.title = '标准管理';
        history.pushState(["overview", 0], '', '?current=' + document.title)
      };
      nav_btn[1].onclick = function () {
        document.title = '验证任务管理';
        history.pushState(["project-list", 1], '', '?current=' + document.title)
      };
      nav_btn[2].onclick = function () {
        document.title = '验证结果查看';
        history.pushState(["code-repository", 2], '', '?current=' + document.title)
      };
      nav_btn[3].onclick = function () {
        document.title = '验证报告管理';
        history.pushState(["code-build", 3], '', '?current=' + document.title)
      };
      nav_btn[4].onclick = function () {
        document.title = '用户信息管理';
        history.pushState(["code-quality", 4], '', '?current=' + document.title)
      };
      nav_btn[5].onclick = function () {
        document.title = '评价管理';
        history.pushState(["code-deploy", 5], '', '?current=' + document.title)
      };
     

      // 当我们在访问历史中前进或后退时会执行一个popstate事件
      window.addEventListener('popstate', function (e) {
        if (e.state) {
          document.getElementById(e.state[0]).classList.add('active');
          for (let i = 0, len = nav_btn.length; i < len; i++) {
            nav_btn[i].classList.remove('active');
          }
          nav_btn[e.state[1]].classList.add('active');
        }
      });

      let search = window.location.search; // ?t=jkaljdksfla
      // 如果地址栏中的地址有中文，会以URL编码方式呈现
      // decodeURI 可以转换到之前中文
      let title = search.split('=')[1]; // ['?t','jkaljdksfla']
      if (title) {
        for (let i = 0, len = nav_btn.length; i < len; i++) {
          nav_btn[i].classList.remove('active');
        }
        let tc = document.querySelector('.tab-content');
        let li = tc.getElementsByTagName('div');
        for (let i = 0, len = li.length; i < len; i++) {
          li[i].classList.remove('active');
        }
        // 有值 decodeURI作用就是从URL编码转换到之前的状态
        // console.log(decodeURI(title));
        title = decodeURI(title);
        switch (title) {
          case '标准管理':
            document.title = '标准管理';
            nav_btn[0].classList.add('active');
            document.getElementById('overview').classList.add('active');
            break;
          case '验证任务管理':
            document.title = '验证任务管理';
            nav_btn[1].classList.add('active');
            document.getElementById('project-list').classList.add('active');
            break;
          case '验证结果查看':
            document.title = '验证结果查看';
            nav_btn[2].classList.add('active');
            document.getElementById('code-repository').classList.add('active');
            break;
          case '验证报告管理':
            document.title = '验证报告管理';
            nav_btn[4].classList.add('active');
            document.getElementById('code-quality').classList.add('active');
            break;
          case '用户信息管理':
            document.title = '用户信息管理';
            nav_btn[3].classList.add('active');
            document.getElementById('code-build').classList.add('active');
            break;
          case '评价管理':
            document.title = '评价管理';
            nav_btn[5].classList.add('active');
            document.getElementById('code-deploy').classList.add('active');
            break;
          
        }
      }
    },
  }
</script>

<style scoped>
  ul li {
    font-size: 20px;
  }


.el-menu-vertical-demo:not(.el-menu--collapse) {
width: auto;
min-height: 400px;
}

</style>
