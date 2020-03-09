
<template>
  <div class="header-content-com">
    <HorizontalContainer :topSlotFlexConfig="'flex: none; height: 60px'"
                         :bottomSlotFlexConfig="'flex: none; height: 60px'">
      <template #h-container-left>
        <div class="header-left">
          top
        </div>
      </template>
      <template #h-container-center>
        <div class="header-center">
          center
        </div>
      </template>
      <template #h-container-right>
        <div class="header-right">
          bottom
        </div>
      </template>
    </HorizontalContainer>
  </div>

</template>

<script>
import HorizontalContainer from '@/components/global/HorizontalContainer';

export default {
  name: 'HeaderContent',
  components: {
    HorizontalContainer,
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index';

.header-content-com {
  height: 100%;
}

.header-left,
.header-center,
.header-right {
  box-sizing: border-box;
  border: 1px solid $c-main1;
  height: 100%;
}
</style>