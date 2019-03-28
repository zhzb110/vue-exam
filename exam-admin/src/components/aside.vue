<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu el-menu-vertical-demo" :default-active="$route.path" :collapse="sidebar" unique-opened router background-color="#519ff1"
      text-color="#fff"
      active-text-color="#fff">
       <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <template v-if="item.children">
          <el-submenu :index="index+''" :key="index">
            <template slot="title">
              <i  class="iconfont w30" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(child,index) in item.children" :title="child.path"  :index="child.path" :key="index" class="aside-menu-item">{{ child.meta.title }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
       </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["sidebar"],
  methods: {}
};
</script>
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  background-color: rgb(81, 159, 241);
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
/*.sidebar-el-menu:hover{
    overflow-y: auto;
}*/
.el-menu {
  border-right: none;
}
.el-submenu__title i {
  color: #fff !important;
}
.w30 {
  width: 36px;
  display: inline-block;
  text-align: center;
}
</style>
