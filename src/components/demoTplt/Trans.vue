<template>
  <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show" class="box">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Trans',
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.box {
  width: 50px;
  height: 50px;
  background-color: #f00;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

.fade-leave {
  transform-origin: bottom center;
  transform: scaleY(1);
}
.fade-enter-to {
  transform-origin: bottom center;
  transform: scaleY(1);
  // height: 50px;
}
.fade-enter {
  transform-origin: top center;
  transform: scaleY(0);
}
.fade-leave-to {
  transform-origin: 100% 50%;
  transform: scaleY(0);
}
</style>
