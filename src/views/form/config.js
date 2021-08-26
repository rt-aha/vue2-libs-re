import FruitOption from '@/devComponents/Select/FruitOption.vue';
import PhoneOption from '@/devComponents/Radio/PhoneOption.vue';
import MeatOption from '@/devComponents/Checkbox/MeatOption.vue';

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
  disabled: item.disabled,
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

export const radioOptions = [
  {
    label: '單選1',
    value: 'one',
  },
  {
    label: '單選2',
    value: 2,
  },
  {
    label: '單選3',
    value: 3,
    disabled: true,
  },
  {
    label: '單選4',
    value: true,
    disabled: true,
  },
  {
    label: '單選5',
    value: false,
  },
  {
    render: () => PhoneOption,
    label: 'Custom ?',
    value: 789,

    phoneData: {
      name: 'iPhone 11',
      desc: '大尺寸、M1晶片',
    },
  },
];

const phoneData = [
  {
    id: 111,
    name: 'iPhone 11',
    desc: '白色',
  },
  {
    id: 222,
    name: 'iPhone 10',
    desc: '白色',
  },
  {
    id: 333,
    name: 'iPhone 7s',
    desc: '白色、黑色',
    disabled: true,
  },
  {
    id: 444,
    name: 'iPhone X',
    desc: '鵝黃色',
  },
];

export const phoneOptions = phoneData.map((item) => ({
  render: () => PhoneOption,
  label: item.name,
  value: item.id,
  disabled: item.disabled,
  phoneData: item,
}));

export const checkboxOptions = [
  {
    label: '多選1',
    value: 1,
    disabled: true,
  },
  {
    label: '多選2',
    value: 2,
  },
  {
    label: '多選3',
    value: 3,
  },
  {
    label: '多選4',
    value: 4,
  },
  {
    label: '多選5',
    value: 5,
    disabled: true,
  },
  {
    render: () => MeatOption,
    label: 'Custom',
    value: 789,
    meatData: {
      id: 111,
      name: '雞肉',
      protein: '20g',
    },
  },
];

export const limitedCheckboxOptions = [
  {
    label: '多選1',
    value: 1,
  },
  {
    label: '多選2',
    value: 2,
  },
  {
    label: '多選3',
    value: 3,
  },
  {
    label: '多選4',
    value: 4,
  },
  {
    label: '多選5',
    value: 5,
  },
];

const meatData = [
  {
    id: 111,
    name: '雞肉',
    protein: '20g',
  },
  {
    id: 222,
    name: '豬肉',
    protein: '21g',
    disabled: true,
  },
  {
    id: 333,
    name: '牛肉',
    protein: '25g',
  },
  {
    id: 444,
    name: '羊肉',
    protein: '22g',
  },
];

export const meatOptions = meatData.map((item) => ({
  render: () => MeatOption,
  label: item.name,
  value: item.id,
  disabled: false,
  meatData: item,
}));

export const domainList = [
  {
    value: 'gmail.com',
    label: 'gmail.com',
  },
  {
    value: 'yahoo.com',
    label: 'yahoo.com',
  },
  {
    value: 'msn.com',
    label: 'msn.com',
  },
];
