<template>
  <div
    class="hbg-controller"
    @click="handleHbgController"
  >
    <div class="hbg-line"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('layoutStore');

export default {
  name: 'HbgController',
  computed: {
    ...mapState(['isSidebarOpen'])
  },
  methods: {
    async handleHbgController() {
      console.log('hi');
      await this.handleIsSidebarOpen({ isOpen: !this.isSidebarOpen });
      console.log(this.isSidebarOpen);
    },
    ...mapMutations(['handleIsSidebarOpen'])
  },

};
</script>

<style lang="scss" scoped>
.hbg-controller {
  width: 30px;
  height: 30px;
  background-color: $c-main1;
  position: relative;
  cursor: pointer;
}

.hbg-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 21px;
  height: 3px;
  border-radius: 1.5px;
  background-color: #222;
  box-shadow: 0px 7px #222, 0px -7px #222;
}
</style>