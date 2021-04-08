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

const sendMailAPI = async () => {
  const res = await localRequest({ method: 'post', url: '/send/email' });
  return res.data;
};

const getPermissionAPI = async () => {
  const res = await localRequest({ method: 'get', url: '/auth/permission' });
  return res.data;
};

const getDividendListAPI = async (data = {}) => {
  const res = await localRequest({ method: 'get', url: '/stock/dividend', ...data });
  return res.data;
};

const getSemiconductorAPI = async (data = {}) => {
  const res = await localRequest({ method: 'get', url: '/stock/semiconductor', ...data });
  return res.data;
};

export {
  getTableDataAPI,
  getUsersAPI,
  sendMailAPI,
  getPermissionAPI,
  getDividendListAPI,
  getSemiconductorAPI,
};
