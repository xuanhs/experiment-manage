<template>

  <div class="helloworld">
    
    <div class="right">
      图片
    </div>
    <div class="aaa">
      aaa
    </div>
    <div class="tab-list">
      <div :class="'tab-item '+(currId == item.id?'active': '')" v-for="(item,index) in tabLists" :key="index" @click="openpage(item)">
        {{item.name}}
      </div>
    </div>
  </div>
  <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理
      
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs> -->
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      currId: '',
      tabLists: [
        {
          id: 'tabPan',
          name: 'aaaa',
        },
        {
          id: 'login',
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
      console.log(tab, event);
    },
    openpage(item){
      this.currId = item.id
      this.$router.push({
        name: item.id
      })
    }
  }
};
</script>

<style scoped>
  .helloworld{
    display: flex;
    justify-content: space-between;
  }
  .tab-list{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .tab-item{
    width: 100px;
    height: 60px;
    line-height: 60px;
  }
  .active{
    background: yellow;
  }
</style>
