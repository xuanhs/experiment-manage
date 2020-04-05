<template>
  <div class="all-in">
  <div class="box">
    <el-input placeholder="用户名" v-model="name" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button @click="login">登录</el-button>
  </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      name: "",
      password: "",
      getImage:require('D:/experiment/image/default.jpg')
    };
  },
  methods: {
    login() {
      let url = "api/user/login";
      let args = {
        name: this.name,
        password: this.password
      };

      this.$http.post(url, args).then(res => {
        console.log(res.data.data)
        if (res.data.status == 0 && res.data.data.code == 0) {
          this.$router.push({
            name: 'index'
          })
        }
        else {
          this.$message.error(res.data.data.message)
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    height: 400px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .all-in{
    background: url('~@/assets/course.jpg') center ;
    height: 100%;
  }

  .mini-box {
    width: 320px;
    margin: auto auto;
    background-color: aqua;
  }
</style>
