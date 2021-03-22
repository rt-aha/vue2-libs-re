import { action } from '@storybook/addon-actions';

import ReSwitch from './Switch.vue';

export default {
  title: 'Re-UI/ReSwitch',
  component: ReSwitch,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

export const actionsData = {
  handleChange: action('clicked'),
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReSwitch },
  methods: actionsData,
  template: '<re-switch v-bind="$props" @click="handleChange">按鈕</re-switch>',
});

export const Primary = Template.bind({});
Primary.args = {
  switchLabel: {
    on: 'on',
    off: 'off',
  },
  // round: 'default',
  // isLoading: false,
  // size: '',
};
