<template>
  <div class="cus-item">
    <label
      class="cus-item__label"
      v-if="$attrs.label"
    >{{ $attrs.label }}</label>
    <slot></slot>
    <ErrMsg
      v-if="$attrs.ruleListWithMsg"
      :errMsg="errMsg"
    />
  </div>
</template>

<script>
import ErrMsg from '@/components/customElement/ErrMsg.vue';
import ErrStatus from '@/components/customElement/ErrStatus.vue';
import { validator } from '@/utils/validator';

export default {
  name: 'CusItemWrapper',
  components: {
    ErrMsg,
    ErrStatus
  },
  data() {
    return {
      errMsg: '',
      errStatus: 'none',
      isPassValidate: false,
      identification: 'cus-wrapper'
    };
  },
  props: {
    func: Function
  },
  provide() {
    return {
      errMsgText: () => this.errMsg
    };
  },
  methods: {
    validateValue() {
      console.log('this.$attrs.ruleListWithMsg', this.$attrs.ruleListWithMsg);
      if (!this.$attrs.ruleListWithMsg) {
        return { isPass: true };
      }

      // 沒有驗證規則就返回
      const args = Array.from(arguments);
      console.log('args---', args);
      if (typeof args === 'undefined' || args.length === 0) {
        throw new Error('參數至少應有一個驗證的值');
      }

      //  {規則, 規則參數, 錯誤提示}, 值, 標籤, 其他資訊
      const params = {
        ruleListAndErrMsg: this.$attrs.ruleListWithMsg,
        checkValue: args[0],
        label: this.$attrs.label,
        extraInfo: this.$attrs.extraInfo || {}
      };


      validator.add(params);
      const result = validator.start();
      if (result.isPass) {
        this.errMsg = '';
        this.errStatus = 'ok';
        this.isPassValidate = true;
      } else {
        this.errMsg = result.errInfo;
        this.errStatus = 'error';
        this.isPassValidate = false;
      }

      return result;
    },
    /**
     * args: 要驗證的值
     */
    execValidate(args) {
      this.validateValue.apply(null, args);
    },
    execFunc() {
      const result = this.func.apply(null);
      this.$emit('funcResult', result);
    },
    handleValidate(args) {
      console.log('args--', args);
      // 驗證
      if (this.$attrs.ruleListWithMsg) {
        this.execValidate(args);
      }

      // 如果有傳入function
      if (this.func) {
        this.execFunc();
      }
    },
    cleanErrMsg() {
      this.errStatus = 'none';
      this.errMsg = '';
    }
  },

  beforeMount() {
    this.$on('handleValidate', this.handleValidate);
  }
};
</script>

<style lang="scss" scoped>
.cus-item {
  width: 100%;
  @include box-padding(0 10px);

  & + & {
    margin-top: 10px;
  }
}

.cus-item__label {
  display: inline-block;
  margin-bottom: 5px;
  @include font-style(#999, $fs-14, 400);
}

.input-err-wrapper {
  width: 100%;
  display: inline-block;
  position: relative;
}

.err-status {
  border: 1px solid $c-error;
}
</style>
