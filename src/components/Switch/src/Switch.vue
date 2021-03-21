<template>
  <div class="re-switch" :class="value && 're-switch--active'">
    <div class="re-switch-box" @click="handleSwitch">
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

  methods: {
    handleSwitch() {
      this.$emit('input', !this.value);
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

  &--active {
    background-color: $c-switch--active;

    .re-switch-box {
      &__bar {
        transform: translateX(26px);
      }
    }
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
