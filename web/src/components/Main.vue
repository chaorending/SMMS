<template>
  <div class="container">
    <div class="side">
      <el-menu :default-active="$route.name" :router="bol" background-color="#304156" text-color="#bfcbd9" active-text-color="#42b983">
        <template v-for="(item,index) in $router.options.routes">
          <el-submenu v-if="item.children&& item.children.length>0" :index="index" :key="index">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <template v-for="(item) in item.children">
              <el-menu-item :index="item.path" :key="item.path">
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <router-link v-else :to="{path: item.path}" :key="item.path">
            <el-menu-item :index="index" :key="index" v-if="item.menuShow">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </div>
    <div class="main">
      <div class="head">
        <div class="head-left">
          <el-breadcrumb separator="/">
            <template v-for="(item,index) in breadcrumb">
              <el-breadcrumb-item :to="{ path: item.path}" :key="index">{{item.name}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <div class="head-right">
          <el-dropdown @command="dropCallback">
            <div class="userInfo">
              <span class="el-dropdown-link">
                <img src="../assets/logo.png" alt="">
                 一小时小超人
              </span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改信息</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      breadcrumb: "",
      bol: true
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumb = this.$route.matched.filter(item => item.name);
    },
    dropCallback(value) {
      if (value === "exit") {
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style  scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  .side {
    float: left;
    width: 200px;
    height: 100%;
    background-color: rgb(48, 65, 86);
    .el-menu {
      border: 0px;
      text-align: left;
    }
  }
  .main {
    margin-left: 200px;
    height: 100%;
    background: white;
    .head {
      width: 100%;
      height: 7%;

      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      vertical-align: middle;
      .head-left {
        height: 100%;
        width: 50%;
        float: left;
        .el-breadcrumb {
          line-height: 50px;
          margin-left: 15px;
        }
      }
      .head-right {
        height: 100%;
        float: right;
        width: 50%;
        line-height: 50px;
        vertical-align: middle;
        text-align: right;
        padding-right: 50px;
        box-sizing: border-box;
        .userInfo {
          img {
            display: inline-block;
            border-radius: 100%;
            height: 50px;
            width: 50px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }
    .content {
      height: 93%;
      box-sizing: border-box;
      padding: 25px 10px;
      overflow-y: auto;
    }
  }
}
</style>


