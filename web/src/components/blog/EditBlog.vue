<template>
  <el-row class="warp">
    <el-form label-width="100px" ref="editForm">
      <el-form-item label="标题" prop="name">
        <el-input auto-complete="off" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="name">
        <el-input auto-complete="off" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="form.typeValue" placeholder="请选择">
          <el-option v-for="item in typelist" :key="item.id" :label="item.typeName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="name">
        <el-upload class="avatar-uploader" action="/api/blog/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.path" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--富文本编辑器组件-->
      <el-form-item label="内容">
        <div class="aid">
          <el-upload class="avatar-uploader" :action="serverUrl" name="img" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
          </el-upload>
        </div>
        <quill-editor class="content" v-model="form.detailContent" ref="myQuillEditor" :options="editorOption">
        </quill-editor>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="addSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
// 工具栏配置
import Config from "../../../setting.js";
import API from "../../api/blog.js";
export default {
  name: "editArticle",
  data() {
    return {
      form: {
        id: 0,
        title: "",
        desc: "",
        path: "",
        typeValue:"",
        detailContent: "",
        imageWidth: "",
        imageHeight: ""
        
      },
      typelist:[],
      serverUrl: "/api/blog/upload", // 这里写你要上传的图片服务器地址
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: Config.toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector(".aid .avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.path = res.path;
      var img = new Image();
      img.src = this.imageUrl;
      var vue = this;
      img.onload = function() {
        vue.form.imageWidth = this.width;
        vue.form.imageHeight = this.height;
      };
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("只能上传图片");
      }
      return isJPG
    },
    // 上传图片前
    beforeUpload(res, file) {
      this.quillUpdateImg = true;
    },
    // 上传图片成功
    uploadSuccess(res, file) {
      this.quillUpdateImg = false;
      let quill = this.$refs.myQuillEditor.quill;
      quill.insertEmbed(length, "image", res.path);
      // 调整光标到最后
      quill.setSelection(length + 1);
    }, // 上传图片失败
    uploadError(res, file) {
      this.quillUpdateImg = false;
    },
    addSubmit() {
      let params = this.form;
      let that = this;
      if (this.form.id) {
        API.update(params).then(
          function(result) {
            that.loading = false;
            that.articelList = result.articleList;
            that.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
              duration: 2000
            });
          },
          function(err) {
            that.loading = false;
            that.$message.error({
              showClose: true,
              message: "保存失败",
              duration: 2000
            });
          }
        );
      } else {
        API.add(params).then(
          function(result) {
            that.loading = false;
            that.form.id = result.insertId;
            that.$message({
              showClose: true,
              message: "添加成功",
              type: "success",
              duration: 2000
            });
          },
          function(err) {
            that.loading = false;
            that.$message.error({
              showClose: true,
              message: "添加失败",
              duration: 2000
            });
          }
        );
      }
    },
    update() {
      this.form.id = this.$route.query.id;
      let that = this;
      if (this.form.id) {
        API.findById(that.form.id).then(
          function(result) {
            console.log(result);
            that.form.title = result.data[1][0].title;
            that.form.path =  result.data[1][0].imageUrl;
            that.form.detailContent =  result.data[1][0].content;
            that.form.desc =  result.data[1][0].desc1;
            that.form.imageWidth =  result.data[1][0].imageWidth;
            that.form.imageHeight =  result.data[1][0].imageHeight;
            that.typelist=result.data[0];
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
      }
    }
  },
  computed: {
    imageUrl: function() {
      return Config.baseUrl + this.form.path;
    }
  },
  mounted: function() {
    this.update();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.update();
    });
  }
};
</script>
<style>
.el-form-item__content {
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
