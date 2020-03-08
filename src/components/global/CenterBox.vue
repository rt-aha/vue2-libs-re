<template>
  <!-- 只是個容器 -->
  <section class="center-box-section">
    <div class="center-box-content">
      <div class="center-box-main">
        <slot>center box slot area</slot>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {};
</script>


<style scoped lang="scss">
.center-box-section {
  width: 100vw;
  height: 100vh;
}

.center-box-content {
  width: 100%;
  height: 100%;

  position: relative;
}

.center-box-main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>