<template>
  <div class="re-dialog" v-show="visible" @click="closeDialog">
    <div class="re-dialog__box"
    @click.stop>

    <!-- v-on-clickaway="closeDialog" -->
      <div class="re-dialog__box__header">
        <div class="re-dialog__box__header__content">
          <slot name="header"></slot>
        </div>
        <div class="re-dialog__box__header__close">
          <div class="re-dialog__box__header__close__cell"></div>
        </div>
      </div>
      <div class="re-dialog__box__body">
        <slot>body content</slot>
      </div>
      <div class="re-dialog__box__footer" :class="[`re-dialog__box__footer--${footerPosition}`]" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReDialog',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    footerPosition: {
      type: String,
      default: 'left',
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.re-dialog {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#333, 0.5);

  &__box {
    @include position(center);
    background-color: $c-white;
    min-width: 320px;
    border-radius: 4px;

    &__header {
      position: relative;
      @include box-padding(15px 10px);
      @include flex(space-between);

      &__content {
      }

      &__close {
        position: relative;
        width: 20px;
        height: 20px;

        &__cell {
          width: 10px;
          height: 10px;
          @include position(center);
          /* @include flex(center, center); */

          &::before {
            content: "";
            height: 2px;
            width: 14px;
            border-radius: 1px;
            @include position(center);
            background-color: $c-assist;
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &::after {
            content: "";
            height: 2px;
            width: 14px;
            border-radius: 1px;
            @include position(center);
            background-color: $c-assist;
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }

    &__body {
      /* @include box-padding(10px); */
    }

    &__footer {
      display: flex;
      @include box-padding(15px 10px);

      &--left {
        justify-content: flex-start;
      }

      &--center {
        justify-content: center;
      }

      &--right {
        justify-content: flex-end;
      }

    }
  }
}
</style>
