<template>
  <!-- String(currOption) === String(value) || -->
  <li
    class="re-select-option"
    :class="[
      {
        're-select-option--active': String(currFocusOptionValue) === String(value),
        're-select-option--disabled': disabled,
      },
    ]"
    :data-option-value="value"
    :data-disabled-status="disabled"
    :selected="String(currOption) === String(value)"
    @click.stop="handleSelect(value)"
    @mouseover.stop="setFocusOptionValue(value)"
  >
    <component v-if="render" :is="render()" v-bind="optionConfig" />
    <span v-else class="re-select-option__item">{{ label }}</span>
    <span
      v-show="allowedDelete"
      class="re-select-option__remove"
      :allowedDelete="allowedDelete"
      @click.stop="removeOption(value)"
      >刪除</span
    >
  </li>
</template>

<script>
import { debounce } from 'lodash';
export default {
  name: 'ReSelectOption',
  props: {
    value: {
      default: '',
    },
    optionConfig: {
      default: () => ({}),
    },
    label: {
      type: String,
      default: '',
    },
    render: {
      type: Function,
    },
    currOption: {
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowedDelete: {
      type: Boolean,
      default: false,
    },
    currFocusOptionValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      focusValue: '',
    };
  },
  methods: {
    handleSelect(val) {
      this.$emit('handleSelect', val);
    },
    removeOption(val) {
      this.$emit('removeOption', val);
    },
    focusOptionValueDebounce: debounce(function () {
      this.$emit('setFocusOptionValue', this.focusValue);
    }, 100),
    setFocusOptionValue(val) {
      this.focusValue = val;
      this.focusOptionValueDebounce();
    },
  },
};
</script>

<style lang="scss" scoped>
.re-select-option {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  @include font-style($c-black, 14px);
  @include box-padding(10px);
  position: relative;
  line-height: 14px;

  &--disabled {
    cursor: not-allowed;
  }

  &--active {
    background-color: rgba($c-orange, 0.2);
  }

  &__remove {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    @include font-style($c-error, 14px);
    cursor: pointer;
  }
}
</style>
