<template>
  <div class="re-button-group" :class="[`re-button-group--${btnType}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ReButtonGroup',
  data() {
    return {
      btnType: 'default',
    };
  },
  methods: {
    getBtnType() {
      const children = this.$children;

      // 只查第一層
      for (const ele of children) {
        if (ele.$options.name === 'ReButton') {
          this.btnType = ele.type;
        }
      }
    },
  },
  mounted() {
    this.getBtnType();
  },
};
</script>

<style lang="scss" scoped>
.re-button-group {
  &--default {
    .re-button + .re-button {
      margin-left: 1px;
    }

    .re-button {
      border-radius: 0px;

      &:first-child {
        @include cus-radius(4px, 0, 0, 4px);
      }

      &:last-child {
        @include cus-radius(0, 4px, 4px, 0);
      }
    }
  }

  &--border {
    .re-button + .re-button {
      margin-left: 0px;
    }

    .re-button {
      border-radius: 0px;
      border-right-width: 0px;

      &:hover {
        opacity: 1;
      }

      &:first-child {
        @include cus-radius(4px, 0, 0, 4px);
      }

      &:last-child {
        @include cus-radius(0, 4px, 4px, 0);
        border-right-width: 1px;
      }
    }
  }
}
</style>
