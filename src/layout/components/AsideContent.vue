<template>
  <div class="aside-content-layout-com">
    <VerticalContainer
      :topSlotFlexConfig="'flex: none; height: 60px'"
      :bottomSlotFlexConfig="'flex: none; height: 60px'"
    >
      <template #v-container-top>
        <div class="aside-top">
          top
        </div>
      </template>
      <template #v-container-center>
        <AsideMenu></AsideMenu>
      </template>
      <template #v-container-bottom>
        <div class="aside-bottom">
          bottom
        </div>
      </template>
    </VerticalContainer>
  </div>

</template>

<script>
import VerticalContainer from '@/components/global/VerticalContainer';

import AsideMenu from '@/layout/components/AsideMenu';

export default {
  name: 'AsideContent',
  components: {
    VerticalContainer,
    AsideMenu
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.aside-content-layout-com {
  height: 100%;
}

.aside-top,
.aside-bottom {
  box-sizing: border-box;
  border: 1px solid $c-main1;
  height: 100%;
}
</style>