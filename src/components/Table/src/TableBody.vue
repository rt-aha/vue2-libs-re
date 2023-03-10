<template>
  <tbody class="re-table-body" :style="{ 'max-height': maxHeightValue }">
    <tr
      class="re-table-body__tr"
      v-for="(rowData, index) of tableData"
      :key="rowData.name"
      :class="[
        {
          're-table-body__tr--stripe': stripe,
        },
      ]"
      :style="setRowStyle(rowData, index)"
    >
      <td
        class="re-table-body__tr__td"
        v-for="col of innerColumnsConfig"
        :key="col.prop"
        :style="{
          ...col.cssStyle,
        }"
      >
        <div class="re-table-body__tr__td__content" :class="'invisible' && col.isEmptyRow">
          <component v-if="col.render" :is="col.render(rowData[col.prop], rowData, col)" />

          <div v-else :style="cusStyle(rowData[col.prop], rowData, col)">
            {{ formatter(rowData[col.prop], rowData, col) }}
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'ReTableBody',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnsConfig: {
      type: Array,
      default: () => [],
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    rowColor: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    tableHeaderHeight: {
      type: Number,
      default: 0,
    },
    isFixedColumn: {
      type: Boolean,
      default: false,
    },

    fixedTableWidth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      innerColumnsConfig: [],
    };
  },
  computed: {
    rowColorObj() {
      return this.rowColor.reduce((obj, ele) => {
        obj[ele.prop] = ele;

        return obj;
      }, {});
    },
    rowColorKeys() {
      return this.rowColor.map((ele) => ele.prop);
    },
    maxHeightValue() {
      if (this.maxHeight === 'auto') {
        return 'auto';
      }

      return `${this.maxHeight}px`;
    },
  },
  methods: {
    cusStyle(data, rowData, col) {
      if (col.cusStyle) {
        return col.cusStyle(data, rowData, col);
      }

      return data;
    },

    formatter(data, rowData, col) {
      if (col.formatter) {
        return col.formatter(data, rowData, col);
      }

      return data;
    },

    // ??????keys, ????????????????????????????????????????????????????????????
    setRowStyle(rowData) {
      const rowDataKeys = Object.keys(rowData);
      const existKeys = this.rowColorKeys.filter((ele) => rowDataKeys.includes(ele));
      let bgColor = {};

      existKeys.forEach((key) => {
        if (this.rowColorObj[key].condition) {
          const isMatchCondition = this.rowColorObj[key].condition(rowData[key], rowData);
          if (isMatchCondition) {
            bgColor = { backgroundColor: this.rowColorObj[key].color };
          }
        }
      });

      return bgColor;
    },
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
  // FIXED ????????????????????????
  watch: {
    columnsConfig: {
      handler: 'setFixedColumn',
    },
  },
};
</script>

<style lang="scss" scoped>
.re-table-body {
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  &__tr {
    border-bottom: 1px solid $c-lightgrey;
    position: relative;
    background-color: $c-white;

    &--stripe {
      &:nth-child(2n) {
        background-color: #efefef;
      }
    }

    &__td {
      @include font-style($c-assist, 14px);
      width: 100%;

      &__content {
        @include box-padding(10px);
        display: inline-block;
        vertical-align: middle;
      }
    }

    &:last-child {
      border-bottom: 0 transparent;
    }
  }
}

.invisible {
  opacity: 0;
}
</style>
