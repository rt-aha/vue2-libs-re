<template>
  <div class="re-calendar">
    <div class="calendar-content">
      <div class="calendar__header">
        <div class="calendar__header__prev" @click="handlePrevMonth">
          <div class="re-arrow">
            <div class="re-arrow__icon"></div>
          </div>
        </div>
        <div class="calendar__header__title">
          <p class="calendar__info">
            <span class="calendar__info__year">{{ currDateConfig.y }}年 </span>
            <span class="calendar__info__month"
              >{{ currDateConfig.m + 1 }}月
            </span>
          </p>
        </div>

        <div class="calendar__header__next" @click="handleNextMonth">
          <div class="re-arrow">
            <div class="re-arrow__icon"></div>
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
            <li
              class="date__list__item"
              v-for="(date, index) of dateList"
              :key="date + index"
            >
              <span
                @click="handleActiveDate"
                class="date__list__item__text"
                :class="matchDate(date) && 'date__list__item__text--active'"
                :data-date="date ? `${currDateConfig.y}-${
                  currDateConfig.m + 1
                }-${date}` : ''"
                >{{ date }}</span
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
        fd: '', // 每月第一天
        d: '13',
        wd: '',
      },
      // 每月天數
      monthDayCount: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthName: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
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
    matchDate(date) {
      if (!date) return false;
      const currDate = dayjs(`${this.currDateConfig.y}-${
        this.currDateConfig.m + 1
      }-${date}`).format('YYYY-MM-DD');
      const selectedDate = dayjs(this.selectedDate.date()).format('YYYY-MM-DD');

      // console.log('date', date);
      // console.log('===', currDate, selectedDate);

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

      this.$emit('input', this.selectedDate.date());
    },

    setTimeInfo(currDate = { y: '', m: '' }) {
      const day = dayjs(this.value);
      const date = new Date(day.$y, day.$M, 1);

      this.currDateConfig = {
        y: currDate.y || day.$y,
        m: currDate.m || day.$M,
        fd: date.getDate(), // first date
        wd: day.$D,
      };

      this.monthDayCount[1] = this.getFebDayCount() ? 29 : 28;
    },

    removeAllDom(dom) {
      while (dom.hasChildNodes()) {
        dom.removeChild(dom.firstChild);
      }
    },

    renderDate(month = this.currDateConfig.m) {
      this.dateList = [];

      // 填補非星期日開始的月份空格
      const lastMonthDateCount = this.currDateConfig.wd;
      for (let i = 0; i < lastMonthDateCount; i += 1) {
        this.dateList.push('');
      }

      // 寫入當月份日期
      const currMonthDayCount = this.monthDayCount[month];
      for (let i = 1; i <= currMonthDayCount; i += 1) {
        this.dateList.push(i);
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

      console.log('nextMonth', nextMonth);

      if (nextMonth === 11) {
        nextMonth = 0;
        nextYear += 1;
      } else {
        nextMonth += 1;
      }

      console.log('{ y: nextYear, m: nextMonth }', { y: nextYear, m: nextMonth });
      this.update({ y: nextYear, m: nextMonth });
    },
  },
};
</script>

<style lang="scss" scoped>
.re-calendar {
  width: 100%;
  @include box-padding(5px);
}

.calendar-content {
  width: 100%;
}

.calendar {
  &__header {
    width: 100%;
    @include flex(flex-start, space-between);
    position: relative;

    &__prev {
      flex: none;
      width: 30px;
      height: 30px;
      transform: rotate(270deg);
      cursor: pointer;
    }

    &__title {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #4b4b4b;
    }

    &__next {
      flex: none;
      width: 30px;
      height: 30px;
      transform: rotate(90deg);
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

  &__select {
    &__icon-box {
    }
  }

  &__body {
    &__weekday {
      margin-top: 18px;
    }
  }
}

.weekday {
  &__list {
    width: 100%;

    &__item {
      display: inline-block;
      vertical-align: middle;
      width: 14.28%;
      text-align: center;
      font-size: 0;

      &__text {
        font-size: 12px;
        font-weight: 500;
        color: #b9b9b9;
      }
    }
  }
}

.date {
  width: 100%;
  &__list {
    width: 100%;

    &__item {
      margin-top: 10px;
      display: inline-block;
      vertical-align: middle;
      width: 14.28%;
      text-align: center;
      font-size: 0;

      &__text {
        display: inline-block;
        font-size: 12px;
        font-weight: 500;
        color: #6c6c6c;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        line-height: 26px;
        cursor: pointer;

        &:hover {
          color: $c-main;
        }

        &--active {
          background-color: $c-main;
          color: $c-white;

          &:hover {
            color: $c-white;
          }
        }
      }
    }
  }
}

.year-month-selector {
  // width: 100%;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: none;

  &--active {
    display: inline-block;
  }

  &__year {
    width: 186px;
    display: none;

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 10px;

    &--active {
      display: inline-block;
    }
  }

  &__month {
    width: 132px;
    display: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 10px;

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
      font-size: 12px;
      color: #4b4b4b;
      box-sizing: border-box;
      padding: 12px 0;
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
      width: 25%;
      font-size: 12px;
      color: #4b4b4b;
      box-sizing: border-box;
      padding: 12px 0;
      cursor: pointer;
    }
  }
}

.re-arrow {
  /* position: absolute; */
  /* bottom: 0;
  right: 0; */
  width: 30px;
  height: 30px;
  transition: 0.3s;
  transform: rotate(0deg);

  &__icon {
    @include position(center);

    &::before,
    &::after {
      content: "";
      width: 6px;
      height: 2px;
      border-radius: 1px;
      background-color: $c-assist;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      transform: rotate(45deg) translateY(-50%);
      left: -2px;
    }

    &::after {
      transform: rotate(-45deg) translateY(-50%);
      right: -2px;
    }
  }

  &--active {
    transform: rotate(180deg);
  }
}
</style>
