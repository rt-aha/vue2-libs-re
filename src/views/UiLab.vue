<template>
  <div class="page-ui-lab">
    <re-menu :menuConfig="menuConfig" />
  </div>
</template>

<script>
import ReMenu from '@/components/Menu';

import form from '@/router/viewRoutes/form';
import viewRoutes from '@/router/viewRoutes';

const menuConfig = [...form];

export default {
  name: 'UiLab',
  components: {
    ReMenu,
  },
  data() {
    return {
      menuConfig: viewRoutes,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-ui-lab {
  width: 100%;
  height: 100%;
}
</style>
