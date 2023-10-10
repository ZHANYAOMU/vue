<template>
  <div>
    <div>
      <el-row>
        <el-col :span="23"
          ><div class="grid-content bg-purple-dark divCenter">
            <p style="font-size: 20px; margin-left: 70px;">😝🙊👿🔥🌵🍄🍉😚😁😢🐨🐵🐒🎉📹🗼🗻🗾🏡♍️❗️🎀💚💞👘💘🐱🐦🐥🐑🐝🌎🌍🌘🌏🌎🌳🌒🏆🍔🏄🍖🍣🍎🍉🍑🌽</p>
          </div></el-col
        >
        <el-col :span="1" @click.native="isLogout">
          <div style="margin-left: -30px; margin-top: 5px;">
            <el-popover
              placement="top-start"
              title=""
              width="80"
              trigger="hover"
              content="点击退出登录">
              <el-button slot="reference">ID:{{ currentUserId }}</el-button>
            </el-popover>
          </div
        ></el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card
            shadow="always"
            v-if="cardAttributes === '1'"
            @click.native="greet1()"
            align="center"
          >
            用户信息
          </el-card>
          <el-card
            shadow="hover"
            v-else
            @click.native="greet1()"
            align="center"
          >
            用户信息
          </el-card>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
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
        <el-col :span="6">
          <el-card
            shadow="always"
            v-if="cardAttributes === '4'"
            @click.native="greet4()"
            align="center"
          >
            实时聊天
          </el-card>
          <el-card
            shadow="hover"
            v-else
            @click.native="greet4()"
            align="center"
          >
            实时聊天
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 50px; display: flex; justify-content: center; align-items: center;">
      <el-card shadow="always" align="center" style="height: 450px; width: 80%">
          <h1>{{ message }}</h1>
        </el-card>
    </div>
    <div style="margin-top: 30px; display: flex; justify-content: center; align-items: center;">
      <el-button type="primary" @click="sendTopicToPerson">发送主题给陌生人</el-button>
      <el-button type="primary" @click="getRandomTopic">获取主题</el-button>
      <el-button type="primary" @click="getTopicFromPerson">接收陌生人的主题</el-button>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      cardAttributes: "3",
      signCount: "10",
      message: "",
      currentUserId: ""
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
    greet4() {
      if (this.cardAttributes != "4") {
        this.$router.push("/messagetalk");
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
    sendTopicToPerson() {
      let that = this;
      this.$http
        .post("local/users/pushTopic", {
          userId: localStorage.getItem("userId"),
          topic: localStorage.getItem("topic")
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.$message({
              message: res.msg,
              type: "success",
            });
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
    },
    getTopicFromPerson() {
      let that = this;
      this.$http
        .post("local/users/popTopic", {
          userId: localStorage.getItem("userId"),
          topic: localStorage.getItem("topic")
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.$message({
              message: res.msg,
              type: "success",
            });
            var userId = "未知用户";
            var msg = "";
            if (res.data.split("-").length > 1) {
               userId = res.data.split("-")[0];
               msg = res.data.split("-")[1];
            }
            that.$notify({
              title: "用户ID：" + userId,
              message: msg,
              position: 'top-right',
              offset: 50,
              type: 'success',
              duration: 0
            });
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
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
                localStorage.removeItem("userId");
                localStorage.removeItem("topic");
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
    this.currentUserId = localStorage.getItem("userId");
    if (localStorage.getItem("topic") != null && localStorage.getItem("topic").split("-")[0] == localStorage.getItem("userId")) {
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