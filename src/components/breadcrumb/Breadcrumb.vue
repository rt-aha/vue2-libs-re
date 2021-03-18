<template>
  <div class="r-breadcrumb">
    <ul class="breadcrumb__list">
      <li class="breadcrumb__list__item"
      v-for="(item, index) of breadcrumbPath"
      :key="item.title + index">
        <span class="breadcrumb__list__item__text"
        @click="handleRoute(item)">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import allMenu from '@/router/genMenu';

export default {
  name: 'Breadcrumb',
  data() {
    const menuMapping = allMenu.reduce((obj, ele) => {
      const loopChildren = (children) => {
        children.forEach((child) => {
          obj[child.path] = {
            title: child.meta.title,
            name: child.name,
          };
          if (child.children) {
            loopChildren(child.children);
          }
        });
      };

      obj[ele.name] = {
        title: ele.meta.title,
        name: ele.name,
      };

      if (ele.children) {
        loopChildren(ele.children);
      }

      return obj;
    }, {});

    return {
      menuMapping,
    };
  },
  computed: {
    breadcrumbPath() {
      try {
        const routePath = this.$route.path.split('/');
        routePath.shift();

        const pathList = routePath.reduce((breadcrumb, path, index) => {
          breadcrumb.push({ title: this.menuMapping[path].title, name: this.menuMapping[path].name });

          if (routePath.length - 1 !== index) {
            breadcrumb.push({ title: '/', name: 'slash' });
          }

          return breadcrumb;
        }, []);

        return pathList;
      } catch (e) {
        // console.log('e...', e);
        // 有些非menu列表的不會渲染
        return [];
      }
    },
  },
  methods: {
    handleRoute(item) {
      if (item.routeName === 'slash') {
        return;
      }
      this.$router.push({ name: item.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.r-breadcrumb {
  margin-bottom: 15px;
}

.breadcrumb {
  &__list {

    &__item {
      display: inline-block;
      vertical-align: middle;
      & + & {
        margin: 0 4px;

      }

      &__text {
        @include font-style($c-assist, 14px);
        cursor: pointer;
        &:hover {
          color: $c-main;
        }
      }
    }
  }
}
</style>
