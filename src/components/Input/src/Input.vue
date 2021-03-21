<template>
  <div class="re-input">
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
      <input
        class="re-input__content__value"
        :class="{
          're-input__content__value--disabled': disabled,
        }"
        v-bind="$attrs"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
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
export default {
  name: 'ReInput',
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
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
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleChange(e) {
      this.$emit('change', e.target.value);
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

<style lang="scss">
.re-input {
  @include flex();
  @include font-style($c-assist, 14px);

  &__prepend {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    @include box-padding(0 10px);
    @include cus-radius(4px, 0, 0, 4px);
    border: 1px solid $c-assist;
    height: 40px;
  }

  &__content {
    @include flex();
    @include box-padding(8px 0 8px 10px );
    border: 1px solid $c-assist;
    height: 40px;
     border-radius: 4px;

    &--prepend {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-left: 0px;
    }

    &--append {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-right: 0px;
    }

    &__value {
      flex: 1;
      border: 0px transparent;
      outline: 0px transparent;

      &--disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    &__suffix {
      flex: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      top: 0;
      margin: 0 10px;
    }
  }

  &__append {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    @include box-padding(0 10px);
    width: auto;
    height: 40px;
    @include cus-radius(0, 4px, 4px, 0);
    border: 1px solid $c-assist;
  }
}
</style>
