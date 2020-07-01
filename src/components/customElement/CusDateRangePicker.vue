<template>
  <div>
    <el-date-picker
      v-model="innerValue"
      @input="$emit('input', innerValue);"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="開始日期"
      end-placeholder="結束日期"
      @change="triggerValidate"
      :picker-options="pickerOptions"
    />
  </div>
</template>

<script>
import { setTime } from '@/utils/usefulHelper';

export default {
  name: 'CusDateRangePicker',
  props: {
    value: {
      default: null,
    },
    inputConfig: {
      type: Object,
      default() { return { placeholder: '請輸入' }; }
    }
  },
  data() {
    return {
      innerValue: '',
      errMsgText: 'errMsg',
      identification: 'cus-input',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一週',
            onClick(picker) {
              const start = setTime('day-subtract-7', 'YYYY-MM-DD HH:mm:ss');
              const end = setTime('day-0-0', 'YYYY-MM-DD HH:mm:ss');

              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一個月',
            onClick(picker) {
              const start = setTime('month-subtract-1', 'YYYY-MM-DD HH:mm:ss');
              const end = setTime('day-0-0', 'YYYY-MM-DD HH:mm:ss');

              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三個月',
            onClick(picker) {
              const start = setTime('month-subtract-3', 'YYYY-MM-DD HH:mm:ss');
              const end = setTime('day-0-0', 'YYYY-MM-DD HH:mm:ss');

              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  computed: {
    errMsg() {
      return this.errMsgText();
    },
  },
  methods: {
    triggerValidate() {
      // this.$emit('input', this.innerValue);
      this.$parent.handleValidate([this.innerValue]);
    },
    setValue() {
      this.innerValue = this.value;
    }
  },
  created() {
    // 父層v-model 優先度高於inputConfig.defaultValue
    this.innerValue = this.inputConfig.defaultValue;
    if (this.value || this.value === '') {
      this.setValue();
    }
  },
  watch: {
    value: {
      handler: 'setValue',
    }
  }
}
</script>

<style lang="scss" scoped>
</style>