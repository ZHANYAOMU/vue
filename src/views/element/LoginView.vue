<template>
  <div style="background-color: rgb(255, 255, 255);">
    <div class="loginCenter">
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password style="margin-top: 10px;"></el-input>
      <div style="margin-top: 10px;">
        <el-button type="info" plain v-on:click="login">登录</el-button>
        <el-button type="info" plain v-on:click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // alert(this.username + " " + this.password);
      // //api是为了解决跨域问题设置的，在vue.config.js中
      // this.$http.get('api/topic/randomshowtopic').then(function (response) {
      //   alert(response.data);
      // }).catch(function (error) {
      //   alert(error);
      // });
      if (this.username == "" || this.password == "") {
        //type取值 success warning info error
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        });
        return;
      }
      let that = this;
      this.$http.post('local/users/login',
      {
        "username": this.username,
        "password": this.password
      }
      ).then(function (response) {
        var res = response.data;
        if (res.code == 20000) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          that.$router.push('/element');
          that.$message({
            message: '登录成功',
            type: 'success'
          });
        } else {
          that.$message({
            message: res.msg,
            type: 'error'
          });
        }
      }).catch(function (error) {
        that.$message({
          message: error,
          type: 'error'
        });
      });
      
    },
    register() {
      if (this.username == "" || this.password == "") {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        });
        return;
      }
      let that = this;
      this.$http.post('local/users/register', 
      {
        "username": this.username,
        "password": this.password
      }
      ).then(function (response) {
        var res = response.data;
        if (res.code == 20000) {
          that.$router.push('/element');
          that.$message({
            message: '注册成功',
            type: 'success'
          });
        } else {
          that.$message({
            message: res.msg,
            type: 'error'
          });
        }
      }).catch(function (error) {
        that.$message({
          message: error,
          type: 'error'
        });
      });
    }
  }
};
</script>

<style>
  .loginCenter {
    width: 300px;
    margin: 0 auto;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    height: 97vh;
    flex-direction: column;
  }
</style>
