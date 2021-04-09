import {
  selectOptions,
  radioOptions,
  checkboxOptions,

} from '@/views/comps/test-config';

const searchConfig = () => [
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
];

const columnsConfig = (instance) => {
  const self = instance;

  return [
    {
      header: '代號',
      prop: 'symbol',

    },
    {
      header: '名稱',
      prop: 'name',

    },
    {
      header: '日期',
      prop: 'date',
      width: 60,

    },
    {
      header: '成交價',
      prop: 'dealPrice',

    },
    {
      header: 'EPS',
      prop: 'eps',
      width: 80,

    },
    {
      header: '現金股利',
      prop: 'cashDividend',

    },
    {
      header: '股票股利',
      prop: 'stockDividend',
      fixed: 'right',
    },
    {
      prop: 'action',
      header: '操作',
      width: 160,
      fixed: 'right',
      render: (data, rowData, col) => ({
        render(h) {
          return h('div', {
          }, [
            h('re-button',
              {
                on: { click: () => self.handlClick('add', rowData) },
                props: { type: 'border' },
              },
              '新增'),
            h('re-button',
              {
                on: { click: () => self.handlClick('remove', rowData) },
                props: { type: 'border' },
              },
              rowData.symbol),
          ]);
        },
      }),
    },

  ];
};

export { columnsConfig, searchConfig };
