<template>
  <div class="re-add" @click="handleClick">
    <button class="add-btn">{{ btnName }}</button>
  </div>
</template>

<script>
export default {
  name: 'ReAdd',
  props: {
    btnName: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.re-add {
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 100;

  &__pc {
    display: none;
  }
}

.add-btn {
  @include font-style($c-white, 16px);
  cursor: pointer;
  border-radius: 5px;
  width: 120px;
  height: 55px;
  @include flex(center);

  background-color: $c-orange;
}
</style>
