<template>
    <div class="wrapper">
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<style scoped>
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
<script>
export default {
  name: "strategy"
};
</script>
