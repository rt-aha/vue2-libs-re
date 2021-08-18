<template>
  <div class="page-root">
    <div class="center-content">
      <re-title type="app">Re-UI</re-title>
      <ul class="route-list">
        <li class="route-list__item" v-for="r of routeList" :key="r.route">
          <span v-if="r.type === 'title'" class="route-list__item__title">{{ r.label }}</span>
          <span v-else class="route-list__item__text" @click="handleRoute(r.routeName)">{{ r.label }}</span>
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
          type: 'title',
          label: 'UI-Lab',
        },
        {
          routeName: 'ui-lab',
          label: 'UI 實驗室',
        },
        {
          type: 'title',
          label: 'Layout-Demo',
        },
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
  @include box-padding(0 0 0 10px);
  margin-top: 30px;

  &__item {
    & + & {
      margin-top: 15px;
    }

    &__title {
      @include font-style($c-text1, 16px, 700);
    }

    &__text {
      @include font-style($c-text1, 16px, 300);
      @include box-padding(0 0 0 15px);
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
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
