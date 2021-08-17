<template>
  <div class="page-root">
    <div class="center-content">
      <re-title type="app">Re-UI</re-title>
      <ul class="route-list">
        <li class="route-list__item" v-for="r of routeList" :key="r.route">
          <span class="route-list__item__text" @click="handleRoute(r.routeName)">{{ r.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data() {
    return {
      routeList: [
        {
          routeName: 'vertical-layout',
          label: '垂直佈局',
        },
        {
          routeName: 'horizontal-layout',
          label: '水平佈局',
        },
      ],
    };
  },
  methods: {
    handleRoute(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-root {
  position: relative;
  width: 100%;
  height: 100%;
}

.center-content {
  @include position(center);
}

.route-list {
  margin-top: 30px;

  &__item {
    & + & {
      margin-top: 15px;
    }

    &__text {
      @include font-style($c-text1, 16px);
      @include box-padding(0 0 0 30px);
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 10px;
        width: 8px;
        height: 1px;
        background-color: $c-text1;
      }

      &:hover {
        color: $c-main;

        &::before {
          background-color: $c-main;
        }
      }
    }
  }
}
</style>
