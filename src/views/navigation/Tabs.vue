<template>
  <div class="page-tabs">
    123
    <re-tabs v-model="tab" @change="handleTab" :tabsConfig="tabsConfig">
      <template #tab111>content - tab111</template>
      <template #tab222>content - tab222</template>
      <template #tab333>content - tab333</template>
      <template #tab444>content - tab444</template>
      <template #tab555>content - tab555</template>
      <template #tab666>content - tab666</template>
    </re-tabs>
  </div>
</template>

<script>
export default {
  name: 'PageTabs',
  data() {
    return {
      tab: 'tab111',
      tabsConfig: [
        {
          label: 'tab111',
          name: 'tab111',
        },
        {
          label: 'tab222',
          name: 'tab222',
          disabled: true,
        },
        {
          label: 'tab333',
          name: 'tab333',
          render: {
            render(h) {
              return h('p', [h('span', 'render '), h('span', 'test')]);
            },
          },
        },
        {
          label: 'tab444',
          name: 'tab444',
        },
        {
          label: 'tab555',
          name: 'tab555',
        },

        {
          label: 'tab666',
          name: 'tab666',
        },
      ],
    };
  },
  methods: {
    handleTab(tabInfo) {
      this.tab = tabInfo.name;
    },
  },
};
</script>
