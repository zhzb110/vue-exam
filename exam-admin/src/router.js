import Vue from "vue";
import Router from "vue-router";
// 头部、菜单组件
import Layout from "@/pages/home";
Vue.use(Router);

// hidden: true 遍历菜单时不显示  icon 导航图标
export default new Router({
  routes: [
    { path: "/login", component: () => import("@/pages/login"), hidden: true },
    {
      path: "/printing",
      component: () => import("@/pages/examOrganize/printing"),
      hidden: true
    },
    {
      path: "/404",
      component: () => import("@/pages/errorPage/404"),
      hidden: true
    },
    {
      path: "/",
      title: "基础管理",
      component: Layout,
      redirect: "/basisManage/sponsor",
      icon: "icon-jichu font-size20",
      children: [
        {
          path: "/basisManage/sponsor",
          component: () => import("@/pages/basisManage/sponsor"),
          meta: { title: "管理方" }
        },
        {
          path: "/basisManage/examRoom",
          component: () => import("@/pages/basisManage/examRoom"),
          meta: { title: "考场管理" }
        },
        {
          path: "/basisManage/menu",
          component: () => import("@/pages/basisManage/menu"),
          meta: { title: "菜单管理" }
        }
      ]
    },
    {
      path: "/",
      title: "题库",
      component: Layout,
      icon: "icon-shiti font-size16",
      children: [
        {
          path: "/questionBand/typeQues",
          component: () => import("@/pages/questionBand/typeQues"),
          meta: { title: "题型" }
        },
        {
          path: "/questionBand/maintainQues",
          redirect: "/questionBand/maintainQues/index",
          component: () => import("@/pages/questionBand/maintainQues"),
          meta: { title: "试题" },
          children: [
            {
              path: "/questionBand/maintainQues/index",
              component: () =>
                import("@/pages/questionBand/maintainQues/index"),
              meta: { title: "维护试题" }
            },
            {
              path: "/questionBand/maintainQues/quesList",
              component: () =>
                import("@/pages/questionBand/maintainQues/quesList"),
              meta: { title: "试题列表" }
            },
            {
              path: "/questionBand/maintainQues/createQues",
              component: () =>
                import("@/pages/questionBand/maintainQues/createQues"),
              meta: { title: "创建试题" }
            }
          ]
        },
        {
          path: "/questionBand/maintainPaper",
          redirect: "/questionBand/maintainPaper/index",
          component: () => import("@/pages/questionBand/maintainPaper"),
          meta: { title: "试卷" },
          children: [
            {
              path: "/questionBand/maintainPaper/index",
              component: () =>
                import("@/pages/questionBand/maintainPaper/index"),
              meta: { title: "维护试卷" }
            },
            {
              path: "/questionBand/maintainPaper/baseInfo",
              component: () =>
                import("@/pages/questionBand/maintainPaper/baseInfo"),
              meta: { title: "创建试卷" }
            },
            {
              path: "/questionBand/maintainPaper/chooseQueType",
              component: () =>
                import("@/pages/questionBand/maintainPaper/chooseQueType"),
              meta: { title: "创建试卷-选择题型" }
            },
            {
              path: "/questionBand/maintainPaper/preview",
              component: () =>
                import("@/pages/questionBand/maintainPaper/preview"),
              meta: { title: "确认试卷" }
            }
          ]
        },
        {
          path: "/questionBand/checkPaper",
          component: () => import("@/pages/questionBand/checkPaper"),
          meta: { title: "审核试卷" }
        }
      ]
    },
    {
      path: "/",
      title: "考试管理",
      component: Layout,
      icon: "icon-kaoshi font-size20",
      children: [
        {
          path: "/examOrganize/examRoom",
          component: () => import("@/pages/examOrganize/examRoom"),
          meta: { title: "查询预约考场" }
        },
        {
          path: "/examOrganize/statement",
          component: () => import("@/pages/examOrganize/statement"),
          meta: { title: "考试报表" }
        }
      ]
    },
    { path: "*", redirect: "/404", hidden: true }
  ]
});
