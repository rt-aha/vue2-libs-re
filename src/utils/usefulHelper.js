import dayjs from 'dayjs';

/**
 * 檢查物件中是否有該key
 * @param strategy 物件
 * @param strategyName 驗證的key
 */
const checkStrategyExist = (strategy, strategyName) => {
  const hasStrategy = Object.keys(strategy).includes(strategyName);
  if (!hasStrategy) {
    return false;
  }
  return true;
};

const setTime = (timeInfo, dateFormat = 'YYYY-MM-DD') => {
  const timeInfoList = timeInfo.split('-');
  const type = timeInfoList[0];
  const offsetType = timeInfoList[1];
  const offsetValue = timeInfoList[2];

  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (type === 'day') {
    if (offsetType === '0' && offsetValue === '0') {
      return dayjs(today).format(dateFormat);
    }

    if (offsetType === 'add') {
      return dayjs(today)
        .add(Number(offsetValue), 'day')
        .format(dateFormat);
    }

    if (offsetType === 'subtract') {
      return dayjs(today)
        .subtract(Number(offsetValue), 'day')
        .format(dateFormat);
    }
  }

  if (type === 'month') {
    if (offsetType === 'subtract') {
      return dayjs(today)
        .subtract(Number(offsetValue), 'month')
        .format(dateFormat);
    }
  }
};

export { checkStrategyExist, setTime };
