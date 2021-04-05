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
          're-input-number__content__native--readonly':
            !disabled && cursorPointer,
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
      this.triggerValidate('input');
    },
    handleChange(e) {
      this.$emit('change', e.target.value);
      this.triggerValidate('change');
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
    minusNumber() {
      const inputValue = this.getInput().value;
      const val = Number(inputValue) - Number(this.step);
      this.$emit('input', String(val));
      this.triggerValidate('change');
    },
    plusNumber() {
      const inputValue = this.getInput().value;
      const val = Number(inputValue) + Number(this.step);
      this.$emit('input', String(val));
      this.triggerValidate('change');
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

<style lang="scss">
$input-size-els: ".re-input-number__prepend, .re-input-number__content, .re-input-number__append";

.re-input-number {
  width: 200px;
  @include flex();
  @include font-style($c-main, 14px);
  // display: inline-block;

  &--disabled {
    #{$input-size-els} {
      background-color: #efefef;
      cursor: not-allowed;
      opacity: 0.5;
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    @include box-padding(0 10px);
    @include cus-radius(4px, 0, 0, 4px);
    border: 1px solid $c-main;
    cursor: pointer;
  }

  &__content {
    width: 100%;
    @include flex();
    @include box-padding(8px 10px 8px 10px);
    border: 1px solid $c-main;
    border-radius: 0px;
    border-left: 0px;
    border-right: 0px;

    &__native {
      flex: 1;
      border: 0px transparent;
      outline: 0px transparent;
      color: $c-assist;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }

      &--disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &--readonly {
        cursor: pointer;
      }
    }

    &__prefix {
      flex: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }

    &__suffix {
      flex: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
    }
  }

  &__append {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    @include box-padding(0 10px);
    width: auto;
    // height: 40px;
    @include cus-radius(0, 4px, 4px, 0);
    border: 1px solid $c-main;
    cursor: pointer;
  }
}
</style>
