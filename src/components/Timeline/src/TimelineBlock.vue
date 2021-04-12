<template>
  <div class="time-block" ref="timeBlock">
    <div class="time-block__title">
      <div class="time-block__title__dot"></div>
      <div class="time-block__title__text">{{data.title}}</div>
    </div>
    <div
      class="time-block__desc"
      ref="descBlock"
      :style="{
        height: descHeight,
      }"
    >
      <div class="time-block__desc__line"></div>

      <div class="time-block__desc__text">
        <template v-if="data.render">
          <component :is="data.render()" v-bind="$attrs" v-on="$listeners"/>
        </template>
        <template v-else> {{data.desc}} </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReTimelineBlock',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      descHeight: 'auto',
    };
  },
  methods: {
    calcWrapperHeight() {
      const h = this.$refs.timeBlock.clientHeight;
      const dh = this.$refs.descBlock.clientHeight;
      this.descHeight = `${dh}px`;
    },
  },
  mounted() {
    this.calcWrapperHeight();

    // setTimeout(() => this.calcWrapperHeight(), 1000);
  },
};
</script>

<style lang="scss" scoped>
.time-block {
  & + & {
    margin-top: 5px;
  }

  &__title {
    @include flex();

    &__dot {
      width: 10px;
      height: 10px;
      background-color: #ccc;
      border-radius: 5px;
      margin-right: 10px;
    }

    &__text {
      @include font-style($c-assist, 14px);
    }
  }

  height: 100%;
  &__desc {
    height: 100%;
    margin-top: 5px;

    &__line {
      /* width: 1px;
      height: 100%;
      background-color: #ccc; */
    }

    &__text {
      margin-left: 20px;
      @include font-style(rgba($c-assist, 0.8), 12px);
      position: relative;
      height: 100%;

      &::before {
        content: "";
        width: 1px;
        height: 100%;
        display: inline-block;
        background-color: #ccc;
        @include position(tl, 0, -16px);
      }
    }
  }
}
</style>
