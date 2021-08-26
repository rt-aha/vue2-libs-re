<template>
  <div class="re-select">
    <div class="re-select__input">
      <re-input v-model="emailValue" @click.stop @input="handleChange" @change="handleChange" @focus="expandOptions" />
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
import ReSelectOption from '@/components/EmailAutoComplete/src/ReSelectOption.vue';
import CategoryTitle from '@/components/EmailAutoComplete/src/CategoryTitle.vue';

export default {
  name: 'ReEmailAutoComplete',
  components: {
    ReSelectOption,
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
      const filterOptions = emailOptions.filter((item) => item.value !== val);

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
    handleChange(value) {
      this.$emit('input', value);

      if (this.disabled) return;
      if (!value || this.emailValue.split('@').length !== 2) {
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
          title: '曾使用 Email',
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
        const isMatchDomain = this.emailDomains.some((item) => item.value.includes(domain));

        if (isMatchDomain) {
          this.extraOptions = this.extraOptions.filter((item) => item.value.includes(domain));
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
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    cursor: pointer;

    &__field {
      @include box-padding(10px);
      width: 100%;
      background: $c-white;
      border: 2px solid $c-main;
      border-radius: 10px;
    }
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
      height: auto;
      max-height: 200px;
      overflow: auto;
    }
  }
}
</style>
