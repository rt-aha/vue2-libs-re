import { selectOptions, radioOptions, checkboxOptions } from '@/views/comps/test-config';
import CusCellOne from '@/devComponents/Table/CusCellOne.vue';

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
      header: 'EPS',
      prop: 'eps',
      width: 80,
    },
    {
      header: '測試自定義組件',
      prop: 'customComp',
      render: (data, rowData, col) => ({
        render(h) {
          return h(CusCellOne, {
            props: {
              rowData,
            },
          });
        },
      }),
    },
    {
      header: '成交價',
      prop: 'dealPrice',
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
    //   {
    //     prop: 'action',
    //     header: '操作',
    //     width: 250,
    //     fixed: 'right',
    //     render: (data, rowData, col) => ({
    //       render(h) {
    //         return h('div', {}, [
    //           h(
    //             're-button',
    //             {
    //               on: { click: () => self.testHandleClick('add', rowData) },
    //               props: { type: 'border' },
    //             },
    //             '新增',
    //           ),
    //           h(
    //             're-button',
    //             {
    //               on: { click: () => self.testHandleClick('remove', rowData) },
    //               props: { type: 'border' },
    //             },
    //             rowData.symbol,
    //           ),
    //         ]);
    //       },
    //     }),
    //   },
  ];
};

const treeList = [
  {
    label: '樹形項目1',
    children: [
      {
        label: '樹形項目1-1',
      },
      {
        label: '樹形項目1-2',
      },
    ],
  },
  {
    label: '樹形項目2',
    children: [
      {
        label: '樹形項目2-1',
      },
    ],
  },
  {
    label: '樹形項目3',
    children: [
      {
        label: '樹形項目3-1',
        children: [
          {
            label: '樹形項目3-1-1',
          },
          {
            label: '樹形項目3-1-2',
          },
        ],
      },
    ],
  },
];

export { columnsConfig, searchConfig, treeList };
