<template>
  <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show"
         class="box">hello</p>
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
  }
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

.fade-leave,
.fade-enter-to {
  height: 50px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px;
}
</style>