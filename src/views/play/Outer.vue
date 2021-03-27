<template>
  <div>
    outer
    <inner v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>

<script>
import Inner from '@/views/play/Inner.vue';

export default {
  name: 'Outer',
  components: {
    Inner,
  },
  props: {
    yourName: {
      defualt: '',
    },
  },

};
</script>
