<template>

  <div class="helloWorld">

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="home">主页</el-menu-item>
      <el-menu-item index="course">课程管理</el-menu-item>
      <el-menu-item index="login">登录</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: "home"
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelect(key, keyPath) {
                console.log(key);
                console.log(keyPath)
                this.activeIndex = key
                this.$router.push({
                    name: key
                })
            },
        },
        props:{
           /* activeIndex: {
                type: String,
                default: 'index'
            }*/
        }
    };
</script>

<style scoped>
  .helloWorld {
    display: flex;
    justify-content: space-between;
  }

  .tab-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab-item {
    width: 100px;
    height: 60px;
    line-height: 60px;
  }

  .active {
    background: yellow;
  }
</style>
