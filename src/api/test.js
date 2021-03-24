import { request, localRequest } from '@/api';

const getUsersAPI = async () => {
  const res = await request({ method: 'get', url: '/users' });
  return res.data;
};

const getTableDataAPI = async () => {
  const res = await localRequest({ method: 'get', url: '/test/table' });
  return res.data;
};

export { getTableDataAPI, getUsersAPI };
