import { isArray } from 'lodash';

const initColConfig = {
  prop: 'propName',
  label: '欄位名稱',
  width: 100,
  minWidth: 100,
  sortable: false,
  fixed: false,
  align: 'center',
  headerAlign: 'center',
  show: 1,
};

const tableCol = (colConfig, cusCol = []) => {
  const cusColArr = isArray(cusCol) ? cusCol : [cusCol];

  return {
    ...initColConfig, // 先預設屬性避免報錯
    ...colConfig, // 再用寫進來的參數複寫
    cusCol: cusColArr,
  };
};

const colText = colConfig => {
  return {
    ...initColConfig,
    ...colConfig,
  };
};

export { tableCol, colText };
