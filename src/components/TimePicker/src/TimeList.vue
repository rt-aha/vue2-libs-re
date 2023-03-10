<template>
  <div class="r-time-list">
    <div class="time-list">
      <div class="time-list__col time-list__hour" ref="tlh" @scroll="setPositionDebounce('tlh')">
        <span class="time-list__col__item time-list__hour__item" v-for="(h, index) of timeList.h" :key="h + index">
          {{ h }}
        </span>
      </div>
      <div class="time-list__col time-list__minute" ref="tlm" @scroll="setPositionDebounce('tlm')">
        <span class="time-list__col__item time-list__minute__item" v-for="(m, index) of timeList.m" :key="m + index">
          {{ m }}
        </span>
      </div>
      <div class="time-list__col time-list__second" ref="tls" @scroll="setPositionDebounce('tls')">
        <span class="time-list__col__item time-list__second__item" v-for="(s, index) of timeList.s" :key="s + index">
          {{ s }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import { h, m, s } from './timeListConfig';

export default {
  name: 'ReTimeList',
  props: {
    value: {
      type: Date,
      default: new Date(),
    },
  },
  data() {
    return {
      isInit: false,
      timeList: {
        h,
        m,
        s,
      },
      timeValue: {
        h: '00',
        m: '00',
        s: '00',
        time() {
          return `${this.h}:${this.m}:${this.s}`;
        },
      },
    };
  },
  methods: {
    validTimeFormat(time) {
      const timeRegExp = /^\d{2}:\d{2}:\d{2}$/;
      const isValidTimeFormat = timeRegExp.test(time);

      return isValidTimeFormat;
    },
    // 外層呼叫
    splitTime() {
      const t = dayjs(this.value).format('HH:mm:ss');

      const hms = t.split(':');
      this.timeValue = {
        h: hms[0],
        m: hms[1],
        s: hms[2],
        time() {
          return `${this.h}:${this.m}:${this.s}`;
        },
      };

      this.$nextTick(() => {
        this.setScrollBarPosition();
      });
    },
    setScrollBarPosition() {
      this.$refs.tlh.scrollTop = Number(this.timeValue.h) * 30;
      this.$refs.tlm.scrollTop = Number(this.timeValue.m) * 30;
      this.$refs.tls.scrollTop = Number(this.timeValue.s) * 30;
    },
    // eslint-disable-next-line
    setPositionDebounce: debounce(function (calcType) {
      this.calcHourScrollBarPosition(calcType);
    }, 100),
    calcHourScrollBarPosition(calcType) {
      const scrollBarPostion = this.$refs[calcType].scrollTop;

      if (scrollBarPostion / 30 !== 0) {
        const remainder = scrollBarPostion % 30;
        let offsetBase = Math.floor(scrollBarPostion / 30);
        if (remainder > 15) {
          offsetBase += 1;
        }

        const targetPostion = offsetBase * 30;
        this.$refs[calcType].scrollTop = targetPostion;

        this.calcTimeValue(calcType, targetPostion);
        return;
      }

      this.calcTimeValue(calcType, scrollBarPostion);
    },
    calcTimeValue(calcType, targetPosition) {
      const changeType = calcType.substr(2, 1);
      let updateTimeValue = targetPosition / 30;
      if (updateTimeValue < 10) {
        updateTimeValue = `0${String(updateTimeValue)}`;
      } else {
        updateTimeValue = String(updateTimeValue);
      }

      this.timeValue[changeType] = updateTimeValue;
      const fullTimeFormat = this.timeValue.time();

      const isValidTimeFormat = this.validTimeFormat(fullTimeFormat);

      const today = dayjs().format('YYYY-MM-DD');
      const ymd = today.split('-');
      const hms = fullTimeFormat.split(':');

      const time = new Date(ymd[0], ymd[1], ymd[2], hms[0], hms[1], hms[2]);

      if (isValidTimeFormat) {
        this.$emit('input', time);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$item-height: 30px;

.r-time-list {
  background-color: $c-white;
}

.time-list {
  display: inline-flex;
  position: relative;
  width: 100%;
  height: $item-height * 7;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: $item-height * 3;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: #ccc;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: $item-height * 4 - 1;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: #ccc;
    transform: translateX(-50%);
  }

  &__col {
    display: inline-block;
    vertical-align: top;
    flex: 1;
    height: 100%;
    font-size: 0;
    overflow-y: auto;

    &__item {
      @include font-style($c-assist, 14px);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: $item-height;
      text-align: center;
      box-sizing: border-box;
    }
  }

  &__minute {
    box-sizing: border-box;
    width: $item-height * 2;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
}
</style>
