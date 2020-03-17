<template>
  <div>
    <el-date-picker v-model="innerValue"
                    @input="$emit('input', innerValue);"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="開始日期"
                    end-placeholder="結束日期"
                    @change="handleChange"
                    :picker-options="pickerOptions" />
  </div>
</template>

<script>
import { setTime } from '@/utils/usefulHelper';

export default {
  name: 'CusEleDateRangePicker',
  data() {
    return {
      innerValue: '',
      errMsg: 'errMsg',
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
  props: {
    value: {
      default: ''
    },
    config: {
      type: Object,
      default() { return { placeholder: '請輸入', options: [] }; }
    }
  },
  methods: {
    handleValidate() {
      // 觸發驗證，把現在的值與實例透過mixin傳給wrapper處理
      this.dispatchEvent(this.$parent, 'handleBlur', this.innerValue);
    },
    handleChange() {
      console.log('handleChange-CusEleDatePicker');
    }
  },
  computed: {
    allOptions() {
      let defaultOptions = [
        {
          label: '請選擇',
          value: null,
          disabled: true,
        },
      ];

      // if (this.config.options) {
      //   defaultOptions = [...defaultOptions, ...this.config.options];
      // }

      return defaultOptions;
    }

  },
  created() {
    this.innerValue = this.config.defaultValue;
    this.$on('handleValidate', this.handleValidate);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>