<template>
<div  v-if="res != null">
    <el-card>
        <el-row>
            <el-col :offset="2" :span="10" v-for="(user, index) in res" v-bind:key="index">
                <div class="left-align">
                    <i class="el-icon-star-off" title="组织单位"></i>&nbsp;{{user}}
                </div>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :offset="2" :span="10" v-for="(user, index) in users" v-bind:key="index">
                <div class="left-align">
                    <i class="el-icon-user" title="参与单位"></i>&nbsp;{{user}}
                </div>
            </el-col>
        </el-row>
    </el-card>
    <br>
</div>
</template>

<script>
    export default {
      props: ['res', 'users']
    }
</script>
<style scoped>
    .left-align{
        text-align: left
    }
</style>