import { checkStrategyExist } from '@/utils/usefulHelper';
import dayjs from 'dayjs';

// 轉換代號
const codeConvertHelper = (convertStrategyName, data) => {
  const codeStrategy = {
    // example
    nationality(value) {
      const convertStrategy = {
        America: '美國',
        Australian: '澳洲',
      };

      const isExist = checkStrategyExist(convertStrategy, value);
      if (!isExist) return console.log('無匹配轉換function');

      return convertStrategy[value];
    },

    belongGroup(value) {
      const convertStrategy = {
        image: '輪播/圖片',
        news: '消息',
        user: '使用者',
        authGroup: '權限群組',
        auth: '權限',
      };

      const isExist = checkStrategyExist(convertStrategy, value);
      if (!isExist) return console.log('無匹配轉換function');

      return convertStrategy[value];
    },
  };

  // 檢查是否有這個策略
  const isExist = checkStrategyExist(codeStrategy, convertStrategyName);
  if (!isExist) {
    return console.log('無此策略');
  }

  // 傳進當前值，和當前值的row資料
  // 策略模式
  return codeStrategy[convertStrategyName](data);
};

// 轉換意思
function formatValueHelper(convertStrategyName, value, column = {}) {
  const formatStrategy = {
    weekDayCode(value) {
      return dayjs(value).day();
    },
    weekDay(value) {
      const weekDayCode = dayjs(value).day();
      const weekDayCodeStrategy = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
      };
      return weekDayCodeStrategy[weekDayCode];
    },

    // 00:00:00 --> -
    timeZero(value) {
      if (value !== '00:00:00') {
        return value;
      } else {
        return '-';
      }
    },

    timeYMDHms(value) {
      if (value === null) {
        return '';
      }

      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },

    timeYMD(value) {
      if (value === null) {
        return '';
      }

      return dayjs(value).format('YYYY-MM-DD');
    },

    yesNoCh(value) {
      switch (value) {
        case true:
        case 1:
        case 'yes':
          return '是';
        case false:
        case 0:
        case 'no':
          return '否';
        default:
          return '未知';
      }
    },
    yesNoEn(value) {
      switch (value) {
        case true:
        case 1:
        case '是':
          return 'yes';
        case false:
        case 0:
        case '否':
          return 'no';
        default:
          return '未知';
      }
    },
    trueFalse(value) {
      switch (value) {
        case 1:
        case '是':
        case 'yes':
          return true;
        case 0:
        case '否':
        case 'no':
          return false;
        default:
          return '未知';
      }
    },
  };

  return formatStrategy[convertStrategyName](value, column);
}

export { codeConvertHelper, formatValueHelper };
