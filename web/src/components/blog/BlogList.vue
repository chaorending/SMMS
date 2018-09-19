<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="标题" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="OpenAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="articelList" style="width: 100%;">
        <el-table-column v-if="false" prop="id" width="60"></el-table-column>
        <el-table-column prop="title" label="文章标题" sortable></el-table-column>
        <el-table-column prop="depict" label="简介" sortable>
        </el-table-column>
        <el-table-column prop="user_name" label="作者" width="100" sortable></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="150" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteArticle(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="10" :pageCount="pageCount" style="float:right;">
        </el-pagination>
      </el-col>
    </el-col>

  </el-row>
</template>
<script>
import API from "../../api/blog.js";
export default {
  name: "blogList",
  data() {
    return {
      loading: false,
      articelList: [],
      pageCount: 0,
      page: 1,
      filters: {
        title: ""
      }
    };
  },
  methods: {
    handleSearch() {
      this.search();
    },
    search() {
      let that = this;
      let params = {
        pageIndex: that.page,
        pageSize: 5,
        title:that.filters.title
      };
      that.loading = true;
      API.findList(params)
        .then(
          function(result) {
            that.loading = false;
            that.articelList = result.data[1];
            that.pageCount = Math.ceil(result.data[0][0].Total/5);
          },
          function(err) {
            that.loading = false;
            that.$message.error({
              showClose: true,
              message: err.toString(),
              duration: 2000
            });
          }
        )
        .catch(function(error) {
          that.loading = false;
          console.log(error);
          that.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 2000
          });
        });
    },
    openEdit: function(row) {
      this.$router.push({
        path: "/blog/edit",
        query: {
          id: row.id
        }
      });
    },
    OpenAdd: function() {
      this.$router.push({
        path: "/blog/edit",
        query: {
          id:0
        }
      });
    },
    deleteArticle: function(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          let params = { id: id };
          let that = this;
          API.remove(params).then(
            function(result) {
              that.loading = false;
              that.$message({
                showClose: true,
                type: "success",
                message: "删除成功"
              });
              that.handleSearch();
            },
            function(err) {
              that.loading = false;
              that.$message.error({
                showClose: true,
                message: err.toString(),
                duration: 2000
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changePage(page) {
      console.log(page);
      this.page = page;
      this.handleSearch();
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>
<style>
.cell {
  text-align: left;
}
</style>
