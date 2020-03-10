<template>
  <div class="app-layout">
    <aside class="layout-aside"
           :class="{'layout-aside-close':isSidebarOpen}">
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

import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('layoutStore');

export default {
  name: 'BaseLayout',
  components: {
    HeaderContent,
    AsideContent
  },
  computed: {
    ...mapState(['isSidebarOpen'])
  },
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

  transition: 0.5s;
}

.layout-aside-close {
  width: 0px;

  overflow: hidden;
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
