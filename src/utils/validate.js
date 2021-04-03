// const initVld = ({ trigger }= { trigger: []}) => {

//   return

// };

function vld({ value, ruleList }) {
  console.log('value', value);
  console.log('ruleList', ruleList);

  return new Error('err ?');
  // return true;
}

export default vld;
