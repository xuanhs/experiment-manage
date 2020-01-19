<template>
  <div class="topTab">
    <el-tabs :tab-position="top" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <HelloWorld></HelloWorld>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane>
         <el-avatar :size="30" :src="circleUrl"></el-avatar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      activeName: "second",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
.topTab {
  margin-top: 0%;
}
</style>