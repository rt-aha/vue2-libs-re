<template>
  <div class="re-input-timer">

    <re-input v-model="innerValue" :style="{width: '200px'}">
      <template #append>
        <div class="send-btn-box" :style="{width: `${sendBtnWidth}px`}">
          <re-button @click="handleClick" :disabled="disabled" :isLoading="isLoading">{{btnText}}</re-button>
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
      this.disabled = true;
      this.isLoading = true;

      try {
        await this.api();
        this.init();
        this.handleTimer();
      } catch (e) {
        console.log('e...', e);
      }
      this.isLoading = false;
    },
    handleTimer() {
      this.timer = setTimeout(() => {
        this.totalTime += -1;
        this.btnText = `${this.totalTime}s`;

        if (this.totalTime === 0) {
          this.disabled = false;
          this.init();
          this.clearTimer();
        } else {
          this.handleTimer();
        }
      }, 1000);
    },
    init() {
      this.totalTime = Number(this.timeLength) + 1;
      this.btnText = this.btnName;
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
  },
  created() {
    this.init();

    // sendMailAPI();
  },
};
</script>

<style lang="scss">
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
