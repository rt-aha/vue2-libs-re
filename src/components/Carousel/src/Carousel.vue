<template>
  <div class="re-carousel">
    <div
      class="carouesel-wrapper"
      @mouseenter="handleMouseOver"
      @mouseleave="handleMouseLeave"
    >
      <div
        class="carousel-box"
        :class="{
          'carousel-box--with-transition': withTransition,
        }"
        ref="carouselBox"
        v-for="img of activedCarousel"
        :key="img.id"
        :style="{
          transform: `translateX(-${transformOffset}px)`,
        }"
      >
        <div
          :style="{
            'background-image': `url(${img.src})`,
          }"
          class="carousel-box__img"
        ></div>
      </div>

      <div class="direction-box prev-box" @click="handlePrev">
        <div class="prev-arrow"></div>
      </div>
      <div class="direction-box next-box" @click="handleNext">
        <div class="next-arrow"></div>
      </div>
    </div>

    <re-row justifyContent="center">
      <ul class="curr-order">
        <li
          class="curr-order__dot"
          :class="{
            'curr-order__dot--active': num - 1 === currIndex,
          }"
          v-for="num of 5"
          :key="num"
          @click="handleCurrDot(num)"
        >
          <span class="curr-order__dot__text">
            <!-- {{ num - 1 }} -->
          </span>
        </li>
      </ul>
    </re-row>
  </div>
</template>

<script>

export default {
  name: 'ReCarousel',
  props: {
    carouselList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activedCarousel: [],
      transformOffset: 700,
      currIndex: 0,
      timer: null,
      withTransition: true,
      disabled: false,
      transitionTimer: null,
    };
  },
  methods: {
    handleMouseOver() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    handleMouseLeave() {
      this.autoPlay();
    },
    autoPlay() {
      this.timer = setInterval(() => {
        this.handleNext();
      }, 2000);
    },
    handleCurrDot(num) {
      this.currIndex = num - 1;
      this.setTransformOffset();
    },
    handlePrev() {
      if (this.disabled) return;
      if (this.currIndex === 0) {
        this.currIndex = this.carouselList.length - 1;
      } else {
        this.currIndex -= 1;
      }
      this.setTransformOffset();
    },
    handleNext() {
      if (this.disabled) return;
      if (this.currIndex === this.carouselList.length - 1) {
        this.currIndex = 0;
      } else {
        this.currIndex += 1;
      }

      this.setTransformOffset();
    },
    changeActivedCarousel() {
      if (this.currIndex === 0) {
        this.activedCarousel = [
          this.carouselList[this.carouselList.length - 1],
          this.carouselList[this.currIndex],
          this.carouselList[this.currIndex + 1],
        ];

        return;
      }

      if (this.currIndex === this.carouselList.length - 1) {
        this.activedCarousel = [
          this.carouselList[this.currIndex - 1],
          this.carouselList[this.currIndex],
          this.carouselList[0],
        ];

        return;
      }

      this.activedCarousel = [
        this.carouselList[this.currIndex - 1],
        this.carouselList[this.currIndex],
        this.carouselList[this.currIndex + 1],
      ];
    },
    setTransformOffset() {
      this.withTransition = true;
      this.transformOffset = 1400;

      this.transitionTimer = setTimeout(() => {
        this.withTransition = false;
        this.changeActivedCarousel();
        this.transformOffset = 700;
      }, 400);
    },
  },
  created() {
    this.changeActivedCarousel();
  },
  mounted() {
    this.autoPlay();
  },
};
</script>

<style lang="scss">
.carouesel-wrapper {
  /* outline: 1px solid #f00; */
  margin: 30px auto;
  width: 700px;
  height: 420px;
  overflow: hidden;
  /* overflow: auto; */
  white-space: nowrap;
  /* transition: 0.5s; */
  position: relative;
}

.carousel-box {
  /* white-space: ; */
  display: inline-block;
  /* width: 100%; */
  width: 700px;
  height: 100%;
  position: relative;

  &--with-transition {
    transition: 0.4s;
  }

  &__img {
    display: inline-block;
    vertical-align: bottom;
    /*width: 100%; */

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
}

.curr-order {
  margin: 0 15px;

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 8px;
    background-color: $c-lightgrey;
    display: inline-block;
    position: relative;
    cursor: pointer;

    & + & {
      margin-left: 10px;
    }

    &--active {
      background-color: $c-main;
    }

    &__text {
      @include position(center);
      @include font-style($c-assist, 14px);
    }
  }
}

.direction-box {
  cursor: pointer;
  width: 50px;
  height: 100%;

  .prev-arrow,
  .next-arrow {
    @include position(center);
    width: 40px;
    height: 40px;

    &::before,
    &::after {
      content: "";
      width: 12px;
      height: 2px;
      background-color: $c-lightgrey;
      display: inline-block;
      position: absolute;
      border-radius: 1px;
      transition: 0.4s;
    }
  }
  &:hover {
    .prev-arrow,
    .next-arrow {
      &::before,
      &::after {
        background-color: $c-white;
      }
    }
  }
}

.prev-box {
  @include position(tl, 0, 0);
  background: linear-gradient(90deg, rgba($c-assist, 0.3) 0%, transparent 100%);

  .prev-arrow {
    &::before {
      left: 14px;
      top: 15px;
      transform: rotate(-45deg);
    }

    &::after {
      left: 14px;
      bottom: 15px;
      transform: rotate(45deg);
    }
  }
}

.next-box {
  @include position(tr, 0, 0);
  background: linear-gradient(
    -90deg,
    rgba($c-assist, 0.3) 0%,
    transparent 100%
  );

  .next-arrow {
    &::before {
      right: 14px;
      top: 15px;
      transform: rotate(45deg);
    }

    &::after {
      right: 14px;
      bottom: 15px;
      transform: rotate(-45deg);
    }
  }
}
</style>
