import request from '@/api';

const getUsersAPI = async () => {
  const res = await request({ method: 'get', url: '/users' });
  return res.data;
};

export default getUsersAPI;
