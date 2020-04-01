<template>
  <div>
    <el-row>
        <el-col :span="5"><div class="internetTitle">起始IP：</div></el-col>
        <el-col :span="5" :offset="1"><div class="internetTitle">结束IP：</div></el-col>
        <el-col :offset="2" :span="4" class="internetTitle">带宽占用：</el-col>
    </el-row>
    <el-row>
        <el-col :span="5"><div class="internetTitle" ><el-input v-model="param.ipStart"></el-input></div></el-col>
        <el-col :span="5" :offset="1"><div class="internetTitle" ><el-input v-model="param.ipEnd"></el-input></div></el-col>
        <el-col :offset="2" :span="3">
          <el-input v-model="param.occupation"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="param.unit" placeholder="请选择单位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="internetTitle">用户名：</div></el-col>
      <el-col :span="5" :offset="1"><div class="internetTitle">用户名：</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="internetTitle" ><el-input v-model="param.usernameFirst"></el-input></div></el-col>
      <el-col :span="5" :offset="1"><div class="internetTitle" ><el-input v-model="param.usernameSecond"></el-input></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="internetTitle">密码：</div></el-col>
      <el-col :span="5" :offset="1"><div class="internetTitle">密码：</div></el-col>
    </el-row>
    <el-row>
       <el-col :span="5"><div class="internetTitle" ><el-input v-model="param.passwordFirst"></el-input></div></el-col>
      <el-col :span="5" :offset="1"><div class="internetTitle" ><el-input v-model="param.passwordSecond"></el-input></div></el-col>
    </el-row>
  </div>
</template>

<style>
 .internetTitle {
    font-size: small;
  }

</style>

<script>
  export default {
    data() {
      return {
        param: {
          ipStart: '',
          ipEnd: '',
          occupation: '',
          unit: 'k',
          usernameFirst: '',
          passwordFirst: '',
          usernameSecond: '',
          passwordSecond: ''
        },
        options: [{
          value: 'k',
          label: 'Kbit/s'
        }, {
          value: 'm',
          label: 'Mbit/s'
        }, {
          value: 'g',
          label: 'Gbit/s'
        }],
      }
    },
    props: [],
    methods: {
      sendInternetSimulate() {
          return this.param;
      }
    }
  };
</script>