import ReCarousel from './Carousel.vue';

export default {
  title: 'Re-UI/ReCarousel',
  component: ReCarousel,
  argTypes: {
    // type: { control: { type: 'select', options: ['default', 'border', 'plain'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReCarousel },
  template: '<re-Carousel v-bind="$props" >按鈕</re-Carousel>',
});

export const Primary = Template.bind({});
Primary.args = {

};
