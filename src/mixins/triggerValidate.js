export default {
  inject: {
    reFormItem: {
      default: '',
    },
  },
  methods: {
    triggerValidate(event, value) {
      if (this.reFormItem) {
        this.$nextTick(() => {
          // this.value 用於預設的model，但model可能被改過，所以可能需要用另外的值
          this.reFormItem.validateFormValue(this.value || value, event);
        });
      }
    },
  },
};
