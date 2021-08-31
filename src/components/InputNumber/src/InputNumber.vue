<template>
  <div
    class="re-input-number"
    :class="[
      `re-input-number--size--${size}`,
      {
        're-input-number--disabled': disabled,
      },
    ]"
    @click.stop="handleClick"
  >
    <div class="re-input-number__prepend" @click="minusNumber">
      <slot name="prepend">-</slot>
    </div>
    <div class="re-input-number__content">
      <div class="re-input-number__content__prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        class="re-input-number__content__native"
        :class="{
          're-input-number__content__native--disabled': disabled,
          're-input-number__content__native--readonly': !disabled && cursorPointer,
        }"
        v-bind="$attrs"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
        type="number"
        ref="input"
      />

      <div class="re-input-number__content__suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div class="re-input-number__append" @click="plusNumber">
      <slot name="append">+</slot>
    </div>
  </div>
</template>

<script>
import triggerValidate from '@/mixins/triggerValidate';
import { debounce } from 'lodash';

export default {
  name: 'ReInputNumber',
  mixins: [triggerValidate],
  inject: {
    reFormItem: {
      default: '',
    },
  },
  props: {
    value: {
      type: [String, Number],
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
    step: {
      type: [Number, String],
      default: 1,
    },
    formatFn: {
      default: null,
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
      this.$emit('change', e.target.value);
      this.triggerValidate('change', e.target.value);
    },
    handleChange(e) {
      let val = e.target.value;

      if (this.formatFn) {
        val = this.formatFn(val);
      }
      this.$emit('input', val);
      this.$emit('change', val);
      this.triggerValidate('change', val);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (input.value === this.nativeInputValue) return;

      let val = this.nativeInputValue;
      if (this.formatFn) {
        val = this.formatFn(this.nativeInputValue);
      }

      input.value = val;
    },
    getInput() {
      const nativeInput = this.$refs.input;
      if (!nativeInput) {
        return null;
      }
      return nativeInput;
    },

    plusNumber() {
      const inputValue = this.getInput().value;
      let val = Number(inputValue) + Number(this.step);

      if (this.formatFn) {
        val = this.formatFn(val);
      }

      this.$emit('input', val);
      this.triggerValidate('change', val);
    },
    minusNumber() {
      const inputValue = this.getInput().value;
      let val = Number(inputValue) - Number(this.step);

      if (this.formatFn) {
        val = this.formatFn(val);
      }

      this.$emit('input', val);
      this.triggerValidate('change', val);
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
$input-size-els: '.re-input-number__prepend, .re-input-number__content, .re-input-number__append';

.re-input-number {
  @include flex();
  @include font-style($c-main, 14px);
  width: 200px;

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
    cursor: pointer;
  }

  &__content {
    @include flex();
    @include box-padding(8px 10px 8px 10px);
    width: 100%;
    border: 1px solid $c-main;
    border-radius: 0;
    border-left: 0;
    border-right: 0;

    &__native {
      flex: 1;
      color: $c-assist;
      border: 0 transparent;
      outline: 0 transparent;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }

      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &--readonly {
        cursor: pointer;
      }
    }

    &__prefix {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex: none;
      margin-right: 10px;
    }

    &__suffix {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex: none;
      margin-left: 10px;
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
    cursor: pointer;
  }
}
</style>
