<template>
  <div class="re-message" :style="positionHeightOffset">
    message
  </div>
</template>

<script>
export default {
  name: 'ReMessage',

  data() {
    return {
      verticalOffset: 20,
      onClose: null,
      id: 0,
    };
  },
  computed: {
    positionHeightOffset() {
      return `top: ${this.verticalOffset}px`;
    },
  },
  methods: {
    close() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
      this.onClose(this.id);
    },
    startTimer() {
      setTimeout(() => {
        this.close();
      }, 2000);
    },
  },
  mounted() {
    this.startTimer();
  },
};
</script>

<style lang="scss">
.re-message {
  @include box-padding(10px);
  position: fixed;
  top: 20px;
  left: 50%;
  background-color: #ccc;
  transform: translateX(-50%);
}
</style>
