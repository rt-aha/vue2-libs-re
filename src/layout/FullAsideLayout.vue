<template>
  <div class="ly-full-aside-layout">
    <aside class="ly-fa__aside">
      <div class="system-name-box">
        <h1 class="system-name-box__text"> {{systemName}}</h1>
        <div>
          <aside-menu></aside-menu>
        </div>
      </div>

    </aside>
    <div class="ly-fa__hb-wrapper">
      <!-- <header class="ly-fa__hb-wrapper__header">
        header
      </header> -->
      <div class="ly-fa__hb-wrapper__body">
        <breadcrumb />
        <router-view />
        <!-- <slot></slot> -->
      </div>
    </div>
  </div>
</template>

<script>
import AsideMenu from '@/layout/Menu.vue';
import Breadcrumb from '@/components/Breadcrumb/index';

export default {
  name: 'FullAsideLayout',
  components: {
    AsideMenu,
    Breadcrumb,
  },
  data() {
    const { SYSTEM_NAME: systemName } = this;

    return {
      systemName,
    };
  },
};
</script>

<style lang="scss">

.ly-full-aside-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.ly-fa {
  &__aside {
    height: 100%;
    width: 200px;
    overflow-y: auto;
    background-color: $c-lightgrey;
  }

  &__hb-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;

    &__header {
      flex: none;
      height: 60px;
    }

    &__body {
      flex: 1;
      overflow-y: auto;
      @include box-padding(15px);
    }
  }
}

.system-name-box {
  text-align: center;
  @include box-padding(15px);

  &__text {
    display: inline-block;
    @include font-style($c-white, 30px);
  }
}
</style>
