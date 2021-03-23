import ReCalendar from './src/Calendar.vue';

/* istanbul ignore next */
ReCalendar.install = (Vue) => {
  Vue.component(ReCalendar.name, ReCalendar);
};

export default ReCalendar;
