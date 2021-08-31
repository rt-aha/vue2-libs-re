<template>
  <div class="page-drawer">
    <re-title @click="handleClick('drawer')">抽屜</re-title>
    <re-button @click="openDrawer('prop')">開啟抽屜(prop)</re-button>
    <re-button @click="openDrawer('slot')">開啟抽屜(slot)</re-button>

    <re-drawer
      :visible.sync="drawerVisible.prop"
      footerPosition="center"
      title="抽屜標題 prop"
      @beforeClose="beforeClose"
      :template="DrawerTemplate"
      :data="{ a: 1, b: 2 }"
    />

    <re-drawer :visible.sync="drawerVisible.slot" footerPosition="center">
      <template #header>
        <re-title type="dialog" :mt="false">抽屜標題 slot</re-title>
      </template>
      <template> body </template>
      <template #footer>
        <re-button @click="closeDrawer('slot')">取消</re-button>
      </template>
    </re-drawer>
  </div>
</template>

<script>
import DrawerTemplate from '@/devComponents/Drawer/DrawerTemplate.vue';

export default {
  name: 'PageDrawer',
  data() {
    return {
      DrawerTemplate,
      drawerVisible: {
        slot: false,
        prop: false,
      },
    };
  },
  methods: {
    beforeClose() {
      this.drawerVisible.prop = false;
    },
    openDrawer(type) {
      this.drawerVisible[type] = true;
    },
    closeDrawer(type) {
      this.drawerVisible[type] = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
