<template>
    <div class="userInfo">
        <el-input placeholder="输入新的名称" style="width:200px" v-model="userName" clearable>
        </el-input>
        <br>
        <el-input placeholder="输入新的密码" style="width:200px" v-model="userPassword" clearable>
        </el-input>
        <br>
        <el-button type="primary" @click="updateUserInfo">修改</el-button>
    </div>
</template>
<script>
import API from "../../api/user.js";
export default {
  name: "userInfo",
  data() {
    return {
      userName: "",
      userPassword: ""
    };
  },
  methods: {
    updateUserInfo() {
      var user = JSON.parse(localStorage.getItem("access-user"));
      var id = user.data[0].id;
      var param = { userName: this.userName, userPassword: this.userPassword, id: id };
      API.changeuserinfo(param).then(function(data){
          console.log(data);
      },function(result){

      })
    }
  },
  mounted() {
    var user = localStorage.getItem("access-user");
  }
};
</script>

<style  scoped lang="scss">
.userInfo {
  text-align: left;
  .el-input {
    margin: 10px;
  }
  .el-button {
    margin: 10px;
  }
}
</style>


