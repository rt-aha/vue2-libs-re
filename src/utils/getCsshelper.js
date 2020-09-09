import { checkStrategyExist } from '@/utils/usefulHelper';

const cssStrategy = (() => {
  const matchValue = {
    bgColor(data) {
      console.log(data.row);
      switch (data.row.bgColor) {
        case 'yellow':
          return 'bg-yellow';
        case 'green':
          return 'bg-green';
        case 'blue':
          return 'bg-blue';
        default:
          return '';
      }
    },
    multiRow() {
      return 'white-space';
    },
  };

  return matchValue;
})();

const cssClass = data => convertStrategyName => {
  // 檢查是否有這個策略
  const isExist = checkStrategyExist(cssStrategy, convertStrategyName);
  if (!isExist) {
    return;
  }

  return cssStrategy[convertStrategyName](data);
};

export { cssClass };
