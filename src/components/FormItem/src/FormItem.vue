<template>
  <div
    class="re-form-item"
    :class="[
      `re-form-item--${labelConfig().position}`,
      {
        're-form-item--top-padding': addLabelPadding,
      },
    ]"
  >
    <label
      class="re-form-item__label"
      :class="[
        labelConfig().position === 'left' &&
          `re-form-item__label--${labelConfig().textAlign}`,
      ]"
      :style="`width: ${labelWidthValue}`"
    >
      {{ $attrs.label }}
    </label>
    <div class="re-form-item__box">
      <div class="re-form-item__box__content" ref="formItemContent">
        <slot></slot>
      </div>
      <p class="re-form-item__box__err-msg">
        {{ errMsgText }}
      </p>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator';
// 移除console中的warning
Schema.warning = () => {};

export default {
  name: 'ReFormItem',
  compName: 'ReFormItem',
  inject: ['reForm', 'labelConfig', 'formValue'],
  props: {
    prop: {
      type: String,
      default: '',
    },
    addPadding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isPassValidate: true,
      addLabelPaddingList: ['ReTextarea', 'ReInputList'],
      currFormItemChildrenName: [],
      errMsgText: '',
      validateStatus: true,
    };
  },
  provide() {
    return {
      reFormItem: this,
    };
  },
  computed: {
    addLabelPadding() {
      if (this.addPadding) {
        return true;
      }

      for (const childName of this.currFormItemChildrenName) {
        for (const item of this.addLabelPaddingList) {
          if (childName === item) return true;
        }
      }

      return false;
    },
    labelWidthValue() {
      if (!this.labelConfig().width) {
        return '100px';
      }

      return `${this.labelConfig().width}px`;
    },
    itemTrigger() {
      if (this.prop in this.reForm.rules) {
        if ('trigger' in this.reForm.rules[this.prop]) {
          return ['form', ...this.reForm.rules[this.prop].trigger];
        }
      }

      return ['form', 'change'];
    },
    itemRule() {
      return { [this.prop]: this.reForm.rules[this.prop] };
    },

  },
  methods: {
    validateValue(val) {
      if (this.prop in this.reForm.rules) {
        this.isPassValidate = this.reForm.rules[this.prop](val);
      }
    },
    validatePass() {
      this.errMsgText = '';
    },
    handleErrors(errorList) {
      const err = errorList.find((item) => item.field === this.prop);
      this.errMsgText = err.message;
    },
    validateFormValue(value, event, options) {
      // 沒有規則就不驗證
      if (!this.itemRule[this.prop]) {
        return Promise.resolve(true);
      }

      // 至少都有一個form 當作是判斷submit時的驗證
      // 包含extra 是一個例外，表示必須往下跑驗證
      if (!this.itemTrigger.includes(event) && event.indexOf('extra') === -1) {
        return Promise.resolve(true);
      }

      let targetValue = value;
      // 若由父層form組件call此function，value會是obj要解構出來
      if (typeof value === 'object' && this.prop in value) {
        targetValue = value[this.prop];
      }

      const validator = new Schema(this.itemRule);
      const valueObj = { [this.prop]: targetValue };

      return new Promise((resolve) => {
        try {
          validator.validate(valueObj, options, (errors, fields) => {
            if (errors) {
              this.handleErrors(errors, fields);
            } else {
              this.validatePass();
            }
          }).then(() => {
            // 通過直接回true
            resolve(true);
          }).catch(() => {
            resolve(false);
          });
        } catch (e) {
          resolve(false);
        }
      });
    },
    getChildrenName() {
      this.$children.forEach((ele) => {
        this.currFormItemChildrenName.push(ele.$options.name);
      });
    },

  },

  mounted() {
    this.getChildrenName();
  },
};
</script>

<style lang="scss">
$form-item: ".re-form-item";

.re-form-item {
  display: flex;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0px;
  }

  &--top {
    flex-direction: column;

    #{$form-item}__label {
      width: 100%;
      margin-bottom: 5px;
    }

    &__box {
      width: 100%;

      &__content {
      }
    }
  }

  &--left {
    flex-direction: row;
    align-items: center;

    #{$form-item}__label {
      display: inline-block;
      flex: none;
      width: 80px;
      margin-right: 10px;
    }

    &__box {
      flex: 1;

      &__content {
        width: 100%;
      }
    }
  }

  // 一般情況下，form item高度最高為40px(最大的input),
  // 但content中的高度若高於40，label置中會有點微妙，所以這裡移除置中並設一點margin
   &--top-padding {
    align-items: flex-start;

    > #{$form-item}__label {
      margin-top: 11px;

    }
  }

  &__label {
    font-size: 14px;
    color: $c-assist;

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }

  }

  &__box {
    // margin-bottom: 20px;
    position: relative;
    width: 100%;

    &__content {
      width: 100%;
      // @include box-padding(4px 0);
    }

    &__err-msg {
      @include position(bl, -18px, 0px);
      height: 12px;
      width: 100%;
      @include font-style($c-error-message, 12px);
    }
  }
}
</style>
