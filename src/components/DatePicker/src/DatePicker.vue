<template>
  <div class="re-date-picker">
    <re-input :value="dateString" readonly @click.stop="openCalendar" cus-type="datePicker" />
    <re-expand-container :visible.sync="visible" maxHeight="'auto'">
      <re-date-calendar
        :value="innerValue"
        @input="handleInput"
        :defaultDate="innerValue"
        :notBeforeDate="notBeforeDate"
        :notAfterDate="notAfterDate"
      />
    </re-expand-container>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import dayjs from 'dayjs';
import triggerValidate from '@/mixins/triggerValidate';
import ReDateCalendar from '@/components/DatePicker/src/DateCalendar.vue';

export default {
  name: 'ReDatePicker',
  mixins: [triggerValidate],
  components: {
    ReDateCalendar,
  },
  directives: {
    onClickaway,
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
    notBeforeDate: {
      type: Date,
      default: () => null,
    },
    notAfterDate: {
      type: Date,
      default: () => null,
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
.re-date-picker {
  position: relative;
}
</style>
