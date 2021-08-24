import FruitOption from '@/devComponents/Select/FruitOption.vue';

export const selectOptions = [
  {
    label: '下拉選項1',
    value: 1,
  },
  {
    label: '下拉選項2',
    value: 2,
  },
  {
    label: '下拉選項3',
    value: 3,
    disabled: true,
  },
  {
    label: '下拉選項4',
    value: 4,
  },
  {
    label: '下拉選項5',
    value: 5,
  },
  {
    label: '下拉選項6',
    value: 6,
  },
  {
    render: () => FruitOption,
    label: 'Custom',
    value: 789,
    fruitData: {
      name: 'Banana',
      price: '$30',
      desc: '香又甜',
    },
  },
];

const fruitData = [
  {
    id: 111,
    name: '蘋果',
    price: '$50',
    desc: '富士山來的喔',
  },
  {
    id: 222,
    name: '香蕉',
    price: '$30',
    desc: '香又甜',
  },
  {
    id: 333,
    name: '鳳梨',
    price: '$30',
    desc: '微熱山丘指定',
  },
  {
    id: 444,
    name: '檸檬',
    price: '$30',
    desc: '酸酸甜甜愛不釋手',
  },
];

export const fruitOption = fruitData.map((item) => ({
  render: () => FruitOption,
  label: item.name,
  value: item.id,
  fruitData: item,
}));

export const groupOptions = [
  {
    label: '熱門城市',
    options: [
      {
        value: 'Shanghai',
        label: '上海',
      },
      {
        value: 'Beijing',
        label: '北京',
      },
    ],
  },
  {
    label: '城市名',
    options: [
      {
        value: 'Chengdu',
        label: '成都',
      },
      {
        value: 'Shenzhen',
        label: '深圳',
      },
      {
        value: 'Guangzhou',
        label: '廣州',
      },
      {
        value: 'Dalian',
        label: '大連',
      },
    ],
  },
];
