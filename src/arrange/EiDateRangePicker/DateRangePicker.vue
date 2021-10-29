<template>
  <div class="re-date-range-picker">
    <div class="sub-info-wrap">
      <custom-date-option
        v-model="selectValue"
        @change="handleChange"
        @switchClickType="switchClickType"
        :startDate="startDate"
        :endDate="endDate"
        :clickType="clickType"
      />
    </div>

    <re-date-range-calendar
      :value="innerValue"
      @input="handleInput"
      ref="datRangeCalendar"
      :clickType.sync="clickType"
    />
  </div>
</template>

<script>
import moment from 'moment';
import ReDateRangeCalendar from '@/components/receiptMobile/EiDateRangePicker/DateRangeCalendar.vue';
import CustomDateOption from '@/components/receiptMobile/EiDateRangePicker/CustomDateOption.vue';

export default {
  name: 'ReDateRangePicker',
  components: {
    ReDateRangeCalendar,
    CustomDateOption,
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
      selectValue: 1,
      startDate: '2021-08-07',
      endDate: '2021-08-08',
      innerValue: [new Date(), new Date()],
      dateString: '',
      clickType: 'none',
    };
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
      this.setDateString(value);
    },
    setDateString(dateValue) {
      this.startDate = moment(dateValue[0]).format('YYYY-MM-DD');
      this.endDate = moment(dateValue[1]).format('YYYY-MM-DD');
    },
    switchClickType(clickType) {
      this.clickType = clickType;
    },
    handleChange(val) {
      switch (val) {
        // 最近的 7 天
        case 7:
          this.$refs.datRangeCalendar.selectedShortcutWeek();
          this.clickType = 'week';
          break;
        // 最近的 30 天
        case 30:
          this.$refs.datRangeCalendar.selectedShortcutMonth();
          this.clickType = 'month';
          break;
        // 自訂義
        case 1:
          this.clickType = 'start';
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.setDateString(this.innerValue);
  },
  mounted() {
    this.$refs.datRangeCalendar.selectedShortcutMonth();
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/e-invoice-mobile';

.re-date-range-picker {
  position: relative;
  width: 100%;
}
</style>
