import { setTime } from '@/utils/usefulHelper';

const searchConfig = [
  {
    key: 'name',
    type: 'input',
    placeholder: '姓名',
    defaultValue: 'nnn',
  },
  {
    key: 'gender',
    type: 'selector',
    placeholder: '選擇性別',
    defaultValue: 2,
    options: [
      {
        label: '男生',
        value: 1,
      },
      {
        label: '女生',
        value: 2,
      },
      {
        label: '其他',
        value: 3,
      },
    ],
  },
  {
    key: 'dateRange',
    type: 'dateRangePicker',
    defaultValue: [setTime('month-subtract-1'), setTime('day-0-0')],
  },
  {
    key: 'datePicker',
    type: 'datePicker',
    defaultValue: setTime('day-0-0'),
  },
];

const columnConfig = [
  {
    prop: 'id',
    label: 'ID',
    minWidth: 100,
    sortable: false,
    fixed: false,
    align: 'center',
    headerAlign: 'center',
    show: 1,
  },
  {
    prop: 'name',
    label: '姓名',
    minWidth: 100,
    sortable: false,
    fixed: false,
    align: 'center',
    headerAlign: 'center',
    show: 1,
  },
  {
    prop: 'age',
    label: '年紀',
    minWidth: 100,
    sortable: false,
    fixed: false,
    align: 'center',
    headerAlign: 'center',
    show: 1,
  },
  {
    prop: 'gender',
    label: '性別',
    minWidth: 100,
    sortable: false,
    fixed: false,
    align: 'center',
    headerAlign: 'center',
    show: 1,
  },
  {
    prop: 'imageUrl',
    label: '圖片',
    minWidth: 150,
    sortable: false,
    fixed: false,
    align: 'center',
    headerAlign: 'center',
    show: 1,
    render: (h, params) => {
      return h('img', {
        class: 'img-wrapper',
        attrs: {
          src: params.row.imageUrl,
        },
        on: {
          click: () => {
            console.log('params---', params);
          },
        },
      });
    },
  },
  {
    prop: 'multiRow',
    label: '多行',
    minWidth: 150,
    sortable: false,
    fixed: false,
    align: 'center',
    headerAlign: 'center',
    cssStyle: 'multiRow',
    show: 1,
  },
];

const operationConfig = {
  prop: 'operation',
  label: '操作',
  minWidth: 160,
  sortable: false,
  fixed: 'right',
  align: 'center',
  headerAlign: 'center',
  show: 1,
  operationSetting: [
    { operate: 1, label: '操作1' },
    { operate: 2, label: '操作2' },
  ],
};

export { columnConfig, searchConfig, operationConfig };
