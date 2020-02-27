<template>
  <div class="box">
    <el-input placeholder="用户名" v-model="name" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>
<script>
import tabPan from '@/components/tabPan'
export default {
  name: "login",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    login() {
      let url = "api/user/login";
      let args = {
        name: this.name,
        password: this.password
      };
      
      this.$router.push({
        name: 'index'
      })
      // this.$http.post(url, args).then(res => {
      //   if (res.data.status == 1200) {
      //     // location.href = 'http://localhost:8080/#/index'
      //   }
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  height: 600px;
  width: 860px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
.mini-box {
  width: 320px;
  margin: auto auto;
  background-color: aqua;
}
</style>
