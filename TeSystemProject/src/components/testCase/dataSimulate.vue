<template>
  <div class="dataSimulate">
    <el-tabs v-model="protocol" type="border-card">
        <el-tab-pane label="FTP" name="0">
            <el-row >
                <el-col :span="4"><div class="dataTitle">服务器地址IP：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="ftpParam.ip"></el-input></div></el-col>
                <el-col :span="4" :offset="2"><div class="dataTitle" >登录配置</div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">下载文件路径：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="ftpParam.targetFilePath" placeholder="起始不含/"></el-input></div></el-col>
                <el-col :span="2" :offset="2"><div class="dataTitle">用户名：</div></el-col>
                <el-col :span="6"><div class="dataTitle" ><el-input v-model="ftpParam.username"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">目的存储路径：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="ftpParam.downloadToPath" disabled></el-input></div></el-col>
                <el-col :span="2" :offset="2"><div class="dataTitle">密码：</div></el-col>
                <el-col :span="6"><div class="dataTitle" ><el-input v-model="ftpParam.password"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">用户数：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="ftpParam.userNumber"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">下载数/并发数：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="ftpParam.concurrency"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">端口：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="ftpParam.port"></el-input></div></el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="TCP" name="1">
            <el-row >
                <el-col :span="4"><div class="dataTitle">服务器地址IP：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="tcpParam.ip"></el-input></div></el-col>
                <el-col :span="4" :offset="2"><div class="dataTitle" >登录配置</div></el-col>
            </el-row>
            <el-row >
              <el-col :span="4"><div class="dataTitle">下载文件路径：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="tcpParam.targetFilePath"></el-input></div></el-col>
                <el-col :span="2" :offset="2"><div class="dataTitle">用户名：</div></el-col>
                <el-col :span="6"><div class="dataTitle" ><el-input v-model="tcpParam.username"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">目的存储路径：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="tcpParam.downloadToPath" disabled></el-input></div></el-col>
                <el-col :span="2" :offset="2"><div class="dataTitle">密码：</div></el-col>
                <el-col :span="6"><div class="dataTitle" ><el-input v-model="tcpParam.password"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">用户数：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="tcpParam.userNumber"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">下载数/并发数：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="tcpParam.concurrency"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">端口：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="tcpParam.port"></el-input></div></el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="HTTP" name="2">
            <el-row >
                <el-col :span="4"><div class="dataTitle">下载地址：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="httpParam.ip"></el-input></div></el-col>

            </el-row>
           
            <el-row >
                <el-col :span="4"><div class="dataTitle">目的存储路径：</div></el-col>
                <el-col :span="7"><div class="dataTitle" ><el-input v-model="httpParam.downloadToPath" disabled></el-input></div></el-col>


            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">用户数：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="httpParam.userNumber"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">下载数/并发数：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="httpParam.concurrency"></el-input></div></el-col>
            </el-row>
            <el-row >
                <el-col :span="4"><div class="dataTitle">端口：</div></el-col>
                <el-col :span="3"><div class="dataTitle" ><el-input v-model="httpParam.port"></el-input></div></el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
  .dataSimulate /deep/ .el-tabs__nav-wrap {
    width: fit-content
    }

  .dataTitle {
    font-size: small
  }

</style>

<script>
  export default {
    data() {
      return {
        protocol: '0',
        ftpParam: {
          protocol: '0',
          ip: '',
          downloadToPath: '/root/share/DownloadTemp/',
          targetFilePath: '',
          userNumber: '',
          concurrency: '',
          username: '',
          password: '',
          port: ''
        },
        tcpParam: {
          protocol: '1',
          ip: '',
          downloadToPath: '/root/share/DownloadTemp/',
          targetFilePath: '',
          userNumber: '',
          concurrency: '',
          username: '',
          password: '',
          port: ''
        },
        httpParam: {
          protocol: '2',
          ip: '',
          downloadToPath: '/root/share/DownloadTemp/',
          targetFilePath: '',
          userNumber: '',
          concurrency: '',
          username: null,
          password: null,
          port: ''
        },
      }
    },
    props: [],
    methods: {
      sendDataSimulate() {
          var param;
          if(this.protocol == '0')
              param = this.ftpParam;
          else if(this.protocol == '1')
              param = this.tcpParam;
          else if(this.protocol == '2')
              param = this.httpParam;
          return param;
      }
    }
  };
</script>