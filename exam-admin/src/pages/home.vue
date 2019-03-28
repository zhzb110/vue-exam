<template>
    <div class="wrapper">
        <v-head :name="name" @collapseChage="collapseChage" :sidebar="sidebar"></v-head>
        <v-sidebar :sidebar="sidebar"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':sidebar}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from "../components/header";
import vTags from "../components/tags";
import vSidebar from "../components/aside";
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
    vTags,
    vSidebar
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        if (document.body.clientWidth < 1050) {
          if (!this.sidebar) {
            // 左边的菜单栏已隐藏
            // this.$store.dispatch('menuopen', true)
            this.sidebar = true;
            // this.toLeft = -185;
            this.minWidth = 835;
          }
        } else {
          if (this.sidebar) {
            // 左边的菜单栏已展开
            // this.$store.dispatch('menuopen', false)
            this.sidebar = false;
            //this.toLeft = 0;
            this.minWidth = 650;
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
  padding: 20px 30px;
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
