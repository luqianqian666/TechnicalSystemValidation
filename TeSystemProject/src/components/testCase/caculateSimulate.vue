<template>
  <div>
    <el-card>
        <el-row >
            <el-col :span="4"><div class="caculateTitle">CPU占用率：</div></el-col>
            <el-col :span="4" :offset="1"><div class="caculateTitle">占用时间：</div></el-col>
            <el-col :span="5" :offset="2"><div class="caculateTitle">IP：</div></el-col>
            <el-col :span="3" :offset="2"><div class="caculateTitle">端口：</div></el-col>
            
        </el-row>

        <el-row >
            <el-col :span="4">
              <el-input v-model="item.occupation" type="number" min="0" max="95" step="1" placeholder="<95正整数"> 
                  <template slot="append">%</template>
              </el-input>
            </el-col>
            <el-col :offset="1" :span="4">
              <el-input v-model="item.duration"  min="0" step="1" placeholder="正整数">
                  <template slot="append">秒</template>
              </el-input>
            </el-col>
            <el-col :span="5" :offset="2">
              <el-input v-model="item.ip"></el-input>
            </el-col>
            <el-col :span="3" :offset="2">
              <el-input v-model="item.port"></el-input>
            </el-col>
            
        </el-row>
        <el-row>
          <el-col :span="4">
              <div class="caculateTitle">内存占用率：</div>
            </el-col>
          <el-col :offset="7" :span="5"><div class="caculateTitle">用户名：</div></el-col>
          <el-col :span="5"><div class="caculateTitle">密码：</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
              <el-input v-model="item.memory" ype="number" min="0" step="1" placeholder="正整数">
                  <template slot="append">M</template>
              </el-input>
            </el-col>
          <el-col :offset="7" :span="5">
              <el-input v-model="item.username"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="item.password"></el-input>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<style>

  .caculateTitle {
    font-size: small;
  }

</style>

<script>
  export default {
    data() {
      return {
        item: {
            occupation: '',
            duration: '',
            ip: '',
            port: '',
            username: '',
            password: '',
            memory:''
        }
      }
    },
    methods: {
        sendCaculateSimulate() {
            return this.item;
        }
    }
  };
</script>