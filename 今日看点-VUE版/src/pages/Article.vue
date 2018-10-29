<template>
    <div class="article">
        <!-- 按钮区 --> 
        <div class="btns">
            <el-select 
            v-model="params.categoryId" 
            clearable 
             style="width:120px"
            placeholder="请选择" 
            size="mini">
                    <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
             </el-select>
             <el-input 
             style="width:200px"
             placeholder="请输入关键字" 
             size="mini"
             v-model="params.keywords" 
             suffix-icon="el-icon-search"
             clearable>

             </el-input>
            <el-button size='mini' @click="toAddArticle" type="primary" plain>新增</el-button>
            <el-button size='mini' @click="batchDeleteAticle" type="danger" plain>批量删除</el-button>
        </div>
        <!-- 按钮区结束 -->

        <!-- 文章管理表格 -->
        <!-- {{articles}} -->
        <!-- {{params}} -->
        <div class="article_tbl" v-loading='loading'>
            <el-table :data="articles" style="width: 100%" 
            size="mini" :border='true' 
             @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
             <el-table-column
                prop="id"
                label="编号"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="title"
                label="文章标题"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="category.name"
                label="所属栏目"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="liststyle"
                align='center'
                label="排列方式">
            </el-table-column>
             <el-table-column
                prop="author"
                label="作者"
                align='center'
                width="100">
            </el-table-column>
              <el-table-column
                prop="publishtime"
                label="发布时间"
                align='center'
                width="150">
            </el-table-column>
              <el-table-column
                prop="readtimes"
                label="阅读次数"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column label="操作" align='center' width='100'>
                <template slot-scope="{row}">
                    <!-- {{row}} -->
                    <i class="fa fa-trash" @click="deleteArticle(row.id)"></i>
                    <i class="fa fa-pencil" @click="toUpdateArticle(row)"></i>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 栏目管理结束 -->
        <!-- 分页 -->
        <div class="page">
            <el-pagination
              layout="prev, pager, next"
              :page-size="params.pageSize"
              @current-change='handleCurrentChange'
              :total="total">
            </el-pagination>
        </div>
        <!-- 模态框 -->
           <el-dialog :title="cDialog.title" :visible.sync="cDialog.visible">
             <!-- {{cDialog.form}} -->
              <el-form :model="cDialog.form" size="mini">
                <el-form-item label="文章标题" label-width="6em">
                  <el-input v-model="cDialog.form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属栏目" label-width="6em">
                  <el-select v-model="cDialog.form.category" placeholder=''>
                    <el-option :key='c.id' v-for='c in categories' :label="c.name" :value="c"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="列表样式" label-width="6em">
                   	<label for="style-one">
                        <input type="radio" value="style-one" id="style-one" v-model="cDialog.form.liststyle">
                        <img src="../assets/style-one.jpg" alt="" width="160" height="100">
                    </label>
                    <label for="style-two">
                        <input type="radio" value="style-two" id="style-two" v-model="cDialog.form.liststyle">
                       <img src="../assets/style-two.jpg" alt="" width="160" height="100">
                    </label>
                </el-form-item>
                 <el-form-item label="正文" label-width="6em">
                  <el-input v-model="cDialog.form.content" type="textarea" :rows="2"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeCDialog">取 消</el-button>
                <el-button type="primary" size="mini" @click="saveOrUpdateArticle">确 定</el-button>
              </div>
            </el-dialog>
        <!-- 模态框结束 -->
    </div>
</template>
<script>
import qs from "qs";
import axios from "@/http/axios";
export default {
  data() {
    return {
      loading: false,
      total:10,
      params: {
        page: 0,
        pageSize: 7,
        categoryId: undefined,
        keywords: undefined
      },
      categories: [],
      category: [],
      articles: [],
      multipleSelection: [],
      cDialog: {
        title: "",
        visible: false,
        form: {}
      }
    };
  },
  created() {
    this.findAllCategories();
    this.findArticles();
  },
  watch: {
    params:{
      handler:function(){
        this.findArticles();
      },
      deep:true
    }
  },
  methods: {
    // 处理翻页
    handleCurrentChange(page){
      this.params.page = page-1;
    },
    //修改
    toUpdateArticle(row) {
      this.cDialog.title = "修改文章";
      this.cDialog.form.category = this.category;
      this.cDialog.form = row;
      this.cDialog.visible = true;
    },
    //提交表单
    saveOrUpdateArticle() {
      axios
        .post("/manager/article/saveOrUpdateArticle", this.cDialog.form)
        .then(() => {
          this.$notify.success({
            title: "成功",
            message: "提交成功！"
          });
          this.closeCDialog();
          this.findAllCategories();
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
    toAddArticle() {
      this.cDialog.title = "新增文章";
      this.cDialog.visible = true;
    },
    //通过id删除
    deleteArticle(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios
          .get("/manager/article/deleteArticleById?id=" + id)
          .then(() => {
            this.$notify.success({
              title: "成功",
              message: "删除成功！"
            });
            this.findArticles();
          })
          .catch(() => {
            this.$notify.error({
              title: "错误",
              message: "删除失败！"
            });
          });
      });
    },
    //批量删除
    batchDeleteAticle() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = this.multipleSelection.map(item => {
          return item.id;
        });
        axios
          .post("/manager/article/batchDeleteArticle", { ids })
          .then(() => {
            this.$notify.success({
              title: "成功",
              message: "删除成功！"
            });
            this.findArticles();
          })
          .catch(() => {
            this.$notify.error({
              title: "错误",
              message: "删除失败！"
            });
          });
      });
    },
    //单选框取值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //查询所有栏目
    findAllCategories() {
      axios
        .get("/manager/category/findAllCategory")
        .then(({ data: result }) => {
          this.categories = result.data;
        })
        .catch(() => {
          this.$notify.error({
            title: "错误",
            message: "网络异常"
          });
        });
    },
    //查询所有文章
    findArticles() {
      this.loading = true;
      axios
        .get("/manager/article/findArticle", {
          params: this.params
        })

        //   axios
        //     .get("/manager/article/findArticle",{page:0, pageSize:100,categoryId:this.category.id})
        .then(({ data: result }) => {
          console.log(result.data.list);
          this.total = result.data.total;
          this.articles = result.data.list;
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
.article_tbl{
  position: relative;
}
.page{
  position: relative;
  left: 250px;
  width:588px;
  overflow: auto;
}
</style>
