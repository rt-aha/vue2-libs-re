<template>
  <div class="app-layout">
    <transition name="slide">
      <aside class="layout-aside"
             v-if="isSidebarOpen">
        <AsideContent />
      </aside>
    </transition>
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

// transition

.slide-enter-active,
.slide-leave-active {
  transition: 0.35s ease-in-out;
}
.slide-enter {
  width: 0px;
}

.slide-enter-to {
  width: 250px;
}

.slide-leave {
  width: 250px;
}

.slide-leave-to {
  width: 0px;
}
</style>
