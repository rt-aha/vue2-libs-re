<template>
  <transition name="fade">
    <div class="re-drawer" v-show="visible" @click.self="closeDialog">
      <!--   -->
      <!-- ref="drawerBox" -->
      <!-- :class="[{'re-drawer__box--slideIn': visible, 're-drawer__box--slideOut': !visible}]" -->
      <div
        class="re-drawer__box"
        :class="[
          {
            're-drawer__box--slide-left-in': visible,
            're-drawer__box--slide-left-out': !visible,
          },
        ]"
      >
        <!-- <div class="re-drawer__box"  ref="drawerBox"> -->
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
      console.log('update:visible ~~~');
      this.$emit('update:visible', false);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        console.log('hi');
        document.body.appendChild(this.$el);
        document.body.style = 'overflow: hidden';

        console.log('t...', this.$refs.drawerBox);
      } else {
        document.body.style = '';
        console.log('f...', this.$refs.drawerBox);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.re-drawer {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#333, 0.5);

  &__box {
    @include position(tr, 0px, 0px);
    @include cus-radius(4px, 0, 0, 4px);
    @include flex(flex-start, flex-start, column);
    background-color: $c-white;
    min-width: 320px;
    height: 100%;
    /* transform: translateX(0px); */

    /* transition: transform 3s; */
    &--slide-left-in {
      animation: slideLeftIn 0.4s;
    }

    &--slide-left-out {
      animation: slideLeftOut 0.4s;
    }

    &__header {
      flex: none;
      height: auto;
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
            content: '';
            height: 2px;
            width: 14px;
            border-radius: 1px;
            @include position(center);
            background-color: $c-assist;
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &::after {
            content: '';
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
      width: 100%;
      flex: 1;
      overflow-y: auto;
      /* @include box-padding(10px); */
    }

    &__footer {
      flex: none;
      height: auto;
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

@keyframes slideLeftIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0px);
  }
}

@keyframes slideLeftOut {
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
