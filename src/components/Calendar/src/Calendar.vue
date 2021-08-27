<template>
  <div class="re-calendar">
    <div class="calendar-content">
      <div class="calendar__header">
        <div class="calendar__header__prev">
          <div class="re-arrow-wrap">
            <div class="re-arrow" @click="handlePrevMonth">
              <img class="re-arrow__icon" src="@/assets/icon/arrow-left.svg" />
            </div>
            <div class="re-arrow" @click="handlePrevYear">
              <img class="re-arrow__icon" src="@/assets/icon/double-arrow-left.svg" />
            </div>
          </div>
        </div>
        <div class="calendar__header__title">
          <p class="calendar__info">
            <span class="calendar__info__year">{{ currDateConfig.y }} 年</span>
            <span class="calendar__info__month"> {{ currDateConfig.m + 1 }} 月</span>
          </p>
        </div>

        <div class="calendar__header__next">
          <div class="re-arrow-wrap">
            <div class="re-arrow">
              <img class="re-arrow__icon" src="@/assets/icon/double-arrow-right.svg" @click="handleNextYear" />
            </div>
            <div class="re-arrow">
              <img class="re-arrow__icon" src="@/assets/icon/arrow-right.svg" @click="handleNextMonth" />
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__body">
        <div class="calendar__body__weekday">
          <ul class="weekday__list">
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">S</span>
            </li>
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">M</span>
            </li>
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">T</span>
            </li>
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">W</span>
            </li>
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">T</span>
            </li>
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">F</span>
            </li>
            <li class="weekday__list__item">
              <span class="weekday__list__item__text">S</span>
            </li>
          </ul>
        </div>

        <div class="calendar__body__date">
          <ul class="date__list">
            <li class="date__list__item" v-for="date of dateList" :key="`${date.y}-${date.m}-${date.d}`">
              <span
                @click="handleActiveDate"
                class="date__list__item__text"
                :class="[
                  {
                    'date__list__item__text--active': matchDate(date),
                    'date__list__item__text--is-curr-month': date.isCurrMonth,
                  },
                ]"
                :data-date="`${date.y}-${date.m}-${date.d}`"
                >{{ date.d }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 月历 end -->
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'ReCalendar',
  props: {
    value: {
      type: [Date, String],
    },
  },
  data() {
    return {
      currDateConfig: {
        y: '',
        m: '',
        d: '',
        jsDate: '', // 當天 js 原生物件
        firstDayOfWeek: '', // 當月一號星期幾
      },
      // 每月天數
      monthDayCount: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthName: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      calendarTitle: {
        y: '2021',
        m: '2',
      },
      dateList: [],
      selectedDate: '',
    };
  },
  // 初始化月曆
  created() {
    this.setTimeInfo();
    this.initSelectedDate();
    this.renderDate();
  },
  methods: {
    matchDate(dateObj) {
      const date = `${dateObj.y}-${dateObj.m}-${dateObj.d}`;
      if (!date) return false;
      const currDate = dayjs(date).format('YYYY-MM-DD');
      const selectedDate = dayjs(this.selectedDate.date()).format('YYYY-MM-DD');
      return currDate === selectedDate;
    },
    // 更新日期
    update(timeInfo) {
      this.setTimeInfo(timeInfo);

      this.renderDate();
    },

    // 取得二月天數
    getFebDayCount() {
      const condition1 = this.currDateConfig.y % 4;
      const condition2 = this.currDateConfig.y % 100;
      const condition3 = this.currDateConfig.y % 400;
      return (!condition1 && condition2) || !condition3;
    },
    // 設定現在選到的日期
    initSelectedDate() {
      // if has default date

      if (this.defaultDate) {
        this.splitDate(this.defaultDate);
      } else {
        // init
        this.selectedDate = {
          y: this.currDateConfig.y,
          m: this.currDateConfig.m,
          d: new Date().getDate(),
          date() {
            return new Date(this.y, this.m, this.d);
          },
        };
      }
    },

    setTimeInfo(currDate = { y: '', m: '' }) {
      //
      // 當天資料
      const day = dayjs(this.value);

      const currYear = currDate.y !== '' ? currDate.y : day.$y;
      const currMonth = currDate.m !== '' ? currDate.m : day.$M;

      // 當月一號資料
      const currMonthFirstJsDate = new Date(currYear, currMonth, 1); // js 原生
      const currMonthDate1 = dayjs(currMonthFirstJsDate); // dayjs 物件

      this.currDateConfig = {
        y: currYear, // 當天西元年
        m: currMonth, // 當天月份
        d: currDate.d, // 當天日期
        jsDate: day.$d, // 當天 js 原生物件
        fd: '',
        firstDayOfWeek: currMonthDate1.$W, // 當月一號星期幾，星期日為 0
      };

      //

      this.monthDayCount[1] = this.getFebDayCount() ? 29 : 28;
    },

    removeAllDom(dom) {
      while (dom.hasChildNodes()) {
        dom.removeChild(dom.firstChild);
      }
    },

    renderDate(month = this.currDateConfig.m) {
      this.dateList = [];

      // 填補上個月
      const lastMonth = month === 0 ? 11 : month - 1;
      const prevMonthDayCount = this.monthDayCount[lastMonth];
      const { y, firstDayOfWeek } = this.currDateConfig;
      const prevMonthDayStart = prevMonthDayCount - firstDayOfWeek;

      for (let i = prevMonthDayStart; i < prevMonthDayCount; i += 1) {
        this.dateList.push({
          y: lastMonth === 0 ? y - 1 : y,
          m: lastMonth + 1,
          d: i + 1,
          isCurrMonth: false,
        });
      }

      // 寫入當月份日期
      const currMonthDayCount = this.monthDayCount[month];
      for (let i = 1; i <= currMonthDayCount; i += 1) {
        this.dateList.push({
          y,
          m: month + 1,
          d: i,
          isCurrMonth: true,
        });
      }

      const nextMonthDayCount = 7 - (this.dateList.length % 7);
      // 填補下個月
      for (let i = 0; i < nextMonthDayCount; i += 1) {
        this.dateList.push({
          y: month === 11 ? y + 1 : y,
          m: month === 11 ? 1 : month + 2,
          d: i + 1,
          isCurrMonth: false,
        });
      }
    },
    splitDate(date) {
      const ymd = dayjs(date).format('YYYY-MM-DD').split('-');

      this.selectedDate = {
        y: Number(ymd[0]),
        m: Number(ymd[1]),
        d: Number(ymd[2]),
        date() {
          return new Date(this.y, this.m - 1, this.d);
        },
      };
    },

    // 點擊日期事件
    handleActiveDate(e) {
      e.stopPropagation();

      this.splitDate(e.target.getAttribute('data-date'));
      this.$emit('input', this.selectedDate.date());
    },

    // 點擊上一個月時
    handlePrevMonth() {
      let preYear = this.currDateConfig.y;
      let preMonth = this.currDateConfig.m;

      if (preMonth === 0) {
        preMonth = 11;
        preYear -= 1;
      } else {
        preMonth -= 1;
      }

      this.update({ y: preYear, m: preMonth });
    },
    // 點擊下一個月時
    handleNextMonth() {
      let nextYear = this.currDateConfig.y;
      let nextMonth = this.currDateConfig.m;

      if (nextMonth === 11) {
        nextMonth = 0;
        nextYear += 1;
      } else {
        nextMonth += 1;
      }

      this.update({ y: nextYear, m: nextMonth });
    },
    // 點擊上一年時
    handlePrevYear() {
      const prevYear = this.currDateConfig.y - 1;
      this.update({ y: prevYear, m: '' });
    },
    // 點擊下一年時
    handleNextYear() {
      const nextYear = this.currDateConfig.y + 1;
      this.update({ y: nextYear, m: '' });
    },
  },
};
</script>

