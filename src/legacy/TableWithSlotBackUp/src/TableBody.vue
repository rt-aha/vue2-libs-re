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
          <!-- <span v-if="col.isEmptyRow">
          </span> -->

          <span v-if="scopedSlotList.includes(col.prop)">
            <slot :name="col.prop" :data="{ value: rowData[col.prop], rowData, col }" />
          </span>
          <span v-else-if="col.render">
            <component :is="col.render(rowData[col.prop], rowData, col)" />
          </span>
          <span v-else :style="cusStyle(rowData[col.prop], rowData, col)">
            {{ formatter(rowData[col.prop], rowData, col) }}
          </span>
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
    scopedSlotList: {
      type: Array,
      default: () => [],
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

    // 取出keys, 根據所寫陣列逐個比對，後面的會覆蓋前面的
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
  // FIXED 不知為何要監聽值
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
    width: 0;
    display: none;
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
      }
    }

    &:last-child {
      border-bottom: 0px transparent;
    }
  }
}

.invisible {
  opacity: 0;
}
</style>
