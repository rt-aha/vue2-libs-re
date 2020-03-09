<template>
  <div class="app-layout">
    <aside class="layout-aside">
      <AsideContent />
    </aside>
    <div class="layout-header-main-wrapper">
      <header class="layout-header">
        <HeaderContent />
      </header>
      <section class="layout-main">
        <slot></slot>
      </section>
    </div>
  </div>
</template>


<script>
import HeaderContent from '@/layout/HeaderContent';
import AsideContent from '@/layout/AsideContent';

export default {
  name: 'BaseLayout',
  components: {
    HeaderContent,
    AsideContent
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.layout-aside {
  width: 250px;
  height: 100%;
  flex: none;
  background-color: #ccc;
}

.layout-header-main-wrapper {
  flex: 1;
  background-color: #eee;
  display: flex;
  flex-direction: column;
}

.layout-header {
  height: 60px;
  flex: none;
  background-color: #ddd;
}

.layout-main {
  flex: 1;
  overflow: auto;
}
</style>
