<template>
  <div>
    {{ $route.name }}

    <!--
      CusEleXXX: 都是再次封裝element-ui的組件，讓觸發blur或change事件時走自訂的驗證處理(因為element 有點bug)
      CusItemWrapper: 幫CusEleXXX增加附加功能的一個wrapper，目前有兩種功能 1.增加label, 2.觸發驗證後顯示的錯誤訊息
     -->

    <CusItemWrapper label="輸入"
                    :ruleListWithMsg="['hasText']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleInput v-model="form.input"
                   :inputConfig="inputConfig"
                   ref="input" />
    </CusItemWrapper>
    <CusItemWrapper label="下拉"
                    :ruleListWithMsg="['isSelect']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleSelector :selectorConfig="selectorConfig"
                      v-model="form.selector"
                      ref="selector" />
    </CusItemWrapper>
    <CusItemWrapper label="日期"
                    :ruleListWithMsg="['isSelect']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleDatePicker :datePickerConfig="datePickerConfig"
                        v-model="form.date"
                        ref="date" />
    </CusItemWrapper>
    <CusItemWrapper label="日期範圍"
                    :ruleListWithMsg="['isSelect']"
                    :extraInfo="{a: '1',b:2}"
                    :func="() => 'hi'">
      <CusEleDateRangePicker :dateRangePickerConfig="dateRangePickerConfig"
                             v-model="form.dateRange"
                             ref="dateRange" />
    </CusItemWrapper>

    <button @click="submit">SUBMIT</button>

  </div>
</template>

<script>

import CusItemWrapper from '@/components/custom/CusItemWrapper';
import CusEleInput from '@/components/customElement/CusEleInput.vue';
import CusEleSelector from '@/components/customElement/CusEleSelector.vue';
import CusEleDatePicker from '@/components/customElement/CusEleDatePicker.vue';
import CusEleDateRangePicker from '@/components/customElement/CusEleDateRangePicker.vue';

import { setTime } from '@/utils/usefulHelper';



export default {
  name: 'Validate',
  components: {
    CusItemWrapper,
    CusEleInput,
    CusEleSelector,
    // CusEleSwitch,
    CusEleDatePicker,
    CusEleDateRangePicker
  },
  data() {
    return {
      form: {
        input: '',
        selector: '',
        switch: '',
        date: '',
        dateRange: '',
      },
      inputConfig: {
        key: 'name',
        type: 'input',
        placeholder: '姓名',
        defaultValue: '',
      },
      selectorConfig: {
        key: 'age',
        type: 'selector',
        placeholder: '請選擇',
        defaultValue: 3,
        options: [
          {
            label: '1',
            value: 1,
          },
          {
            label: '2',
            value: 2,
          },
          {
            label: '3',
            value: 3,
          },
          {
            label: '4',
            value: 4,
          },
        ],
      },
      datePickerConfig: {
        key: 'datePicker',
        type: 'datePicker',
        defaultValue: setTime('day-0-0'),
      },
      dateRangePickerConfig: {
        key: 'dateRangePicker',
        type: 'dateRangePicker',
        defaultValue: [setTime('month-subtract-1'), setTime('day-0-0')],
      },
    };
  },
  methods: {
    handleSwitchChange() {
      console.log('handleSwitchChange');
    },
    submit() {
      console.log(this.$refs);
      const isPass = this.validateForm(this.$refs);
      console.log('是否全部通過', isPass);
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';
</style>