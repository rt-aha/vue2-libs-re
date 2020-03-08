import serviceRequest from '@/network/serviceRequest';

export const handleTpltAPI = (payload = {}) => {
  const apiUrl = '/todos/1';
  return serviceRequest('get', apiUrl, payload);
};

export const handleTpltMockAPI = (payload = {}) => {
  const apiUrl = '/tplt/dataList';
  return serviceRequest('get', apiUrl, payload);
};
