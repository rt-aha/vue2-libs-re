<template>
  <transition name="fade">
    <div class="re-dialog" v-show="visible" @click.self="closeDialog">
      <div
        ref="refDialog"
        class="re-dialog__box"
        :class="[
          `re-dialog__box__styleType--${styleType}`,
          {
            're-dialog__box--is-info': isInfo,
            're-dialog__box--is-invoice': isInvoice,
          },
        ]"
      >
        <div
          class="re-dialog__box__header"
          :class="[`re-dialog__box__header--${headerStyleType}`]"
          v-if="$attrs.dialogTitle || $slots.header"
        >
          <div class="re-dialog__box__header__content">
            <!-- 若純文字可直接傳入 title -->
            <re-title v-if="$attrs.dialogTitle" type="dialog" :mt="false">{{ $attrs.dialogTitle }}</re-title>
            <!-- 若更複雜可用 slot -->
            <template v-else>
              <slot name="header"></slot>
            </template>
          </div>
          <div class="re-dialog__box__header__close" @click="closeDialog" v-show="showClose">
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
            <component :is="template" v-bind="data" v-on="$listeners" @close="closeDialog" />
          </div>
        </template>
        <div class="re-dialog__box__footer" :class="[`re-dialog__box__footer--${footerPosition}`]" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ReTitle from '@/components/global/ReTitle.vue';

export default {
  name: 'ReFullPageDialog',
  components: {
    ReTitle,
  },
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
    headerStyleType: {
      type: String,
      default: '',
    },
    styleType: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    isInfo: {
      type: Boolean,
      default: false,
    },
    isInvoice: {
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
        document.body.classList.add('freeze-screen');

        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        document.body.classList.remove('freeze-screen');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/utils/transition.scss';

.re-dialog {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(#333, 0.5);
  @include box-padding(0 0 64px 0);

  &__box {
    background-color: $c-white;
    width: 100%;
    height: 100%;
    overflow: auto;

    &--more-information {
      @include box-padding(0px);
      border: 3px solid $c-main;
      background-color: $c-light-yellow;
    }

    &__header {
      position: relative;
      @include box-padding(30px);
      @include flex(space-between);

      &--main {
        background-color: $c-main;
        position: relative;
        top: -1;
      }

      &__content {
        width: 100%;
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

          &::before {
            content: '';
            height: 2px;
            width: 14px;
            border-radius: 1px;
            @include position(center);
            background-color: $c-orange;
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &::after {
            content: '';
            height: 2px;
            width: 14px;
            border-radius: 1px;
            @include position(center);
            background-color: $c-orange;
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
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
