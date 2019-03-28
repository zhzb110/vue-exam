<template>
  <div class="login-wrap">
    <div class="ms-title font-size20">
       <div class="ms-title1"><img src="../assets/img/loginLogo.png" alt=""></div>
    </div>
    <div class="ms-login">
      <div class="ms-login-title">
        <span>网络考试后台管理</span>     
      </div>
      <div v-show="loginUnit" class="text-center">
        <img src="../assets/img/login-card.jpg" alt="" style="margin-top: 30px;" width="280" @click="unitUserLogin()">
      </div>
      <div v-show="!loginUnit" style="width: 280px;margin: 10px auto;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="学号/用户名">
                <i slot="prefix" class="iconfont icon-user"></i></el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input type="password" placeholder="密码" v-model="ruleForm.password" >
                <i slot="prefix" class="iconfont icon-password"></i></el-input></el-input>
          </el-form-item>
             <el-form-item prop="verify">
              <el-input  placeholder="验证码不区分大小写" v-model="ruleForm.verify" style="width: 150px">
                <i slot="prefix" class="iconfont icon-yanzheng" ></i></el-input></el-input>
              <img src='../assets/img/age.jpg' @click="verifyImgChange()" class="verify-img"/>
          </el-form-item>
          <div class="login-btn">
              <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
          </div>
       </el-form>
      </div>   
      <span class="color-ff font-size12" @click="forgetPassword()" style="margin-left: 38px;position: absolute;bottom: 20px:color:#ddd">提示：用户名和密码随便填</span> 
    </div>
  </div>
</template>
<script>
import { apiGet, apiPost } from "@/common/api";
import { setCookie } from "@/common/util/index";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        verify: ""
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verify: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      loginUnit: false, // 登录方式
      verifyImg:
        "http://210.28.216.100:8082/jwpt-web/getCaptcha?date%20=1532053519619" // 验证码图片
    };
  },
  methods: {
    // 页面登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          setCookie('accessTokenExamAdmin','tokenzhangjunpingping',2)
          this.$router.push({ path: "/basisManage/sponsor" });
        } else {
          return false;
        }
      });
    },
    // 登录方式切换
    loginWay(way) {
      if (way === 1) {
        this.loginUnit = true;
      } else {
        this.loginUnit = false;
      }
    },
    // 验证码图片更换
    verifyImgChange() {
      return new Promise((resolve, reject) => {
        verifyImg()
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 统一用户登录
    unitUserLogin() {
      // window.location.href =
      //   "https://ids3.jsou.cn/login?service=" + window.location.href;
    },
    // 忘记密码
    forgetPassword() {}
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  height: 100%;
  background-image: url(../../static/loginBg.jpg);
  background-size: 100%;
  min-height: 500px;
}
.ms-title {
  margin: 0 auto;
  width: 903px;
  overflow: hidden;
}
.ms-login {
  width: 350px;
  height: 300px;
  margin: 50px auto 10px;
  padding: 10px 30px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 21px 3px #409eff;
  position: relative;
  background: hsla(0,0%,100%,.3);
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.ms-title1 {
  width: 265px;
  height: 82px;
  float: left;
  margin-top: 67px;
}
.ms-title2 {
  width: 182px;
  line-height: 82px;
  float: left;
  font-size: 30px;
  margin-top: 67px;
  color: #fff
}
.footer-text {
  color: #7a8ca5;
  font-size: 13px;
  padding-bottom: 4px;
}
.ms-login-title {
  overflow: hidden;
}
.ms-login-title > span {
  width: 100%;
  float: left;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  color: #5eafdc;
  border-bottom: 1px solid #5eafdc;
}
.verify-img {
  float: right;
  height: 30px;
  width: 105px;
}
</style>
