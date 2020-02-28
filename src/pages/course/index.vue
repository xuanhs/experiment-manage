<template>
  <div>
    <div class = "operate-course">
      <div v-if="isTeacher" class="operate-create">
        <span>创建</span>
      </div>
      <div class="operate-create">
        <span>创建</span>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class = "show-course">
        <el-tab-pane label="我创建的课程" name="create">用户管理</el-tab-pane>
        <el-tab-pane label="我加入的课程" name="join">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                activeName: "create",
                isTeacher: true,
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .show-course{
    width: 80%;
    height: 100%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .operate-course{
    width: 80%;
    height: 100px;
    margin-right: auto;
    margin-left: auto;
  }
</style>
