<template>
  <div
    class="re-form-item"
    :class="`re-form-item--${direction}`"
  >
    <label class="re-form-item__label">
      {{ $attrs.label }}
    </label>
    <div class="re-form-item__box">
      <div class="re-form-item__box__content">
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
  props: {
    direction: {
      type: String,
      default: 'vertical',
    },
  },
  inject: ['rForm', 'formErrMsg'],
  data() {
    return {
      isPassValidate: true,
    };
  },
  computed: {
    errMsgText() {
      const { prop } = this.$attrs;
      return this.formErrMsg()[prop] || '';
    },
  },
  methods: {
    validateValue(val) {
      if (this.$attrs.prop in this.rForm.rules) {
        this.isPassValidate = this.rForm.rules[this.$attrs.prop](val);
      }
    },
  },
  watch: {
    errMsg: {
      handler() {
        console.log('rForm...', this.errMsg);
      },
    },
  },
  // created() {
  //   console.log('this~~', this.rForm);
  // },
};
</script>

<style lang="scss">
.re-form-item {
  display: flex;

  & + & {
    margin-top: 15px;
  }

  &__label {
    font-size: 14px;
    color: $c-assist;
    margin-bottom: 5px;
  }

  &__box {
    &__content {
      @include box-padding(4px 0);
    }

    &__err-msg {
      height: 12px;
      @include font-style($c-error-message, 12px);
    }
  }

  &--vertical {
    flex-direction: column;

    &__label {
      width: 100%;
    }

    &__box {
      width: 100%;

      &__content {
      }
    }
  }

  &--horizontal {
    flex-direction: row;

    &__label {
      flex: none;
      width: 120px;
    }

    &__box {
      flex: 1;

      &__content {
        width: 100%;
      }
    }
  }
}
</style>
