<template>
  <div
    class="re-form-item"
    :class="[
      `re-form-item--${labelConfig().position}`,
      {
        're-form-item--top-padding': addLabelPadding,
      },
    ]"
  >
    <label
      class="re-form-item__label"
      :class="[
        labelConfig().position === 'left' &&
          `re-form-item__label--${labelConfig().textAlign}`,
      ]"
      :style="`width: ${labelWidthValue}`"
    >
      {{ $attrs.label }}
    </label>
    <div class="re-form-item__box">
      <div class="re-form-item__box__content" ref="formItemContent">
        <slot></slot>
      </div>
      <p class="re-form-item__box__err-msg">
        <!-- {{ isPassValidate ? '': 'err' }} -->

        {{ errMsgText }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReFormItem',
  compName: 'ReFormItem',
  inject: ['rForm', 'formErrMsg', 'labelConfig'],
  data() {
    return {
      isPassValidate: true,
      addLabelPadding: true,
    };
  },
  computed: {
    errMsgText() {
      return '錯誤文字';
      // const { prop } = this.$attrs;
      // return this.formErrMsg()[prop] || '';
    },
    labelWidthValue() {
      if (!this.labelConfig().width) {
        return '100px';
      }

      return `${this.labelConfig().width}px`;
    },
  },
  methods: {
    validateValue(val) {
      if (this.$attrs.prop in this.rForm.rules) {
        this.isPassValidate = this.rForm.rules[this.$attrs.prop](val);
      }
    },
    setLabelHeight() {
      const contentHeight = this.$refs.formItemContent.clientHeight;

      if (this.labelConfig().position === 'left' && contentHeight > 40) {
        this.addLabelPadding = true;
        return;
      }

      this.addLabelPadding = false;
    },
  },
  watch: {
    errMsg: {
      handler() {
        console.log('rForm...', this.errMsg);
      },
    },
  },
  mounted() {
    this.setLabelHeight();
  },
};
</script>

<style lang="scss">
$form-item: ".re-form-item";

.re-form-item {
  display: flex;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0px;
  }

  &--top {
    flex-direction: column;

    #{$form-item}__label {
      width: 100%;
      margin-bottom: 5px;
    }

    &__box {
      width: 100%;

      &__content {
      }
    }
  }

  &--left {
    flex-direction: row;
    align-items: center;

    #{$form-item}__label {
      display: inline-block;
      flex: none;
      width: 80px;
      margin-right: 10px;
    }

    &__box {
      flex: 1;

      &__content {
        width: 100%;
      }
    }
  }

  // 一般情況下，form item高度最高為40px(最大的input),
  // 但content中的高度若高於40，label置中會有點微妙，所以這裡移除置中並設一點margin
   &--top-padding {
    align-items: flex-start;

    > #{$form-item}__label {
      margin-top: 15px;

    }
  }

  &__label {
    font-size: 14px;
    color: $c-assist;

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }

  }

  &__box {
    // margin-bottom: 20px;
    position: relative;

    &__content {
      // @include box-padding(4px 0);
    }

    &__err-msg {
      @include position(bl, -18px, 0px);
      height: 12px;
      @include font-style($c-error-message, 12px);
    }
  }
}
</style>
