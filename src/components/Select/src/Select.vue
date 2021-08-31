<template>
  <div class="re-select" :style="{ 'max-width': `${maxWidth}` }">
    <div class="re-select__input" @click.stop="expandOptions">
      <re-input
        v-model="selectedValue"
        :expand="expandConfig"
        readonly
        cus-type="select"
        :disabled="disabled"
        @click.stop="expandOptions"
      >
        <template #suffix v-if="$slots.suffix">
          <slot name="suffix"></slot>
        </template>
      </re-input>
      <div class="expand-down" :class="{ 'expand-down--active': expandConfig.status }">
        <img class="expand-down__icon" src="@/assets/icon/arrow-down.svg" />
      </div>
    </div>
    <re-expand-container :visible.sync="expandConfig.status">
      <div class="re-select__option__content">
        <ul class="re-select__option__content__list" v-on-clickaway="closeOptions">
          <re-select-option
            v-for="opt of formatOptions"
            :key="opt.value"
            v-bind="opt"
            :currOption="value"
            @handleOption="handleOption"
          />
        </ul>
      </div>
    </re-expand-container>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import triggerValidate from '@/mixins/triggerValidate';

export default {
  name: 'ReSelect',
  mixins: [triggerValidate],
  inject: {
    reFormItem: {
      default: '',
    },
  },
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
    maxWidth: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      expandConfig: {
        use: true,
        status: false,
      },
      visible: false,
    };
  },
  computed: {
    selectedValue() {
      const valueMappingObj = this.formatOptions.reduce((obj, ele) => {
        obj[ele.value] = ele.label;
        return obj;
      }, {});

      return valueMappingObj[this.value];
    },
    formatOptions() {
      return this.options.reduce((optionsList, item) => {
        // 傳進來是群組時，把該 label 和 選項攤平，如何渲染是 SelectOption 的事
        if (item.options) {
          return [
            ...optionsList,
            {
              // type: 'group' 用來讓下面的 SelectOption 判斷是否為群組標籤
              type: 'label',
              label: item.label,
            },
            ...item.options,
          ];
        }

        return [...optionsList, item];
      }, []);
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
    handleOption(value) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.triggerValidate('change', value);
      this.closeOptions();
    },
  },
};
</script>

<style lang="scss" scoped>
.re-select {
  position: relative;
  width: 100%;

  &__input {
    position: relative;
    width: 100%;
    cursor: pointer;
  }

  &__option {
    @include position(tl, 100%, 0);
    z-index: 100;
    margin-top: 5px;
    background-color: $c-white;
    border: 1px solid $c-main;
    border-radius: 4px;
    overflow: hidden;

    &__content {
      position: relative;
    }
  }
}

.expand-down {
  @include position(tr, 50%, 10px);
  transform: translateY(-50%) rotate(180deg);
  transition: 0.4s;

  &__icon {
    width: 15px;
  }

  &--active {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
