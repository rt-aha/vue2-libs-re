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
      width: 200,

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

    },
    {
      prop: 'action',
      header: '操作',
      width: 158,
      fixed: 'right',
      render: (data, rowData, col) => ({
        render(h) {
          return h('div', [
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
              '刪除'),
          ]);
        },
      }),
    },

  ];
};

export { columnsConfig };
