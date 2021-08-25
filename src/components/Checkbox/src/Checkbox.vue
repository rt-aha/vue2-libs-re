<template>
  <div
    class="re-checkbox"
    :class="[
      {
        're-checkbox--inline': inline,
        're-checkbox--disabled': disabled,
      },
    ]"
  >
    <label class="re-checkbox-box" :for="uuid">
      <div class="re-checkbox-box__input">
        <input
          class="re-checkbox-box__input__native"
          type="checkbox"
          :id="uuid"
          @change="handler"
          :checked="currValue.includes(value) || checkAll"
          :value="value"
        />
        <span
          class="re-checkbox-box__input__actural"
          :class="[{ 're-checkbox-box__input__actural--active': currValue.includes(value) || checkAll }]"
        ></span>
      </div>
      <div class="re-checkbox-box__content">
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
  name: 'ReCheckbox',
  model: {
    prop: 'checkAll',
    event: 'checkAll',
  },
  mixins: [triggerValidate],
  props: {
    checkAll: {
      type: Boolean,
      default: false,
    },
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
    inline: {
      type: Boolean,
      default: true,
    },
    inGroup: {
      type: Boolean,
      default: false,
    },
    render: {
      default: null,
    },
  },
  data() {
    return {
      uuid: uuid(),
      handler() {},
    };
  },
  methods: {
    handleCheckbox(e) {
      if (this.disabled) return;
      // 用於v-model
      this.$emit('checkAll', e.target.checked);
      // change事件用於全選之類的，需額外設定check group的值
      this.$emit('change', e.target.checked);
      this.triggerValidate('change', e.target.checked);
    },

    handleCheckboxGroup(e) {
      if (this.disabled) return;

      // 若可以轉為數字，就回傳數字，若不行就回傳字串
      const num = Number(e.target.value);
      const value = Number.isNaN(num) ? e.target.value : num;

      this.$emit('handleCheckboxGroup', value);
    },
    setHandler() {
      if (this.inGroup) {
        this.handler = this.handleCheckboxGroup;
      } else {
        this.handler = this.handleCheckbox;
      }
    },
  },

  created() {
    this.setHandler();
  },
};
</script>

<style lang="scss">
.re-checkbox {
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

.re-checkbox-box {
  display: inline-flex;
  cursor: pointer;

  &__input {
    @include circle(16px, 4px);
    @include box-padding(2px);
    display: inline-block;
    position: relative;
    padding: 0;
    vertical-align: middle;
    border: 1px solid $c-assist;

    &__native {
      display: none;
    }

    &__actural {
      @include position(center);
      @include circle(10px, 2px);
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
