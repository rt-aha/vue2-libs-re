<template>
  <thead class="re-table-header" ref="tableHeader">
    <tr class="re-table-header__tr">
      <td
        class="re-table-header__tr__td"
        v-for="col of innerColumnsConfig"
        :key="col.prop"
        :ref="col.prop"
        :style="{
          ...col.cssStyle,
          width: `${col.width || 150}px `
        }"
      >
        <div class="re-table-header__tr__td__content">
          {{ col.header }}
        </div>
      </td>
    </tr>
  </thead>
</template>

<script>
import { cloneDeep, debounce } from 'lodash';

export default {
  name: 'ReTableHeader',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnsConfig: {
      type: Array,
      default: () => [],
    },
    hasFixedColumn: {
      type: Boolean,
      default: false,
    },
    isFixedColumn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerColumnsConfig: [],
    };
  },
  methods: {
    setFixedColumnsWidth() {
      if (!this.hasFixedColumn) return;
      const columnsProps = Object.keys(this.$refs).filter(
        (ele) => ele !== 'tableHeader',
      );
      const columnsWidthMapping = columnsProps.reduce((obj, key) => {
        obj[key] = this.$refs[key][0].clientWidth;

        return obj;
      }, {});

      this.$emit('setColumnsWidthMapping', columnsWidthMapping);
    },
    // eslint-disable-next-line
    clacFixedColumnsWidthDebounce: debounce(function () {
      this.setFixedColumnsWidth();
    }, 200),
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
    window.addEventListener('resize', this.setFixedColumnsWidth);
    this.setFixedColumn();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.showFixedColumnDebounce);
  },
  watch: {
    columnsConfig: {
      handler: 'setFixedColumn',
    },
  },
};
</script>

<style lang="scss">
.re-table-header {
  &__tr {
    border-bottom: 1px solid $c-lightgrey;
    &__td {
      background-color: $c-white;
      @include font-style($c-assist, 14px, 600);

      &:last-child {
        border-right: 0px transparent;
      }

      &__content {
        @include box-padding(10px);
        display: inline-block;
      }
    }
  }
}
</style>
