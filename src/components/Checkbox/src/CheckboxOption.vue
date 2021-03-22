<template>
  <div class="re-checkbox-option" :class="[
      {
        're-checkbox-option--inline': inline,
        're-checkbox-option--disabled': disabled,
      },
    ]">
    <label class="re-checkbox-box" :for="label" @click.stop="handleCheckbox">
      <div class="re-checkbox-box__input">
        <input class="re-checkbox-box__input__origin" type="checkbox" :id="uuid" />
        <span
          class="re-checkbox-box__input__actural"
          :class="currValue.includes(value) && 're-checkbox-box__input__actural--active'"
        ></span>
      </div>
      <span class="re-checkbox-box__label">{{ label }}</span>
    </label>
  </div>

</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
  name: 'ReCheckboxOption',
  props: {
    currValue: {
      type: Array,
      default: () => [],
    },
    value: {
      default: '',
    },
    label: {
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    render: {
      type: Object,
      default: () => ({}),
    },
    inline: Boolean,
  },
  data() {
    return {
      uuid: uuid(),
    };
  },
  methods: {
    handleCheckbox() {
      if (this.disabled) return;
      this.$emit('handleCheckbox', this.value);
    },
  },
};
</script>

<style lang="scss">

.re-checkbox-option {
  margin: 5px 10px 5px 0;
  cursor: inherit;

  &--inline {
    display: inline-block;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    .re-radio-box {
      cursor: not-allowed;
    }
  }
}

.re-checkbox-box {
  display: inline-block;
  cursor: pointer;

  &__input {
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    @include circle(16px, 4px);
    @include box-padding(2px);
    position: relative;
    border: 1px solid $c-assist;

    &__origin {
      display: none;
    }

    &__actural {
      display: inline-block;
      @include circle(10px, 2px);

        &--active {
          @include position(center);
          background-color: $c-main;
        }
    }
  }

  &__label {
    display: inline-block;
    vertical-align: middle;
    padding-left: 5px;
    @include font-style($c-assist, 14px);
  }
}
</style>
