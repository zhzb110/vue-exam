<template>
    <div class="wrapper">
        <v-head :name="name" @collapseChage="collapseChage" :sidebar="sidebar"></v-head>
        <v-sidebar :sidebar="sidebar"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':sidebar}">
            <div class="content">
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from "../components/header"
import vSidebar from "../components/aside"
export default {
  name: "home",
  data() {
    return {
      minWidth: 750,
      sidebar: false,
      name: "default",
      toLeft: 0
    };
  },
  methods: {
    collapseChage() {
      // if(this.sidebar){
      //     this.toLeft = 0;
      // }else{
      //     this.toLeft = -185;
      // }
      this.sidebar = !this.sidebar;
    }
  },
  components: {
    vHead,
    vSidebar
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        if (document.body.clientWidth < 1050) {
          if (!this.sidebar) {
            // 左边的菜单栏已隐藏
            this.sidebar = true
            this.minWidth = 835
          }
        } else {
          if (this.sidebar) {
            // 左边的菜单栏已展开
            this.sidebar = false
            this.minWidth = 650
          }
        }
      })();
    };
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.content-collapse {
  left: 65px;
}
/*内容布局*/
.content {
  padding: 0px 30px;
}

.slide-enter {
  position: absolute;
  width: 100%;
  opacity: 0;
  transform: translateX(-20%);
}
.slide-enter-active {
  transition: all 0.3s linear;
}
</style>
