<template>
  <div class="home">
    <check-list />
  </div>
</template>

<script>
// @ is an alias to /src
import CheckList from '@/components/CheckList.vue';

export default {
  name: 'Home',
  components: {
    CheckList,
  },
};
</script>
