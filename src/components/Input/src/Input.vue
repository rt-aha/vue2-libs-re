<template>
  <div class="re-input">
    <div class="re-input__prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <div class="re-input__content">
      <input
        class="re-input__content__value"
        :class="{
          're-input__content__value--prepend': $slots.prepend,
          're-input__content__value--append': $slots.append,
          're-input__content__value--disabled': disabled,
        }"
        v-model="value"
        v-bind="$attrs"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
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
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss">
.re-input {
  @include flex();

  &__prepend {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    @include cus-radius(4px, 0, 0, 4px);
    border: 1px solid $c-assist;
    width: 40px;
    height: 40px;
  }

  &__content {
    position: relative;

    &__value {
      border-radius: 4px;
      @include box-padding(8px 10px);
      height: 40px;
      border: 1px solid $c-assist;
      outline: 0px transparent;

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

      &--disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    &__suffix {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0px;
      top: 0;
      width: 30px;
      height: 40px;
    }
  }

  &__append {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    @include cus-radius(0, 4px, 4px, 0);
    border: 1px solid $c-assist;
  }
}
</style>
