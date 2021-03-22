<template>
  <div class="re-select">
    <div class="re-select__input" @click.stop="expandOptions">
      <re-input
        v-model="selectedValue"
        :expand="expandConfig"
        readonly
        cus-type="select"
        :disabled="disabled"
      ></re-input>
    </div>
    <div class="re-select__option" v-show="expandConfig.status">
      <div class="re-select__option__gradient--top"></div>
      <div class="re-select__option__content">
        <ul
          class="re-select__option__content__list"
          v-on-clickaway="closeOptions"
          @click.stop="handleOption"
        >
          <re-select-option
            v-for="opt of options"
            :key="opt.value"
            v-bind="opt"
            :currOption="value"
          />
        </ul>
      </div>
      <div class="re-select__option__gradient--bottom"></div>
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
    options: {
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
      const valueMappingObj = this.options.reduce((obj, ele) => {
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
      const disabledStatus = targetEle.getAttribute('data-disabled-status');
      if (disabledStatus) return;
      const selectedValue = targetEle.getAttribute('data-option-value');
      this.closeOptions();
      this.$emit('input', selectedValue);
      this.closeOptions();
    },
  },
};
</script>

<style lang="scss">
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
    background-color: $c-white;
    /* @include box-padding(10px 0); */
    /* box-shadow: 3px 3px 20px #ccc inset; */

    &__gradient {
      &--top {
        &::before {
          content: "";
          @include position(tl);
          width: 100%;
          height: 10px;
          background-image: linear-gradient(to bottom, $c-white, transparent);
          display: inline-block;
          z-index: 10;
        }
      }

      &--bottom {
        &::before {
          content: "";
          @include position(bl);
          width: 100%;
          height: 10px;
          background-image: linear-gradient(to top, $c-white, transparent);
          display: inline-block;
          z-index: 10;
        }
      }
    }

    &__content {
      height: 200px;
      overflow: auto;
      position: relative;
      @include box-padding(10px);

      &__list {
        > .re-select-option:first-child {
          padding-top: 0px;
        }

        > .re-select-option:last-child {
          padding-bottom: 0px;
        }
      }
    }
  }
}
</style>
