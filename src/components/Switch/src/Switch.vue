<template>
  <div class="re-switch" :class="value && 're-switch--active'">
    <input class="re-switch__input" type="checkbox" ref="input" @change="handleChange"  />
    <!-- 若在modal之類的元素上，才不會影響到後面的元素 -->
    <div class="re-switch-box" @click="handleClick" >
      <span class="on-label" v-show="value">{{ switchLabel.on }}</span>
      <span class="off-label" v-show="!value">{{ switchLabel.off }}</span>
      <div class="re-switch-box__bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReSwitch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    switchLabel: {
      type: Object,
      default: () => ({
        on: 'on',
        off: 'off',
      }),
    },
  },
  mounted() {
    this.setSwitchValue();
  },
  methods: {
    setSwitchValue() {
      const input = this.getInput();
      input.checked = this.value;
    },
    getInput() {
      const nativeInput = this.$refs.input;
      if (!nativeInput) {
        return null;
      }

      return nativeInput;
    },
    handleClick() {
      this.handleChange();
    },
    handleChange() {
      const changedValue = !this.value;
      this.$refs.input.checked = changedValue;
      this.$emit('input', changedValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/components/switch.scss";

.re-switch {
  width: 50px;
  height: 24px;
  border-radius: 12px;
  background-color: $c-switch--off;
  @include box-padding(2px);
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  &--active {
    background-color: $c-switch--active;

    .re-switch-box {
      &__bar {
        transform: translateX(26px);
      }
    }
  }

  &__input {
    @include position(center);
    z-index: -1;
  }
}

.re-switch-box {
  width: 100%;
  height: 20px;
  position: relative;

  &__bar {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: $c-white;
    transition: 0.3s;
    position: relative;
    z-index: 10;
  }
}

.on-label {
  width: 24px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%) scale(0.8);
  @include font-style($c-white, 12px);
  z-index: 5;
}

.off-label {
  width: 24px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%) scale(0.8);
  @include font-style($c-white, 12px);
  z-index: 5;
}
</style>
