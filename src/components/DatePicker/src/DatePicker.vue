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

export default {
  name: 'ReDatePicker',
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
    handleInput(value) {
      this.$emit('input', value);
    },
    openCalendar() {
      this.visible = true;
    },
    closeCalendar() {
      this.visible = false;
    },
    // initInnerValue() {
    //   if (Object.prototype.toString.call(this.value) === '[object Date]') {
    //     this.innerValue = this.value;
    //   } else {
    //     this.innerValue = new Date();
    //   }
    // },
    setInnerValue() {
      this.innerValue = this.value;
    },
    setDateString() {
      console.log('this.innerValue', this.innerValue);
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
