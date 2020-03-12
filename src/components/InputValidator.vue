<template>
  <form-item :label="(convertText($attrs.labelName))"
             :invalid-text="errMsg !== '' ? errMsg : ''">
    <!-- @keyup.native="validateSingleInput" -->
    <!-- <el-input v-model="innerValue"
              @input="$emit('input', innerValue)"
              @blur="getValidatorResultWithErrMsg"
              :type="$attrs.type"
              v-bind="$attrs" />
    <template #append>
      <slot name="append"></slot>
    </template> -->
  </form-item>
</template>

<script lang="ts">
// import { Component, Vue, Prop, Watch, Mixins } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
// import FormItem from '@/components/ui/FormItem.vue';

// import { Validator } from '@/utils/validatorHelper';
// import { IvalidateParams, IvalidateResult } from '@/interface/validateTyping';
// import I18nConverter from '@/components/ui/mixins/I18nConverter.vue';
// @Component({
//   components: {
//     FormItem,
//   },
// })
// export default class InputValidator extends Mixins(I18nConverter) {
//   @Prop({ default: 'normal' })
//   public size: string;

//   @Prop({ default: () => [] })
//   public ruleList: string[];

//   @Prop({ default: '' })
//   public value: string;
//   public innerValue: string = this.value;

//   // 是否通過驗證
//   public isPassValidate: boolean = false;

//   // 表單錯誤訊息變數
//   public errMsg: string = '';

//   public getValidatorResult() {
//     // 沒有驗證規則就return
//     if (this.ruleList.length === 0) {
//       return;
//     }

//     const params: IvalidateParams = {
//       value: {
//         value: this.innerValue,
//         otherValue: this.$attrs.otherValue || '',
//       },
//       inputName: this.$attrs.labelName,
//       ruleList: this.ruleList,
//     };

//     const validator = new Validator();
//     validator.add(params);
//     const result: IvalidateResult = validator.start();

//     if (result.isPass) {
//       this.isPassValidate = true;
//     } else {
//       this.isPassValidate = false;
//     }

//     return result;
//   }

//   public getValidatorResultWithErrMsg(): void {
//     const result: any = this.getValidatorResult();

//     if (result.isPass) {
//       this.errMsg = '';
//     } else {
//       this.errMsg = result.errInfo;
//     }
//   }

//   public beforeMount() {
//     this.$on('getValidatorResultWithErrMsg', this.getValidatorResultWithErrMsg);
//     this.$on('getValidatorResult', this.getValidatorResult);
//   }

//   @Watch('value')
//   public setValue() {
//     this.innerValue = this.value;
//   }
// }
</script>

<style lang="less" scoped>
@import '~@/styles/config/index';
</style>
