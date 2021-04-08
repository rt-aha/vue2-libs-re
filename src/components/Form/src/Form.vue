<template>
  <form class="re-form" :style="`width: ${width}`">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'ReForm',
  compName: 'ReForm',
  props: {
    width: {
      type: String,
      default: 'auto',
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    // TODO 要傳到下方item
    validateImmediately: {
      type: Boolean,
      default: true,
    },
    labelConfig: {
      type: Object,
      default: () => ({
        position: 'top',
        width: '100',
        textAlign: 'left',
      }),
    },
  },
  provide() {
    return {
      reForm: this,
      formErrMsg: () => this.formErrMsg,
      labelConfig: () => this.labelConfig,
      formValue: () => this.form,
      // testReForm: () => this
    };
  },
  data() {
    return {
      formErrMsg: {},
      validateStatus: false,
    };
  },
  methods: {
    async validateForm(callback = () => {}) {
      const validateList = [];

      this.$children.forEach((node) => {
        if (node.$options.name === 'ReFormItem') {
          const promise = new Promise((resolve) => {
            resolve(node.validateFormValue(this.form, 'form'));
          });

          validateList.push(promise);
        }
      });

      const allValidatorResult = await validateList.reduce(
        async (resultCollection, execValidator) => {
          const validateResult = await execValidator;
          const accResolve = await resultCollection;
          accResolve.push(validateResult);

          return accResolve;
        },
        [],
      );

      const isFormValidator = allValidatorResult.every((val) => val);

      console.log('allValidatorResult', allValidatorResult);

      // return 用於一些要用async/await的
      if (isFormValidator) {
        callback();
        return true;
      }
      console.warn('validator error !');
      return false;
    },
  },
};
</script>
