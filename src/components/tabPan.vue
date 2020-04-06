<template>
  <div class="topTab">
    <!-- <div class="tab-list">
      <div class="tab-item" v-for="(item,index) in tabLists" :key="index">
        {{item.name}}
      </div>
    </div> -->
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <HelloWorld></HelloWorld>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld";
export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      activeName: "",
      tabLists: [
        {
          id: 1,
          name: 'aaaa',
        },
        {
          id: 2,
          name: 'bbbb',
        },
        {
          id: 3,
          name: 'ccccc',
        },
        {
          id: 4,
          name: 'ddddd',
        },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
    }
  },
};
</script>
<style scoped>
.topTab {
  margin-top: 0%;
}
</style>