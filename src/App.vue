<template>
  <div>
    <router-view v-if="noBaseLayout" />

    <!-- 自定義佈局 -->
    <BaseLayout v-else>
      <router-view />
    </BaseLayout>
  </div>
</template>

<script>
import BaseLayout from '@/layout/BaseLayout';

export default {
  metaInfo: {
    title: 'Tplt',
    titleTemplate: 'App-%s',
    htmlAttrs: {
      lang: 'en',
    },
  },
  name: 'Login',
  components: {
    BaseLayout,
  },
  computed: {
    noBaseLayout() {
      // 不需要基本佈局的頁面名字寫在陣列內
      const noBaseLayoutPages = ['login', 'page404', 'test'];
      return noBaseLayoutPages.includes(this.$route.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>
