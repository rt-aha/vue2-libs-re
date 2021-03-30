import CusSelectOption from '@/components/Select/src/CusSelectOption.vue';

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
    render: CusSelectOption,
    label: 'Custom',
    value: 789,
  },
];

export const radioOptions = [
  {
    label: '單選1',
    value: 1,
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
    value: 4,
    disabled: true,
  },
  {
    label: '單選5',
    value: 5,
  },
  // {
  //   render: CusSelectOption,
  //   label: 'Custom',
  //   value: 789,
  // },
];

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
  // {
  //   render: CusSelectOption,
  //   label: 'Custom',
  //   value: 789,
  // },
];

export const treeList = [
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
