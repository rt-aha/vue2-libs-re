export default {
  acc: {
    label: '帳號',
    key: 'name',
    placeholder: '請填寫帳號',
  },
  pwd: {
    label: '密碼',
    key: 'pwd',
    placeholder: '請填寫密碼',
  },
  enable: {
    label: '是否啟用',
    key: 'enable',
    placeholder: '是否啟用',
  },
  fruit: {
    label: '水果',
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
    ],
  },
  date: {
    label: '選擇日期',
    key: 'datePicker',
    type: 'datePicker',
  },
  dateRange: {
    label: '選擇日期範圍',
    key: 'dateRangePicker',
    type: 'dateRangePicker',
  },
};
