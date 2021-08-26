<template>
  <div class="re-select">
    <div class="re-select__input">
      <input
        class="re-select__input__field"
        v-model="emailValue"
        @click.stop
        @input="handleChange"
        @change="handleChange"
        @focus="expandOptions"
      />
    </div>
    <re-expand-container :visible.sync="isExpand">
      <div class="re-select__option__content">
        <div class="re-select__option__content__list">
          <re-select-option
            v-for="opt of extraOptions"
            :key="opt.value"
            v-bind="opt"
            :optionConfig="opt"
            :currOption="value"
            @handleSelect="handleSelect"
            @removeOption="removeOption"
          />
        </div>
      </div>
    </re-expand-container>
  </div>
</template>

<script>
import ReSelectOption from '@/components/global/ReEmailAutoComplete/ReSelectOption.vue';
import ReExpandContainer from '@/components/global/ReEmailAutoComplete/ReExpandContainer.vue';
import CategoryTitle from '@/components/global/ReEmailAutoComplete/CategoryTitle.vue';

export default {
  $_veeValidate: {
    value() {
      return this.emailValue;
    },
  },
  name: 'ReEmailAutoComplete',
  components: {
    ReSelectOption,
    ReExpandContainer,
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
      isExpand: false,
      visible: false,
      emailValue: '',
      extraOptions: [],
      emailDomains: [],
      isBlur: false,
    };
  },
  methods: {
    setValue() {
      this.emailValue = this.value;
    },
    closeOptions(e) {
      this.isExpand = false;
    },
    handleSelect(selectedValue) {
      let fullEmail = '';

      if (this.emailValue.indexOf('@') > -1) {
        const account = this.emailValue.split('@')[0];
        fullEmail = `${account}@${selectedValue}`;
      } else {
        fullEmail = `${this.emailValue}@${selectedValue}`;
      }

      this.emailValue = fullEmail;
      this.$emit('input', this.emailValue);
      this.setOptions();
      this.closeOptions();
    },
    removeOption(val) {
      const storageOptions = localStorage.getItem('laborRewardEmail');
      if (!storageOptions) return;

      const emailOptions = JSON.parse(storageOptions);

      // 要移除的 domain
      const filterOptions = emailOptions.filter((item) => {
        return item.value !== val;
      });

      if (filterOptions.length === 0) {
        localStorage.removeItem('laborRewardEmail');
      } else {
        localStorage.setItem('laborRewardEmail', JSON.stringify(filterOptions));
      }

      this.combineEmailDomains();
    },
    expandOptions() {
      if (!this.emailValue || this.emailValue.split('@').length !== 2) {
        this.isExpand = false;
        return;
      }

      this.isExpand = true;
    },
    handleChange(e) {
      this.$emit('input', e.target.value);

      if (this.disabled) return;
      if (!e.target.value || this.emailValue.split('@').length !== 2) {
        this.isExpand = false;
        return;
      }

      this.isExpand = true;
    },
    combineEmailDomains() {
      this.emailDomains = this.options;

      const storageOptions = localStorage.getItem('laborRewardEmail');

      if (storageOptions) {
        let laborRewardEmailOption = JSON.parse(storageOptions);
        laborRewardEmailOption = laborRewardEmailOption.map((item) => {
          item.allowedDelete = true;
          return item;
        });

        const frequentTitle = {
          render: () => CategoryTitle,
          label: 'frequentTitle',
          value: '111',
          title: '常用 Email',
          disabled: true,
        };

        const historyTitle = {
          render: () => CategoryTitle,
          label: 'historyTitle',
          value: '222',
          title: '曾使用 Email（儲存上限 100 筆）',
          disabled: true,
        };

        this.emailDomains = [frequentTitle, ...this.options, historyTitle, ...laborRewardEmailOption];
      }

      this.setOptions();
    },
    setOptions() {
      const [account, domain] = this.emailValue.split('@');

      this.extraOptions = this.emailDomains.map((item) => {
        item.label = `${account}@${item.value}`;
        return item;
      });

      if (domain) {
        const isMatchDomain = this.emailDomains.some((item) => {
          return item.value.includes(domain);
        });

        if (isMatchDomain) {
          this.extraOptions = this.extraOptions.filter((item) => {
            return item.value.includes(domain);
          });
        }
      }
    },
  },
  created() {
    this.setValue();
    this.combineEmailDomains();
  },
  watch: {
    emailValue: {
      handler(newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          this.setOptions();
        }
      },
    },
  },
};
</script>

<style lang="scss">
.re-select {
  width: 100%;
  position: relative;

  &__input {
    width: 100%;
    cursor: pointer;

    &__field {
      @include box-padding(10px);
      width: 100%;
      border-radius: 10px;
      border: 2px solid $c-orange;
      background: $c-white;
    }
  }

  &__option {
    margin-top: 5px;
    @include position(tl, 100%, 0px);
    border: 1px solid $c-main;
    border-radius: 4px;
    overflow: hidden;
    z-index: 100;
    background-color: $c-white;

    &__content {
      height: auto;
      max-height: 200px;
      overflow: auto;
      position: relative;
    }
  }
}
</style>
