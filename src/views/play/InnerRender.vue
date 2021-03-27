<template>
  <div>
    InnerRender

    <div>
      <slot data="Nick"> default slot </slot>
    </div>
    <div>
      <slot name="extra" :data="{ value: 111, date: '3/19' }">
        extra slot
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InnerRender',
};
</script>
