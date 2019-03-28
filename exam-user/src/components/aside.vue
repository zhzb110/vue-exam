<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu el-menu-vertical-demo" :default-active="router[index].path" :collapse="sidebar" unique-opened router background-color="#519ff1" text-color="#fff" active-text-color="#fff">
       <template v-for="(item,index) in router">
          <el-menu-item :index="item.path" :key="index">
            <i :class="item.icon" style="color:#fff"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
       </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index:0,
      router:[
        {path:'./currentExam',title:'当前考试',icon:'el-icon-document'},
        {path:'./orderExam',title:'预约',icon:'el-icon-sold-out'},
      ]
    }
  },
  props: ["sidebar"],
  methods: {},
  mounted() {
   if (this.$route.path.indexOf('orderExam')>=0){
     this.index=1
   } else {
     this.index=0
   }
  }
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
  width: 200px;
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
