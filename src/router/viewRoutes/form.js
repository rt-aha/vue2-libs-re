import NoLayout from '@/layout/NoLayout.vue';

export default [
  {
    path: '/form',
    name: 'form',
    component: NoLayout,
    children: [
      {
        path: 'input',
        name: 'form-input',
        component: () => import(/* webpackChunkName: "form-input" */ '@/views/form/Input.vue'),
        meta: {
          title: '輸入框 ReInput',
          authGroup: 'form',
          authItem: 'form-input',
        },
      },
      {
        path: 'input-number',
        name: 'form-input-number',
        component: () => import(/* webpackChunkName: "form-input-number" */ '@/views/form/InputNumber.vue'),
        meta: {
          title: '數字輸入框 ReInputNumber',
          authGroup: 'form',
          authItem: 'form-input-number',
        },
      },
      {
        path: 'input-list',
        name: 'form-input-list',
        component: () => import(/* webpackChunkName: "form-input-list" */ '@/views/form/InputList.vue'),
        meta: {
          title: '多輸入框 ReInputList',
          authGroup: 'form',
          authItem: 'form-input-list',
        },
      },
      {
        path: 'switch',
        name: 'form-switch',
        component: () => import(/* webpackChunkName: "form-switch" */ '@/views/form/Switch.vue'),
        meta: {
          title: '開關 ReSwitch',
          authGroup: 'form',
          authItem: 'form-switch',
        },
      },
      {
        path: 'select',
        name: 'form-select',
        component: () => import(/* webpackChunkName: "form-select" */ '@/views/form/Select.vue'),
        meta: {
          title: '下拉選單 ReSelect',
          authGroup: 'form',
          authItem: 'form-select',
        },
      },
      {
        path: 'checkbox',
        name: 'form-checkbox',
        component: () => import(/* webpackChunkName: "form-checkbox" */ '@/views/form/Checkbox.vue'),
        meta: {
          title: '多選框 ReCheckbox',
          authGroup: 'form',
          authItem: 'form-checkbox',
        },
      },
      {
        path: 'radio',
        name: 'form-radio',
        component: () => import(/* webpackChunkName: "form-radio" */ '@/views/form/Radio.vue'),
        meta: {
          title: '單選框 ReRadio',
          authGroup: 'form',
          authItem: 'form-radio',
        },
      },
      {
        path: 'upload',
        name: 'form-upload',
        component: () => import(/* webpackChunkName: "form-upload" */ '@/views/form/Upload.vue'),
        meta: {
          title: '上傳 ReUpload',
          authGroup: 'form',
          authItem: 'form-upload',
        },
      },
      {
        path: 'date-picker',
        name: 'form-date-picker',
        component: () => import(/* webpackChunkName: "form-date-picker" */ '@/views/form/DatePicker.vue'),
        meta: {
          title: '日期選擇器 ReDatePicker',
          authGroup: 'form',
          authItem: 'form-date-picker',
        },
      },
      {
        path: 'time-picker',
        name: 'form-time-picker',
        component: () => import(/* webpackChunkName: "form-time-picker" */ '@/views/form/TimePicker.vue'),
        meta: {
          title: '時間選擇器 ReTimePicker',
          authGroup: 'form',
          authItem: 'form-time-picker',
        },
      },
      {
        path: 'dat-time-picker',
        name: 'form-date-time-picker',
        component: () => import(/* webpackChunkName: "form-date-time-picker" */ '@/views/form/DateTimePicker.vue'),
        meta: {
          title: '日期時間選擇器 ReDateTimePicker',
          authGroup: 'form',
          authItem: 'form-date-time-picker',
        },
      },
    ],
    meta: {
      title: '表單 Form',
      authGroup: 'form',
    },
    order: 2,
  },
];
