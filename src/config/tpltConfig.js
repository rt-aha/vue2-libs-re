// import { setTime } from '@/utils/usefulHelper';

const searchConfig = [
  {
    key: 'dateRange',
    type: 'dateRangePicker',
    defaultValue: '',
  },
  {
    key: 'title',
    type: 'input',
    placeholder: '文章標題',
    defaultValue: '',
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
