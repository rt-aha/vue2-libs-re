<template>
  <div class="input-wrapper">
    <label class="input-label">{{ $attrs.label }}</label>
    <div class="input-err-wrapper">
      <slot></slot>
      <ErrMsg v-if="$attrs.ruleList" :errMsg="errMsg"></ErrMsg>
    </div>
  </div>
</template>

<script>
import ErrMsg from '@/views/demoTplt/ErrMsg.vue';
import { Validator } from '@/utils/validator';

export default {
  name: 'TpltInputWrapper',
  components: {
    ErrMsg,
  },
  data() {
    return {
      errMsg: 'this is err msg',
      isPassValidate: false,
    };
  },
  props: {
    func: Function,
  },
  methods: {
    execValidate() {
      // 沒有驗證規則就返回
      const args = Array.from(arguments);

      if (typeof args === 'undefined' || args.length === 0) {
        throw new Error('參數至少應有一個驗證的值');
      }

      const params = {
        // value: {
        //   value: args[0],
        //   otherValue: this.$attrs.otherValue || '',
        // },
        // inputName: this.$attrs.label,
        // ruleList: this.$attrs.ruleList,

        value: args[0],
        ruleAndErr: this.$attrs.ruleAndErr,
        label: this.$attrs.label,
        info: this.$attrs.info,
      };

      const validator = new Validator();
      validator.add(params);

      const result = validator.start();

      if (result.isPass) {
        this.isPassValidate = true;
        this.errMsg = '';
      } else {
        this.isPassValidate = false;
        this.errMsg = result.errInfo;
      }
    },

    // blur時觸發
    handleBlur(args) {
      console.log(args);
      // 驗證
      if (this.$attrs.ruleList) {
        this.execValidate.apply(null, args);
      }

      // 如果有傳入function
      if (this.func) {
        const execResult = this.func.apply(null, args);
        this.$emit('funcResult', execResult);
      }
    },
  },
  beforeMount() {
    this.$on('handleBlur', this.handleBlur);
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.input-err-wrapper {
  position: relative;
}
</style>
