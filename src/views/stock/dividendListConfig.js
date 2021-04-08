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

    },
    {
      header: '成交價',
      prop: 'dealPrice',

    },
    {
      header: 'EPS',
      prop: 'eps',

    },
    {
      header: '現金股利',
      prop: 'cashDividend',

    },
    {
      header: '股票股利',
      prop: 'stockDividend',

    },

  ];
};

export { columnsConfig };