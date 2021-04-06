import { request, localRequest } from '@/api';

const getUsersAPI = async () => {
  const res = await request({ method: 'get', url: '/users' });

  const r = {
    data: res.data,
    error: 't error',
  };
  return r;
};

const getTableDataAPI = async () => {
  const res = await localRequest({ method: 'get', url: '/test/table' });
  return res.data;
};

export { getTableDataAPI, getUsersAPI };
