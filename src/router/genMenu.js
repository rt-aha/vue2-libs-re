import account from '@/router/account';
import setting from '@/router/setting';

const menuOrder = [
  ...account,
  ...setting,
];

export default menuOrder;
