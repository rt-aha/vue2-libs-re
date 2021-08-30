import { selectOptions, radioOptions, checkboxOptions } from '@/views/comps/test-config';

const searchConfig = () => [
  {
    label: '姓名',
    prop: 'name',
    value: '',
    type: 'input',
  },

  {
    label: '年收入',
    prop: 'income',
    value: 1,
    type: 'select',
    options: selectOptions,
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
];

export default searchConfig;
