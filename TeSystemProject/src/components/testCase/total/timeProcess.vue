<template>
<el-steps :active="4" align-center>
  <el-step title="计划开始" v-bind:description="planStart"></el-step>
  <el-step title="实际开始" v-bind:description="realStart"></el-step>
  <el-step title="完成情况" v-bind:description="complete"></el-step>
  <el-step title="计划结束" v-bind:description="planEnd"></el-step>
</el-steps>
</template>

<script>
    export default {
        props: ['planStart', 'realStart', 'complete', 'planEnd']
    }
</script>
<style scoped>

</style>