<template>
  <div class="bread-crumb-layout-com">
    <ul class="bread-crumb__list">
      <li
        class="bread-crumb__item"
        v-for="(pageInfo, index) in breadCrumbs"
        :key="index"
      >
        <span
          class="route-name"
          @click="handleRoute(pageInfo)"
        >{{ pageInfo.title }}</span><span v-show="breadCrumbs.length !== index + 1">/</span>
      </li>
    </ul>
  </div>
</template>

<script>
import routerNameInfo from '@/layout/components/routerNameInfo';

export default {
  name: 'BreadCrumb',
  data() {
    return {
      breadCrumbs: '',
    };
  },
  methods: {
    generateBreadCrumbs() {
      const currRoute = this.$route.path;
      let splitRoute = currRoute.slice(1).split('/'); // 清除第一個斜線

      let newBreadCrumbs = splitRoute.map(ele => {
        return {
          title: routerNameInfo[ele].title,
          name: routerNameInfo[ele].name,
          path: routerNameInfo[ele].path,
          rootPath: routerNameInfo[ele].rootPath,
        };
      });

      // 首頁的router，這裡的dashboard可替換成要跳轉路由的route name
      const home = routerNameInfo.dashboard;

      if (home.name !== this.$route.name) {
        newBreadCrumbs.splice(0, 0, home);
      }

      this.breadCrumbs = newBreadCrumbs;
    },
    handleRoute(pageInfo) {
      //在同個頁面就不跳轉
      const isSamePath = this.$route.matched.find(matchRoute => {
        return matchRoute.path === pageInfo.path;
      });
      if (isSamePath) return;

      this.$router.push(pageInfo.path);
    },
  },
  watch: {
    '$route.path': {
      handler: 'generateBreadCrumbs',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.bread-crumb-layout-com {
  height: 50px;
  line-height: 50px;
}

.bread-crumb {
  &__item {
    display: inline-block;
  }
}

.route-name {
  display: inline-block;
  cursor: pointer;
}
</style>
