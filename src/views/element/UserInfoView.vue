<template>
  <div>
    <div>
      <el-row>
        <el-col :span="23"
          ><div class="grid-content bg-purple-dark divCenter">
            <p style="font-size: 20px; margin-left: 70px">😝🙊👿🔥🌵🍄🍉😚😁😢🐨🐵🐒🎉📹🗼🗻🗾🏡♍️❗️🎀💚💞👘💘🐱🐦🐥🐑🐝🌎🌍🌘🌏🌎🌳🌒🏆🍔🏄🍖🍣🍎🍉🍑🌽</p>
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
    <div style="margin-top: 10px;">
      <el-row>
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template
            slot="dateCell"
            slot-scope="{data}">
            <p :class="isSignDay(data.day.split('-')) ? 'is-selected' : ''" align="center">
              {{ data.day.split('-')[2] }} {{ isSignDay(data.day.split('-')) ? '✔️' : ''}}
            </p>
          </template>
        </el-calendar>      
      </el-row>
      <el-row>
        <div style="margin-top: 10px; margin-left: 90px;">
          <el-col :span="10"
            ><div class="grid-content bg-purple-light" style="margin-left: 100px;">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="formLabelAlign"
              >
                <el-form-item label="姓名">
                  <el-input v-model="formLabelAlign.username"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input v-model="formLabelAlign.address"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                  <el-input v-model="formLabelAlign.code"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                  <el-input v-model="formLabelAlign.age"></el-input>
                </el-form-item>
              </el-form>
              </div
          ></el-col>
          <el-col :span="10"
            ><div class="grid-content bg-purple-light" style="margin-left: 100px;">
              <el-form
                :label-position="labelPosition"
                label-width="80px"
                :model="formLabelAlign"
              >
                <el-form-item label="性别">
                  <el-input v-model="formLabelAlign.sex"></el-input>
                </el-form-item>
                <el-form-item label="身高">
                  <el-input v-model="formLabelAlign.height"></el-input>
                </el-form-item>
                <el-form-item label="体重">
                  <el-input v-model="formLabelAlign.weight"></el-input>
                </el-form-item>
                <el-form-item label="爱好">
                  <el-input v-model="formLabelAlign.likes"></el-input>
                </el-form-item>
                <el-form-item label="学历">
                  <el-select
                    v-model="formLabelAlign.degree"
                    placeholder="请选择学历"
                  >
                    <el-option label="小学" value="1"></el-option>
                    <el-option label="初中" value="2"></el-option>
                    <el-option label="高中" value="3"></el-option>
                    <el-option label="大学" value="4"></el-option>
                    <el-option label="研究生" value="5"></el-option>
                  </el-select>
                  <el-button type="info" plain @click.native="saveUserInfo()" style="margin-left: 5px;">保存</el-button>
                </el-form-item>
              </el-form>
              </div
          ></el-col>
        </div>
      </el-row>
    </div>
    <div style="margin-top: 30px"></div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      cardAttributes: "1",
      signCount: "10",
      labelPosition: "right",
      signDay: "",
      currentUserId: "",
      formLabelAlign: {
        username: "",
        address: "",
        phone: "",
        code: "",
        age: "",
        sex: "",
        height: "",
        weight: "",
        likes: "",
        degree: "",
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
    isSignDay(day) {
      let now = new Date();
      let month = now.getMonth() + 1;
      if (day[1] == month && day[2] <= this.signDay.length) {
        if (this.signDay[day[2] - 1] == "1") {
          return true;
        }
      }
      return false;
    },
    queryUserInfo() {
      var userId = localStorage.getItem("userId");
      var that = this;
      this.$http
        .post("local/users/queryDetailById/" + userId, {})
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            if (res.data) {
              that.formLabelAlign.username = res.data.name;
              that.formLabelAlign.address = res.data.address;
              that.formLabelAlign.phone = res.data.phone;
              that.formLabelAlign.code = res.data.code;
              that.formLabelAlign.age = res.data.age;
              that.formLabelAlign.sex = res.data.sex;
              that.formLabelAlign.height = res.data.height;
              that.formLabelAlign.weight = res.data.weight;
              that.formLabelAlign.likes = res.data.likes;
              that.formLabelAlign.degree = res.data.degree;
            }
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log("error: " + error);
        });
    },
    saveUserInfo() {
      var that = this;
      this.$http
        .post("local/users/saveUserInfo", {
          userId: localStorage.getItem("userId"),
          name: that.formLabelAlign.username,
          address: that.formLabelAlign.address,
          phone: that.formLabelAlign.phone,
          code: that.formLabelAlign.code,
          age: parseInt(that.formLabelAlign.age),
          sex: that.formLabelAlign.sex,
          height: that.formLabelAlign.height,
          weight: that.formLabelAlign.weight,
          likes: that.formLabelAlign.likes,
          degree: that.formLabelAlign.degree,
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.$message({
              message: "保存成功",
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
    },
    isLogout() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
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
    getSingCount() {
      let that = this;
      this.$http
        .get("local/users/sign/count", {
          params: {
            userId: localStorage.getItem("userId"),
          },
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            var signDate = res.data.split("-");
            var signDate_0 = signDate[0];
            var signDate_1 = signDate[1];
            var len = parseInt(signDate_1) - signDate_0.length;
            for (var i = 0; i < len; i++) {
              signDate_0 = "0" + signDate_0;
            }
            that.signDay = signDate_0;
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
    },
  },
  mounted() {
    this.queryUserInfo();
    this.getSingCount();
    this.currentUserId = localStorage.getItem("userId");
  },
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
.is-selected {
  color: #1989FA;
}

</style>