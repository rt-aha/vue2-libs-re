<template>
  <div class="re-date-range-picker">
    <re-button @click="selectedShortcutWeek">最近七天</re-button>
    <re-button @click="selectedShortcutMonth">最近一個月</re-button>
    <re-row>
      <div class="date-value-wrap">
        <p class="date-value-wrap__from-to">
          <span class="date-value-wrap__from-to__text">從</span>
        </p>
        <div class="date-value-wrap__value">
          <re-input :value="startDate" placeholder="請選擇時間" readonly @click.stop="openDateRangeCalendar" />
        </div>
        <p class="date-value-wrap__from-to">
          <span class="date-value-wrap__from-to__text">到</span>
        </p>
        <div class="date-value-wrap__value">
          <re-input :value="endDate" placeholder="請選擇時間" readonly @click.stop="openDateRangeCalendar" />
        </div>
      </div>
    </re-row>

    <re-expand-container :visible.sync="visible" maxHeight="auto">
      <re-date-range-calendar
        :value="innerValue"
        @input="handleInput"
        :notBeforeDate="notBeforeDate"
        :notAfterDate="notAfterDate"
      />
    </re-expand-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import ReDateRangeCalendar from '@/components/DateRangePicker/src/DateRangeCalendar.vue';
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReDateRangePicker',
  mixins: [triggerValidate],
  components: {
    ReDateRangeCalendar,
  },
  props: {
    value: {
      type: Array,
      default: () => [new Date(), new Date()],
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
      // 暫時
      startDate: '2021-08-07',
      endDate: '2021-08-08',
      visible: false,
      innerValue: [new Date(), new Date()],
      dateString: '',
    };
  },
  methods: {
    openDateRangeCalendar() {
      this.visible = true;
    },
    handleInput(value) {
      this.$emit('input', value);
      this.setDateString(value);
      this.triggerValidate('change', value);
    },
    // setInnerValue() {
    //   this.innerValue = this.value;

    // },
    setDateString(dateValue) {
      this.startDate = dayjs(dateValue[0]).format('YYYY-MM-DD');
      this.endDate = dayjs(dateValue[1]).format('YYYY-MM-DD');
    },
    // 選擇 最近七天
    selectedShortcutWeek() {},
    // 選擇 最近一個月
    selectedShortcutMonth() {},
  },
  created() {
    this.setDateString(this.innerValue);
    // this.setInnerValue();
  },
};
</script>

<style lang="scss" scoped>
.re-date-range-picker {
  position: relative;
  width: 360px;
}

.date-value-wrap {
  @include flex();

  &__from-to {
    @include flex(center);
    flex: none;
    width: 30px;

    &__text {
      @include font-style($c-text1, 14px);
    }
  }

  &__value {
    flex: 1;
  }
}
</style>
