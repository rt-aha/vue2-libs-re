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
      rForm: this,
      formErrMsg: () => this.formErrMsg,
      labelConfig: () => this.labelConfig,
      formValue: () => this.form,
    };
  },
  data() {
    return {
      formErrMsg: {},
      validateStatus: false,
    };
  },
  mounted() {
    // this.showModel();
    // console.log('this...', this);
  },
  methods: {
    async validateForm(callback) {
      const validateList = [];

      this.$children.forEach((node) => {
        if (node.$options.name === 'ReFormItem') {
          const promise = new Promise((resolve) => {
            resolve(node.validateFormValue(this.form));
          });

          validateList.push(promise);
        }
      });

      const allValidatorResult = await validateList.reduce(async (resultCollection, execValidator) => {
        const validateResult = await execValidator;
        const accResolve = await resultCollection;
        accResolve.push(validateResult);

        return accResolve;
      }, []);

      const checkResult = allValidatorResult.every((val) => val);

      console.log('allValidatorResult', allValidatorResult);

      if (checkResult) {
        callback();
      }
    },
  },
  watch: {
    // form: {
    // deep: true,
    // handler: 'handleForm',
    // },
  },
};
</script>
