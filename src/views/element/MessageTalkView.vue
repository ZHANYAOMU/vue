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
      <div style="margin-top: 30px; display: flex; justify-content: center; align-items: center;">
            <el-select v-model="user" clearable placeholder="请选择聊天用户" @click.native="changeSelect" >
                <el-option
                    v-for="item in people"
                    :key="item.user"
                    :label="item.label"
                    :value="item.user">
                </el-option>
            </el-select>
        </div>
      <div style="margin-top: 30px; display: flex; justify-content: center; align-items: center;">
        <!-- <el-card shadow="hover" align="center" 
            style="margin-right: 100px; background-color: rgb(255, 255, 255); border:2px solid rgb(161, 140, 238);">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <div style="height: 350px; width: 200px; overflow-y: auto; cursor: pointer; margin-right: 30px;">
                    <h3 v-for="i in count" v-bind:key="i" style="background-color: rgb(255, 255, 255);">
                        {{ i }}
                    </h3>
                </div>
            </ul>
        </el-card> -->
        <el-card shadow="hover" align="center" 
        style="height: 320px; width: 30%; background-color: rgb(255, 255, 255); border-radius: 3%; border:2px solid rgb(117, 89, 216);">
            <h3>{{ message }}</h3>
            <div style="margin-top: 25px;">
                <el-input
                placeholder="按回车键发送"
                v-model="msg"
                :disabled="false"
                @keyup.enter.native="sendMsg()"
                >
                </el-input>
            </div>
            <div>
                <h3 style="float: left; cursor: pointer;" v-for="emoj in emojs" v-bind:key="emoj" @click="selectEmoj(emoj)">
                    {{ emoj }}
                </h3>
            </div>
        </el-card>
      </div>
    </div>
  </template>
    
    <script>
  export default {
    data() {
      return {
        cardAttributes: "4",
        signCount: "10",
        message: "聊天框",
        currentUserId: "",
        msg: "",
        emojs: [
        "😝","🙊","👿","🔥","🌵","🍄","🍉","😚","😁","😢","🐨","🐒","🎉","📹","🗼",
        "🗻","🗾","🏡","♍️","❗️","🎀","💚","💞","👘","💘","🐱","🐦","🐥","🐑","🐝","🌎",
        "🌳","🌒","🏆","🍔","🏄","🍖","🍣","🍎","🍑","🌽"
        ],
        people: [],
        user: '',      
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
      selectEmoj(e) {
        this.msg += e;
      },
      sendMsg() {
        if (this.user == null || this.user == "") {
            this.$message({
                    message: "请选择用户",
                    type: "info",
                });
            return;
        }
        var message = this.msg;
        this.msg = "";
        let that = this;
        this.$http
            .post("local/users/webSocket/sendMsg", {userId: this.user, topic: message})
            .then(function (response) {
            var res = response.data;
            if (res.code == 20000) {
                that.$notify({
                    title: "",
                    message: message,
                    position: 'top-left',
                    offset: 0,
                    type: 'info',
                    duration: 5000
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
      getOnlinePerson() {
        let that = this;
        this.$http
            .post("local/users/webSocket/getOnlinePerson", {userId: that.currentUserId})
            .then(function (response) {
            var res = response.data;
            if (res.code != 20000) {
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
      changeSelect() {
        this.user = '';
        this.getOnlinePerson();
        this.people = localStorage.getItem("onlinePeople") ? JSON.parse(localStorage.getItem("onlinePeople")) : [];
        this.$forceUpdate();
      },
      isLogout() {
        this.$confirm("此操作将退出系统, 是否继续?", "提示", {
          type: "warning",
        }).then(() => {
            this.webSocketLogout();
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
      webSocketLogout() {
        localStorage.removeItem("onlinePeople");
        this.websocket.close();
        // let that = this;
        // this.$http
        //     .post("local/users/webSocket/logout", {
        //         userId: this.currentUserId
        //     })
        //     .then(function (response) {
        //     var res = response.data;
        //     if (res.code == 20000) {
        //         localStorage.removeItem("onlinePeople");
        //     } else {
        //         that.$message({
        //         message: res.msg,
        //         type: "error",
        //         });
        //     }
        //     })
        //     .catch(function (error) {
        //     that.$message({
        //         message: error,
        //         type: "error",
        //     });
        //     });
      },
      initWebSocket: function () { // 建立连接
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        var userId = this.currentUserId;
        var url = "ws:localhost:8080" + "/websocket/" + userId; //"ws:118.25.147.174:8080" + "/websocket/" + userId;
        this.websocket  = new WebSocket(url);
        this.websocket.onopen = this.websocketonopen;
        this.websocket.send = this.websocketsend;
        this.websocket.onerror = this.websocketonerror;
        this.websocket.onmessage = this.websocketonmessage;
        this.websocket.onclose = this.websocketclose;
        },
        // 连接成功后调用
        websocketonopen: function () {
            console.log("WebSocket连接成功");
        },
        // 发生错误时调用
        websocketonerror: function (e) {
            console.log("WebSocket连接发生错误" + e);
        },
        // 给后端发消息时调用
        websocketsend: function (e) {
            console.log("发送" + e);
        },
        // 接收后端消息
        // vue 客户端根据返回的cmd类型处理不同的业务响应
        websocketonmessage: function (e) {
        var data = eval("(" + e.data + ")"); 
            //处理订阅信息
        if(data.cmd == "topic"){
            this.people = [];
            //TODO 系统通知
            var onlinelist = data.msgTxt.substr(1,data.msgTxt.length-2).split(",");
            for (var i = 0; i < onlinelist.length; i++) {
                this.people.push({user: onlinelist[i], label: '用户' + onlinelist[i]});            
            }
            localStorage.setItem("onlinePeople", JSON.stringify(this.people));
        } else if(data.cmd == "user"){
            //TODO 用户消息
            const h = this.$createElement;
            this.$notify({
                title: "",
                message: h('p', { style: 'color: teal'}, data.msgTxt),
                position: 'top-right',
                offset: 0,
                type: 'success',
                duration: 0
            });
        }
        },
        // 关闭连接时调用
        websocketclose: function () {
            console.log("connection closed");
        }
    },
    mounted() {
      this.currentUserId = localStorage.getItem("userId");
      this.initWebSocket();
      this.getOnlinePerson();
    },
    destroyed: function() {
        
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