import ReAccordion from './Accordion.vue';

export default {
  title: 'Re-UI/ReAccordion',
  component: ReAccordion,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReAccordion },
  template: '<re-Accordion v-bind="$props" >按鈕</re-Accordion>',
});

export const Primary = Template.bind({});
Primary.args = {

};
