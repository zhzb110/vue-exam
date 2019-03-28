import Vue from "vue"
import Router from "vue-router"
// 头部、菜单组件
import Layout from "@/pages/home"
Vue.use(Router)
// hidden: true 遍历菜单时不显示  icon 导航图标
export default new Router({
  routes: [
    { path: "/login", component: () => import("@/pages/login") },
    { path: "/exam", component: () => import("@/pages/exam") },
    { path: "/handParperSuccess", component: () => import("@/pages/handParperSuccess")},
    { path: "/print", component: () => import("@/pages/print")},
    {
      path: "/",
      title: "基础管理",
      component: Layout,
      redirect: "/currentExam",
      children: [
        {
          path: "/currentExam",
          component: () => import("@/pages/currentExam"),
          meta: { title: "当前考试" }
        }, 
        {
          path: "/orderExam",
          component: () => import("@/pages/orderExam"),
          meta: { title: "预约" }
        },
        {
          path: "/orderExamRoom",
          component: () => import("@/pages/orderExamRoom"),
          meta: { title: "预约场次" }
        },
        {
          path: "/orderExamTime",
          component: () => import("@/pages/orderExamTime"),
          meta: { title: "预约随到随考" }
        }     
      ]
    }
  ]
});
