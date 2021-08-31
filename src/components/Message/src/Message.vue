<template>
  <transition name="fade" @after-leave="handleAfterLeave">
    <div class="re-message" :style="positionHeightOffset" v-show="visible">message</div>
  </transition>
</template>

<script>
export default {
  name: 'ReMessage',

  data() {
    return {
      visible: true,
      verticalOffset: 16,
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
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
      this.onClose(this.id);
    },
    close() {
      this.visible = false;
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

<style lang="scss" scoped>
.re-message {
  @include box-padding(10px);
  position: fixed;
  top: 16px;
  left: 50%;
  background-color: #ccc;
  transform: translateX(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transform: translate(-50%, 16px);
  opacity: 1;
  transition: 1s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(-50%, -16px);
  opacity: 0;
}
</style>
