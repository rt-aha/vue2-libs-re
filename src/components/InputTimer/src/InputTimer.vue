<template>
  <div class="re-input-timer">
    <re-input v-model="innerValue" :style="{ width: '200px' }">
      <template #append>
        <div class="send-btn-box" :style="{ width: `${sendBtnWidth}px` }">
          <re-button @click="handleClick" :disabled="disabled" :isLoading="isLoading">{{ btnText }}</re-button>
        </div>
      </template>
    </re-input>
  </div>
</template>

<script>
import { sendMailAPI } from '@/api/test';

export default {
  name: 'ReInputTimer',
  props: {
    value: {
      type: String,
      default: '',
    },
    btnName: {
      type: String,
      default: '發送',
    },
    sendBtnWidth: {
      type: [String, Number],
      default: '80',
    },
    timeLength: {
      type: [String, Number],
      default: 30,
    },
    api: {
      type: Function,
      default: () => {},
    },
    timerKey: {
      type: String,
      default: 'timer',
    },
  },
  data() {
    return {
      innerValue: '',
      btnText: '',
      timer: null,
      disabled: false,
      totalTime: 60,
      isLoading: false,
    };
  },
  methods: {
    async handleClick() {
      this.setDisabled(true);
      this.isLoading = true;

      try {
        await this.api();
        this.startTimer();
      } catch (e) {
        console.log('e...', e);
      }
      this.isLoading = false;
    },
    handleTimer() {
      this.timer = setTimeout(() => {
        this.totalTime += -1;
        this.setBtnText('', `${this.totalTime}s`);

        if (this.totalTime === 0) {
          this.setDisabled(false);
          this.endTimer();
        } else {
          this.handleTimer();
        }
      }, 1000);
    },
    saveStartRecord() {
      localStorage.setItem(this.timerKey, Date.now());
    },
    removeStartRecord() {
      localStorage.removeItem(this.timerKey, Date.now());
    },
    continueTimer() {
      const lastRecord = localStorage.getItem(this.timerKey);
      const duration = Number(((Date.now() - Number(lastRecord)) / 1000).toFixed());
      if (lastRecord && duration <= 59) {
        const remainSeconds = 60 - duration;
        this.setTotalTime('', remainSeconds);
        this.setDisabled(true);
        this.handleTimer();
        return;
      }

      this.initTimer();
    },
    setTotalTime(type = 'init', value) {
      if (type === 'init') {
        this.totalTime = Number(this.timeLength) + 1;
        return;
      }
      this.totalTime = value;
    },
    setBtnText(type = 'init', value) {
      if (type === 'init') {
        this.btnText = this.btnName;
        return;
      }
      this.btnText = value;
    },
    setDisabled(value) {
      this.disabled = value;
    },
    initTimer() {
      this.setDisabled(false);
      this.removeStartRecord();
      this.setBtnText();
    },
    startTimer() {
      this.setTotalTime();
      this.saveStartRecord();
      this.handleTimer();
    },
    endTimer() {
      clearTimeout(this.timer);
      this.timer = null;
      this.setTotalTime();
      this.removeStartRecord();
      this.setBtnText();
    },
  },
  mounted() {
    this.continueTimer();
  },
};
</script>

<style lang="scss" scoped>
.re-input-timer {
  @include flex();
}

.send-btn-box {
  @include flex(center);
  background-color: $c-main;
  height: 100%;
  color: $c-white;
}
</style>
