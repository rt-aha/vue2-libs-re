<template>
  <div class="page-form" :class="{ 'page-form--divide-line': hasDivide }">
    <div class="page-form__loop">
      <re-title>Form模板 Widget (迴圈版)</re-title>
      <re-easy-form v-model="easyForm" :rules="rules" :labelConfig="labelConfig" ref="reEasyForm">
        <re-button @click.prevent="submitEasyForm">送出</re-button>
      </re-easy-form>
    </div>
    <div class="page-form__separate">
      <re-title>Form Widget (一個一個寫)</re-title>
      <re-form :rules="rules" :form="form" ref="testingForm" :labelConfig="labelConfig">
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
          <re-input-number v-model="form.fee" placeholder="請輸入手續費" />
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
        <re-form-item label="Email 列表" prop="emailList">
          <re-input-list v-model="form.emailList" />
        </re-form-item>
        <re-form-item label="備註" prop="memo">
          <re-textarea v-model="form.memo" />
        </re-form-item>
        <re-form-item label="Email" prop="email">
          <re-email-auto-complete v-model="form.email" :options="domainList" />
        </re-form-item>
        <re-form-item label="頭像" prop="avatar">
          <re-upload v-model="form.avatar" :multiple="false">
            <re-button @click.prevent>
              <div class="btn-wrap">
                <img class="btn-wrap__icon" src="@/assets/icon/upload.svg" />
                <span class="btn-wrap__upload">上傳</span>
              </div>
            </re-button>
          </re-upload>
        </re-form-item>
        <re-button @click.prevent="submit">送出</re-button>
      </re-form>
    </div>
  </div>
</template>

<script>
import { vld, asyncVld } from '@/utils/validate/vld';
import { getUsersAPI } from '@/api/test';
import regExps from '@/utils/validate/regExp';
import { selectOptions, radioOptions, checkboxOptions, checkboxOptionsAgree, domainList } from './formTestConfig';

export default {
  name: 'ReWidgetForm',
  props: {
    hasDivide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectOptions,
      radioOptions,
      checkboxOptions,
      checkboxOptionsAgree,
      domainList,
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
          label: 'Email列表',
          prop: 'emailList',
          value: [],
          type: 'input-list',
        },
        {
          label: '備註',
          prop: 'memo',
          value: '',
          type: 'textarea',
        },
        {
          label: 'Email',
          prop: 'email',
          value: '',
          type: 'email-auto-complete',
        },
        {
          label: '頭像',
          prop: 'avatar',
          value: [],
          type: 'upload',
        },
      ],
      form: {
        name: '',
        enable: true,
        income: null,
        occupation: 0,
        interest: [],
        agree: false,
        fee: 9,
        date: new Date(),
        time: new Date(),
        dateTime: new Date(),
        emailList: [],
        memo: '',
        email: '',
        avatar: [],
      },
      rules: {
        name: {
          validator: (rule, value, cb, src, options) =>
            vld({
              value,
              ruleList: ['vldRequired', 't1:t1arg', 't2'],
              // 若另外設定，就走另外設定的
              // ruleError: { vldRequired: 'vldRequiredWithLabel' },
              options,
              label: '姓名',
            }),
          trigger: ['input'],
          // triggerEvent: ['change'],
        },
        income: {
          // validator: (rule, value) => Number(value) > 2,
          // validator: (rule, value) => {
          //   console.log('val...', value);
          //   return value;
          // },
          validator: (rule, value, cb, src, options) =>
            vld({
              value,
              ruleList: ['vldRequired'],
              options,
              label: '年收入',
            }),
          trigger: ['change'],
        },
        occupation: {
          message: '請勾選一個選項',
          validator: (rule, value) =>
            // 隨便寫的規則
            value > 1,
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
        },
        fee: {
          message: '不可小於0',
          validator: (rule, value) => value > 0,
          // asyncValidator: (rule, value) => asyncVld({ value, ruleList: ['t2'], asyncFn: getUsersAPI }),
        },
        date: {
          message: '請選擇日期',
          validator: (rule, value) => !!value,
          trigger: ['change'],
        },
        time: {
          message: '請選擇時間',
          validator: (rule, value) => !!value,
          trigger: ['change'],
        },
        dateTime: {
          message: '請選擇日期時間',
          validator: (rule, value) => !!value,
          trigger: ['change'],
        },
        emailList: {
          // message: '請輸入 0~1 個 email',
          // validator: (rule, value, cb, src, options) => {
          //   if (options.event === 'remove') return true;
          //   return value.every((item) => regExps.email.test(item));
          // },
          validator: (rule, value, cb, src, options) =>
            vld({
              value,
              ruleList: ['vldAllEmail'],
              options,
            }),
          trigger: ['blur'], // FIXED: 這裡寫了change會噴錯
        },
        memo: {
          message: '請填寫備註',
          validator: (rule, value) => value.length > 0,
          trigger: ['change', 'input'],
        },
        email: {
          validator: (rule, value, cb, src, options) =>
            vld({
              value,
              ruleList: ['vldRequired', 'vldEmail'],
              options,
            }),
          trigger: ['change', 'input'],
        },
        avatar: {
          validator: (rule, value, cb, src, options) =>
            vld({
              value,
              ruleList: ['vldOnlyOneAvatar'],
              options,
            }),
          trigger: ['change'],
        },
      },
    };
  },
  computed: {},
  methods: {
    submitEasyForm() {
      this.$refs.reEasyForm.validateForm(() => {
        console.log('easyform congrats ~');
      });
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
.page-form {
  @include flex(flex-start, flex-start);
  @include box-padding(10px);

  &--divide-line {
    border-left: 1px solid #ccc;
  }

  &__loop {
    flex: 1;
  }

  &__separate {
    flex: 1;
    margin-left: 30px;
  }
}

.btn-wrap {
  @include flex();

  &__icon {
    width: 20px;
  }

  &__upload {
    @include font-style($c-white, 14px);
    display: inline-block;
    margin-left: 5px;
  }
}
</style>
