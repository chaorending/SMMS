<template>
  <div id="typeList">
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <el-row>

        <el-col :span="6">
          <el-input v-model="queryparams.name" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="typeList" style="width: 100%" :default-sort="{prop: 'typeName', order: 'descending'}">
        <el-table-column prop="id" label="" v-if="false" sortable width="180">
        </el-table-column>
        <el-table-column prop="typeName" label="类别" sortable width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-size="5" :page-count="total" @current-change="changePage">
      </el-pagination>
    </el-col>
    <el-dialog :title="dialgTitel" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="dialgTypeName"></el-input>
          <el-input autocomplete="off" :v-model="editId" v-if="false"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEdit">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
import API from "../../api/type.js";
export default {
  name: "typeList",
  data() {
    return {
      page: 1,
      pagesize: 5,
      typeList: [],
      total: 0,
      loading: false,
      queryparams: {
        name: ""
      },
      editId: 0,
      dialgTitel: "新增类型",
      dialgTypeName: "",
      dialogFormVisible: false,
      formLabelWidth: "50px"
    };
  },
  methods: {
    query() {
      let that = this;
      let params = {
        pageIndex: that.page,
        pagesize: 5,
        name: that.queryparams.name
      };
      that.loading = true;
      API.findList(params).then(
        function(result) {
          that.loading = false;
          if (result.status) {
            that.typeList = result.data[1];
            that.total = Math.ceil(result.data[0][0].Total / 5);
          } else {
            that.$message.error({
              showClose: true,
              message: result.message.toString(),
              duration: 2000
            });
          }
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
    },
    opendialog(row) {
      if (row.id) {
        this.editId = row.id;
        this.dialgTitel = "修改类型名称";
        this.dialgTypeName = row.typeName;
      }
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.opendialog(row);
    },
    handleDelete(row) {
      let that=this
      let params = {
        id: row.id
      };
      API.remove(params).then(
        function(result) {
          if (result.status) {
            that.$message({
              showClose: true,
              type: "success",
              message: "添加成功"
            });
            that.query();
          }else{
            that.$message.error({
                showClose: true,
                message: result.message.toString(),
                duration: 2000
              });
          }
        },
        function(err) {
        }
      );
    },
    addOrEdit() {
      let that = this;
      this.dialogFormVisible = false;
      let params = {
        id: this.editId,
        name: this.dialgTypeName
      };
      if (params.id) {
        API.update(params).then(
          function(result) {
            if (result.status) {
              that.$message({
                showClose: true,
                type: "success",
                message: "保存成功"
              });
              that.query();
            } else {
              that.$message.error({
                showClose: true,
                message: result.message.toString(),
                duration: 2000
              });
            }
          },
          function(err) {
            that.$message.error({
              showClose: true,
              message: err.toString(),
              duration: 2000
            });
          }
        );
      } else {
        API.add(params).then(
          function(result) {
            if (result.status) {
              that.$message({
                showClose: true,
                type: "success",
                message: "添加成功"
              });
              that.query();
            } else {
              that.$message.error({
                showClose: true,
                message: result.message.toString(),
                duration: 2000
              });
            }
          },
          function(err) {
            that.$message.error({
              showClose: true,
              message: "添加失败",
              duration: 2000
            });
          }
        );
      }
    },
    changePage(page) {
      this.page = page;
      this.query();
    }
  },
  mounted() {
    this.query();
  },
  watch: {
    dialogFormVisible(val, oldVal) {
      if (!val) {
        this.editId = 0;
        this.dialgTitel = "新增类型";
        this.dialgTypeName = "";
      }
    }
  }
};
</script>
<style>
</style>


