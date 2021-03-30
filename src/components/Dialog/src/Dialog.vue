<template>
  <div class="re-dialog" v-show="visible" @click.self="closeDialog">
    <div class="re-dialog__box" >
      <div class="re-dialog__box__header">
        <div class="re-dialog__box__header__content">
          <!-- 若純文字可直接傳入 title -->
          <re-title v-if="$attrs.title" type="dialog" :mt="false">{{$attrs.title}}</re-title>
          <!-- 若更複雜可用 slot -->
          <template v-else>
            <slot name="header"></slot>
          </template>
        </div>
        <div class="re-dialog__box__header__close" @click="closeDialog">
          <div class="re-dialog__box__header__close__cell"></div>
        </div>
      </div>
      <!-- 若用slot -->
      <template v-if="$slots.default">
        <div class="re-dialog__box__body">
          <slot>body content</slot>
        </div>
      </template>
      <!-- 若傳入template -->
      <template v-else>
        <div class="re-dialog__box__body">
          <component
            :is="template"
            v-bind="data"
            v-on="$listeners"
            @close="closeDialog"
          />
        </div>
      </template>
      <div
        class="re-dialog__box__footer"
        :class="[`re-dialog__box__footer--${footerPosition}`]"
        v-if="$slots.footer"
      >
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
    template: {
      default: () => {},
    },
    data: {
      dafeult: () => ({}),
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('beforeClose');
      console.log('update:visible ~~~');
      this.$emit('update:visible', false);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
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
        cursor: pointer;

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
