<template>
  <div>
    <el-row >
        <el-col :span="3" class="webTitle">用户数量：</el-col>
        <el-col :offset="3" :span="3"><div class="webTitle">执行次数：</div></el-col>
        <el-col :offset="3" :span="3" class="webTitle"><div>请求方式：</div></el-col>
        
    </el-row>

    <el-row>

        <el-col :span="3"><div class="webTitle"><el-input v-model="webUserNum"></el-input></div></el-col>
        <el-col :offset="3" :span="3"><div class="webTitle"><el-input v-model="webRunTimes"></el-input></div></el-col>
        <el-col :offset="3" :span="4"><div class="webTitle">
            <el-radio v-model="webRequestMethod" label="0">Post</el-radio>
            <el-radio v-model="webRequestMethod" label="1">Get</el-radio>
            </div>
        </el-col>

    </el-row>

    <el-row >
        <el-col :span="4"><div class="webTitle">请求地址(IP)：</div></el-col>
        <el-col :offset="2" :span="4"><div class="webTitle">端口：</div></el-col>

    </el-row>
    <el-row >
        <el-col :span="6"><div class="webTitle"><el-input v-model="webRequestIp"></el-input></div></el-col>
        <el-col :span="3"><div class="webTitle"><el-input v-model="webPort"></el-input></div></el-col>
    </el-row>

    <!-- 演示需要，暂时不显示 -->
    <!-- <el-row >
        <el-col :span="4"><div class="webTitle">请求参数：</div></el-col>
    </el-row> -->
  </div>
</template>

<style>
  .webTitle {
    font-size: small;
  }
</style>

<script>
  export default {
    data() {
      return {
        webUserNum: '',
        webRequestMethod: '',
        webRequestIp: '',
        webRunTimes: '',
        webPort: '',
      }
    },
    methods: {
      sendWebSimulate() {
          var webConcurrentAccessSimulation = {
              userNumber: this.webUserNum,
              methods: this.webRequestMethod,
              ip: this.webRequestIp,
              execTimes: this.webRunTimes,
              port: this.webPort,
          }
          return webConcurrentAccessSimulation;
      }
    },
  };
</script>