<template>
  <div class="re-date-time-picker">
    <re-input :value="dateTimeString" readonly @click.stop="openCalendar" cus-type="dateTimePicker" />
    <re-expand-container :visible.sync="visible" maxHeight="auto">
      <div class="picker-switcher">
        <re-row :mt="false">
          <span class="picker-switcher__item" @click="showPicker('date')" size="small" type="plain">日期</span>
          <span class="picker-switcher__item" @click="showPicker('time')" size="small" type="plain">時間</span>
        </re-row>
      </div>
      <re-row :mt="false">
        <re-calendar v-show="currPicker === 'date'" :value="innerValue" @input="handleDateInput" :defaultDate="value" />
        <re-time-list v-show="currPicker === 'time'" :value="innerValue" @input="handleTimeInput" />
      </re-row>
    </re-expand-container>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import dayjs from 'dayjs';
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReDateTimePicker',
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
      currPicker: 'date',
      innerValue: '',
      dateTimeString: '',
      tempSave: {
        date: dayjs(this.value),
        time: dayjs(this.value),
      },
    };
  },
  methods: {
    showPicker(type) {
      this.currPicker = type;
    },
    handleDateInput(date) {
      const d = dayjs(date);
      const t = dayjs(this.tempSave.time);
      this.tempSave.date = d;

      const fullValue = new Date(d.$y, d.$M, d.$D, t.$H, t.$m, t.$s);
      this.updateValue(fullValue);
    },
    handleTimeInput(time) {
      const d = dayjs(this.tempSave.date);
      const t = dayjs(time);
      this.tempSave.time = t;

      const fullValue = new Date(d.$y, d.$M, d.$D, t.$H, t.$m, t.$s);
      this.updateValue(fullValue);
    },
    updateValue(fullValue) {
      this.$emit('input', fullValue);
      this.triggerValidate('change', fullValue);
      // this.closeCalendar();
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
    setDateTimeString() {
      this.dateTimeString = dayjs(this.innerValue).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  created() {
    this.setInnerValue();
    this.setDateTimeString();
  },
  watch: {
    value: {
      handler() {
        this.setInnerValue();
        this.setDateTimeString();
      },
    },
  },
};
</script>

<style lang="scss">
.re-date-time-picker {
  position: relative;
}

.picker-switcher {
  @include box-padding(10px);
  border-bottom: 1px solid $c-lightgrey;

  &__item {
    @include font-style($c-main, 14px);
    cursor: pointer;

    & + & {
      margin-left: 10px;
    }
  }
}
</style>
