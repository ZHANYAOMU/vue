<template>
  <div>
    <div>
      <el-row>
        <el-col :span="23"
          ><div class="grid-content bg-purple-dark divCenter">
            <p style="font-size: 20px; margin-left: 70px;">Topic Management System</p>
          </div></el-col
        >
        <el-col :span="1" @click.native="isLogout"
          ><div class="grid-content bg-purple-light divCenter">
            <i class="el-icon-user-solid" style="font-size: 30px"></i></div
        ></el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card
            shadow="always"
            v-if="cardAttributes === '1'"
            @click.native="greet1()"
            align="center"
          >
            编辑用户信息
          </el-card>
          <el-card
            shadow="hover"
            v-else
            @click.native="greet1()"
            align="center"
          >
            编辑用户信息
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card
            shadow="always"
            v-if="cardAttributes === '2'"
            @click.native="greet2()"
            align="center"
          >
            主题管理
          </el-card>
          <el-card
            shadow="hover"
            v-else
            @click.native="greet2()"
            align="center"
          >
            主题管理
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card
            shadow="always"
            v-if="cardAttributes === '3'"
            @click.native="greet3()"
            align="center"
          >
            随机主题
          </el-card>
          <el-card
            shadow="hover"
            v-else
            @click.native="greet3()"
            align="center"
          >
            随机主题
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 50px; display: flex; justify-content: center; align-items: center;">
      <el-col :span="15">
        <el-card shadow="always" align="center" style="height: 300px">
          <h1>{{ message }}</h1>
        </el-card>
      </el-col>
    </div>
    <div style="margin-top: 50px; display: flex; justify-content: center; align-items: center;">
      <el-button type="primary" @click="getRandomTopic">获取主题</el-button>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      cardAttributes: "3",
      signCount: "10",
      message: "点击按钮获取一个主题",
      
    };
  },
  methods: {
    greet1() {
      if (this.cardAttributes != "1") {
        this.$router.push("/userinfo");
      }
    },
    greet2() {
      if (this.cardAttributes != "2") {
        this.$router.push("/element");
      }
    },
    greet3() {
      if (this.cardAttributes != "3") {
        this.$router.push("/randomtopic");
      }
    },
    getRandomTopic() {
      var userId = localStorage.getItem("userId");
      var that = this;
      this.$http
      .get("local/users/getRandomTopic/" + userId)
      .then(function (response) {
        var res = response.data;
        if (res.code == 20000) {
          if (res.data) {
            that.message = res.data.topic;
            localStorage.setItem("topic", userId + "-" + res.data.topic);
            that.$message({
              message: res.msg,
              type: 'success'
            });
          }
        } else {
          that.message = "";
          localStorage.setItem("topic", "");
          that.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
      .catch(function (error) {
        console.log('error: ' + error);
      });
    },
    isLogout() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        type: "warning",
      }).then(() => {
          let that = this;
          this.$http
            .post("local/users/logout", {})
            .then(function (response) {
              var res = response.data;
              if (res.code == 20000) {
                localStorage.removeItem("token");
                that.$router.push("/login");
                that.$message({
                  message: "退出成功",
                  type: "success",
                });
              } else {
                that.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              that.$message({
                message: error,
                type: "error",
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("topic").split("-")[0] == localStorage.getItem("userId")) {
      this.message = localStorage.getItem("topic").split("-")[1];
    }
  }
};
</script>
  
  <style>
.tableCenter {
  display: flex;
  /* align-items: center; */
  justify-content: center;
  height: 100vh;
  margin-top: 50px;
}
.divCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>