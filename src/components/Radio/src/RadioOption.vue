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
          :class="String(currValue) === String(value) && 're-radio-box__input__actural--active'"
        >
        </span>
      </div>
      <div class="re-radio-box__content">
        <component v-if="render" :is="render()" v-bind="$attrs" />
        <span v-else class="re-radio-box__content__label">{{ label }}</span>
      </div>
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
    inline: {
      type: Boolean,
      default: true,
    },
    render: {
      default: null,
    },
  },
  data() {
    return {
      uuid: uuid(),
      focus: false,
    };
  },
  methods: {
    handleChange() {
      if (this.disabled) return;

      this.$emit('handleRadio', this.value);
      this.triggerValidate('change', this.value);
    },
  },
};
</script>

<style lang="scss">
.re-radio-option {
  height: auto;
  margin: 5px 10px 5px 0;
  cursor: inherit;

  &--inline {
    display: inline-block;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .re-radio-box {
      cursor: not-allowed;
    }
  }
}

.re-radio-box {
  display: inline-flex;
  cursor: pointer;

  &__input {
    @include circle(16px);
    @include box-padding(2px);
    display: inline-block;
    flex: none;
    position: relative;
    vertical-align: middle;
    padding: 0;
    border: 1px solid $c-assist;

    &__native {
      display: none;
    }

    &__actural {
      @include position(center);
      @include circle(10px);
      display: inline-block;

      &--active {
        background-color: $c-main;
      }
    }
  }

  &__content {
    flex: 1;
    margin-left: 5px;

    &__label {
      @include font-style($c-assist, 14px);
    }
  }
}
</style>
