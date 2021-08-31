<template>
  <transition name="fade">
    <div class="re-drawer" v-show="visible" @click.self="closeDialog">
      <div
        class="re-drawer__box"
        :class="[
          {
            're-drawer__box--slide-left-in': visible,
            're-drawer__box--slide-left-out': !visible,
          },
        ]"
      >
        <div class="re-drawer__box__header">
          <div class="re-drawer__box__header__content">
            <!-- 若純文字可直接傳入 title -->
            <re-title v-if="$attrs.title" type="dialog" :mt="false">{{ $attrs.title }}</re-title>
            <!-- 若更複雜可用 slot -->
            <template v-else>
              <slot name="header"></slot>
            </template>
          </div>
          <div class="re-drawer__box__header__close" @click="closeDialog">
            <div class="re-drawer__box__header__close__cell"></div>
          </div>
        </div>
        <!-- 若用slot -->
        <template v-if="$slots.default">
          <div class="re-drawer__box__body">
            <slot>body content</slot>

            <div style="width: 30px; height: 2000px; background-color: #ccc"></div>
          </div>
        </template>
        <!-- 若傳入template -->
        <template v-else>
          <div class="re-drawer__box__body">
            <component :is="template" v-bind="data" v-on="$listeners" @close="closeDialog" />
          </div>
        </template>
        <div class="re-drawer__box__footer" :class="[`re-drawer__box__footer--${footerPosition}`]" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ReDrawer',

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
      this.$emit('update:visible', false);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.classList.add('freeze-body');
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        document.body.classList.remove('freeze-body');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.freeze-body {
  overflow: hidden;
}

.re-drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(#333, 0.5);

  &__box {
    @include position(tr, 0, 0);
    @include cus-radius(4px, 0, 0, 4px);
    @include flex(flex-start, flex-start, column);
    min-width: 320px;
    height: 100%;
    background-color: $c-white;

    &--slide-left-in {
      animation: slideLeftIn 0.4s;
    }

    &--slide-left-out {
      animation: slideLeftOut 0.4s;
    }

    &__header {
      @include box-padding(15px 10px);
      @include flex(space-between);
      flex: none;
      position: relative;
      height: auto;

      &__close {
        position: relative;
        width: 20px;
        height: 20px;
        cursor: pointer;

        &__cell {
          @include position(center);
          width: 10px;
          height: 10px;

          &::before {
            @include position(center);
            content: '';
            width: 14px;
            height: 2px;
            background-color: $c-assist;
            border-radius: 1px;
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &::after {
            @include position(center);
            content: '';
            width: 14px;
            height: 2px;
            background-color: $c-assist;
            border-radius: 1px;
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }

    &__body {
      flex: 1;
      width: 100%;
      overflow-y: auto;
    }

    &__footer {
      @include box-padding(15px 10px);
      display: flex;
      flex: none;
      height: auto;

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

@keyframes slideLeftIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slideLeftOut {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
