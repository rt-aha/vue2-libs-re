<template>
  <div>
    <cus-form ref="form">
      <cus-item-wrapper :label="inputConfig.acc.label" :ruleListWithMsg="['hasText']">
        <cus-input v-model="form.acc" :inputConfig="inputConfig.acc" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="inputConfig.pwd.label" :ruleListWithMsg="['hasText']">
        <cus-input v-model="form.pwd" :inputConfig="inputConfig.pwd" type="password" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="inputConfig.enable.label">
        <cus-switch v-model="form.enable" :inputConfig="inputConfig.enable" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="inputConfig.fruit.label" :ruleListWithMsg="['isSelect']">
        <cus-selector v-model="form.fruit" :inputConfig="inputConfig.fruit" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="inputConfig.date.label" :ruleListWithMsg="['isSelect']">
        <cus-date-picker v-model="form.date" :inputConfig="inputConfig.date" />
      </cus-item-wrapper>
      <cus-item-wrapper :label="inputConfig.dateRange.label" :ruleListWithMsg="['isSelect']">
        <cus-date-range-picker v-model="form.dateRange" :inputConfig="inputConfig.dateRange" />
      </cus-item-wrapper>
      <cus-item-wrapper>
        <button class="submit-btn" @click="onSubmit">submit</button>
      </cus-item-wrapper>
    </cus-form>
  </div>
</template>

<script>
import CusForm from '@/components/customElement/CusForm.vue';
import CusItemWrapper from '@/components/customElement/CusItemWrapper.vue';
import CusInput from '@/components/customElement/CusInput.vue';
import CusSwitch from '@/components/customElement/CusSwitch.vue';
import CusSelector from '@/components/customElement/CusSelector.vue';
import CusDatePicker from '@/components/customElement/CusDatePicker.vue';
import CusDateRangePicker from '@/components/customElement/CusDateRangePicker.vue';
import tpltInputConfig from '@/config/tpltInputConfig';

import { setTime } from '@/utils/usefulHelper';


export default {
  name: 'Demo2',
  components: {
    CusForm,
    CusItemWrapper,
    CusInput,
    CusSwitch,
    CusSelector,
    CusDatePicker,
    CusDateRangePicker
  },
  data() {
    return {
      form: {
        acc: '',
        pwd: '',
        enable: false,
        fruit: '',
        date: setTime('day-0-0'),
        dateRange: [setTime('month-subtract-1'), setTime('day-0-0')],
      },
      inputConfig: tpltInputConfig,
    };
  },
  methods: {
    onSubmit() {
      const form = this.$refs.form;
      const isPass = this.validateForm(form);
      console.log('isPass', isPass);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>