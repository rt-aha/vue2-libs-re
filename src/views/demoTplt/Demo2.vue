<template>
  <div>
    <cus-form ref="form">
      <cus-item-wrapper
        label="帳號"
        :ruleListWithMsg="['hasText']"
      >
        <cus-input
          v-model="form.acc"
          :inputConfig="inputConfig.acc"
        />
      </cus-item-wrapper>
      <cus-item-wrapper
        label="密碼"
        :ruleListWithMsg="['hasText']"
      >
        <cus-input
          v-model="form.pwd"
          :inputConfig="inputConfig.pwd"
          type="password"
        />
      </cus-item-wrapper>
      <cus-item-wrapper
        label="性別"
        :ruleListWithMsg="['isSelect']"
      >
        <cus-switch
          v-model="form.pwd"
          :inputConfig="inputConfig.sex"
        />
      </cus-item-wrapper>
      <cus-item-wrapper
        label="性別"
        :ruleListWithMsg="['isSelect']"
      >
        <cus-selector
          v-model="form.fruit"
          :inputConfig="inputConfig.fruit"
        />
      </cus-item-wrapper>
      <cus-item-wrapper
        label="選擇單一日期"
        :ruleListWithMsg="['isSelect']"
      >
        <cus-date-picker
          v-model="form.date"
          :inputConfig="inputConfig.date"
        />
      </cus-item-wrapper>
      <cus-item-wrapper
        label="選擇日期範圍"
        :ruleListWithMsg="['isSelect']"
      >
        <cus-date-range-picker
          v-model="form.dateRange"
          :inputConfig="inputConfig.dateRange"
        />
      </cus-item-wrapper>
      <cus-item-wrapper>
        <button
          class="submit-btn"
          @click="onSubmit"
        >submit</button>
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
        sex: -1,
        fruit: '',
        date: '',
        dateRange: [],
      },
      inputConfig: {
        acc: {
          key: 'name',
          placeholder: '請填寫帳號',
        },
        pwd: {
          key: 'pwd',
          placeholder: '請填寫密碼',
        },
        sex: {
          key: 'sex',
          placeholder: '請選擇性別',
        },
        fruit: {
          key: 'age',
          placeholder: '請選擇',
          defaultValue: 3,
          options: [
            {
              label: 'apple',
              value: 1,
            },
            {
              label: 'banana',
              value: 2,
            },
            {
              label: 'orange',
              value: 3,
            },
            {
              label: 'lemon',
              value: 4,
            },
          ]
        },
        date: {
          key: 'datePicker',
          type: 'datePicker',
          defaultValue: setTime('day-0-0'),
        },
        dateRange: {
          key: 'dateRangePicker',
          type: 'dateRangePicker',
          defaultValue: [setTime('month-subtract-1'), setTime('day-0-0')],
        },
      }
    };
  },
  methods: {
    onSubmit() {
      const form = this.$refs.form;
      const isPass = this.validateForm(form);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>