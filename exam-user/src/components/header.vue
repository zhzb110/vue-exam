<template>
  <div class="header">
    <!-- 折叠按钮 -->  
    <div class="logo" :class="{'logo60': sidebar}">
      <img src="../assets/img/logo.png" alt="" class="margin-t5" style="margin-left: 20px"/>
    </div>
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-caret-left" v-show='!sidebar'></i>
      <i class="el-icon-caret-right" v-show='sidebar'></i>
    </div>
    <div class="header-title font-size20">网络考试平台</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
          <!-- 用户名下拉菜单 -->
        <div class="user">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link user-name" >
              <img src="../assets/img/defaultHead.png" />
              <span>用户名</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginout">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { delCookie } from "@/common/util"
export default {
  data() {
    return {
      fullscreen: false,
      message: 2
    };
  },
  props: ["sidebar"],
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command === "loginout") {
        delCookie("accessTokenExam");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.$emit("collapseChage");
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.header {position: relative;box-sizing: border-box;width: 100%;height: 60px;font-size: 22px;color: #fff;}
.collapse-btn {float: left;padding: 0 10px;cursor: pointer;line-height: 60px;}
.header .logo {float: left;width: 200px;transition: all 0.3s linear;}
.logo60 { width: 60px !important; transition: all 0.3s linear;}
.logo {overflow: hidden;}
.header-right {float: right;padding-right: 40px;}
.header-title {float: left;width: 150px;line-height: 60px;}
.header-user-con {display: flex;height: 60px;align-items: center;}
.btn-fullscreen {transform: rotate(45deg);margin-right: 5px;font-size: 24px;}
.btn-fullscreen { position: relative;width: 30px;height: 30px;text-align: center;border-radius: 15px;cursor: pointer;}
.btn-bell .el-icon-bell {color: #fff;}
.user {display:block;position: relative;line-height: 60px;margin-left: 20px}
.user-name>span{color: #fff;display: inline-block;margin-left: 50px}
.user-name>img{ width: 40px;height: 40px;border-radius: 20px;position: absolute;top: 10px;left: 0px }
.el-dropdown-link {color: #fff;cursor: pointer;}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
