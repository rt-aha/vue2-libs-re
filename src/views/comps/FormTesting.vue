<template>
  <div class="view-comp-dev">
    <re-title>Form模板(迴圈版)</re-title>
    <re-easy-form
      v-model="easyForm"
      :rules="rules"
      :labelConfig="labelConfig"
      ref="reEasyForm"
    >
      <re-button @click.prevent="submitEasyForm">送出</re-button>
    </re-easy-form>
    <re-divider></re-divider>
    <re-title>Form模板(一個一個寫)</re-title>
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
  </div>
</template>

<script>
import { vld, asyncVld } from '@/utils/validate/vld';
import { getUsersAPI } from '@/api/test';
import {
  selectOptions,
  radioOptions,
  checkboxOptions,
  checkboxOptionsAgree,
} from './test-config';

export default {
  name: 'ReFormTesting',
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
      easyForm: [
        {
          label: '姓名',
          prop: 'name',
          value: '',
          type: 'input',
        },
        {
          label: '啟用',
          prop: 'enable',
          value: true,
          type: 'switch',
        },
        {
          label: '年收入',
          prop: 'income',
          value: 0,
          type: 'select',
          options: selectOptions,
        },
        {
          label: '職業',
          prop: 'occupation',
          value: 0,
          type: 'radio',
          options: radioOptions,
        },
        {
          label: '興趣愛好',
          prop: 'interest',
          value: [],
          type: 'checkbox-group',
          options: checkboxOptions,
        },
        {
          label: '手續費',
          prop: 'fee',
          value: 9,
          type: 'input-number',
          placeholder: 'fee',
        },
        {
          label: '日期',
          prop: 'date',
          value: new Date(),
          type: 'date-picker',
        },
        {
          label: '時間',
          prop: 'time',
          value: new Date(),
          type: 'time-picker',
        },
        {
          label: '日期時間',
          prop: 'dateTime',
          value: new Date(),
          type: 'date-time-picker',
        },
        {
          label: '水果列表',
          prop: 'fruitList',
          value: [],
          type: 'input-list',
        },
        {
          label: '備註',
          prop: 'memo',
          value: '',
          type: 'textarea',
        },
      ],
      form: {
        name: '',
        enable: true,
        income: 0,
        occupation: 0,
        interest: [],
        agree: false,
        fee: 9,
        date: new Date(),
        time: new Date(),
        dateTime: new Date(),
        fruitList: [],
        memo: '',
      },
      rules: {
        name: {
          validator: (rule, value, cb, src, options) => vld({
            value,
            ruleList: ['t1:t1arg', 't2'],
            // ruleError: { t1: 't1 error' },
            options,
          }),
          trigger: ['input'],
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
          asyncValidator: (rule, value) => asyncVld({ value, ruleList: ['t2'], asyncFn: getUsersAPI }),
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
          validator: (rule, value, cb, src, options) => {
            if (options.event === 'remove') return true;
            return value.every((item) => item.value.length > 0);
          },
          trigger: ['blur'], // FIXED: 這裡寫了change會噴錯
        },
        memo: {
          message: '請填寫備註',
          validator: (rule, value) => value.length > 0,
          trigger: ['change', 'input'],
        },
      },
    };
  },
  computed: {
  },
  methods: {
    submitEasyForm() {
      this.$refs.reEasyForm.submit();
    },
    submit() {
      this.$refs.testingForm.validateForm(() => {
        console.log('congrats ~');
      });
    },
    async timer() {
      return new Promise((resolve) => {
        let t = 0;
        setTimeout(() => {
          console.log('time up !');
          t = Math.floor(Math.random() * 10);
          console.log('t...', t);
          resolve(t);
        }, 1000);
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
