<template>
  <div class="view-comp-dev">
    <re-title>整個Form模板</re-title>
    <re-form
      :rules="rules"
      :form="form"
      ref="testingForm"
      :labelConfig="labelConfig"
    >
      <re-form-item label="姓名" prop="name">
        <re-input v-model="form.name" />
      </re-form-item>
      <re-form-item label="啟用" prop="enable">
        <re-switch v-model="form.enable" />
      </re-form-item>
      <re-form-item label="年收入" prop="income">
        <re-select v-model="form.income" :options="selectOptions" />
      </re-form-item>
      <re-form-item label="職業" prop="occupation">
        <re-radio v-model="form.occupation" :options="radioOptions" />
      </re-form-item>
      <re-form-item label="興趣愛好" prop="interest">
        <re-checkbox-group v-model="form.interest" :options="checkboxOptions" />
      </re-form-item>
       <re-form-item label="手續費" prop="fee">
        <re-input-number v-model="form.fee" placeholder="fee" />
      </re-form-item>
      <re-form-item label="日期" prop="date">
        <re-date-picker v-model="form.date" />
      </re-form-item>
      <re-form-item label="時間" prop="time">
        <re-time-picker v-model="form.time" />
      </re-form-item>
      <re-form-item label="日期時間" prop="dateTime">
        <re-date-time-picker v-model="form.dateTime" />
      </re-form-item>
       <re-form-item label="水果列表" prop="fruitList">
        <re-input-list v-model="form.fruitList" />
      </re-form-item>

      <re-form-item label="備註" prop="memo">
        <re-textarea v-model="form.memo" />
      </re-form-item>

      <re-button @click.prevent="submit">送出</re-button>
    </re-form>
    <re-divider></re-divider>
  </div>
</template>

<script>
import vld from '@/utils/validate';
import { isFalsy } from 'lodash';
import {
  selectOptions, radioOptions, checkboxOptions, checkboxOptionsAgree,
} from './test-config';

export default {
  name: 'RForm',
  data() {
    return {
      selectOptions,
      radioOptions,
      checkboxOptions,
      checkboxOptionsAgree,
      labelConfig: {
        position: 'left', // top, left
        width: '80',
        textAlign: 'right', // left, right
      },
      form: {
        name: '',
        enable: true,
        income: 0,
        occupation: 0,
        interest: [],
        agree: false,
        fee: '0',
        date: new Date(),
        time: new Date(),
        dateTime: new Date(),
        fruitList: [],
        memo: '',
      },
      rules: {
        name: {
          validator: (rule, value) => vld({ value, ruleList: [] }),
          trigger: ['input', 'change'],
          // triggerEvent: ['change'],
        },
        income: {
          message: '請至少選擇一個選項',
          validator: (rule, value) => Number(value) > 2,
          trigger: ['change'],
        },
        occupation: {
          message: '請勾選一個選項',
          validator: (rule, value) => value > 0,
          trigger: ['change'],
        },
        interest: {
          message: '請至少選擇一個選項',
          validator: (rule, value) => value.length > 0,
          trigger: ['change'],
        },
        agree: {
          message: '請勾選同意事項',
          validator: (rule, value) => value,
          // trigger: ['change'],
        },
        fee: {
          message: '請輸入手續費',
          validator: (rule, value) => {
            console.log(value);
            return Number(value) > 0;
          },
        },
        date: {
          message: '請選擇日期',
          validator: (rule, value) => !value,
          // trigger: ['change'],
        },
        time: {
          message: '請選擇時間',
          validator: (rule, value) => !value,
          // trigger: ['change'],
        },
        dateTime: {
          message: '請選擇日期時間',
          validator: (rule, value) => !value,
          // trigger: ['change'],
        },
        fruitList: {
          message: '請選擇水果，不可有空值',
          validator: (rule, value, _, source) => {
            console.log('value', value);
            const result = value.every((item) => item.value.length > 0);
            return result;
          },
        },
        memo: {
          message: '請填寫備註',
          validator: (rule, value) => value.length > 0,
          trigger: ['change', 'input'],
        },

      },
    };
  },
  methods: {
    submit() {
      this.$refs.testingForm.validateForm(() => {
        console.log('congrats ~');
      });
    },
  },
};
</script>

<style lang="scss">
.view-comp-dev {
  @include box-padding(10px);
}
</style>
