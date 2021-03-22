<template>
  <div class="re-select">
    <div
      class="re-select__input"
      @click.stop="expandOptions"
    >
      <re-input
        v-model="selectedValue"
        :expand="expandConfig"
        readonly
        cus-type="select"
        :disabled="disabled"
      ></re-input>
    </div>
    <div class="re-select__option" v-show="expandConfig.status">
      <div class="re-select__option__content">
        <ul
          class="r-select__option__list"
          v-on-clickaway="closeOptions"
          @click.stop="handleOption"
        >
          <re-select-option
            v-for="opt of selectOptions"
            :key="opt.value"
            v-bind="opt"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: 'ReSelect',
  directives: {
    onClickaway,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      default: '',
    },
    selectOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      expandConfig: {
        use: true,
        status: false,
      },
    };
  },
  computed: {
    selectedValue() {
      const valueMappingObj = this.selectOptions.reduce((obj, ele) => {
        obj[ele.value] = ele.label;
        return obj;
      }, {});

      return valueMappingObj[this.value];
    },
  },
  methods: {
    closeOptions(e) {
      this.expandConfig.status = false;
    },
    expandOptions() {
      if (this.disabled) return;

      this.expandConfig = {
        ...this.expandConfig,
        status: !this.expandConfig.status,
      };
    },
    handleOption(e) {
      const targetEle = e.path.find((node) => node.getAttribute('data-option-value'));
      const selectedValue = targetEle.getAttribute('data-option-value');
      this.closeOptions();
      this.$emit('input', selectedValue);
      this.closeOptions();
    },
  },
};
</script>

<style lang="scss" scoped>
.re-select {
  width: 200px;
  position: relative;

  &__input {
    width: 100%;
    cursor: pointer;

    /* &__disabled {

    } */
  }

  &__option {
    margin-top: 5px;
    @include position(tl, 100%, 0px);
    border: 1px solid $c-main;
    border-radius: 4px;
    overflow: hidden;
    z-index: 100;
    background-color:$c-white;

    &__content {
      height: 200px;
      overflow: auto;
    }
  }
}
</style>
