// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
// import {Input, Button, Select, Radio, Checkbox, Table, Option, Pagination, Dialog, Dropdown,} from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import router from "./router.js";
import "./assets/icon/iconfont.css";
import "./assets/css/index.css";
import App from "./App";
import { getCookieValue} from "@/common/util/index.js"
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "small" });
router.beforeEach((to, from, next) => {
  if (getCookieValue("accessTokenExamAdmin")) { // 用户已经登录
    if(to.path!="/login"){ // 登录过不能再进入登录页面
      next()
    } else{
      next({ path: '/' })
    }
  } else { //用没有登录
    if(to.path=='/login'){
      next()
    } else{
      next({ path: '/login' })
    }
  }
})
new Vue({
  data() {
    return {
      transitionName: "slide"
    };
  },
  router,
  render: h => h(App)
}).$mount("#app");
