<template>
  <!-- 只是個容器 -->
  <section class="alert-box-section"
           @click="closeAlertBox">
    <div class="alert-box-content">
      <div class="alert-box-main">
        <div class="alert-box"
             @click.stop>
          <slot>alert box slot area</slot>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    closeAlertBox() {
      this.$emit('closeAlertBox');
    },
  },
};
</script>


<style scoped lang="scss">
@import '~@/styles/index';

.alert-box-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba($c-black, 0.3);
}

.alert-box-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.alert-box-main {
  width: 420px;
  height: 280px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: rgba($c-black, 0.7);
}

.alert-box {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(50px);
  border-radius: 4px;
  // filter: blur(10px);
}
</style>