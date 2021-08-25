<template>
  <div class="re-checkbox-group">
    <re-checkbox
      v-for="checkbox of innerOptions"
      :key="checkbox.value"
      v-bind="checkbox"
      @handleCheckboxGroup="handleCheckboxGroup"
      :inline="inline"
      :currValue="value"
      inGroup
    />
  </div>
</template>

<script>
import { cloneDeep, xor } from 'lodash';
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReCheckboxGroup',
  mixins: [triggerValidate],
  inject: {
    reFormItem: {
      default: '',
    },
  },
  props: {
    value: {
      default: [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Array,
      default: () => [0],
    },
  },
  data() {
    return {
      innerOptions: [],
    };
  },
  computed: {
    limitThreshold() {
      const lower = this.limit[0] || 0;
      const upper = this.limit[1] || this.options.length;
      return [lower, upper];
    },
  },
  methods: {
    checkLimit() {
      const valueLength = this.value.length;
      const options = this.innerOptions.map((ele) => ele.value);

      const unSelectedList = xor(this.value, options);

      if (valueLength === this.limitThreshold[0]) {
        this.innerOptions = this.innerOptions.map((ele) => {
          if (unSelectedList.includes(ele.value)) {
            ele.disabled = false;
          } else {
            ele.disabled = true;
          }

          return ele;
        });
      }

      if (valueLength > this.limitThreshold[0]) {
        this.innerOptions = this.innerOptions.map((ele) => {
          ele.disabled = false;

          return ele;
        });
      }

      if (valueLength >= this.limitThreshold[1]) {
        this.innerOptions = this.innerOptions.map((ele) => {
          if (unSelectedList.includes(ele.value)) {
            ele.disabled = true;
          } else {
            ele.disabled = false;
          }

          return ele;
        });
      }
    },

    handleCheckboxGroup(checkedValue) {
      let cloneValue = cloneDeep(this.value);
      const isChecked = this.value.includes(checkedValue);

      // 若以勾選，移除
      if (isChecked) {
        cloneValue = cloneValue.filter((val) => val !== checkedValue);
      } else {
        // 若未勾選，推進去
        cloneValue.push(checkedValue);
      }

      this.$emit('input', cloneValue);
      this.$emit('change', cloneValue);
      this.triggerValidate('change', cloneValue);
    },

    setInnerOptions() {
      this.innerOptions = cloneDeep(this.options);
    },
  },
  created() {
    this.setInnerOptions();
    this.checkLimit();
  },
  watch: {
    value: {
      handler: 'checkLimit',
    },
  },
};
</script>
