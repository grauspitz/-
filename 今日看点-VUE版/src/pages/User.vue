<template>
    <div class="user">
        <!-- 按钮区 -->
        <div class="btns">
            <el-button size='mini' @click="toAddUser" type="primary" plain>新增</el-button>
        </div>
        <!-- 按钮区结束 -->
        <!-- 栏目管理表格 -->
        <div  v-loading='loading'>
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
                    <!-- <i class="fa fa-pencil" @click="toUpdateUser(row)"></i> -->
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 栏目管理结束 -->
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
    //修改
    // toUpdateUser(row){
    //   this.cDialog.title = '修改用户';
    //   this.cDialog.form = row;
    //   this.cDialog.form.regTime = '';
    //   this.cDialog.visible = true;
    // },
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
.user_tbl{
    margin: 0 auto;
}
.btns {
  margin-bottom: 0.5em;
}
i.fa {
  margin: 0 1em;
  cursor: pointer;
}
i.fa.fa-trash {
  color: #f56c6c;
}
</style>
