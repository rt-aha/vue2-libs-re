<template>
  <div class="re-date-picker">
    <re-input
      :value="dateString"
      readonly
      @click.stop="openCalendar"
      cus-type="datePicker"
    />
    <re-expand-container :visible.sync="visible">
      <re-calendar :value="innerValue" @input="handleInput" :defaultDate="innerValue" />
    </re-expand-container>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import dayjs from 'dayjs';
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReDatePicker',
  mixins: [triggerValidate],
  directives: {
    onClickaway,
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      visible: false,
      innerValue: '',
      dateString: '',
    };
  },
  methods: {
    // handleChange(value) {
    //   this.triggerValidate('change');
    // },
    handleInput(value) {
      console.log('do');
      this.$emit('input', value);
      this.triggerValidate('change', value);
      this.closeCalendar();
    },
    openCalendar() {
      this.visible = true;
    },
    closeCalendar() {
      this.visible = false;
    },
    setInnerValue() {
      this.innerValue = this.value;
    },
    setDateString() {
      this.dateString = dayjs(this.innerValue).format('YYYY-MM-DD');
    },
  },
  created() {
    this.setInnerValue();
    this.setDateString();
  },
  watch: {
    value: {
      handler() {
        this.setInnerValue();
        this.setDateString();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
