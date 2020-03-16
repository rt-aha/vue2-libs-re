import { checkStrategyExist } from '@/utils/usefulHelper';

const cssClass = (convertStrategyName, data) => {
  const cssStrategy = {
    statusColor(data) {
      switch (data.row.statusColorStyle) {
        case true:
          return 'c-green';
        case false:
          return 'c-red';
        default:
          return '';
      }
    },
  };

  // 檢查是否有這個策略
  const isExist = checkStrategyExist(cssStrategy, convertStrategyName);
  if (!isExist) return;

  // 傳進當前值，和當前值的row資料
  // 策略模式
  return cssStrategy[convertStrategyName](data);
};

export { cssClass };
