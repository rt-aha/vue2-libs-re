<template>
  <div class="comp-phone-option">
    <p class="phone-name">{{ $attrs.phoneData.name }}</p>
    <p class="phone-desc">{{ $attrs.phoneData.desc }}</p>
  </div>
</template>

<style lang="scss" scoped>
.comp-phone-option {
}

.phone-name {
  @include font-style($c-assist, 14px);
}

.phone-desc {
  @include font-style($c-assist, 12px);
  margin-top: 5px;
}
</style>
