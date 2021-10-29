<template>
  <div class="section-desc-list">
    <div class="section-desc-list__content">
      <ul class="desc-list">
        <li
          class="desc-list__item"
          :class="[{ 'desc-list__item--orange-dot': orangeDot }]"
          v-for="item of wording"
          :key="item.uuid"
        >
          <template v-if="item.render">
            <component :is="item.render()" />
          </template>
          <span v-else class="desc-list__item__text">
            {{ item.text }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// <section-desc-list :wording="wording" :orangeDot="true" />

export default {
  name: 'SectionDescList',
  props: {
    wording: {
      type: Array,
      default: () => [],
    },
    orangeDot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
// @import '~@/styles/components/sectionDescList.scss';

.desc-list {
  margin-top: 10px;

  &__item {
    @include flex();
    position: relative;
    @include box-padding(0 0 0 20px);

    & + & {
      margin-top: 10px;
    }

    &::before {
      content: '';
      background-color: $c-text1;
      position: absolute;
      left: 8px;
      top: 11px;
      @include circle(4px);
      display: inline-block;
    }

    &--orange-dot {
      &::before {
        background-color: $c-orange;
      }
    }

    &__text {
      @include font-style($c-text1, 18px, 400);
      line-height: 24px;
    }
  }
}
</style>
