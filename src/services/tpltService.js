import serviceRequest from '@/network/serviceRequest';
import Options from '@/network/options';

const options = new Options();
/**
 *
 * serviceRequest
 * 1. methods(必填) --> 方法
 * 2. apiUrl(必填) --> api route
 * 3. payload(必填) --> request參數
 * 4. options(必填) --> {} 一個物件，line4 有個預設的
 */

export const handleTpltAPI = (payload = {}) => {
  const apiUrl = '/todos/1';
  // 自定義時，header時的寫法，
  // 也可自定義加上其他參數
  const options = new Options();
  options.usedHeaderConfigName = 'testConfig';
  console.log('show a', options);
  return serviceRequest('get', apiUrl, payload, options);
};

export const handleTpltMockAPI = (payload = {}) => {
  const apiUrl = '/todos/1';
  return serviceRequest('get', apiUrl, payload, options);
};
