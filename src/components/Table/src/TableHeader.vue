<template>
  <thead class="re-table-header" ref="tableHeader">
    <tr class="re-table-header__tr">
      <td class="re-table-header__tr__td"
        v-for="col of columnsConfig"
        :key="col.prop"
        :ref="col.prop"
        :style="{
          ...col.cssStyle,
        }"
      >
        {{ col.header }}
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
  },
  data() {
    return {
      // columnsWidthMapping: {},
    };
  },
  computed: {
    // tableHeaderHight() {
    //   if (!this.$refs.tableHeader.clientHeight) return 0;
    //   return this.$refs.tableHeader.clientHeight;
    // },
  },
  methods: {
    setFixedColumnsWidth() {
      const columnsProps = Object.keys(this.$refs).filter((ele) => ele !== 'tableHeader');
      console.log('columnsProps', columnsProps);

      const columnsWidthMapping = columnsProps.reduce((obj, key) => {
        console.log('this.$refs[key]', this.$refs[key]);
        obj[key] = this.$refs[key][0].clientWidth;

        return obj;
      }, {});

      console.log('columnsWidthMapping', this.columnsWidthMapping);
      this.$emit('setColumnsWidthMapping', columnsWidthMapping);
    },
    // eslint-disable-next-line
    clacFixedColumnsWidthDebounce: debounce(function() {
      if (this.hasFixedColumn) {
        this.setFixedColumnsWidth();
      }
    }, 200),
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.setFixedColumnsWidth();
    });
    // this.scopedSlotList = Object.keys(this.$scopedSlots);
  },
  watch: {
    tableHeaderHight: {
      // handler() { this.$emit('setTableHeaderHeight', this.tableHeaderHeight); },
    },

  },
};
</script>

<style lang="scss">

.re-table-header {
  // display: block;

  &__tr {
      border-bottom: 1px solid $c-lightgrey;
    &__td {
      @include box-padding(10px);
      border-right: 1px solid $c-lightgrey;
      @include font-style($c-assist, 14px);

      &:last-child {
        border-right: 0px transparent;
      }
    }
  }
}

</style>
