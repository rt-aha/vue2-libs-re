<template>
  <li class="re-tree-item">
    <div class="re-tree-item__content" @click="handleExpandStatus">
      <div class="re-tree-item__content__arrow"
        :class="expandStatus && `re-tree-item__content__arrow--active`"
      >
        <div class="re-tree-item__content__arrow__icon" v-if="treeItem.children"></div>
      </div>
      <div class="re-tree-item__content__label">
        <span>{{ treeItem.label }}</span>
      </div>
    </div>
    <template v-if="treeItem.children">
      <div class="re-tree-item__children" v-show="expandStatus">
        <re-tree :treeList="treeItem.children"></re-tree>
      </div>
    </template>
  </li>
</template>

<script>
// import RTree from '@/components/tree/Tree.vue';

export default {
  name: 'ReTreeItem',
  // components: {
  //   RTree,
  // },
  props: {
    treeItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      expandStatus: false,
    };
  },
  methods: {
    handleExpandStatus() {
      this.expandStatus = !this.expandStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.re-tree-item {
  margin-top: 10px;
  cursor: pointer;

  &__children {
    @include box-padding(0 0 0 14px);
  }

  &__content {
    @include font-style($c-assist, 14px);
    position: relative;
    @include flex();

    &__arrow {
      /* position: absolute; */
      /* bottom: 0;
    left: 0; */
      width: 20px;
      height: 20px;
      transition: 0.3s;
      transform: rotate(90deg);

      &__icon {
        @include position(center);

        &::before,
        &::after {
          content: "";
          width: 6px;
          height: 2px;
          border-radius: 1px;
          background-color: $c-assist;
          display: inline-block;
          position: absolute;
          top: 50%;

          transform: translateY(-50%);
          // transform-origin: 50% 50%;
        }

        &::before {
          transform: rotate(45deg) translateY(-50%);
          left: -2px;
        }

        &::after {
          transform: rotate(-45deg) translateY(-50%);
          right: -2px;
        }
      }

      &--active {
        transform: rotate(180deg);
      }
    }

  }
}
</style>
