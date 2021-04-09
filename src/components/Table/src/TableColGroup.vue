<template>
  <colgroup class="comp-table-col-group">
   <col v-for="col of innerColumnsConfig"
        :key="col.prop"
        :width="columnsWidthMapping[col.prop] || '150'"
        :style="{
          ...col.cssStyle,
        }">
  </colgroup>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'ReTableColGroup',
  props: {
    columnsConfig: {
      type: Array,
      default: () => [],
    },
    isFixedColumn: {
      type: Boolean,
      default: false,
    },
    columnsWidthMapping: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      innerColumnsConfig: [],
    };
  },
  methods: {
    setFixedColumn() {
      if (this.isFixedColumn) {
        const fixedColumns = [];
        const normalColumns = [];

        this.columnsConfig.forEach((item) => {
          if (item.fixed === 'right') {
            fixedColumns.push(item);
          } else {
            normalColumns.push(item);
          }
        });

        this.innerColumnsConfig = [...fixedColumns, ...normalColumns];
      } else {
        this.innerColumnsConfig = cloneDeep(this.columnsConfig);
      }
    },

  },
  mounted() {
    this.setFixedColumn();
  },
  // FIXED 不知為何要監聽值
  watch: {
    columnsConfig: {
      handler: 'setFixedColumn',
    },
  },
};
</script>
