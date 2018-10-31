<template>
    <div class="user">
        <!-- 按钮区 -->
        <div class="btns">
            <el-button size='medium' @click="toAddUser" type="primary">新增</el-button>
        </div>
        <!-- 按钮区结束 -->
        <!-- 用户管理表格 -->
        <!-- <div  v-loading='loading'>
            <el-table :data="users" style="width: 100%" height="400" 
            class="user_tbl"
            size="mini" :border='true' >
             <el-table-column
                prop="id"
                label="用户ID"
                align='center'
                width="150">
            </el-table-column>
             <el-table-column
                prop="username"
                label="用户名"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="真实姓名"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                align='center'
                width="250">
            </el-table-column>
            <el-table-column
                prop='enabled'
                align='center'
                label="状态">
            </el-table-column>
            <el-table-column label="操作" align='center' width='100'>
                <template slot-scope="{row}">
                    <i class="fa fa-trash" @click="deleteUser(row.id)"></i>
                </template>
            </el-table-column>
            </el-table>
        </div> -->
        <!-- 用户管理结束 -->
        <!-- 卡片 -->
             <el-row v-loading='loading'>
                 <el-col :span="4" v-for="(u,index) in users" :key="index" :offset="1" style="margin-bottom:40px">
                    <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover" style="width: 260px;height: 320px;">
                        <div style="padding: 6px;height: 310px;">
                            <div style="position: relative;top: 40px; width:100%">
                                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3100338932,2256022770&fm=27&gp=0.jpg" class="image">
                                <div  style="margin:0 auto;width:140px;"><i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>{{u.nickname}}</div>
                            </div>
                            <div style="position: relative;top: 50px;">
                                <div style="margin:0 auto;width:140px;">{{'('+u.username+')'}}</div>
                            </div>
                           <div style="position: relative;top: 60px;">
                                <div  style="margin:0 auto;width:100%;"><i class="fa fa-envelope"></i>{{u.email}}</div>
                            </div>
                              <div style="position: relative;top: 80px; text-align:inline-block;">
                                 <div style="margin:0 auto;width:90px;"><el-button style="margin:0 auto" type="danger" icon="el-icon-delete" circle @click="deleteUser(u.id)"></el-button></div>
                            </div>
                         
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        <!-- 卡片 -->
        <!-- 模态框 -->
           <el-dialog :title="cDialog.title" :visible.sync="cDialog.visible">
             <!-- {{cDialog.form}} -->
              <el-form :model="cDialog.form" size="small">
                <el-form-item label="用户名称" label-width="6em">
                  <el-input v-model="cDialog.form.username" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="真实名称" label-width="6em">
                  <el-input v-model="cDialog.form.nickname" autocomplete="off"></el-input>
                </el-form-item>     
                  <el-form-item label="密码" label-width="6em">
                  <el-input v-model="cDialog.form.password" type="password" autocomplete="off"></el-input>
                </el-form-item>  
                  <el-form-item label="确认密码" label-width="6em">
                  <el-input v-model="cDialog.form.password1" type="password" autocomplete="off"></el-input>
                </el-form-item>  
                  <el-form-item label="用户邮箱" label-width="6em">
                  <el-input v-model="cDialog.form.email" type="textarea" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeCDialog">取 消</el-button>
                <el-button type="primary" size="mini" @click="saveOrUpdateUser">确 定</el-button>
              </div>
            </el-dialog>
        <!-- 模态框结束 -->
    </div>
</template>
<script>
import axios from "@/http/axios";
export default {
  data() {
    return {
      loading: false,
      users: [],
      cDialog: {
        title: "",
        visible: false,
        form: {}
      }
    };
  },
  created() {
    //查询所有栏目信息
    this.findAllUser();
  },
  methods: {
    //提交表单
    saveOrUpdateUser() {
      axios
        .post("/manager/user/saveOrUpdateUser", this.cDialog.form)
        .then(() => {
          this.$notify.success({
            title: "成功",
            message: "提交成功！"
          });
          this.closeCDialog();
          this.findAllUser();
        })
        .catch(() => {
          this.$notify.error({
            title: "错误",
            message: "提交失败！"
          });
        });
    },
    //关闭模态框
    closeCDialog() {
      this.cDialog.form = {};
      this.cDialog.visible = false;
    },
    //弹出模态框
    toAddUser() {
      this.cDialog.title = "添加用户";
      this.cDialog.visible = true;
    },
    //通过id删除
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios
          .get("/manager/user/deleteUserById?id=" + id)
          .then(() => {
            this.$notify.success({
              title: "成功",
              message: "删除成功！"
            });
            this.findAllUser();
          })
          .catch(() => {
            this.$notify.error({
              title: "错误",
              message: "删除失败！"
            });
          });
      });
    },
    //查询所有栏目
    findAllUser() {
      this.loading = true;
      axios
        .get("/manager/user/findAllUser")
        .then(({ data: result }) => {
          this.users = result.data;
        })
        .catch(() => {
          this.$notify.error({
            title: "错误",
            message: "网络异常"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style>
.user_tbl {
  margin: 0 auto;
}
.btns {
  margin-bottom: 0.5em;
  margin-left:3em;
}
i.fa {
  margin: 0 1em;
  cursor: pointer;
}
i.fa.fa-trash {
  color: #f56c6c;
}
.userUL {
  width: 100%;
  display: inline-block;
}
.box {
  width: 30%;
  height: 400px;
  background-color: antiquewhite;
}
.image {
  width: 100px;
  height: 100px;
  position: relative;
  left: 50px;
}
</style>