<style lang="scss" scoped>
.re-calendar {
  @include box-padding(5px);
  width: 100%;
}

.calendar-content {
  width: 100%;
}

.calendar {
  &__header {
    @include flex(flex-start, space-between);
    position: relative;
    width: 100%;
    margin-top: 10px;

    &__prev {
      flex: none;
      cursor: pointer;
    }

    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      color: #4b4b4b;
      font-size: 14px;
    }

    &__next {
      flex: none;
      cursor: pointer;
    }
  }

  &__info {
    &__month {
      cursor: pointer;
    }

    &__year {
      cursor: pointer;
    }
  }

  /* &__select {
    &__icon-box {
    }
  } */

  &__body {
    &__weekday {
      margin-top: 18px;
    }
  }
}

.weekday {
  &__list {
    @include box-padding(10px 0);
    width: 100%;
    border-bottom: 1px solid $c-lightgrey;

    &__item {
      display: inline-block;
      vertical-align: middle;
      width: 14.28%;
      font-size: 0;
      text-align: center;

      &__text {
        color: #b9b9b9;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}

.date {
  width: 100%;

  &__list {
    width: 100%;

    &__item {
      display: inline-block;
      width: 14.28%;
      margin-top: 10px;
      vertical-align: middle;
      font-size: 0;
      text-align: center;

      &__text {
        display: inline-block;
        width: 26px;
        height: 26px;
        color: $c-calendar-not-curr-month;
        border-radius: 13px;
        font-size: 12px;
        font-weight: 500;
        line-height: 26px;
        cursor: pointer;

        &:hover {
          color: $c-main;
        }

        &--is-curr-month {
          color: $c-text1;
        }

        &--active {
          color: $c-white;
          background-color: $c-main;

          &:hover {
            color: $c-white;
          }
        }
      }
    }
  }
}

.year-month-selector {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  &--active {
    display: inline-block;
  }

  &__year {
    display: none;
    width: 186px;
    padding: 8px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    &--active {
      display: inline-block;
    }
  }

  &__month {
    display: none;
    width: 132px;
    padding: 8px 10px;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    &--active {
      display: inline-block;
    }
  }
}

.month {
  &__list {
    margin: 0;
    box-sizing: border-box;
    text-align: center;

    &__item {
      display: inline-block;
      vertical-align: middle;
      width: 33.3333333%;
      box-sizing: border-box;
      padding: 12px 0;
      color: #4b4b4b;
      font-size: 12px;
      cursor: pointer;
    }
  }
}

.year {
  &__list {
    margin: 0;
    box-sizing: border-box;
    text-align: center;

    &__item {
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      width: 25%;
      padding: 12px 0;
      color: #4b4b4b;
      font-size: 12px;
      cursor: pointer;
    }
  }
}

.re-arrow-wrap {
  @include flex();
}

.re-arrow {
  width: 20px;
  height: 20px;
  transition: 0.3s;
  transform: rotate(0deg);

  &__icon {
    @include position(center);
    display: inline-block;
    width: 15px;
  }
}
</style>
