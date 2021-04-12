<template>
  <div class="re-back-top">
    <div class="go-top-box">
        <div class="go-top-box__arrow"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ReBackTop',
};
</script>

<style lang="scss">
.re-back-top {
  @include circle(30px);
  border: 1px solid $c-main;
  position: fixed;
  bottom: 30px;
  right: 30px;
}

.go-top-box {
  cursor: pointer;
  width: 50px;
  height: 100%;

  &__arrow {
    @include position(center);
    width: 30px;
    height: 30px;

    &::before,
    &::after {
      content: "";
      width: 9px;
      height: 1px;
      background-color: $c-main;
      display: inline-block;
      position: absolute;
      border-radius: 2px;
      transition: 0.4s;
    }

    &::before {
      left: 8px;
      top: 14px;
      transform: rotate(-55deg);
    }

    &::after {
      right: 8px;
      top: 14px;
      transform: rotate(55deg);
    }
  }

}

</style>
