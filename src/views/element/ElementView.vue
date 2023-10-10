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
    <div
      style="
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="mainTopic" placeholder="主题搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="mainWeight" placeholder="请选择权重值">
            <el-option label="" value=""></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="searchTopic">查询</el-button>
          <el-button type="primary" plain @click="showAddDialog">新增</el-button>
          <el-button
            plain
            @click="signClick">
            点击签到
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.topic.toLowerCase().includes(search.toLowerCase()) ||
              data.description.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 80%; margin: 0 auto"
        max-height="100%"
        border
      >
        <el-table-column
          label="主题ID"
          prop="topicId"
          align="center"
          width="50px"
        >
        </el-table-column>
        <el-table-column label="主题" prop="topic" align="center">
        </el-table-column>
        <el-table-column label="主题描述" prop="description" align="center">
        </el-table-column>
        <el-table-column label="权重" prop="weight" align="center" width="50px">
        </el-table-column>
        <el-table-column align="center" width="150px">
          <template slot="header" slot-scope="{}">
            <el-input v-model="search" size="mini" placeholder="搜索当前页" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      style="
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :total="totalCount"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :current-page="pageCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="编辑主题" :visible.sync="dialogFormVisible">
      <el-form :model="topicForm">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <el-input v-model="topicForm.topic" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主题描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="topicForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label="权重" :label-width="formLabelWidth">
          <el-select v-model="topicForm.weight" placeholder="请选择权重值">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增主题" :visible.sync="dialogAddTopicVisible">
      <el-form :model="topicForm">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <el-input v-model="topicForm.topic" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主题描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="topicForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label="权重" :label-width="formLabelWidth">
          <el-select v-model="topicForm.weight" placeholder="请选择权重值">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddTopicVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardAttributes: "2",
      signCount: "10",
      pageCount: 1,
      pageSize: 5,
      totalCount: 120,
      tableData: [],
      search: "",
      mainTopic: "",
      mainWeight: "",
      currentUserId: "",

      dialogFormVisible: false,
      dialogAddTopicVisible: false,
      topicForm: {
        topicId: 0,
        topic: "",
        description: "",
        weight: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    searchTopic() {
      this.pageCount = 1;
      this.queryTopic(this.pageCount, this.pageSize);
    },
    signClick() {
      let that = this;
      this.$http
        .post("local/users/sign", {
          id: localStorage.getItem("userId")
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.$notify.success({
            title: '',
            message: '签到成功',
            showClose: false,
            position: 'top-left'
          });
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.topicForm.topicId = row.topicId;
      this.topicForm.topic = row.topic;
      this.topicForm.description = row.description;
      this.topicForm.weight = parseInt(row.weight);
    },
    handleSave() {
      this.dialogFormVisible = false;
      let that = this;
      this.$http
        .put("local/users/saveTopic", {
          userId: localStorage.getItem("userId"),
          topicId: this.topicForm.topicId,
          topic: this.topicForm.topic,
          description: this.topicForm.description,
          weight: this.topicForm.weight,
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.$message({
              message: res.msg,
              type: "success",
            });
            that.queryTopic(that.pageCount, that.pageSize);
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let that = this;
          this.$http
            .delete("local/users/deleteTopic", {
              data: {
                userId: localStorage.getItem("userId"),
                topicId: row.topicId,
              },
            })
            .then(function (response) {
              var res = response.data;
              if (res.code == 20000) {
                that.$message({
                  message: res.msg,
                  type: "success",
                });
                that.queryTopic(that.pageCount, that.pageSize);
              } else {
                that.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    showAddDialog() {
      this.dialogAddTopicVisible = true;
      this.topicForm = {};
    },
    handleAdd() {
      this.dialogAddTopicVisible = false;
      let that = this;
      this.$http
        .post("local/users/addTopic", {
          userId: localStorage.getItem("userId"),
          topicId: this.topicForm.topicId,
          topic: this.topicForm.topic,
          description: this.topicForm.description,
          weight: this.topicForm.weight,
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.$message({
              message: res.msg,
              type: "success",
            });
            that.queryTopic(that.pageCount, that.pageSize);
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageCount = 1;
      this.pageSize = val;
      this.queryTopic(this.pageCount, this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageCount = val;
      this.queryTopic(this.pageCount, this.pageSize);
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
    queryTopic(pageCount, pageSize) {
      var userId = localStorage.getItem("userId");
      var topic = this.mainTopic;
      var mainWeight = this.mainWeight;
      let that = this;
      this.$http
        .post("local/users/queryTopic", {
          userId: userId,
          topic: topic,
          weight: mainWeight,
          pageCount: pageCount,
          pageSize: pageSize,
        })
        .then(function (response) {
          var res = response.data;
          if (res.code == 20000) {
            that.totalCount = res.totalCount;
            that.tableData = res.data;
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
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
                  message: "已退出",
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
    this.queryTopic(this.pageCount, this.pageSize);
    this.currentUserId = localStorage.getItem("userId");
  },
};
</script>

<style>
.tableCenter {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.divCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
/* 隐藏页面滚动条 */
/* ::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
} */
</style>