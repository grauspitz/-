<template>
    <div class="article">
        <!-- 按钮区 --> 
        <div class="btns">
            <!-- {{categoryId}} -->
              <el-input 
             style="width:200px"
             placeholder="请输入关键字" 
             size="mini"
             v-model="params.keywords" 
             suffix-icon="el-icon-search"
             clearable>
             </el-input>
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
           
            <el-button size='mini' @click="toAddArticle" type="primary" plain>新增</el-button>
            <el-button size='mini' @click="batchDeleteAticle" type="danger" plain>批量删除</el-button>
        </div>
        <!-- 按钮区结束 -->

        <!-- 文章管理表格 -->
        <!-- {{articles}} -->
        {{params}}
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
           <el-dialog fullscreen :title="articleDialog.title" :visible.sync="articleDialog.visible">
             {{articleDialog.form}}
              <el-form :model="articleDialog.form" size="mini">
                <el-form-item label="资讯标题" label-width="6em">
                  <el-input v-model="articleDialog.form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属栏目" label-width="6em">
                  <el-select v-model="articleDialog.form.categoryId" placeholder=''>
                    <el-option :key='c.id' v-for='c in categories' :label="c.name" :value="c.id"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="列表样式" label-width="6em">
                   <ul class="list_style">
                     <li class="style_one" :class="{current:articleDialog.form.liststyle=='style-one'}" @click="articleDialog.form.liststyle = 'style-one'">
                       <img src="@/assets/style_one.jpg" alt="">
                     </li>
                     <li class="style_two" :class="{current:articleDialog.form.liststyle=='style-two'}" @click="articleDialog.form.liststyle = 'style-two'">
                       <img src="@/assets/style_two.jpg" alt="">
                     </li>
                   </ul>
                </el-form-item>
                   <el-form-item label="缩略图" label-width="6em">
                        <el-upload
                          action="http://106.14.199.227:8099/manager/file/upload"
                          :on-success='handleUploadSuccess'
                          list-type="picture">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>     
                  </el-form-item>
                 <el-form-item label="正文" label-width="6em">
                  <quill-editor 
                      v-model="articleDialog.form.content" 
                      ref="myQuillEditor" 
                      :options="editorOption" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"> 
                  </quill-editor>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeArticleDialog">取 消</el-button>
                <el-button type="primary" size="mini" @click="saveOrUpdateArticle">确 定</el-button>
              </div>
            </el-dialog>
        <!-- 模态框结束 -->
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import qs from "qs";
import axios from "@/http/axios";
export default {
  data() {
    return {
      editorOption: {},
      loading: false,
      total: 10,
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
      articleDialog: {
        title: "",
        visible: false,
        form: {
          liststyle: "style-one",
          fileIds: []
        }
      }
    };
  },
  created() {
    this.findAllCategories();
    this.findArticles();
  },
  computed: {
    keywords() {
      return this.params.keywords;
    },
    categoryId() {
      return this.params.categoryId;
    }
  },
  watch: {
    params: {
      handler: function() {
        this.findArticles();
      },
      deep: true
    },
    keywords() {
      this.params.page = 0;
    },
    categoryId() {
      this.params.page = 0;
    }
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    //上传图片
    handleUploadSuccess(response, file, fileList) {
     this.articleDialog.form.fileIds.push(response.data.id);
    },
    // 处理翻页
    handleCurrentChange(page) {
      this.params.page = page - 1;
    },
    //修改
    toUpdateArticle(row) {
      this.articleDialog.title = "修改文章";
      this.articleDialog.form.category = this.category;
      this.articleDialog.form = row;
      this.articleDialog.visible = true;
    },
    //提交表单
    saveOrUpdateArticle() {
      axios
        .post("/manager/article/saveOrUpdateArticle", this.articleDialog.form)
        .then(() => {
          this.$notify.success({
            title: "成功",
            message: "提交成功！"
          });
          this.closeArticleDialog();
          this.findArticles();
        })
        .catch(() => {
          this.$notify.error({
            title: "错误",
            message: "提交失败！"
          });
        });
    },
    //关闭模态框
    closeArticleDialog() {
      this.articleDialog.form = {};
      this.articleDialog.visible = false;
    },
    //弹出模态框
    toAddArticle() {
      this.articleDialog.title = "发布文章";
      this.articleDialog.visible = true;
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
.article_tbl {
  position: relative;
}
.page {
  position: relative;
  left: 250px;
  width: 588px;
  overflow: auto;
}

.list_style>li.current{
  border:2px solid #8dbef3;
}
.list_style > li {
  width: 200px;
  height: 80px;
  border: 1px solid #ededed;
  border-radius: 3px;
  padding: .5em;
}
.list_style > li img {
  width: 100%;
}
.list_style > li.style_one{
  padding: 0;
  float: left;
}
.list_style > li.style_two{
  padding: 0;
  margin-left: 220px;
}
</style>
