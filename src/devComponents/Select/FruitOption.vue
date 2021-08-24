<template>
  <div class="comp-fruit-option">
    <div class="fruit-name-desc">
      <p class="fruit-name-desc__name">{{ $attrs.fruitData.name }}</p>
      <p class="fruit-name-desc__desc">{{ $attrs.fruitData.desc }}</p>
    </div>
    <p class="fruit-price">{{ $attrs.fruitData.price }}</p>
  </div>
</template>

<style lang="scss" scoped>
.comp-fruit-option {
  @include flex(space-between);
}

.fruit-name-desc {
  &__desc {
    @include font-style($c-text1, 12px);
    margin-top: 6px;
  }
}

.fruit-price {
  margin-top: 6px;
}
</style>
