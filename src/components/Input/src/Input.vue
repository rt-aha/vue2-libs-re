<template>
  <div
    class="re-input"
    :class="[
      `re-input--size--${size}`,
      {
        're-input--disabled': disabled,
      },
    ]"
    @click.stop="handleClick"
  >
    <div class="re-input__prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <div
      class="re-input__content"
      :class="{
        're-input__content--prepend': $slots.prepend,
        're-input__content--append': $slots.append,
      }"
    >
      <div class="re-input__content__prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        class="re-input__content__native"
        :class="{
          're-input__content__native--disabled': disabled,
          're-input__content__native--readonly': !disabled && cursorPointer,
          're-input__content__native--number': $attrs.type === 'number',
        }"
        v-bind="$attrs"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        ref="input"
      />
      <div class="re-input__content__suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div class="re-input__append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReInput',
  mixins: [triggerValidate],
  // inject: {
  //   reFormItem: {
  //     default: '',
  //   },
  // },
  props: {
    value: {
      type: String,
    },
    size: {
      type: String,
      default: 'default',
      validate(val) {
        return ['small', 'default', 'large'].valueOf(val) > -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    cusType: {
      type: String,
      default: 'input',
      validate(val) {
        return ['input', 'select', 'switch', 'datePicker', 'dateTimePicker'].valueOf(val) > -1;
      },
    },
  },
  data() {
    return {
      input: '',
    };
  },
  computed: {
    nativeInputValue() {
      if (!this.value) return '';
      return String(this.value);
    },
    cursorPointer() {
      return ['select', 'datePicker'].indexOf(this.cusType) > -1;
    },
    // reFormItemExist() {
    //   return this.reFormItem;
    // },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
      this.triggerValidate('input', e.target.value);
    },
    handleChange(e) {
      this.$emit('change', e.target.value);
      this.triggerValidate('change', e.target.value);
    },
    handleBlur(e) {
      this.$emit('blur', e.target.value);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      const nativeInput = this.$refs.input;
      if (!nativeInput) {
        return null;
      }
      return nativeInput;
    },
  },
  mounted() {
    this.setNativeInputValue();
  },
  watch: {
    value: {
      handler: 'setNativeInputValue',
    },
  },
};
</script>

<style lang="scss" scoped>
$input-size-els: '.re-input__prepend, .re-input__content, .re-input__append';

.re-input {
  @include inline-flex();
  @include font-style($c-main, 14px);
  width: 100%;

  &--disabled {
    #{$input-size-els} {
      background-color: #efefef;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--size {
    &--small {
      #{$input-size-els} {
        height: 32px;
      }
    }

    &--default {
      #{$input-size-els} {
        height: 36px;
      }
    }

    &--large {
      #{$input-size-els} {
        height: 40px;
      }
    }
  }

  &__prepend {
    @include box-padding(0 10px);
    @include cus-radius(4px, 0, 0, 4px);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid $c-main;
  }

  &__content {
    @include flex();
    @include box-padding(8px 6px);
    width: 100%;
    border: 1px solid $c-main;
    border-radius: 4px;

    &--prepend {
      flex: none;
      width: auto;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 0;
    }

    &--append {
      flex: none;
      width: auto;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }

    &__native {
      flex: 1;
      width: 100%;
      color: $c-assist;
      background-color: transparent;
      border: 0 transparent;
      outline: 0 transparent;

      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &--readonly {
        cursor: pointer;
      }

      &--number {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          margin: 0;
        }
      }
    }

    &__prefix {
      @include font-style($c-main, 12px);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex: none;
      margin-right: 6px;
    }

    &__suffix {
      @include font-style($c-main, 12px);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex: none;
      margin-left: 6px;
    }
  }

  &__append {
    @include box-padding(0 10px);
    @include cus-radius(0, 4px, 4px, 0);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    border: 1px solid $c-main;
  }
}
</style>
