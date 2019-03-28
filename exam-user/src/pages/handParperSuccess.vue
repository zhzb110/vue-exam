<template>
  <div style="background: #eff3f7" :style="{height: height+'px'}">
    <div class="exam-header">
      <div class="exam-content">
        <div class="logo"><img src="../assets/img/logo.png" alt=""/></div>
        <div class="title" >网络考试平台</div>
        <div class="user">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link user-name" >
              <img src="http://210.28.216.100:9080/resource/sys/coverPic/admin_2bdfc349ea43477d996f4e380583ce14_avatar.jpg" />
              <span>用户名</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="loginout">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="complete">
      <div class="complete-text">
        <div class="complete-icon"><i class="iconfont icon-xing"></i></div>
        <div class="complete-wen">感谢您的作答！</div>
        <div class="complete-img"><img src="../assets/img/completebg.png" alt=""></div>
      </div>
      <div class="complete-btn">
        <el-button type="primary" @click="returnHome">返回首页</el-button>
      </div>
    </div>   
  </div>
</template>
<script>
import { delCookie } from "@/common/util"
export default {
  data() {
    return {
      height:''
    }
  },
  methods: {
    // 退出
    handleCommand(command) {
      if (command === "loginout") {
        delCookie("token");
        this.$router.push("/login");
      }
    },
    // 返回首页
    returnHome() {
      this.$router.push("/currentExam")
    }
  },
  components: {
  
  },
  created() {
    var height=document.documentElement.clientHeight
    this.height = height
  }
};
</script>
<style scoped>
.exam-header{ background: #409eff;position: relative;height: 60px }
.exam-content{ width: 1200px;margin:0 auto;position: relative;}
.exam{ height: 100% }
.logo{ float: left;width: 180px;margin-top: 5px }
.user{ float: right;width: auto;line-height: 60px;color:#fff;max-width: 250px;padding:0px 10px;cursor:pointer; }
.title{ float: left;line-height: 60px;color: #fff;width: 120px;font-size: 18px }
.exam-ques{ width: 1000px;float: left;margin-top: 0px;padding:0px 15px;background:#eff3f7;min-height:400px;position: relative;}
.exam-ques-title{ padding:10px 15px; overflow: hidden; background: #fafafa; margin: 0px -15px;}
.exam-ques-title>label{ line-height: 32px; }
.complete{ width: 350px;margin:0 auto; height: 440px;box-shadow: 0 2px 24px 0 rgba(64,168,255,0.5);background: #fff;margin-top: 60px;border-radius: 4px }
.complete-text{ height: 360px;background: #409eff;text-align: center;color:#fff;border-radius: 4px; }
.complete-btn{ height: 80px;line-height: 80px;text-align: center; }
.complete-icon{height: 200px;}
.complete-icon>i{ font-size: 200px;}
.complete-img{ height: 100px }
.complete-wen{height: 60px;line-height: 60px;font-size: 20px}
.complete-img>img{ width: 100%;height: auto; margin-top: 35px}
.user-name>span{color: #fff;display: inline-block;margin-left: 50px}
.user-name>img{ width: 40px;height: 40px;border-radius: 20px;position: absolute;top: 10px;left: 0px }
</style>
