<template>
  <div class="view-comp-dev">
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
        <re-checkbox v-model="form.interest" :options="checkboxOptions"  />
      </re-form-item>
      <re-button @click.prevent="submit">送出</re-button>
    </re-form>
  </div>
</template>

<script>
import { selectOptions, radioOptions, checkboxOptions } from './test-config';

export default {
  name: 'RForm',
  data() {
    return {
      selectOptions,
      radioOptions,
      checkboxOptions,
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
      },
      rules: {
        name: {
          type: 'string',
          message: '請輸入姓名',
          validator: (rule, value) => value.length > 0,
        },
        income: {
          message: '請至少選擇一個選項1',
          validator: (rule, value) => Number(value) > 2,
        },
        occupation: {
          message: '請至少選擇一個選項2',
          validator: (rule, value) => value > 0,
        },
        interest: {
          type: 'string',
          message: '請至少選擇一個選項3',
          validator: (rule, value) => value.length > 1,
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
  @include box-padding(10px)
}
</style>