<template>
  <div
    class="re-radio-option"
    :class="[
      {
        're-radio-option--inline': inline,
        're-radio-option--disabled': disabled,
      },
    ]"
  >
    <label class="re-radio-box" :for="uuid">
      <div class="re-radio-box__input">
        <input
          class="re-radio-box__input__native"
          type="radio"
          :id="uuid"
          :disabled="disabled"
          @focus="focus = true"
          @blur="focus = false"
          @change="handleChange"
          :checked="String(currValue) === String(value)"
          :value="value"
        />
        <span
          class="re-radio-box__input__actural"
          :class="
            String(currValue) === String(value) &&
            're-radio-box__input__actural--active'"
        >
        </span>
      </div>
      <span class="re-radio-box__label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReRadioOption',
  mixins: [triggerValidate],
  inject: {
    reFormItem: {
      default: '',
    },
  },
  props: {
    currValue: {
      default: '',
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
    inline: Boolean,
  },
  data() {
    return {
      uuid: uuid(),
      focus: false,
    };
  },
  methods: {
    handleChange(e) {
      if (this.disabled) return;

      this.$emit('handleRadio', e.target.value);
      this.triggerValidate('change', e.target.value);
    },
  },
};
</script>

<style lang="scss">
.re-radio-option {
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

.re-radio-box {
  display: inline-block;
  cursor: pointer;

  &__input {
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    @include circle(16px);
    @include box-padding(2px);
    position: relative;
    border: 1px solid $c-assist;

    &__native {
      display: none;
    }

    &__actural {
      display: inline-block;
      @include circle(10px);

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
