<template>
  <div id="app">
    <template v-if="notDefaultLayout">
      <router-view />
    </template>
    <template v-else>
      <re-vertical-layout>
        <template v-slot:header>
          <re-layout-header title="Re-UI Lab" />
        </template>
        <template v-slot:body>
          <div class="layout-body-content">
            <div class="layout-body-content__menu">
              <re-menu :menuConfig="menuConfig" />
            </div>
            <div class="layout-body-content__body">
              <re-title>{{ $route.meta.title }}</re-title>
              <router-view />
            </div>
          </div>
        </template>
      </re-vertical-layout>
    </template>
  </div>
</template>

<script>
import ReVerticalLayout from '@/layout/ReVerticalLayout.vue';
import ReLayoutHeader from '@/layout/ReLayoutHeader.vue';
// import ReLayoutBody from '@/layout/ReLayoutBody.vue';
// import ReLayoutAside from '@/layout/ReLayoutAside.vue';
import ReMenu from '@/components/Menu';

import viewRoutes from '@/router/viewRoutes';

export default {
  name: 'UiLab',
  components: {
    ReVerticalLayout,
    ReLayoutHeader,
    // ReLayoutBody,
    // ReLayoutAside,
    ReMenu,
  },
  data() {
    return {
      menuConfig: viewRoutes,
    };
  },
  computed: {
    notDefaultLayout() {
      const notDefaultLayoutPageName = ['layout-horizontal', 'layout-vertical', 'root'];
      return notDefaultLayoutPageName.includes(this.$route.name);
    },
  },
};
</script>

<style lang="scss">
.page-ui-lab {
  width: 100%;
  height: 100%;
}

.layout-body-content {
  @include flex(flex-start, flex-start);
  width: 100%;

  &__menu {
    flex: none;
    width: 240px;
    height: 100%;
    border-right: 1px solid #ccc;
    overflow-y: auto;
  }

  &__body {
    @include box-padding(15px 15px 0);
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
